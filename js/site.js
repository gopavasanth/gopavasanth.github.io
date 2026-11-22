/* Home page (v4): journey timeline, uptime ticker, modes, last updated. */
(function () {
  "use strict";

  // ---------- Content ----------
  var CITY = {
    Prague: "prague", Albania: "tirana", Dubai: "dubai", Singapore: "singapore",
    Athens: "athens", "Google HQ": "googleplex", Tallinn: "tallinn",
    Nairobi: "nairobi", Milan: "milan", Paris: "paris"
  };
  function I(k, label, date, title, text, extra) {
    var o = { k: k, label: label, date: date, title: title, text: text };
    for (var key in extra || {}) o[key] = extra[key];
    return o;
  }
  var YEARS = [
    { year: 2017, chapter: "Found open source at amFOSS, then MediaWiki", items: [
      I("note", "Joined", "2017", "amFOSS, Amrita University", "The student-run free and open source club where I made my first contributions. Later mentored around 15 juniors there.", { image: "Images/personal/Amrita_Vasanth.jpg" }),
      I("note", "First patch", "Dec 2017", "Wikimedia", "Started fixing MediaWiki bugs through Gerrit code review. 30+ fixes and features since.", { image: "Images/personal/Wiki_Gopa.jpg" })
    ]},
    { year: 2019, chapter: "Google Summer of Code, and my first hackathon abroad", items: [
      I("build", "GSoC project", "2019", "VideoCutTool", "Edit videos in Wikimedia Commons without downloading them. React, Express, FFmpeg, Redis, MongoDB.", { big: "GSoC", unit: "Google Summer of Code student", image: "Images/personal/GSoC_Gopa.jpg" }),
      I("trip", "Mentor", "2019", "Prague", "Wikimedia Hackathon", { image: "Images/personal/Prague_Gopa.jpg" })
    ]},
    { year: 2020, chapter: "Shipped an app to strangers", items: [
      I("build", "Built", "2020", "Flick", "Short-video app on Google Play, running on Azure.", { big: "3,000+", unit: "users in the first four days", image: "Images/personal/Flick.jpg" }),
      I("trip", "Mentor", "2020", "Albania", "Wikimedia Hackathon")
    ]},
    { year: 2021, chapter: "Joined SAP Labs India", items: [
      I("work", "Joined", "Feb 2021", "SAP Labs India", "Ran Kubernetes on a public hyperscaler, kept Jenkins and ArgoCD available, built a GitOps framework across 18+ data centres and a change orchestration framework.", { sub: "Developer Intern → Associate DevOps Engineer", chips: ["Kubernetes", "Jenkins", "ArgoCD", "Helm", "Chef"], image: "Images/personal/sap_gopa.jpg" }),
      I("note", "Innovate Award · SAP", "2021", "d-shop", "Inventory app built on SAP Fiori.", { image: "Images/personal/arudino_pi.png" }),
      I("note", "Hackathon winner · SAP", "2021", "SLara", "Sign language reader. Won the CSR Impact Hackathon.", { image: "Images/slara.jpg" })
    ]},
    { year: 2022, chapter: "First talk on an international stage", items: [
      I("trip", "Speaker", "2022", "Dubai", "WikiArabia", { image: "Images/personal/Dubai_Gopa.JPG" }),
      I("note", "Special Jury Award · SAP", "2022", "Teamup", "SAP SuccessFactors hackathon.", { image: "Images/teamup.png" }),
      I("note", "Certified", "2022", "SAFe DevOps", "", { image: "Images/safe_devops.png" })
    ]},
    { year: 2023, chapter: "Built ToolWatch, spoke at Wikimania", items: [
      I("build", "Built", "2023", "ToolWatch", "Health monitoring for tools running on Wikimedia Toolforge.", { big: "500+", unit: "tools monitored", image: "Images/personal/toolwatch.png" }),
      I("trip", "Speaker", "2023", "Singapore", "Wikimania", { image: "Images/personal/singapore_gopa.jpg" }),
      I("trip", "Mentor", "2023", "Athens", "Wikimedia Hackathon", { image: "Images/personal/Greece_Gopa.jpg" }),
      I("trip", "Org admin", "2023", "Google HQ", "GSoC Mentor Summit", { image: "Images/personal/Google Gopa.jpeg" })
    ]},
    { year: 2024, chapter: "Moved into site reliability", items: [
      I("note", "Certified", "2024", "Certified Kubernetes Administrator", "", { image: "Images/personal/CKA.jpeg" }),
      I("trip", "Mentor", "2024", "Tallinn", "Wikimedia Hackathon", { image: "Images/personal/Tallin_Gopa.jpeg" }),
      I("work", "Joined", "Nov 2024", "American Express", "Reliability and observability for 40+ high-traffic production services.", { sub: "Site Reliability Engineer III", chips: ["Dynatrace", "Splunk", "F5", "Istio", "OpenShift"], image: "Images/personal/amex_gopa.jpg" })
    ]},
    { year: 2025, chapter: "Less busywork for translators", items: [
      I("build", "Built", "2025", "TranslateTagger", "Automates translate tags in wikitext.", { big: "~80%", unit: "less translate-admin effort", image: "Images/personal/translateTagger.jpeg" }),
      I("trip", "Speaker", "2025", "Nairobi", "Wikimania", { image: "Images/personal/kenya_gopa.jpg" }),
      I("note", "Certified", "2025", "AWS Developer Associate", "", { image: "Images/personal/aws_dev_ass.png" })
    ]},
    { year: 2026, chapter: "Now", items: [
      I("build", "Led deployment", "2026", "WISE", "Wikimedia Image Search Engine, brought onto Wikimedia infrastructure with Oxford’s Visual Geometry Group.", { big: "WISE", unit: "with Oxford VGG", image: "Images/personal/wise.png" }),
      I("trip", "Mentor", "2026", "Milan", "Wikimedia Hackathon", { image: "Images/personal/italy_gopa.jpg" }),
      I("trip", "Speaker", "2026", "Paris", "Wikimania", { image: "Images/personal/paris_gopa.jpg" }),
      I("note", "Currently", "now", "Regional Funds Committee.", "Help South Asian communities and projects through grants", { image: "Images/personal/sa_wmf_rfc.jpeg" })
    ]}
  ].reverse();
  var MODES = [
    { n: "01", title: "Keep it up", text: "At American Express I own observability, SLOs and incidents for 40+ services, and close the logging gaps that slow down on-call.", tools: "Dynatrace · Splunk · OpenSearch · ContentSquare · F5 · Akamai · Istio · ServiceNow" },
    { n: "02", title: "Ship it", text: "At SAP I kept the delivery platform healthy: Jenkins at a 95% job success rate, ArgoCD, GitOps across 18+ data centres and change orchestration that prevented 45% of outages.", tools: "Kubernetes · Helm · Jenkins · ArgoCD · Terraform · Chef · AWS · Python · Java · Node" },
    { n: "03", title: "Bring people in", text: "Org admin for GSoC, Google Code-in and Outreachy. Mentor at five Wikimedia Hackathons, lead organiser of IndiaFOSS 5.0 and Indic hackathons in five cities.", tools: "Indic MediaWiki Developers · South Asia Regional Funds Committee · amFOSS" }
  ];
  var REPO = "gopavasanth/gopavasanth.github.io";

  // ---------- Helpers ----------
  function $(id) { return document.getElementById(id); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null && text !== "") n.textContent = text;
    return n;
  }
  function pad(n) { return String(n).padStart(2, "0"); }

  // ---------- Uptime ----------
  var T0 = new Date(2017, 0, 1).getTime();
  function fmtUp() {
    var s = Math.floor((Date.now() - T0) / 1000);
    return Math.floor(s / 86400).toLocaleString("en-US") + "d " +
      pad(Math.floor(s / 3600) % 24) + ":" + pad(Math.floor(s / 60) % 60) + ":" + pad(s % 60);
  }
  var up = $("uptime");
  up.textContent = fmtUp();
  setInterval(function () { up.textContent = fmtUp(); }, 1000);

  // ---------- Journey render ----------
  function card(it) {
    var c = el("div", "card card--" + it.k);
    if (it.image || it.k === "trip") {
      var img = el("img");
      img.src = it.image || "Images/cities/" + CITY[it.title] + ".jpg";
      img.alt = it.title;
      img.loading = "lazy";
      img.className = "card__image";
      c.classList.add("card--photo");
      c.appendChild(img);
    }
    var meta = el("div", "card__meta");
    meta.appendChild(el("span", "", it.label));
    meta.appendChild(el("span", "", it.date));
    c.appendChild(meta);
    if (it.k === "build") {
      c.appendChild(el("span", "card__big", it.big));
      c.appendChild(el("span", "card__unit", it.unit));
    }
    c.appendChild(el("span", "card__title", it.title));
    if (it.sub) c.appendChild(el("span", "card__sub", it.sub));
    if (it.text) c.appendChild(el("span", "card__text", it.text));
    if (it.chips) {
      var chips = el("div", "chips");
      it.chips.forEach(function (t) { chips.appendChild(el("span", "", t)); });
      c.appendChild(chips);
    }
    return c;
  }

  var journey = $("journey"), track = $("track"), head = $("journey-head"), fill = $("ruler-fill");
  YEARS.forEach(function (g) {
    var y = el("div", "year");
    y.dataset.year = g.year;
    y.appendChild(el("div", "year__label", String(g.year)));
    var items = el("div", "year__items");
    g.items.forEach(function (it) {
      var slot = el("div", "slot slot--" + it.k);
      slot.appendChild(card(it));
      items.appendChild(slot);
    });
    y.appendChild(items);
    track.appendChild(y);
  });

  ["d3", "d4"].forEach(function (id) {
    for (var i = 0; i < 10; i++) $(id).appendChild(el("span", "", String(i)));
  });

  var rulerBtns = YEARS.map(function (g) {
    var b = el("button", "", String(g.year));
    b.type = "button";
    b.addEventListener("click", function () { goYear(g.year); });
    $("ruler-years").appendChild(b);
    return b;
  });

  // ---------- Journey behaviour ----------
  var groups = Array.prototype.slice.call(track.querySelectorAll("[data-year]"));
  var wide = false, current = null;

  function maxX() { return Math.max(0, track.scrollWidth - window.innerWidth); }
  function progress() {
    var r = journey.getBoundingClientRect();
    return Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
  }

  function setYear(y) {
    if (y === current) return;
    current = y;
    var idx = YEARS.findIndex(function (g) { return g.year === y; });
    $("d3").style.transform = "translateY(-" + (Math.floor(y / 10) % 10) + "em)";
    $("d4").style.transform = "translateY(-" + (y % 10) + "em)";
    $("chapter").textContent = YEARS[idx].chapter;
    $("counter").textContent = pad(idx + 1) + " / " + pad(YEARS.length);
    rulerBtns.forEach(function (b, i) { b.setAttribute("aria-current", i === idx ? "true" : "false"); });
  }

  function sync() {
    var year = YEARS[0].year;
    if (wide) {
      var p = progress(), x = p * maxX();
      track.style.transform = "translate3d(" + -x + "px,0,0)";
      fill.style.width = p * 100 + "%";
      groups.forEach(function (g) { if (g.offsetLeft - x <= window.innerWidth * 0.5) year = +g.dataset.year; });
    } else {
      var hb = head.getBoundingClientRect().bottom;
      groups.forEach(function (g) { if (g.getBoundingClientRect().top <= hb + 60) year = +g.dataset.year; });
    }
    setYear(year);
  }

  function measure() {
    wide = window.innerWidth >= 900;
    journey.classList.toggle("is-wide", wide);
    if (wide) {
      journey.style.height = maxX() + window.innerHeight + "px";
    } else {
      journey.style.height = "";
      track.style.transform = "";
    }
    sync();
  }

  function goYear(y) {
    var g = track.querySelector('[data-year="' + y + '"]'), max = maxX();
    if (!g || !max) return;
    var p = Math.min(1, Math.max(0, (g.offsetLeft - 56) / max));
    var top = journey.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + p * (journey.offsetHeight - window.innerHeight), behavior: "smooth" });
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { ticking = false; sync(); });
  }, { passive: true });
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  measure();

  // ---------- Modes ----------
  var modes = $("modes");
  MODES.forEach(function (m) {
    var d = el("div", "mode");
    d.appendChild(el("span", "mode__n", m.n));
    d.appendChild(el("span", "mode__title", m.title));
    d.appendChild(el("span", "mode__text", m.text));
    d.appendChild(el("span", "mode__tools", m.tools));
    modes.appendChild(d);
  });

  // ---------- Last updated ----------
  fetch("https://api.github.com/repos/" + REPO + "/commits?per_page=1")
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (commits) {
      var d = new Date(commits[0].commit.author.date);
      $("last-updated").textContent = "Last updated " +
        d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    })
    .catch(function () {});
})();
