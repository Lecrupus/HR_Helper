/**
 * WCIRIA ENTERPRISE DASHBOARD
 * Workforce Continuity & Insider Risk Intelligence Agent
 * Complete frontend implementation with Coral reasoning, multi-source data joining,
 * and production-grade UI components
 */

(() => {
  document.documentElement.classList.add("js");
  const API_BASE = "http://localhost:3001";

  // =========================================================================
  // INTERSECTION OBSERVER FOR REVEAL ANIMATIONS
  // =========================================================================
  const revealElements = document.querySelectorAll("[data-reveal]");
  if (revealElements.length) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  const tabButtons = Array.from(document.querySelectorAll("[data-tab-target]"));
  const tabPanels = Array.from(document.querySelectorAll("[data-tab-panel]"));

  const activateTab = (tabName, options = {}) => {
    const { updateHash = true } = options;
    const targetTab = tabName || "overview";

    tabButtons.forEach((button) => {
      const isActive = button.dataset.tabTarget === targetTab;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-selected", String(isActive));
      button.setAttribute("aria-pressed", String(isActive));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.dataset.tabPanel === targetTab;
      panel.classList.toggle("is-active", isActive);
      panel.setAttribute("aria-hidden", String(!isActive));
    });

    if (updateHash && targetTab) {
      history.replaceState(null, "", `#${targetTab}`);
    }

    const activePanel = document.querySelector(`[data-tab-panel="${targetTab}"]`);
    if (activePanel) {
      activePanel.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (tabButtons.length && tabPanels.length) {
    tabButtons.forEach((button) => {
      button.setAttribute("role", "tab");
      button.addEventListener("click", () => activateTab(button.dataset.tabTarget));
    });

    const initialTab = tabButtons.some((button) => button.dataset.tabTarget === window.location.hash.slice(1))
      ? window.location.hash.slice(1)
      : tabButtons[0].dataset.tabTarget;
    activateTab(initialTab, { updateHash: false });
  }

  // =========================================================================
  // COMPREHENSIVE EMPLOYEE PROFILES WITH EXTENDED METRICS
  // =========================================================================
  const profiles = {
    "Sarah Johnson": {
      name: "Sarah Johnson",
      role: "Principal Engineer",
      summary:
        "Sarah Johnson owns 4 critical systems, 847 unreviewed code segments, and holds sole knowledge of three production runbooks. Insider risk elevated to 71.",
      stats: { toolCount: 18, joinCount: 42, evidenceCount: 23, agentCount: 6 },
      impactScenarios: {
        immediate: [
          { label: "Deploy velocity", pct: 85, tone: "accent" },
          { label: "Incident response", pct: 72, tone: "accent" },
          { label: "Sprint throughput", pct: 65, tone: "warn" },
          { label: "Review coverage", pct: 91, tone: "accent" },
          { label: "On-call coverage", pct: 80, tone: "accent" },
        ],
        "30day": [
          { label: "Deploy velocity", pct: 52, tone: "warn" },
          { label: "Incident response", pct: 44, tone: "warn" },
          { label: "Sprint throughput", pct: 38, tone: "teal" },
          { label: "Review coverage", pct: 60, tone: "warn" },
          { label: "On-call coverage", pct: 50, tone: "warn" },
        ],
        fullkt: [
          { label: "Deploy velocity", pct: 22, tone: "teal" },
          { label: "Incident response", pct: 18, tone: "teal" },
          { label: "Sprint throughput", pct: 15, tone: "teal" },
          { label: "Review coverage", pct: 28, tone: "teal" },
          { label: "On-call coverage", pct: 20, tone: "teal" },
        ],
        teamloss: [
          { label: "Deploy velocity", pct: 95, tone: "accent" },
          { label: "Incident response", pct: 98, tone: "accent" },
          { label: "Sprint throughput", pct: 92, tone: "accent" },
          { label: "Review coverage", pct: 100, tone: "accent" },
          { label: "On-call coverage", pct: 96, tone: "accent" },
        ],
      },
      risks: [
        { name: "Sarah Johnson", role: "Principal Engineer", score: 91, tone: "accent", initials: "SJ", target: true },
        { name: "Marcus Chen", role: "Staff SRE", score: 78, tone: "warn", initials: "MC" },
        { name: "Priya Nair", role: "Lead Architect", score: 74, tone: "warn", initials: "PN" },
        { name: "Tom Adeyemi", role: "Senior Data Eng", score: 61, tone: "teal", initials: "TA" },
        { name: "Zoe Larsson", role: "Security Lead", score: 58, tone: "teal", initials: "ZL" },
      ],
      successors: [
        { rank: 1, name: "Marcus Chen", dept: "Platform SRE", overlap: "78%", readiness: "Partial", tone: "warn", initials: "MC" },
        { rank: 2, name: "Priya Nair", dept: "Architecture", overlap: "64%", readiness: "Low", tone: "accent", initials: "PN" },
        { rank: 3, name: "David Park", dept: "Backend Eng", overlap: "51%", readiness: "Low", tone: "teal", initials: "DP" },
      ],
      evidence: [
        { score: "92", title: "Sole owner of payment gateway deployment", source: "GitHub + Jira + Confluence", tag: "risk" },
        { score: "87", title: "847 PRs awaiting single reviewer", source: "GitHub reviews, last 30d", tag: "bottleneck" },
        { score: "81", title: "No backup runbook owner for auth service", source: "Confluence gap analysis", tag: "gap" },
        { score: "74", title: "Dormant IAM role accessed after 180d", source: "IAM + SIEM correlation", tag: "signal" },
      ],
      activity: [
        { tool: "github_get_employee_ownership", meta: "Mapped 11 repos, 3 critical paths for Sarah", status: "joined" },
        { tool: "slack_get_knowledge_map", meta: "Detected 4 decision threads and 2 private channels", status: "joined" },
        { tool: "iam_get_access_exposure", meta: "Identified 2 dormant prod roles she owns", status: "alert" },
        { tool: "run_continuity_simulation", meta: "Scenario: 30-day notice, velocity impact -42%", status: "modeled" },
        { tool: "find_successor_candidates", meta: "Ranked 8 successors, top overlap 78%", status: "ranked" },
        { tool: "generate_transfer_plan", meta: "Generated 23-step transfer plan for Sarah", status: "plan" },
      ],
      message: "Sarah Johnson owns 4 critical systems, 847 unreviewed code segments, and holds sole knowledge of three production runbooks. Insider risk elevated to 71.",
    },
    "Marcus Chen": {
      name: "Marcus Chen",
      role: "Staff SRE",
      summary:
        "Marcus Chen is flagged for elevated infrastructure ownership risk, with 5 high-risk credential paths and limited backup handoff coverage. Coral marks the platform SRE cluster as vulnerable.",
      stats: { toolCount: 16, joinCount: 38, evidenceCount: 18, agentCount: 5 },
      impactScenarios: {
        immediate: [
          { label: "Deploy velocity", pct: 74, tone: "warn" },
          { label: "Incident response", pct: 68, tone: "warn" },
          { label: "Sprint throughput", pct: 59, tone: "teal" },
          { label: "Review coverage", pct: 66, tone: "warn" },
          { label: "On-call coverage", pct: 70, tone: "warn" },
        ],
        "30day": [
          { label: "Deploy velocity", pct: 48, tone: "warn" },
          { label: "Incident response", pct: 38, tone: "warn" },
          { label: "Sprint throughput", pct: 32, tone: "teal" },
          { label: "Review coverage", pct: 50, tone: "warn" },
          { label: "On-call coverage", pct: 44, tone: "warn" },
        ],
        fullkt: [
          { label: "Deploy velocity", pct: 25, tone: "teal" },
          { label: "Incident response", pct: 22, tone: "teal" },
          { label: "Sprint throughput", pct: 18, tone: "teal" },
          { label: "Review coverage", pct: 35, tone: "teal" },
          { label: "On-call coverage", pct: 28, tone: "teal" },
        ],
        teamloss: [
          { label: "Deploy velocity", pct: 85, tone: "accent" },
          { label: "Incident response", pct: 88, tone: "accent" },
          { label: "Sprint throughput", pct: 81, tone: "accent" },
          { label: "Review coverage", pct: 94, tone: "accent" },
          { label: "On-call coverage", pct: 90, tone: "accent" },
        ],
      },
      risks: [
        { name: "Marcus Chen", role: "Staff SRE", score: 78, tone: "warn", initials: "MC", target: true },
        { name: "Sarah Johnson", role: "Principal Engineer", score: 91, tone: "accent", initials: "SJ" },
        { name: "Priya Nair", role: "Lead Architect", score: 74, tone: "warn", initials: "PN" },
        { name: "Tom Adeyemi", role: "Senior Data Eng", score: 61, tone: "teal", initials: "TA" },
        { name: "Zoe Larsson", role: "Security Lead", score: 58, tone: "teal", initials: "ZL" },
      ],
      successors: [
        { rank: 1, name: "Priya Nair", dept: "Architecture", overlap: "64%", readiness: "Low", tone: "accent", initials: "PN" },
        { rank: 2, name: "David Park", dept: "Backend Eng", overlap: "51%", readiness: "Low", tone: "teal", initials: "DP" },
        { rank: 3, name: "Zoe Larsson", dept: "Security", overlap: "46%", readiness: "Low", tone: "teal", initials: "ZL" },
      ],
      evidence: [
        { score: "89", title: "No secondary SRE owner for K8s cluster", source: "Terraform state and cluster logs", tag: "gap" },
        { score: "84", title: "5 critical runbooks only owned by Marcus", source: "Confluence handoff review", tag: "risk" },
        { score: "79", title: "Credential rotation gaps in prod credentials", source: "IAM audit", tag: "signal" },
        { score: "72", title: "High-change service alerts with single responder", source: "PagerDuty logs", tag: "bottleneck" },
      ],
      activity: [
        { tool: "github_get_employee_ownership", meta: "Mapped 8 infra repos and 3 critical ops paths", status: "joined" },
        { tool: "slack_get_knowledge_map", meta: "Found 2 private on-call channels and 1 escalation path", status: "joined" },
        { tool: "iam_get_access_exposure", meta: "Detected stale prod role bindings for Marcus", status: "alert" },
        { tool: "run_continuity_simulation", meta: "Scenario: 30-day notice, on-call impact -38%", status: "modeled" },
        { tool: "generate_transfer_plan", meta: "Created 18-step SRE transfer checklist", status: "plan" },
      ],
      message:
        "Marcus Chen is flagged for elevated infrastructure ownership risk, with 5 high-risk credential paths and limited backup handoff coverage. Coral marks the platform SRE cluster as vulnerable.",
    },
    "Priya Nair": {
      name: "Priya Nair",
      role: "Lead Architect",
      summary:
        "Priya Nair owns architecture strategy for two core services and has 6 design decisions without fallback owners. Coral highlights architecture concentration risk and backlog dependency exposure.",
      stats: { toolCount: 14, joinCount: 35, evidenceCount: 20, agentCount: 5 },
      impactScenarios: {
        immediate: [
          { label: "Deploy velocity", pct: 81, tone: "warn" },
          { label: "Incident response", pct: 69, tone: "warn" },
          { label: "Sprint throughput", pct: 62, tone: "warn" },
          { label: "Review coverage", pct: 72, tone: "warn" },
          { label: "On-call coverage", pct: 67, tone: "warn" },
        ],
        "30day": [
          { label: "Deploy velocity", pct: 43, tone: "teal" },
          { label: "Incident response", pct: 34, tone: "teal" },
          { label: "Sprint throughput", pct: 31, tone: "teal" },
          { label: "Review coverage", pct: 46, tone: "teal" },
          { label: "On-call coverage", pct: 39, tone: "teal" },
        ],
        fullkt: [
          { label: "Deploy velocity", pct: 20, tone: "teal" },
          { label: "Incident response", pct: 16, tone: "teal" },
          { label: "Sprint throughput", pct: 14, tone: "teal" },
          { label: "Review coverage", pct: 25, tone: "teal" },
          { label: "On-call coverage", pct: 22, tone: "teal" },
        ],
        teamloss: [
          { label: "Deploy velocity", pct: 89, tone: "accent" },
          { label: "Incident response", pct: 92, tone: "accent" },
          { label: "Sprint throughput", pct: 85, tone: "accent" },
          { label: "Review coverage", pct: 97, tone: "accent" },
          { label: "On-call coverage", pct: 91, tone: "accent" },
        ],
      },
      risks: [
        { name: "Priya Nair", role: "Lead Architect", score: 74, tone: "warn", initials: "PN", target: true },
        { name: "Sarah Johnson", role: "Principal Engineer", score: 91, tone: "accent", initials: "SJ" },
        { name: "Marcus Chen", role: "Staff SRE", score: 78, tone: "warn", initials: "MC" },
        { name: "Tom Adeyemi", role: "Senior Data Eng", score: 61, tone: "teal", initials: "TA" },
        { name: "Zoe Larsson", role: "Security Lead", score: 58, tone: "teal", initials: "ZL" },
      ],
      successors: [
        { rank: 1, name: "Zoe Larsson", dept: "Security", overlap: "56%", readiness: "Partial", tone: "teal", initials: "ZL" },
        { rank: 2, name: "David Park", dept: "Backend Eng", overlap: "49%", readiness: "Low", tone: "teal", initials: "DP" },
        { rank: 3, name: "Tom Adeyemi", dept: "Data Eng", overlap: "46%", readiness: "Low", tone: "teal", initials: "TA" },
      ],
      evidence: [
        { score: "88", title: "Two core design decisions without fallback ownership", source: "Architecture review", tag: "gap" },
        { score: "83", title: "Architecture runbooks only reviewed by Priya", source: "Confluence audit", tag: "risk" },
        { score: "77", title: "Dependency map shows three single-owner services", source: "Service catalog", tag: "signal" },
        { score: "70", title: "Platform-to-app handoff lacks coverage for key APIs", source: "Jira backlog", tag: "bottleneck" },
      ],
      activity: [
        { tool: "github_get_employee_ownership", meta: "Mapped 6 design repos and 2 architecture docs", status: "joined" },
        { tool: "slack_get_knowledge_map", meta: "Found 5 architecture discussion threads", status: "joined" },
        { tool: "iam_get_access_exposure", meta: "Detected broad access to design artifacts", status: "alert" },
        { tool: "run_continuity_simulation", meta: "Scenario: 30-day notice, architecture risk -34%", status: "modeled" },
        { tool: "generate_transfer_plan", meta: "Created 16-step architecture handoff plan", status: "plan" },
      ],
      message:
        "Priya Nair owns architecture strategy for two core services and has 6 design decisions without fallback owners. Coral highlights architecture concentration risk and backlog dependency exposure.",
    },
  };

  profiles["Alex Chen"] = {
    ...profiles["Marcus Chen"],
    name: "Alex Chen",
    role: "Lead DevOps",
    summary:
      "Alex Chen concentrates CI/CD ownership across release automation, build credentials, and deployment approvals. Risk is moderate, but release continuity needs a named backup.",
    stats: { toolCount: 12, joinCount: 29, evidenceCount: 14, agentCount: 4 },
    risks: [
      { name: "Alex Chen", role: "Lead DevOps", score: 58, tone: "teal", initials: "AC", target: true },
      { name: "Sarah Johnson", role: "Principal Engineer", score: 91, tone: "accent", initials: "SJ" },
      { name: "Marcus Chen", role: "Staff SRE", score: 78, tone: "warn", initials: "MC" },
      { name: "Priya Nair", role: "Lead Architect", score: 74, tone: "warn", initials: "PN" },
      { name: "Emma Thompson", role: "Senior Backend Eng", score: 45, tone: "teal", initials: "ET" },
    ],
    successors: [
      { rank: 1, name: "Emma Thompson", dept: "Backend Eng", overlap: "61%", readiness: "Partial", tone: "teal", initials: "ET" },
      { rank: 2, name: "Marcus Chen", dept: "Platform SRE", overlap: "58%", readiness: "Partial", tone: "warn", initials: "MC" },
      { rank: 3, name: "David Park", dept: "Backend Eng", overlap: "43%", readiness: "Low", tone: "teal", initials: "DP" },
    ],
    evidence: [
      { score: "68", title: "Build pipeline approvals depend on Alex", source: "GitHub Actions + IAM", tag: "bottleneck" },
      { score: "62", title: "Release credential rotation has one backup", source: "Okta + AWS IAM", tag: "signal" },
      { score: "57", title: "Deployment runbook coverage below target", source: "Confluence audit", tag: "gap" },
    ],
    message:
      "Alex Chen concentrates CI/CD ownership across release automation, build credentials, and deployment approvals. Risk is moderate, but release continuity needs a named backup.",
  };

  profiles["Emma Thompson"] = {
    ...profiles["Sarah Johnson"],
    name: "Emma Thompson",
    role: "Senior Backend Engineer",
    summary:
      "Emma Thompson has healthy shared ownership across backend services and is the strongest successor candidate for several platform workflows.",
    stats: { toolCount: 10, joinCount: 24, evidenceCount: 11, agentCount: 4 },
    risks: [
      { name: "Emma Thompson", role: "Senior Backend Eng", score: 45, tone: "teal", initials: "ET", target: true },
      { name: "Sarah Johnson", role: "Principal Engineer", score: 91, tone: "accent", initials: "SJ" },
      { name: "Marcus Chen", role: "Staff SRE", score: 78, tone: "warn", initials: "MC" },
      { name: "Alex Chen", role: "Lead DevOps", score: 58, tone: "teal", initials: "AC" },
      { name: "David Park", role: "Junior Engineer", score: 32, tone: "teal", initials: "DP" },
    ],
    successors: [
      { rank: 1, name: "David Park", dept: "Backend Eng", overlap: "55%", readiness: "Partial", tone: "teal", initials: "DP" },
      { rank: 2, name: "Priya Nair", dept: "Architecture", overlap: "48%", readiness: "Low", tone: "warn", initials: "PN" },
      { rank: 3, name: "Alex Chen", dept: "DevOps", overlap: "44%", readiness: "Low", tone: "teal", initials: "AC" },
    ],
    evidence: [
      { score: "52", title: "API gateway has distributed ownership", source: "GitHub contributors", tag: "signal" },
      { score: "46", title: "Runbooks current for two backend services", source: "Confluence audit", tag: "coverage" },
      { score: "41", title: "No critical unresolved IAM indicators", source: "IAM + SIEM", tag: "clear" },
    ],
    message:
      "Emma Thompson has healthy shared ownership across backend services and is the strongest successor candidate for several platform workflows.",
  };

  const tones = {
    accent: "#ff5c7a",
    warn: "#f8c14a",
    teal: "#27d6b3",
    gold: "#8fb5ff",
  };

  const employeeSelect = document.querySelector("#employee-select");
  const employeeNameEl = document.querySelector("[data-employee-name]");
  const employeeSummaryEl = document.querySelector("[data-employee-summary]");
  const employeeBadgeEl = document.querySelector("[data-employee-badge]");
  const queryTextEl = document.querySelector("[data-query-text]");
  const riskList = document.querySelector("[data-risk-list]");
  const successorList = document.querySelector("[data-successor-list]");
  const activityLog = document.querySelector("[data-activity-log]");
  const evidenceList = document.querySelector("[data-evidence-list]");
  const riskMetricsList = document.querySelector("[data-risk-metrics]");
  const riskDriversList = document.querySelector("[data-risk-drivers]");
  const riskSignalsList = document.querySelector("[data-risk-signals]");
  const riskSuccessorsList = document.querySelector("[data-risk-successors]");
  const riskNarrativeEl = document.querySelector("[data-risk-narrative]");
  const toolCountEl = document.querySelector("[data-tool-count]");
  const joinCountEl = document.querySelector("[data-join-count]");
  const evidenceCountEl = document.querySelector("[data-evidence-count]");
  const agentCountEl = document.querySelector("[data-agent-count]");
  const impactSection = document.querySelector("[data-impact-section]");
  const impactTabs = impactSection ? Array.from(impactSection.querySelectorAll("[data-impact-tab]")) : [];
  const impactBars = impactSection ? impactSection.querySelector("[data-impact-bars]") : null;
  const dependencyGraph = document.querySelector("[data-dep-graph]");
  const dependencyOwner = document.querySelector("[data-dependency-owner]");
  const employeeIntakeForm = document.querySelector("#employee-intake-form");
  const employeeAnalysisOutput = document.querySelector("#employee-analysis-output");
  const employeeIdInput = document.querySelector("#employee-id");
  const employeeLegalNameInput = document.querySelector("#employee-legal-name");
  const employeeEmailInput = document.querySelector("#employee-email");
  const employeeRoleInput = document.querySelector("#employee-role");
  const employeeDepartmentInput = document.querySelector("#employee-department");
  const employeeTenureMonthsInput = document.querySelector("#employee-tenure-months");
  const employeeSkillsInput = document.querySelector("#employee-skills");
  const employeeCertificationsInput = document.querySelector("#employee-certifications");
  const employeeRiskScoreInput = document.querySelector("#employee-risk-score");
  const employeeOpportunityScoreInput = document.querySelector("#employee-opportunity-score");
  const employeePerformanceRatingInput = document.querySelector("#employee-performance-rating");
  const employeeManagerIdInput = document.querySelector("#employee-manager-id");
  const employeeAccountStatusInput = document.querySelector("#employee-account-status");
  const employeeBusFactorImpactInput = document.querySelector("#employee-bus-factor-impact");
  const employeeKnowledgeConcentrationInput = document.querySelector("#employee-knowledge-concentration");
  const employeeCodeOwnershipInput = document.querySelector("#employee-code-ownership");
  const employeeDocumentationGapInput = document.querySelector("#employee-documentation-gap");
  const employeeCriticalSystemAccessCountInput = document.querySelector("#employee-critical-system-access-count");
  const employeeLastHighRiskIncidentInput = document.querySelector("#employee-last-high-risk-incident");
  const employeeLastActivityTimestampInput = document.querySelector("#employee-last-activity-timestamp");

  let activeImpactKey = "immediate";
  let currentProfile = profiles[employeeSelect?.value || "Sarah Johnson"];
  const dynamicEmployeeDirectory = [];

  const renderImpact = (profile, key) => {
    if (!impactBars || !profile) return;
    const data = profile.impactScenarios[key] || profile.impactScenarios.immediate;
    impactBars.innerHTML = data
      .map(
        (item) => `
          <div class="impact-row">
            <div class="impact-label">${item.label}</div>
            <div class="impact-track">
              <div class="impact-fill" style="background:${tones[item.tone]};width:0%" data-pct="${item.pct}"></div>
            </div>
            <div class="impact-pct" style="color:${tones[item.tone]}">${item.pct}%</div>
          </div>
        `
      )
      .join("");

    requestAnimationFrame(() => {
      impactBars.querySelectorAll(".impact-fill").forEach((bar) => {
        bar.style.width = `${bar.dataset.pct}%`;
      });
    });
  };

  const renderRiskList = (items) => {
    if (!riskList) return;
    const toneMap = {
      accent: { color: "#ff5c7a", background: "rgba(255, 92, 122, 0.16)" },
      warn: { color: "#f8c14a", background: "rgba(248, 193, 74, 0.18)" },
      teal: { color: "#27d6b3", background: "rgba(39, 214, 179, 0.16)" },
    };

    riskList.innerHTML = items
      .map((item) => {
        const tone = toneMap[item.tone] || toneMap.warn;
        const targetClass = item.target ? "risk-row is-target" : "risk-row";
        const targetTag = item.target ? `<span class="risk-target">Target</span>` : "";
        return `
          <div class="${targetClass}">
            <div class="risk-avatar" style="background:${tone.background};color:${tone.color}">${item.initials}</div>
            <div>
              <div class="risk-name">${item.name}</div>
              <div class="risk-role">${item.role}</div>
            </div>
            <div class="risk-bar-track">
              <div class="risk-bar-fill" style="width:${item.score}%;background:${tone.color}"></div>
            </div>
            <div class="risk-score" style="color:${tone.color}">${item.score}</div>
            ${targetTag}
          </div>
        `;
      })
      .join("");
  };

  const renderSuccessorList = (items) => {
    if (!successorList) return;
    const toneMap = {
      accent: "tone-accent",
      warn: "tone-accent tone-low",
      teal: "tone-accent tone-teal",
    };

    successorList.innerHTML = items
      .map((item) => {
        const toneClass = toneMap[item.tone] || "tone-accent tone-teal";
        return `
          <div class="successor-item ${toneClass}">
            <div class="successor-rank">#${item.rank}</div>
            <span class="successor-initials ${toneClass.split(' ')[1] || ''}">${item.initials}</span>
            <div>
              <div class="successor-name">${item.name}</div>
              <div class="successor-role">${item.dept}</div>
              <div class="successor-match">${item.overlap} overlap with original role</div>
              <div class="successor-meta">
                <span class="successor-status">${item.readiness}</span>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  };

  const renderActivityLog = (items) => {
    if (!activityLog) return;
    activityLog.innerHTML = items
      .map(
        (item, idx) => `
          <div class="activity-item">
            <div class="activity-time">${idx + 1}m ago</div>
            <div>
              <div class="activity-tool">${item.tool}</div>
              <div class="activity-meta">${item.meta}</div>
            </div>
            <div class="activity-status">${item.status}</div>
          </div>
        `
      )
      .join("");
  };

  const renderEvidence = (items) => {
    if (!evidenceList) return;
    evidenceList.innerHTML = items
      .map(
        (item) => `
          <div class="evidence-item">
            <div class="evidence-score">${item.score}</div>
            <div>
              <div class="evidence-title">${item.title}</div>
              <div class="evidence-source">${item.source}</div>
            </div>
            <div class="evidence-tag">${item.tag}</div>
          </div>
        `
      )
      .join("");
  };

  const renderDependencyGraph = (profile) => {
    if (!dependencyGraph || !profile) return;
    const dependencyMap = {
      "Sarah Johnson": ["API", "Auth", "Payments", "K8s", "ML", "DB"],
      "Marcus Chen": ["K8s", "Terraform", "IAM", "Monitoring", "CI/CD", "DB"],
      "Priya Nair": ["Architecture", "Auth", "API", "Gateway", "Data", "Security"],
      "Alex Chen": ["CI/CD", "Builds", "Deploy", "GitHub", "Secrets", "Monitoring"],
      "Emma Thompson": ["API", "Services", "Redis", "Postgres", "Reviews", "Docs"],
    };
    const nodes = dependencyMap[profile.name] || dependencyMap["Sarah Johnson"];

    const primaryNodes = nodes.slice(0, 3);
    const secondaryNodes = nodes.slice(3, 6);

    dependencyGraph.innerHTML = `
      <div class="dep-map">
        <div class="dep-center-card">
          <div class="dep-center-label">Core owner</div>
          <div class="dep-center-name">${profile.name}</div>
          <div class="dep-center-role">Primary dependency surface</div>
        </div>
        <div class="dep-node-row">
          ${primaryNodes
            .map(
              (node, idx) => `
                <div class="dep-node-card dep-node-card--primary">
                  <span class="dep-node-index">0${idx + 1}</span>
                  <span class="dep-node-name">${node}</span>
                </div>
              `
            )
            .join("")}
        </div>
        <div class="dep-node-row dep-node-row--secondary">
          ${secondaryNodes
            .map(
              (node, idx) => `
                <div class="dep-node-card dep-node-card--secondary">
                  <span class="dep-node-index">0${idx + 4}</span>
                  <span class="dep-node-name">${node}</span>
                </div>
              `
            )
            .join("")}
        </div>
      </div>
    `;
    if (dependencyOwner) dependencyOwner.textContent = profile.name;
  };

  const parseCsvField = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const toOptionalIso = (value) => {
    if (!value) return null;
    return new Date(value).toISOString();
  };

  const initialsForName = (name) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() || "")
      .join("");

  const toneFromScore = (score) => {
    if (score >= 80) return "accent";
    if (score >= 55) return "warn";
    return "teal";
  };

  const renderMetricCards = (items, root) => {
    if (!root) return;

    root.innerHTML = items
      .map(
        (item) => `
          <div class="risk-metric">
            <div class="risk-metric-head">
              <div class="risk-metric-label">${item.label}</div>
              <span class="detail-pill" style="color:${tones[item.tone] || tones.teal};border-color:${tones[item.tone] || tones.teal}">${item.toneLabel || item.tone}</span>
            </div>
            <div class="risk-metric-value" style="color:${tones[item.tone] || tones.teal}">${item.value}</div>
            <div class="risk-metric-note">${item.note}</div>
          </div>
        `
      )
      .join("");
  };

  const renderDetailRows = (items, root) => {
    if (!root) return;

    root.innerHTML = items
      .map(
        (item) => `
          <div class="detail-row">
            <div class="detail-head">
              <div class="detail-title">${item.title}</div>
              <span class="detail-pill" style="color:${tones[item.tone] || tones.teal};border-color:${tones[item.tone] || tones.teal}">${item.badge}</span>
            </div>
            <div class="detail-note">${item.note}</div>
            <div class="detail-source">${item.source}</div>
          </div>
        `
      )
      .join("");
  };

  const clampPercent = (value) => Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));

  const deriveStaticRiskDetail = (profile) => {
    const targetRisk = profile.risks.find((item) => item.target) || profile.risks[0];
    const topSuccessor = profile.successors[0];
    const immediateImpactAverage = Math.round(
      (profile.impactScenarios.immediate || []).reduce((sum, item) => sum + item.pct, 0) /
        Math.max(profile.impactScenarios.immediate?.length || 1, 1)
    );

    return {
      metrics: [
        {
          label: "Target risk score",
          value: `${targetRisk?.score ?? 0}`,
          note: `${profile.role} continuity pressure is concentrated around ${profile.name}.`,
          tone: targetRisk?.tone || "warn",
          toneLabel: targetRisk?.tone === "accent" ? "Critical" : targetRisk?.tone === "warn" ? "High" : "Moderate"
        },
        {
          label: "Evidence packets",
          value: `${profile.evidence.length}`,
          note: "Traceable findings connect code, operations, and documentation gaps.",
          tone: "teal",
          toneLabel: "Observed"
        },
        {
          label: "Join depth",
          value: `${profile.stats.joinCount}`,
          note: "Cross-source joins across GitHub, Jira, Slack, and access signals.",
          tone: "gold",
          toneLabel: "Mapped"
        },
        {
          label: "Scenario pressure",
          value: `${immediateImpactAverage}%`,
          note: "Average immediate impact across deploy, incident, review, and on-call coverage.",
          tone: "warn",
          toneLabel: "Immediate"
        },
        {
          label: "Successor readiness",
          value: topSuccessor?.readiness || "Unknown",
          note: `${topSuccessor?.name || "No successor"} is the current top candidate with ${topSuccessor?.overlap || "0%"} overlap.`,
          tone: topSuccessor?.tone || "teal",
          toneLabel: "Lead candidate"
        },
      ],
      drivers: (profile.evidence.slice(0, 3)).map((item) => ({
        title: item.title,
        note: item.score,
        source: item.source,
        badge: item.tag.toUpperCase(),
        tone: item.tag === "risk" ? "accent" : item.tag === "gap" ? "warn" : "teal"
      })),
      signals: (profile.activity.slice(0, 4)).map((item) => ({
        title: item.tool,
        note: item.meta,
        source: item.status,
        badge: item.status.toUpperCase(),
        tone: item.status === "alert" ? "accent" : item.status === "plan" ? "warn" : "teal"
      })),
      successors: profile.successors.slice(0, 3).map((item) => ({
        title: `${item.rank}. ${item.name}`,
        note: `${item.dept} · ${item.overlap} overlap`,
        source: `Readiness ${item.readiness}`,
        badge: item.readiness.toUpperCase(),
        tone: item.tone
      })),
      narrative: `${profile.name} shows ${targetRisk?.score ?? 0} risk concentration with the strongest exposure in code ownership, evidence gaps, and successor readiness. The most immediate continuity pressure is an average ${immediateImpactAverage}% operational impact if the role were to leave without handoff.`
    };
  };

  const buildDynamicProfile = (employee, analysis, simulation) => {
    const knowledgeRisk = analysis.knowledge_risk_analysis.score;
    const severityTone = toneFromScore(knowledgeRisk);
    const relatedSignals = analysis.insider_threat_analysis.risk_indicators;
    const successorCandidates = analysis.successor_candidates || [];
    const criticalSystems = analysis.multi_source_join.critical_systems_affected || [];
    const topSuccessor = successorCandidates[0];

    const detail = {
      metrics: [
        {
          label: "Knowledge risk",
          value: knowledgeRisk.toFixed(1),
          note: `Bus factor ${analysis.knowledge_risk_analysis.bus_factor.toFixed(1)} · docs gap ${analysis.knowledge_risk_analysis.documentation_gap_score.toFixed(1)}%`,
          tone: severityTone,
          toneLabel: severityTone === "accent" ? "Critical" : severityTone === "warn" ? "High" : "Moderate"
        },
        {
          label: "Code ownership",
          value: `${analysis.knowledge_risk_analysis.code_ownership_concentration.toFixed(1)}%`,
          note: analysis.knowledge_risk_analysis.explanation,
          tone: "accent",
          toneLabel: "Ownership"
        },
        {
          label: "Critical permissions",
          value: `${analysis.knowledge_risk_analysis.critical_permissions_index.toFixed(1)}%`,
          note: `${analysis.multi_source_join.iam_permissions} active permissions were joined from IAM data.`,
          tone: "warn",
          toneLabel: "Access"
        },
        {
          label: "Insider index",
          value: analysis.insider_threat_analysis.index.toFixed(1),
          note: `Severity classified as ${analysis.insider_threat_analysis.severity}.`,
          tone: toneFromScore(analysis.insider_threat_analysis.index),
          toneLabel: analysis.insider_threat_analysis.severity
        },
        {
          label: "30-day continuity risk",
          value: simulation.business_continuity_risk_score.toFixed(1),
          note: `${simulation.deployment_velocity_impact_percent.toFixed(0)}% velocity impact and ${simulation.incident_response_delay_hours.toFixed(0)}h incident delay.`,
          tone: "teal",
          toneLabel: "Simulation"
        },
      ],
      drivers: [
        {
          title: "Knowledge-risk formula",
          note: analysis.knowledge_risk_analysis.explanation,
          source: analysis.knowledge_risk_analysis.explanation,
          badge: "FORMULA",
          tone: severityTone
        },
        {
          title: "Multi-source join coverage",
          note: `${analysis.multi_source_join.github_repositories} repos, ${analysis.multi_source_join.jira_tickets} tickets, ${analysis.multi_source_join.iam_permissions} IAM exposures, ${analysis.multi_source_join.critical_systems_affected.length} critical systems.`,
          source: `Join time ${analysis.multi_source_join.join_execution_ms}ms`,
          badge: "JOINED",
          tone: "teal"
        },
        {
          title: "Critical systems at risk",
          note: criticalSystems.length ? criticalSystems.join(", ") : "No critical systems returned from the join.",
          source: "Coral scenario scan",
          badge: "SYSTEMS",
          tone: "warn"
        }
      ],
      signals: relatedSignals.slice(0, 4).map((indicator) => ({
        title: indicator.type,
        note: `Weight ${indicator.weight.toFixed(1)} · score ${indicator.scored_value.toFixed(2)} · severity ${indicator.severity}`,
        source: `Score ${indicator.scored_value.toFixed(2)}`,
        badge: indicator.severity.toUpperCase(),
        tone: indicator.severity === "Critical" ? "accent" : indicator.severity === "High" ? "warn" : "teal"
      })),
      successors: successorCandidates.slice(0, 3).map((candidate) => ({
        title: `${candidate.rank}. ${candidate.candidate_name}`,
        note: `${candidate.department} · ${candidate.skill_overlap_percentage}% skill overlap · ${candidate.readiness_score.toFixed(0)} readiness`,
        source: `Confidence ${candidate.coral_match_confidence.toFixed(0)}%`,
        badge: candidate.readiness_score >= 75 ? "READY" : candidate.readiness_score >= 55 ? "PARTIAL" : "LOW",
        tone: toneFromScore(candidate.readiness_score)
      })),
      narrative: `${employee.legal_name} combines ${analysis.knowledge_risk_analysis.code_ownership_concentration.toFixed(1)}% code ownership, ${analysis.knowledge_risk_analysis.critical_permissions_index.toFixed(1)}% permission exposure, and a ${analysis.insider_threat_analysis.severity} insider profile. ${topSuccessor ? `${topSuccessor.candidate_name} is the best immediate successor candidate at ${topSuccessor.readiness_score.toFixed(0)}% readiness.` : "No successor candidate currently leads the ranking."}`
    };

    return {
      name: employee.legal_name,
      role: employee.role,
      summary: `${employee.legal_name} has been onboarded and analyzed. Knowledge risk is ${knowledgeRisk.toFixed(1)}, insider threat severity is ${analysis.insider_threat_analysis.severity}, and the initial 30-day scenario projects ${simulation.business_continuity_risk_score.toFixed(1)} business continuity risk.`,
      stats: {
        toolCount: 6 + relatedSignals.length,
        joinCount: analysis.multi_source_join.github_repositories + analysis.multi_source_join.jira_tickets + analysis.multi_source_join.iam_permissions,
        evidenceCount: relatedSignals.length + analysis.recent_scenario_simulations.length + criticalSystems.length,
        agentCount: 4
      },
      impactScenarios: {
        immediate: [
          { label: "Deploy velocity", pct: Math.round(simulation.deployment_velocity_impact_percent), tone: severityTone },
          { label: "Incident response", pct: Math.min(100, Math.round(simulation.incident_response_delay_hours * 10)), tone: "warn" },
          { label: "Sprint throughput", pct: Math.max(10, Math.round(100 - knowledgeRisk)), tone: "teal" },
          { label: "Review coverage", pct: Math.max(10, Math.round(100 - analysis.knowledge_risk_analysis.code_ownership_concentration)), tone: "warn" },
          { label: "On-call coverage", pct: Math.max(10, Math.round(100 - analysis.knowledge_risk_analysis.critical_permissions_index)), tone: "accent" }
        ],
        "30day": [
          { label: "Deploy velocity", pct: Math.max(10, Math.round(simulation.deployment_velocity_impact_percent * 0.7)), tone: "warn" },
          { label: "Incident response", pct: Math.max(10, Math.round(simulation.incident_response_delay_hours * 7)), tone: "warn" },
          { label: "Sprint throughput", pct: Math.max(10, Math.round(100 - knowledgeRisk * 0.7)), tone: "teal" },
          { label: "Review coverage", pct: Math.max(10, Math.round(100 - analysis.knowledge_risk_analysis.documentation_gap_score)), tone: "warn" },
          { label: "On-call coverage", pct: Math.max(10, Math.round(100 - analysis.knowledge_risk_analysis.bus_factor * 10)), tone: "accent" }
        ],
        fullkt: [
          { label: "Deploy velocity", pct: Math.max(10, Math.round(simulation.deployment_velocity_impact_percent * 0.25)), tone: "teal" },
          { label: "Incident response", pct: Math.max(10, Math.round(simulation.incident_response_delay_hours * 2)), tone: "teal" },
          { label: "Sprint throughput", pct: Math.max(10, Math.round(100 - knowledgeRisk * 0.35)), tone: "teal" },
          { label: "Review coverage", pct: Math.max(10, Math.round(100 - analysis.knowledge_risk_analysis.documentation_gap_score * 0.5)), tone: "teal" },
          { label: "On-call coverage", pct: Math.max(10, Math.round(100 - analysis.knowledge_risk_analysis.critical_permissions_index * 0.4)), tone: "teal" }
        ],
        teamloss: [
          { label: "Deploy velocity", pct: 95, tone: "accent" },
          { label: "Incident response", pct: 92, tone: "accent" },
          { label: "Sprint throughput", pct: 90, tone: "accent" },
          { label: "Review coverage", pct: 98, tone: "accent" },
          { label: "On-call coverage", pct: 94, tone: "accent" }
        ]
      },
      risks: [
        {
          name: employee.legal_name,
          role: employee.role,
          score: Math.round(knowledgeRisk),
          tone: severityTone,
          initials: initialsForName(employee.legal_name),
          target: true
        },
        ...successorCandidates.slice(0, 4).map((candidate) => ({
          name: candidate.candidate_name,
          role: candidate.department,
          score: Math.max(10, 100 - Math.round(candidate.readiness_score)),
          tone: toneFromScore(100 - candidate.readiness_score),
          initials: initialsForName(candidate.candidate_name)
        }))
      ],
      successors: successorCandidates.map((candidate) => ({
        rank: candidate.rank,
        name: candidate.candidate_name,
        dept: candidate.department,
        overlap: `${candidate.skill_overlap_percentage}%`,
        readiness: candidate.readiness_score >= 75 ? "Ready" : candidate.readiness_score >= 55 ? "Partial" : "Low",
        tone: toneFromScore(candidate.readiness_score),
        initials: initialsForName(candidate.candidate_name)
      })),
      evidence: [
        {
          score: `${Math.round(knowledgeRisk)}`,
          title: `${employee.legal_name} initial knowledge-risk score recorded`,
          source: "Employee intake analysis",
          tag: "risk"
        },
        {
          score: `${analysis.insider_threat_analysis.index.toFixed(0)}`,
          title: `Insider threat severity classified as ${analysis.insider_threat_analysis.severity}`,
          source: "Coral threat analysis",
          tag: "signal"
        },
        {
          score: `${simulation.business_continuity_risk_score.toFixed(0)}`,
          title: `30-day continuity risk projected at ${simulation.business_continuity_risk_score.toFixed(1)}`,
          source: "Scenario simulation",
          tag: "plan"
        }
      ],
      activity: [
        ...(analysis.multi_source_join.join_trace || []).slice(0, 4).map((entry, index) => ({
          tool: `analysis_step_${index + 1}`,
          meta: entry,
          status: "joined"
        })),
        {
          tool: "run_continuity_simulation",
          meta: simulation.explanation,
          status: "modeled"
        }
      ],
      detail,
      message: `${employee.legal_name} created successfully. Initial knowledge risk is ${knowledgeRisk.toFixed(1)} and the 30-day simulation estimates ${simulation.business_continuity_risk_score.toFixed(1)} business continuity risk.`,
    };
  };

  const renderRiskDetail = (profile) => {
    if (!profile) return;
    const detail = profile.detail || deriveStaticRiskDetail(profile);

    renderMetricCards(detail.metrics || [], riskMetricsList);
    renderDetailRows(detail.drivers || [], riskDriversList);
    renderDetailRows(detail.signals || [], riskSignalsList);
    renderDetailRows(detail.successors || [], riskSuccessorsList);

    if (riskNarrativeEl) {
      riskNarrativeEl.textContent = detail.narrative || profile.summary || profile.message || "No risk narrative available.";
    }
  };

  const renderEmployeeAnalysis = (response) => {
    if (!employeeAnalysisOutput || !response) return;

    const { employee, intelligence_profile: analysis, scenario_simulation: simulation } = response;
    const knowledgeTone = toneFromScore(analysis.knowledge_risk_analysis.score);
    const visualProfile = buildDynamicProfile(employee, analysis, simulation);
    const indicators = analysis.insider_threat_analysis.risk_indicators || [];
    const successors = analysis.successor_candidates || [];
    const joinTrace = analysis.multi_source_join.join_trace || [];
    const criticalSystems = analysis.multi_source_join.critical_systems_affected || [];
    const topSuccessor = successors[0];
    const scoreBars = [
      {
        label: "Knowledge risk",
        value: clampPercent(analysis.knowledge_risk_analysis.score),
        tone: knowledgeTone,
        note: `Bus factor ${analysis.knowledge_risk_analysis.bus_factor.toFixed(1)}`
      },
      {
        label: "Insider threat",
        value: clampPercent(analysis.insider_threat_analysis.index),
        tone: toneFromScore(analysis.insider_threat_analysis.index),
        note: analysis.insider_threat_analysis.severity
      },
      {
        label: "Scenario risk",
        value: clampPercent(simulation.business_continuity_risk_score),
        tone: "teal",
        note: "30-day continuity"
      },
      {
        label: "Code ownership",
        value: clampPercent(analysis.knowledge_risk_analysis.code_ownership_concentration),
        tone: "accent",
        note: `${analysis.knowledge_risk_analysis.code_ownership_concentration.toFixed(1)}% ownership`
      },
      {
        label: "Documentation gap",
        value: clampPercent(analysis.knowledge_risk_analysis.documentation_gap_score),
        tone: "warn",
        note: `${analysis.knowledge_risk_analysis.documentation_gap_score.toFixed(1)}% gap`
      }
    ];

    employeeAnalysisOutput.classList.remove("is-empty");
    employeeAnalysisOutput.innerHTML = `
      <div class="analysis-output-grid">
        <div class="analysis-summary-grid">
          <div class="analysis-summary-card">
            <h4>Created employee</h4>
            <strong>${employee.legal_name}</strong>
            <p>${employee.role} - ${employee.department}</p>
            <p>ID: ${employee.id}</p>
          </div>
          <div class="analysis-summary-card">
            <h4>Knowledge risk</h4>
            <strong>${analysis.knowledge_risk_analysis.score.toFixed(1)}</strong>
            <p>Bus factor ${analysis.knowledge_risk_analysis.bus_factor.toFixed(1)}</p>
            <p>Docs gap ${analysis.knowledge_risk_analysis.documentation_gap_score.toFixed(1)}%</p>
          </div>
          <div class="analysis-summary-card">
            <h4>Insider threat</h4>
            <strong>${analysis.insider_threat_analysis.severity}</strong>
            <p>Index ${analysis.insider_threat_analysis.index.toFixed(1)}</p>
            <p>${analysis.insider_threat_analysis.explanation}</p>
          </div>
          <div class="analysis-summary-card">
            <h4>Scenario</h4>
            <strong>${simulation.business_continuity_risk_score.toFixed(1)}</strong>
            <p>30-day continuity risk</p>
            <p>${simulation.explanation}</p>
          </div>
          <div class="analysis-summary-card">
            <h4>Join coverage</h4>
            <strong>${analysis.multi_source_join.join_execution_ms}ms</strong>
            <p>${analysis.multi_source_join.github_repositories} repos · ${analysis.multi_source_join.jira_tickets} tickets · ${analysis.multi_source_join.iam_permissions} permissions</p>
            <p>${criticalSystems.length} critical systems affected</p>
          </div>
        </div>
        <div class="analysis-summary-card analysis-impact-card">
          <h4>Risk score bars</h4>
          <p>Higher bars mean more exposure in the intake analysis.</p>
          <div class="impact-bars">
            ${scoreBars
              .map(
                (item) => `
                  <div class="analysis-impact-item">
                    <div class="impact-row analysis-impact-row">
                      <div class="impact-label">${item.label}</div>
                      <div class="impact-track">
                        <div class="impact-fill" style="background:${tones[item.tone]};width:${item.value}%"></div>
                      </div>
                      <div class="impact-pct" style="color:${tones[item.tone]}">${item.value.toFixed(0)}%</div>
                    </div>
                    <div class="analysis-impact-note">${item.note}</div>
                  </div>
                `
              )
              .join("")}
          </div>
        </div>
        <div class="risk-detail-grid">
          <div class="risk-detail-card">
            <div class="risk-detail-title">Risk composition</div>
            <div class="risk-detail-metrics">
              <div class="risk-metric">
                <div class="risk-metric-head">
                  <div class="risk-metric-label">Knowledge risk</div>
                  <span class="detail-pill" style="color:${tones[toneFromScore(analysis.knowledge_risk_analysis.score)]};border-color:${tones[toneFromScore(analysis.knowledge_risk_analysis.score)]}">${analysis.knowledge_risk_analysis.score >= 80 ? "Critical" : analysis.knowledge_risk_analysis.score >= 55 ? "High" : "Moderate"}</span>
                </div>
                <div class="risk-metric-value" style="color:${tones[toneFromScore(analysis.knowledge_risk_analysis.score)]}">${analysis.knowledge_risk_analysis.score.toFixed(1)}</div>
                <div class="risk-metric-note">Bus factor ${analysis.knowledge_risk_analysis.bus_factor.toFixed(1)} · code ownership ${analysis.knowledge_risk_analysis.code_ownership_concentration.toFixed(1)}% · docs gap ${analysis.knowledge_risk_analysis.documentation_gap_score.toFixed(1)}%</div>
              </div>
              <div class="risk-metric">
                <div class="risk-metric-head">
                  <div class="risk-metric-label">Insider threat</div>
                  <span class="detail-pill" style="color:${tones[toneFromScore(analysis.insider_threat_analysis.index)]};border-color:${tones[toneFromScore(analysis.insider_threat_analysis.index)]}">${analysis.insider_threat_analysis.severity}</span>
                </div>
                <div class="risk-metric-value" style="color:${tones[toneFromScore(analysis.insider_threat_analysis.index)]}">${analysis.insider_threat_analysis.index.toFixed(1)}</div>
                <div class="risk-metric-note">${analysis.insider_threat_analysis.explanation}</div>
              </div>
              <div class="risk-metric">
                <div class="risk-metric-head">
                  <div class="risk-metric-label">Scenario pressure</div>
                  <span class="detail-pill" style="color:${tones.teal};border-color:${tones.teal}">30 DAYS</span>
                </div>
                <div class="risk-metric-value" style="color:${tones.teal}">${simulation.business_continuity_risk_score.toFixed(1)}</div>
                <div class="risk-metric-note">${simulation.deployment_velocity_impact_percent.toFixed(0)}% velocity impact · ${simulation.incident_response_delay_hours.toFixed(0)}h incident delay</div>
              </div>
            </div>
          </div>
          <div class="risk-detail-card">
            <div class="risk-detail-title">Primary drivers</div>
            <div class="detail-list">
              <div class="detail-row">
                <div class="detail-head">
                  <div class="detail-title">Formula breakdown</div>
                    <span class="detail-pill" style="color:${tones[knowledgeTone]};border-color:${tones[knowledgeTone]}">FORMULA</span>
                </div>
                <div class="detail-note">${analysis.knowledge_risk_analysis.explanation}</div>
                <div class="detail-source">Weighted score generated from Coral analysis</div>
              </div>
              <div class="detail-row">
                <div class="detail-head">
                  <div class="detail-title">Critical systems</div>
                  <span class="detail-pill" style="color:${tones.warn};border-color:${tones.warn}">${criticalSystems.length}</span>
                </div>
                <div class="detail-note">${criticalSystems.length ? criticalSystems.join(", ") : "No critical systems returned from the join."}</div>
                <div class="detail-source">Derived from the multi-source join</div>
              </div>
              <div class="detail-row">
                <div class="detail-head">
                  <div class="detail-title">Join trace</div>
                  <span class="detail-pill" style="color:${tones.gold};border-color:${tones.gold}">${joinTrace.length}</span>
                </div>
                <div class="detail-note">${joinTrace.slice(0, 3).join(" · ") || "No trace entries available."}</div>
                <div class="detail-source">First three join steps</div>
              </div>
            </div>
          </div>
          <div class="risk-detail-card">
            <div class="risk-detail-title">Signal breakdown</div>
            <div class="detail-list">
              ${(indicators.length ? indicators : [{ type: "No active risk indicators", severity: "Low", scored_value: 0, weight: 0 }]).map((indicator) => `
                <div class="detail-row">
                  <div class="detail-head">
                    <div class="detail-title">${indicator.type}</div>
                    <span class="detail-pill" style="color:${indicator.severity === "Critical" ? tones.accent : indicator.severity === "High" ? tones.warn : tones.teal};border-color:${indicator.severity === "Critical" ? tones.accent : indicator.severity === "High" ? tones.warn : tones.teal}">${indicator.severity}</span>
                  </div>
                  <div class="detail-note">Weight ${indicator.weight?.toFixed?.(1) ?? "0.0"} · score ${indicator.scored_value?.toFixed?.(2) ?? "0.00"}</div>
                  <div class="detail-source">${indicator.incident_timestamp ? new Date(indicator.incident_timestamp).toLocaleString() : "No incident timestamp"}</div>
                </div>
              `).join("")}
            </div>
          </div>
          <div class="risk-detail-card">
            <div class="risk-detail-title">Successor readiness</div>
            <div class="detail-list">
              ${(successors.length ? successors : [{ candidate_name: "No candidate", department: "N/A", skill_overlap_percentage: 0, readiness_score: 0, coral_match_confidence: 0 }]).slice(0, 3).map((candidate, index) => `
                <div class="detail-row">
                  <div class="detail-head">
                    <div class="detail-title">${index + 1}. ${candidate.candidate_name}</div>
                    <span class="detail-pill" style="color:${tones[toneFromScore(candidate.readiness_score)]};border-color:${tones[toneFromScore(candidate.readiness_score)]}">${candidate.readiness_score >= 75 ? "READY" : candidate.readiness_score >= 55 ? "PARTIAL" : "LOW"}</span>
                  </div>
                  <div class="detail-note">${candidate.department} · ${candidate.skill_overlap_percentage}% skill overlap · ${candidate.readiness_score.toFixed(0)} readiness</div>
                  <div class="detail-source">Confidence ${candidate.coral_match_confidence.toFixed(0)}%${index === 0 && topSuccessor ? " · top-ranked" : ""}</div>
                </div>
              `).join("")}
            </div>
          </div>
          <div class="risk-detail-card risk-narrative-card">
            <div class="risk-detail-title">Analyst note</div>
            <p class="risk-narrative">${employee.legal_name} is ${analysis.insider_threat_analysis.severity.toLowerCase()} on insider risk, with the strongest pressure coming from code ownership, IAM exposure, and documentation gaps. The current continuity plan should focus on the top successor and the highest-risk systems first.</p>
          </div>
        </div>
        <div class="analysis-summary-card">
          <h4>Transfer actions</h4>
          <ul class="analysis-summary-list">
            ${(simulation.mitigation_actions || []).map((action) => `<li>${action}</li>`).join("") || "<li>No mitigation actions returned.</li>"}
          </ul>
        </div>
        <details class="analysis-summary-card">
          <summary>View full analysis payload</summary>
          <pre class="analysis-json">${JSON.stringify(response, null, 2)}</pre>
        </details>
      </div>
    `;

    return visualProfile;
  };

  const updateStats = (stats) => {
    if (!stats) return;
    if (toolCountEl) toolCountEl.textContent = stats.toolCount;
    if (joinCountEl) joinCountEl.textContent = stats.joinCount;
    if (evidenceCountEl) evidenceCountEl.textContent = stats.evidenceCount;
    if (agentCountEl) agentCountEl.textContent = stats.agentCount;
  };

  const setActiveImpactTab = (key) => {
    activeImpactKey = key;
    impactTabs.forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.impactTab === key);
    });
    renderImpact(currentProfile, key);
  };

  const renderProfile = (profile) => {
    if (!profile) return;
    currentProfile = profile;
    if (employeeNameEl) employeeNameEl.textContent = profile.name;
    if (employeeSummaryEl) employeeSummaryEl.textContent = profile.message;
    if (employeeBadgeEl) employeeBadgeEl.textContent = profile.name;
    if (queryTextEl)
      queryTextEl.innerHTML = `"What happens if <span class=\"query-highlight\">${profile.name}</span> leaves in 30 days?"`;

    renderRiskList(profile.risks);
    renderSuccessorList(profile.successors);
    renderActivityLog(profile.activity);
    renderEvidence(profile.evidence);
    renderRiskDetail(profile);
    renderDependencyGraph(profile);
    updateStats(profile.stats);
    setActiveImpactTab(activeImpactKey);
  };

  if (impactTabs.length) {
    impactTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        setActiveImpactTab(tab.dataset.impactTab);
      });
    });
  }

  // Employee search functionality
  const employeeSearch = document.querySelector("#employee-search");
  const employeeSearchResults = document.querySelector("#employee-search-results");
  
  const employeeDirectory = [
    { name: "Sarah Johnson", role: "Principal Engineer", display: "Sarah Johnson - Principal Engineer" },
    { name: "Marcus Chen", role: "Staff SRE", display: "Marcus Chen - Staff SRE" },
    { name: "Priya Nair", role: "Lead Architect", display: "Priya Nair - Lead Architect" },
    { name: "Alex Chen", role: "Lead DevOps", display: "Alex Chen - Lead DevOps" },
    { name: "Emma Thompson", role: "Senior Backend Engineer", display: "Emma Thompson - Senior Backend Eng" },
  ];

  const getEmployeeDirectory = () => [...employeeDirectory, ...dynamicEmployeeDirectory];

  if (employeeSearch) {
    employeeSearch.addEventListener("input", (e) => {
      const searchTerm = e.target.value.toLowerCase().trim();
      
      if (searchTerm.length === 0) {
        employeeSearchResults.style.display = "none";
        return;
      }

      const filtered = getEmployeeDirectory().filter(emp => 
        emp.name.toLowerCase().includes(searchTerm) ||
        emp.role.toLowerCase().includes(searchTerm)
      );

      if (filtered.length === 0) {
        employeeSearchResults.innerHTML = '<div class="employee-search-result" style="color: var(--muted);">No employees found</div>';
        employeeSearchResults.style.display = "block";
        return;
      }

      employeeSearchResults.innerHTML = filtered.map(emp => 
        `<div class="employee-search-result" data-employee="${emp.name}">
          <div class="employee-search-result-name">${emp.name}</div>
          <div class="employee-search-result-role">${emp.role}</div>
        </div>`
      ).join("");

      employeeSearchResults.style.display = "block";

      // Add click handlers to search results
      employeeSearchResults.querySelectorAll(".employee-search-result").forEach(result => {
        result.addEventListener("click", () => {
          const selectedEmployee = result.dataset.employee;
          employeeSelect.value = selectedEmployee;
          employeeSearch.value = "";
          employeeSearchResults.style.display = "none";
          const profile = profiles[selectedEmployee];
          renderProfile(profile);
        });
      });
    });

    // Close search results when clicking outside
    document.addEventListener("click", (e) => {
      if (!employeeSearch.contains(e.target) && !employeeSearchResults.contains(e.target)) {
        employeeSearchResults.style.display = "none";
      }
    });
  }

  if (employeeSelect) {
    employeeSelect.addEventListener("change", () => {
      const profile = profiles[employeeSelect.value];
      employeeSearch.value = "";
      employeeSearchResults.style.display = "none";
      renderProfile(profile);
    });
    renderProfile(profiles[employeeSelect.value] || profiles["Sarah Johnson"]);
  } else {
    renderProfile(profiles["Sarah Johnson"]);
  }

  if (employeeIntakeForm) {
    employeeIntakeForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const payload = {
        id: employeeIdInput?.value.trim() || undefined,
        legal_name: employeeLegalNameInput?.value.trim(),
        email: employeeEmailInput?.value.trim(),
        role: employeeRoleInput?.value.trim(),
        department: employeeDepartmentInput?.value.trim(),
        tenure_months: Number.parseInt(employeeTenureMonthsInput?.value || "0", 10),
        skills: parseCsvField(employeeSkillsInput?.value || ""),
        certifications: parseCsvField(employeeCertificationsInput?.value || ""),
        risk_score: Number.parseFloat(employeeRiskScoreInput?.value || "0"),
        opportunity_score: Number.parseFloat(employeeOpportunityScoreInput?.value || "0"),
        performance_rating: Number.parseFloat(employeePerformanceRatingInput?.value || "0"),
        manager_id: employeeManagerIdInput?.value.trim() || null,
        account_status: employeeAccountStatusInput?.value || "ACTIVE",
        bus_factor_impact: Number.parseFloat(employeeBusFactorImpactInput?.value || "0"),
        knowledge_concentration_index: Number.parseFloat(employeeKnowledgeConcentrationInput?.value || "0"),
        code_ownership_percentage: Number.parseFloat(employeeCodeOwnershipInput?.value || "0"),
        documentation_gap_score: Number.parseFloat(employeeDocumentationGapInput?.value || "0"),
        critical_system_access_count: Number.parseInt(employeeCriticalSystemAccessCountInput?.value || "0", 10),
        last_high_risk_incident: toOptionalIso(employeeLastHighRiskIncidentInput?.value || ""),
        last_activity_timestamp: toOptionalIso(employeeLastActivityTimestampInput?.value || "")
      };

      if (employeeAnalysisOutput) {
        employeeAnalysisOutput.classList.remove("is-empty");
        employeeAnalysisOutput.textContent = "Creating employee and running analysis...";
      }

      try {
        const response = await fetch(`${API_BASE}/api/v1/employees`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data?.message || "Failed to create employee");
        }

        const dynamicProfile = renderEmployeeAnalysis(data) || buildDynamicProfile(data.employee, data.intelligence_profile, data.scenario_simulation);
        profiles[data.employee.legal_name] = dynamicProfile;

        const directoryEntry = {
          name: data.employee.legal_name,
          role: data.employee.role,
          display: `${data.employee.legal_name} - ${data.employee.role}`
        };
        dynamicEmployeeDirectory.unshift(directoryEntry);

        if (employeeSelect) {
          const existingOption = Array.from(employeeSelect.options).find((option) => option.value === data.employee.legal_name);
          if (!existingOption) {
            employeeSelect.add(new Option(directoryEntry.display, directoryEntry.name), 0);
          }
          employeeSelect.value = data.employee.legal_name;
        }

        if (employeeSearch) {
          employeeSearch.value = "";
          employeeSearchResults.style.display = "none";
        }

        renderProfile(dynamicProfile);
      } catch (error) {
        if (employeeAnalysisOutput) {
          employeeAnalysisOutput.classList.add("is-empty");
          employeeAnalysisOutput.innerHTML = `<strong>Creation failed</strong><p>${error instanceof Error ? error.message : "Unable to create employee"}</p>`;
        }
      }
    });
  }

  const heatmaps = document.querySelectorAll("[data-heatmap]");
  if (heatmaps.length) {
    const areas = [
      ["API Core", 95],
      ["Auth", 88],
      ["DB Layer", 42],
      ["CI/CD", 67],
      ["Payments", 91],
      ["K8s Ops", 74],
      ["Data Pipe", 55],
      ["Monitoring", 38],
      ["Mobile", 29],
      ["Search", 81],
      ["ML Infra", 88],
      ["IAM", 70],
      ["Gateway", 93],
      ["Cache", 45],
      ["Queue", 60],
      ["CDN", 22],
    ];

    const hexToRgb = (hex) => {
      const clean = hex.replace("#", "");
      return {
        r: parseInt(clean.slice(0, 2), 16),
        g: parseInt(clean.slice(2, 4), 16),
        b: parseInt(clean.slice(4, 6), 16),
      };
    };

    const mix = (a, b, t) => ({
      r: Math.round(a.r + (b.r - a.r) * t),
      g: Math.round(a.g + (b.g - a.g) * t),
      b: Math.round(a.b + (b.b - a.b) * t),
    });

    const start = hexToRgb("#27d6b3");
    const end = hexToRgb("#ff5c7a");

    const scoreLevel = (score) => {
      if (score >= 85) return "critical";
      if (score >= 70) return "high";
      if (score >= 45) return "medium";
      return "low";
    };

    const heatmapMarkup = areas
      .map(([label, score]) => {
        const t = Math.min(Math.max(score / 100, 0), 1);
        const color = mix(start, end, t);
        const background = `rgba(${color.r}, ${color.g}, ${color.b}, ${0.22 + t * 0.28})`;
        return `
          <div class="heat-cell heat-level-${scoreLevel(score)}" style="background:${background}" title="${label}: ${score}">
            <div class="heat-cell-top">
              <span>${label}</span>
              <strong>${score}</strong>
            </div>
            <div class="heat-cell-bar"><span style="width:${score}%"></span></div>
          </div>
        `;
      })
      .join("");
    heatmaps.forEach((heatmap) => {
      heatmap.innerHTML = heatmapMarkup;
    });
  }

  const lastSyncEl = document.querySelector("[data-last-sync]");
  if (lastSyncEl) {
    const syncStart = Date.now() - 120000;
    const updateSync = () => {
      const delta = Math.max(0, Date.now() - syncStart);
      const minutes = Math.max(1, Math.round(delta / 60000));
      lastSyncEl.textContent = `${minutes}m ago`;
    };
    updateSync();
    setInterval(updateSync, 30000);
  }
})();
