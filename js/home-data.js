/*
 * Content for the home page (index.html).
 * Edit this file to change what the page says; js/home.js only renders it.
 *
 *  orgs       – companies / communities. Keys are referenced by `roles` below.
 *  map        – the interactive production map: its columns, auto-tour order,
 *               and `nodes` (the boxes). A node's `group` must match a group
 *               id in `map.columns`. `roles` maps an org key to what you did there.
 *  careers    – "Career status page". `from` / `to` are "YYYY-MM"; to: null = current.
 *  steps      – "The same pipeline, for people" staircase, lowest step first.
 *  trips      – "Departures" board, newest first.
 *  shipped    – project cards. `metric` / `unit` are optional.
 *  certs / awards / links – the rest.
 */
window.HOME_DATA = {
  orgs: {
    amex:   { label: "American Express", years: "2024—now" },
    sap:    { label: "SAP Labs India",   years: "2021—24" },
    wm:     { label: "Wikimedia",        years: "2017—now" },
    amfoss: { label: "amFOSS",           years: "2017—21" }
  },

  map: {
    pinned: "gtm",            // node shown first
    tourMs: 4000,             // auto-tour step length; set to 0 to disable
    tour: ["akamai", "gtm", "ltm", "istio", "k8s", "ui", "be", "code", "ci", "iac", "cd", "log", "mon", "obs", "alert", "inc", "chg"],

    // Three columns. `stack` columns list nodes vertically (with ↓ arrows if `arrows`).
    // The `flow` column shows titled groups that wrap, joined by ↓, with a traffic line.
    columns: [
      { title: "Ship", sub: "DevOps · code to cluster", size: "sm", layout: "stack", arrows: true,
        groups: [{ id: "devops", label: "Ship · DevOps" }],
        after: "deploys to platform →" },
      { title: "Serve", sub: "Request path · edge to application", size: "lg", layout: "flow",
        start: { title: "Users", sub: "traffic in" },
        groups: [
          { id: "edge",     title: "Network edge",    label: "Serve · network edge",     basis: 120 },
          { id: "platform", title: "Mesh & platform", label: "Serve · mesh & platform",  basis: 150 },
          { id: "app",      title: "Application",     label: "Serve · application",      basis: 150 }
        ] },
      { title: "Operate", sub: "SRE · watches everything", size: "sm", layout: "stack",
        groups: [{ id: "sre", label: "Operate · SRE" }] }
    ],

    nodes: [
      // ── Ship ──
      { group: "devops", id: "code", name: "Source & review", tools: "Git · GitHub · Gerrit",
        summary: "Version control and code review, from enterprise repos to the Gerrit workflow behind MediaWiki.",
        roles: {
          wm: "30+ MediaWiki bugs fixed and features shipped through Gerrit code review.",
          sap: "Git-driven service requests and pipeline definitions across BizX.",
          amex: "Git workflows for SRE tooling and internal prototypes."
        } },
      { group: "devops", id: "ci", name: "Build & CI", tools: "Jenkins · Groovy",
        summary: "Pipelines that build, test and package services, and keeping the CI system itself healthy.",
        roles: {
          sap: "Owned Jenkins availability on VMs and Kubernetes. Held a 95% job success rate, and built a GitOps framework connecting Jenkins across 18+ data centres in Groovy."
        } },
      { group: "devops", id: "iac", name: "Provision", tools: "Terraform · Chef · Ansible",
        summary: "Infrastructure described as code so environments can be rebuilt the same way every time.",
        chips: ["Terraform", "Chef", "Ansible", "AWS", "SAP BTP"],
        roles: { sap: "Chef cookbooks that automated infrastructure setup across data centres." } },
      { group: "devops", id: "cd", name: "Deploy", tools: "ArgoCD · Helm · Kustomize",
        summary: "Declarative GitOps delivery of microservices into Kubernetes.",
        roles: {
          sap: "Owned ArgoCD availability, automated microservice deployments with Helm and Kustomize.",
          amex: "Supported near-zero-downtime transitions of large services onto compliant infrastructure."
        } },

      // ── Serve ──
      { group: "edge", id: "akamai", name: "Akamai", tools: "CDN · edge · WAF",
        summary: "The first hop: caching, edge routing and protection in front of customer-facing services.",
        roles: { amex: "Edge layer for high-traffic customer-facing services I support." } },
      { group: "edge", id: "gtm", name: "F5 GTM", tools: "global DNS · failover",
        summary: "Global traffic management: steering users to a healthy data centre and failing over when one is not.",
        roles: { amex: "DNS-based traffic steering and failover across data centres." } },
      { group: "edge", id: "ltm", name: "F5 LTM", tools: "load balancers · health checks",
        summary: "Local load balancing: pools, health monitors and distributing traffic to healthy instances.",
        roles: { amex: "Load balancer pools and health checks in front of production services." } },
      { group: "platform", id: "istio", name: "Istio", tools: "ingress · mesh · mTLS",
        summary: "Service mesh: ingress gateways, traffic routing between services and secure service-to-service calls.",
        roles: { amex: "Ingress and service-to-service routing for services running on Kubernetes." } },
      { group: "platform", id: "k8s", name: "Kubernetes", tools: "OpenShift · Docker · CKA",
        summary: "Running container platforms, the charts on top of them and the monitoring around them.",
        chips: ["Kubernetes", "OpenShift", "Docker", "Helm", "CKA certified"],
        roles: {
          sap: "Managed the Kubernetes stack on a public hyperscaler, including Helm charts and monitoring tools.",
          amex: "OpenShift and Kubernetes for production services.",
          wm: "Deployed and run tools like WISE and ToolWatch on Wikimedia Toolforge."
        } },
      { group: "app", id: "ui", name: "Frontend", tools: "React · Vue · Fiori",
        summary: "User interfaces for internal products and open source tools.",
        roles: {
          sap: "d-shop inventory app on SAP Fiori (Innovate Award) and an employee shift-planning product.",
          wm: "React UI for VideoCutTool and the TranslateTagger web tool."
        } },
      { group: "app", id: "be", name: "Backend", tools: "Python · Java · Node · Flask",
        summary: "APIs, workers and services, plus internal tools that make on-call easier.",
        chips: ["Python", "Java", "Node.js", "Flask", "Groovy", "Shell", "SQL"],
        roles: {
          amex: "Internal SRE tools, synthetic monitoring prototypes, chatbots and unified portfolio dashboards.",
          sap: "SAP CAP and Node.js services on BTP.",
          wm: "VideoCutTool backend with Express, FFmpeg, Redis and MongoDB."
        } },

      // ── Operate ──
      { group: "sre", id: "log", name: "Logging", tools: "Splunk · OpenSearch · ELK",
        summary: "Making sure every service produces logs someone can actually search during an incident.",
        roles: {
          amex: "Found and fixed logging gaps with application and platform teams and set standards for ICS.",
          sap: "Integrated Splunk and ELK with the delivery platform."
        } },
      { group: "sre", id: "mon", name: "Monitoring", tools: "Dynatrace · Zabbix · Pingdom",
        summary: "Health checks, synthetic probes and metrics for every layer on the map.",
        roles: {
          amex: "Synthetic monitoring prototypes for customer journeys.",
          sap: "Pingdom and Zabbix integrations.",
          wm: "Built ToolWatch, health monitoring for 500+ Toolforge tools."
        } },
      { group: "sre", id: "obs", name: "Observability & SLOs", tools: "Dynatrace · ContentSquare",
        summary: "Dashboards and SLOs tied to what real users experience and to business impact.",
        roles: {
          amex: "Owned the end-to-end ICS observability strategy, focused on the Japan market with ContentSquare. SLO-driven monitoring for 40+ services."
        } },
      { group: "sre", id: "alert", name: "Alerting", tools: "thresholds · routing · noise",
        summary: "Alerts that fire for real problems and reach the right team.",
        roles: { amex: "Alert optimisation across 40+ high-traffic services." } },
      { group: "sre", id: "inc", name: "Incident management", tools: "ServiceNow · on-call",
        summary: "Owning incidents from detection to resolution and follow-up.",
        roles: {
          amex: "Incident ownership for production services, plus leadership reporting on outcomes.",
          sap: "Troubleshot and fixed pipeline failures to keep delivery running."
        } },
      { group: "sre", id: "chg", name: "Change management", tools: "planning · validation",
        summary: "Making changes safe: plan, approve, execute, validate.",
        roles: {
          sap: "Designed a change orchestration framework from planning to validation that prevented 45% of outages.",
          amex: "Near-zero-downtime transitions for large-scale services."
        } }
    ]
  },

  // Career status page. The timeline starts at `careerStart` and runs to the current month.
  careerStart: "2017-01",
  careers: [
    { name: "American Express", role: "Senior Site Reliability Engineer", from: "2024-11", to: null, span: "Nov 2024 — now",
      text: "Reliability and observability for 40+ high-traffic production services. Owned the ICS observability strategy with a focus on the Japan market, and led an AI workshop across the UK and India." },
    { name: "SAP Labs India", role: "Associate DevOps Engineer · Developer Intern", from: "2021-02", to: "2024-10", span: "Feb 2021 — Oct 2024",
      text: "Ran Kubernetes on a public hyperscaler, kept Jenkins and ArgoCD available, built a GitOps framework across 18+ data centres and a change orchestration framework that prevented 45% of outages." },
    { name: "Wikimedia", role: "Developer · GSoC & Outreachy org admin · Regional Funds Committee", from: "2017-12", to: null, span: "Dec 2017 — now",
      text: "30+ MediaWiki bugs fixed, tools for Commons and Toolforge, outreach program admin, lead of the Indic MediaWiki Developers User Group and a member of the South Asia Regional Funds Committee." },
    { name: "amFOSS, Amrita University", role: "Member · Mentor", from: "2017-01", to: "2021-12", span: "2017 — 2021",
      text: "Student-run free and open source club where I started contributing, and later mentored around 15 juniors." }
  ],

  steps: [
    { name: "First patch",       text: "Started contributing at amFOSS, the student open source club at Amrita University." },
    { name: "Mentoring",         text: "Mentored around 15 juniors at amFOSS. Invited mentor at five Wikimedia Hackathons." },
    { name: "Outreach programs", text: "GSoC 2019 student, then org admin for GSoC, Google Code-in and Outreachy." },
    { name: "Community lead",    text: "Lead of the Indic MediaWiki Developers User Group." },
    { name: "Events",            text: "Lead organiser of IndiaFOSS 5.0 and multiple Indic hackathons." },
    { name: "Regional Funds",    text: "South Asia committee member, deciding which community projects get funded." },
    { name: "Global stage",      text: "Invited speaker at Wikimania Paris, Nairobi and Singapore, and WikiArabia Dubai." }
  ],

  // `role: "Speaker"` is highlighted on the board.
  trips: [
    { year: "2026", city: "Paris",     event: "Wikimania",           role: "Speaker" },
    { year: "2026", city: "Milan",     event: "Wikimedia Hackathon", role: "Mentor" },
    { year: "2025", city: "Nairobi",   event: "Wikimania",           role: "Speaker" },
    { year: "2024", city: "Tallinn",   event: "Wikimedia Hackathon", role: "Mentor" },
    { year: "2023", city: "Singapore", event: "Wikimania",           role: "Speaker" },
    { year: "2023", city: "Athens",    event: "Wikimedia Hackathon", role: "Mentor" },
    { year: "2023", city: "Google HQ", event: "GSoC Mentor Summit",  role: "Org admin" },
    { year: "2022", city: "Dubai",     event: "WikiArabia",          role: "Speaker" },
    { year: "2020", city: "Albania",   event: "Wikimedia Hackathon", role: "Mentor" },
    { year: "2019", city: "Prague",    event: "Wikimedia Hackathon", role: "Mentor" }
  ],
  organisedAtHome: "Indic Wikimedia Hackathons in Guwahati, Kochi, Chennai, Hyderabad and Bangalore, IndiaFOSS 5.0 in Bengaluru, and the Developer Skill Development Program in Delhi.",

  shipped: [
    { name: "TranslateTagger", year: "2025", tag: "Wikimedia", metric: "~80%", unit: "less translate-admin effort",
      text: "Automates translate tags in wikitext." },
    { name: "ToolWatch", year: "2023", tag: "Toolforge", metric: "500+", unit: "tools monitored",
      text: "Health monitoring for tools running on Wikimedia Toolforge." },
    { name: "Flick", year: "2020", tag: "Azure", metric: "3,000+", unit: "users in the first four days",
      text: "Short-video app on Google Play." },
    { name: "WISE", year: "2026", tag: "Wikimedia × Oxford VGG",
      text: "Wikimedia Image Search Engine. Led its deployment onto Wikimedia infrastructure with Oxford’s Visual Geometry Group." },
    { name: "VideoCutTool", year: "2019", tag: "GSoC",
      text: "Edit videos in Wikimedia Commons without downloading them." }
  ],

  certs: [
    { name: "Certified Kubernetes Administrator", year: "2024" },
    { name: "AWS Developer Associate",            year: "2025" },
    { name: "AWS Cloud Practitioner",             year: "2024" },
    { name: "SAFe DevOps",                        year: "2022" }
  ],

  awards: [
    { name: "Special Jury Award, SAP SuccessFactors hackathon (Teamup)", year: "2022" },
    { name: "Innovate Award, SAP (d-shop)",                              year: "2021" },
    { name: "CSR Impact Hackathon winner, SAP (SLara sign language reader)", year: "2021" }
  ],

  email: "gopavasanth1999@gmail.com",

  // Links next to the photo in the header.
  headerLinks: [
    { label: "github",    href: "https://github.com/gopavasanth" },
    { label: "linkedin",  href: "https://www.linkedin.com/in/gopa-vasanth" },
    { label: "mediawiki", href: "https://www.mediawiki.org/wiki/User:Gopavasanth" },
    { label: "email",     href: "mailto:gopavasanth1999@gmail.com" }
  ],

  // Links in the footer, right of the email address.
  footerLinks: [
    { label: "github",   href: "https://github.com/gopavasanth" },
    { label: "linkedin", href: "https://www.linkedin.com/in/gopa-vasanth" },
    { label: "gerrit",   href: "https://gerrit.wikimedia.org/r/#/q/gopavasanth" },
    { label: "events",   href: "https://www.mediawiki.org/wiki/User:Gopavasanth/Events_and_Activities" }
  ],

  // Call-to-action button in the footer.
  topmate: { label: "Book a call on Topmate →", href: "https://topmate.io/gopavasanth" },

  // Repo used for the "Last updated" line in the footer.
  repo: "gopavasanth/gopavasanth.github.io"
};
