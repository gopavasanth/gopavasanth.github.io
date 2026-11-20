/*
 * Home page renderer. All content comes from js/home-data.js.
 *
 * Production map:
 *   - auto-tours through `map.tour` until the visitor interacts with it
 *   - hover / focus a component  -> preview it in the inspector
 *   - click a component          -> pin it (scrolls the inspector into view when it is below)
 *   - org filter buttons         -> dim components with no work at that org
 */
(function () {
  "use strict";

  var D = window.HOME_DATA;
  var M = D.map;
  var byId = {};
  var groupLabel = {};
  M.nodes.forEach(function (n) { byId[n.id] = n; });
  M.columns.forEach(function (c) { c.groups.forEach(function (g) { groupLabel[g.id] = g.label; }); });

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var state = {
    filter: null,                              // org key, or null for everything
    pinned: M.pinned,                          // node shown when nothing is hovered
    active: null,                              // node currently hovered / focused
    touring: M.tourMs > 0 && !reduceMotion     // auto-tour until the visitor interacts
  };

  // ── helpers ────────────────────────────────────────────────────────────
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function html(sel, markup) { $(sel).innerHTML = markup; }
  function each(list, fn) { return list.map(fn).join(""); }
  function link(l) { return '<a href="' + esc(l.href) + '">' + esc(l.label) + "</a>"; }
  function nodesIn(groupId) { return M.nodes.filter(function (n) { return n.group === groupId; }); }
  var ARROW = '<span class="arrow" aria-hidden="true">↓</span>';

  // ── production map ─────────────────────────────────────────────────────
  function nodeHtml(n, basis) {
    return (
      '<button type="button" class="node" data-node="' + esc(n.id) + '"' +
        (basis ? ' style="--basis:' + basis + 'px"' : "") + ">" +
        '<span class="node__top"><span class="node__name">' + esc(n.name) + '</span><span class="node__mark" aria-hidden="true"></span></span>' +
        '<span class="node__tools">' + esc(n.tools) + "</span>" +
      "</button>"
    );
  }

  function columnHtml(col) {
    var head =
      '<div class="col__head"><span class="col__title">' + esc(col.title) + '</span>' +
      '<span class="col__sub">' + esc(col.sub) + "</span></div>";

    var body;
    if (col.layout === "flow") {
      var start = col.start
        ? '<div class="pill">' + esc(col.start.title) + ' <span class="pill__sub">' + esc(col.start.sub) + "</span></div>" + ARROW
        : "";
      body =
        '<div class="flow">' +
          '<div class="flow__line" aria-hidden="true"><span class="flow__packet"></span></div>' +
          '<div class="flow__body">' + start +
            col.groups.map(function (g) {
              return '<span class="label">' + esc(g.title) + "</span>" +
                '<div class="wrap">' + each(nodesIn(g.id), function (n) { return nodeHtml(n, g.basis); }) + "</div>";
            }).join(ARROW) +
          "</div>" +
        "</div>";
    } else {
      body = '<div class="stack">' +
        col.groups.map(function (g) {
          return nodesIn(g.id).map(function (n) { return nodeHtml(n); }).join(col.arrows ? ARROW : "");
        }).join("") +
        (col.after ? '<span class="col__after">' + esc(col.after) + "</span>" : "") +
      "</div>";
    }
    return '<div class="col col--' + (col.size || "sm") + '">' + head + body + "</div>";
  }

  function renderMap() {
    html("#map-columns", each(M.columns, columnHtml));

    var items = [{ key: "", label: "Everything", years: "" }].concat(
      Object.keys(D.orgs).map(function (k) { return { key: k, label: D.orgs[k].label, years: D.orgs[k].years }; })
    );
    html("#org-filters", each(items, function (o) {
      return '<button type="button" class="filter" data-filter="' + esc(o.key) + '" aria-pressed="false">' +
        "<span>" + esc(o.label) + "</span>" +
        (o.years ? '<span class="filter__years">' + esc(o.years) + "</span>" : "") +
      "</button>";
    }));
  }

  function shownId() { return state.active || state.pinned; }

  function renderInspector() {
    var n = byId[shownId()];
    var f = state.filter;
    var mode = state.touring ? "auto-tour" : state.active ? "previewing" : "pinned";

    html("#inspector-mode", esc(mode));
    html("#inspector-body",
      '<span class="label">' + esc(groupLabel[n.group] || n.group) + "</span>" +
      '<h3 class="inspector__name">' + esc(n.name) + "</h3>" +
      '<p class="inspector__summary">' + esc(n.summary) + "</p>" +
      '<div class="chips">' + each(n.chips || n.tools.split(" · "), function (c) { return '<span class="chip">' + esc(c) + "</span>"; }) + "</div>" +
      '<div class="inspector__roles">' +
        each(Object.keys(n.roles).filter(function (o) { return !f || o === f || !n.roles[f]; }), function (o) {
          return '<div class="role"><span class="role__org">' + esc(D.orgs[o].label) + '</span><span class="role__text">' + esc(n.roles[o]) + "</span></div>";
        }) +
      "</div>"
    );

    // Restart the tour progress bar for each step.
    var track = $("#tour-bar");
    track.innerHTML = state.touring ? '<span class="tour-bar__fill" style="--tour-ms:' + M.tourMs + 'ms"></span>' : "";
  }

  function update() {
    var shown = shownId();
    $all(".node").forEach(function (el) {
      var n = byId[el.getAttribute("data-node")];
      el.classList.toggle("is-on", n.id === shown);
      el.classList.toggle("is-dim", !!state.filter && !n.roles[state.filter]);
      el.setAttribute("aria-pressed", n.id === state.pinned && !state.touring ? "true" : "false");
    });
    $all(".filter").forEach(function (el) {
      var on = (el.getAttribute("data-filter") || null) === state.filter;
      el.classList.toggle("is-on", on);
      el.setAttribute("aria-pressed", on ? "true" : "false");
    });
    renderInspector();
  }

  function preview(id) {
    if (state.active === id && !state.touring) return;
    state.active = id;
    state.touring = false;
    update();
  }

  function revealInspector() {
    var r = $("#inspector").getBoundingClientRect();
    if (r.top > window.innerHeight - 120) {
      window.scrollTo({ top: window.scrollY + r.top - 16, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }

  function bindMap() {
    var map = $("#map");
    map.addEventListener("mouseover", function (e) {
      var el = e.target.closest(".node");
      if (el) preview(el.getAttribute("data-node"));
    });
    map.addEventListener("mouseleave", function () {
      if (state.active) { state.active = null; update(); }
    });
    map.addEventListener("focusin", function (e) {
      var el = e.target.closest(".node");
      if (el) preview(el.getAttribute("data-node"));
    });
    map.addEventListener("focusout", function (e) {
      if (!map.contains(e.relatedTarget) && state.active) { state.active = null; update(); }
    });
    map.addEventListener("click", function (e) {
      var el = e.target.closest(".node");
      if (!el) return;
      state.pinned = el.getAttribute("data-node");
      state.active = null;
      state.touring = false;
      update();
      revealInspector();
    });

    $("#org-filters").addEventListener("click", function (e) {
      var el = e.target.closest(".filter");
      if (!el) return;
      state.filter = el.getAttribute("data-filter") || null;
      update();
    });

    if (state.touring) {
      var timer = setInterval(function () {
        if (!state.touring) { clearInterval(timer); return; }
        if (document.hidden) return;
        var i = M.tour.indexOf(state.pinned);
        state.pinned = M.tour[(i + 1) % M.tour.length];
        update();
      }, M.tourMs);
    }
  }

  // ── career status page ─────────────────────────────────────────────────
  function monthIndex(ym) {
    var p = ym.split("-");
    return Number(p[0]) * 12 + Number(p[1]) - 1;
  }

  function renderCareers() {
    var now = new Date();
    var start = monthIndex(D.careerStart);
    var total = now.getFullYear() * 12 + now.getMonth() - start + 1;

    html("#career-range", "one bar per month · " +
      esc(new Date(start / 12 | 0, start % 12).toLocaleDateString("en-GB", { month: "short", year: "numeric" })) + " → now");

    html("#careers", each(D.careers, function (c) {
      var a = monthIndex(c.from) - start;
      var b = c.to ? monthIndex(c.to) - start : total - 1;
      var live = !c.to;
      var bars = "";
      for (var i = 0; i < total; i++) {
        bars += "<span" + (i >= a && i <= b ? ' class="' + (live ? "live" : "done") + '"' : "") + "></span>";
      }
      return (
        '<div class="career">' +
          '<div class="career__head">' +
            '<div class="career__who"><span class="career__name">' + esc(c.name) + '</span><span class="career__role">' + esc(c.role) + "</span></div>" +
            '<span class="career__status' + (live ? " is-live" : "") + '">' + (live ? "● operational" : "concluded") + "</span>" +
          "</div>" +
          '<div class="bars" style="--months:' + total + '" aria-hidden="true">' + bars + "</div>" +
          '<div class="career__foot"><span class="career__span">' + esc(c.span) + '</span><p class="career__text">' + esc(c.text) + "</p></div>" +
        "</div>"
      );
    }));

    // Year labels aligned to the month grid.
    var years = "";
    for (var y = Math.ceil(start / 12); y * 12 - start < total; y++) {
      var col = Math.max(y * 12 - start, 0);
      var span = Math.min(12, total - col);
      years += '<span style="grid-column:' + (col + 1) + " / span " + span + '">' + y + "</span>";
    }
    var axis = $("#career-years");
    axis.style.setProperty("--months", total);
    axis.innerHTML = years;
  }

  // ── remaining sections ─────────────────────────────────────────────────
  function renderSections() {
    html("#header-links", each(D.headerLinks, link));

    html("#steps", each(D.steps, function (s, i) {
      var last = i === D.steps.length - 1;
      return '<li class="step">' +
        '<div class="step__text"><span class="step__name">' + esc(s.name) + '</span><span class="step__desc">' + esc(s.text) + "</span></div>" +
        '<div class="step__block' + (last ? " is-top" : "") + '" style="--h:' + (28 + i * 34) + 'px">' + String(i).padStart(2, "0") + "</div>" +
      "</li>";
    }));

    html("#trips", each(D.trips, function (t) {
      return '<tr><td class="board__year">' + esc(t.year) + '</td><td class="board__city">' + esc(t.city) +
        '</td><td class="board__event">' + esc(t.event) + '</td><td class="board__role' + (t.role === "Speaker" ? " is-speaker" : "") + '">' + esc(t.role) + "</td></tr>";
    }));
    html("#organised-at-home", esc(D.organisedAtHome));

    html("#shipped", each(D.shipped, function (p) {
      return '<article class="ship">' +
        '<div class="ship__meta"><span>' + esc(p.tag) + "</span><span>" + esc(p.year) + "</span></div>" +
        (p.metric ? '<span class="ship__metric">' + esc(p.metric) + '</span><span class="ship__unit">' + esc(p.unit) + "</span>" : "") +
        '<h3 class="ship__name">' + esc(p.name) + "</h3>" +
        '<p class="ship__text">' + esc(p.text) + "</p>" +
      "</article>";
    }));

    function rows(list) {
      return each(list, function (r) { return '<li><span>' + esc(r.name) + '</span><span class="ledger__year">' + esc(r.year) + "</span></li>"; });
    }
    html("#certs", rows(D.certs));
    html("#awards", rows(D.awards));

    html("#footer-email", link({ label: D.email, href: "mailto:" + D.email }));
    html("#footer-links", each(D.footerLinks, link));
    html("#topmate", '<a class="button" href="' + esc(D.topmate.href) + '" target="_blank" rel="noopener">' + esc(D.topmate.label) + "</a>");
  }

  function loadLastUpdated() {
    var el = $("#last-updated");
    fetch("https://api.github.com/repos/" + D.repo + "/commits?per_page=1")
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (commits) {
        var d = new Date(commits[0].commit.author.date);
        el.textContent = "Last updated " + d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
      })
      .catch(function () { el.textContent = ""; });
  }

  renderSections();
  renderCareers();
  renderMap();
  bindMap();
  update();
  loadLastUpdated();
})();
