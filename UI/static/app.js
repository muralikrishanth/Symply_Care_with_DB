function initSliders() {
  const sevSlider = document.getElementById("severity-slider");
  const energySlider = document.getElementById("energy-slider");

  // Remove old listeners by cloning the elements
  const newSevSlider = sevSlider.cloneNode(true);
  const newEnergySlider = energySlider.cloneNode(true);
  sevSlider.parentNode.replaceChild(newSevSlider, sevSlider);
  energySlider.parentNode.replaceChild(newEnergySlider, energySlider);

  // Attach fresh listeners
  newSevSlider.addEventListener("input", () => {
    const val = newSevSlider.value;
    document.getElementById("severity-val").textContent = val;
    document.getElementById("lbl-severity").innerHTML =
      `${t().severity}: <span id="severity-label">${val}</span>/10`;
  });

  newEnergySlider.addEventListener("input", () => {
    const val = newEnergySlider.value;
    document.getElementById("energy-val").textContent = val;
    document.getElementById("lbl-energy").innerHTML =
      `${t().energy}: <span id="energy-label">${val}</span>/10`;
  });
}
// ─── Language panel ───────────────────────────────────────
function toggleLangPanel() {
  const panel = document.getElementById("lang-panel");
  const note = document.getElementById("translation-note");
  const isVisible = panel.style.display === "flex";
  panel.style.display = isVisible ? "none" : "flex";
  note.style.display = isVisible ? "none" : "block";
  // Highlight active language
  const current = getLang();
  document.querySelectorAll(".lang-opt").forEach(el => {
    el.style.background = "";
    el.style.color = "";
    el.style.border = "1px solid var(--border)";
  });
  const activeEl = document.getElementById("lang-" + current);
  if (activeEl) {
    activeEl.style.background = "var(--primary-light)";
    activeEl.style.color = "var(--primary)";
    activeEl.style.border = "1px solid var(--primary)";
  }
}

function closeLangPanel() {
  document.getElementById("lang-panel").style.display = "none";
  document.getElementById("translation-note").style.display = "none";
}
// ─── Date setup ───────────────────────────────────────────
const todayStr = new Date().toISOString().split("T")[0];
document.getElementById("today-date").textContent = new Date().toLocaleDateString("en-GB", {
  weekday: "short", day: "numeric", month: "short"
});
document.getElementById("export-from").value = todayStr;
document.getElementById("export-to").value = todayStr;

// ─── Navigation ───────────────────────────────────────────
function showPage(name, btn) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".nav-btn").forEach(b => b.classList.remove("active"));
  document.getElementById("page-" + name).classList.add("active");
  btn.classList.add("active");

  if (name === "symptoms") loadSymptoms();
  if (name === "mood") loadMood();
  if (name === "medications") loadMedications();
  if (name === "export") loadStats();
}

// ─── Toast notification ───────────────────────────────────
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2500);
}

// ─── Initialize sliders on startup ───────────────────────
initSliders();

// ─── Mood selector ────────────────────────────────────────
let selectedMood = 3;
function selectMood(val) {
  selectedMood = val;
  document.querySelectorAll(".mood-opt").forEach(el => {
    el.classList.toggle("selected", parseInt(el.dataset.val) === val);
  });
}
selectMood(3);

// ════════════════════════════════════════════════════════════
// SYMPTOMS
// ════════════════════════════════════════════════════════════
async function saveSymptom() {
  const name = document.getElementById("symptom-name").value.trim();
  if (!name) { showToast(t().toastEnterSymptom); return; }

  const severityValue = document.getElementById("severity-slider").value;

  const payload = {
    symptom: name,
    severity: parseInt(severityValue),
    notes: document.getElementById("symptom-notes").value.trim(),
    date: todayStr
  };

  const res = await fetch("/api/symptoms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    showToast(t().toastSymptomSaved);
    document.getElementById("symptom-name").value = "";
    document.getElementById("symptom-notes").value = "";
    document.getElementById("severity-slider").value = 5;
    document.getElementById("severity-val").textContent = "5";
    document.getElementById("lbl-severity").innerHTML =
      `${t().severity}: <span id="severity-label">5</span>/10`;
    loadSymptoms();
  } else {
    showToast(t().toastError);
  }
}

async function loadSymptoms() {
  const res = await fetch("/api/symptoms");
  const data = await res.json();
  const container = document.getElementById("symptoms-list");
  const lang = t();

  if (data.length === 0) {
    container.innerHTML = `<p class="no-data">${lang.noSymptoms}</p>`;
    return;
  }

  container.innerHTML = data.slice(0, 10).map(s => {
    const sev = s.severity;
    const cls = sev <= 3 ? "sev-low" : sev <= 6 ? "sev-mid" : "sev-high";
    const label = sev <= 3 ? lang.sevMild : sev <= 6 ? lang.sevModerate : lang.sevSevere;
    return `
      <div class="entry-item">
        <div class="entry-info">
          <h3>${s.symptom}</h3>
          <p>${s.date}${s.notes ? " · " + s.notes : ""}</p>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <span class="severity-badge ${cls}">${sev}/10 ${label}</span>
          <button class="btn btn-danger"
            onclick="deleteSymptom(${s.id})">✕</button>
        </div>
      </div>`;
  }).join("");
}

async function deleteSymptom(id) {
  await fetch("/api/symptoms/" + id, { method: "DELETE" });
  showToast(t().toastSymptomRemoved);
  loadSymptoms();
}

// ════════════════════════════════════════════════════════════
// MOOD & ENERGY
// ════════════════════════════════════════════════════════════
async function saveMood() {
  const energyValue = document.getElementById("energy-slider").value;

  const payload = {
    mood: selectedMood,
    energy: parseInt(energyValue),
    notes: document.getElementById("mood-notes").value.trim(),
    date: todayStr
  };

  const res = await fetch("/api/mood", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    showToast(t().toastCheckinSaved);
    document.getElementById("mood-notes").value = "";
    document.getElementById("energy-slider").value = 5;
    document.getElementById("energy-val").textContent = "5";
    document.getElementById("lbl-energy").innerHTML =
      `${t().energy}: <span id="energy-label">5</span>/10`;
    loadMood();
  } else {
    showToast(t().toastError);
  }
}

async function loadMood() {
  const res = await fetch("/api/mood");
  const data = await res.json();
  const container = document.getElementById("mood-list");
  const lang = t();

  if (data.length === 0) {
    container.innerHTML = `<p class="no-data">${lang.noCheckins}</p>`;
    return;
  }

  container.innerHTML = data.slice(0, 10).map(m => `
    <div class="entry-item">
      <div class="entry-info">
        <h3>${lang.moodEmojis[m.mood]} ${lang.moodLabels[m.mood]}</h3>
        <p>${m.date} · ${lang.energy} ${m.energy}/10
          ${m.notes ? " · " + m.notes : ""}
        </p>
      </div>
      <button class="btn btn-danger"
        onclick="deleteMood(${m.id})">✕</button>
    </div>`
  ).join("");
}

async function deleteMood(id) {
  await fetch("/api/mood/" + id, { method: "DELETE" });
  showToast(t().toastMoodRemoved);
  loadMood();
}

// ════════════════════════════════════════════════════════════
// MEDICATIONS
// ════════════════════════════════════════════════════════════
async function saveMedication() {
  const name = document.getElementById("med-name").value.trim();
  if (!name) { showToast(t().toastEnterMed); return; }

  // Save neutral keys — never save translated text to database
  const doseInput = document.getElementById("med-dose").value.trim();
  const freqIndex = document.getElementById("med-frequency").selectedIndex;

  const payload = {
    name: name,
    dose: doseInput || "NOT_SPECIFIED",
    frequency: String(freqIndex),  // Save index 0-4, not translated text
    start_date: todayStr
  };

  const res = await fetch("/api/medications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (res.ok) {
    showToast(t().toastMedSaved);
    document.getElementById("med-name").value = "";
    document.getElementById("med-dose").value = "";
    document.getElementById("med-frequency").selectedIndex = 0;
    loadMedications();
  } else {
    showToast(t().toastError);
  }
}

async function loadMedications() {
  const res = await fetch("/api/medications");
  const data = await res.json();
  const container = document.getElementById("medications-list");
  const lang = t();

  if (data.length === 0) {
    container.innerHTML = `<p class="no-data">${lang.noMeds}</p>`;
    return;
  }

  container.innerHTML = data.map(m => {
    // Translate dose
    const dose = m.dose === "NOT_SPECIFIED"
      ? lang.notSpecified
      : m.dose;

    // Translate frequency — stored as index "0"-"4"
    const freqIndex = parseInt(m.frequency);
    const freq = !isNaN(freqIndex) && lang.freqOptions[freqIndex]
      ? lang.freqOptions[freqIndex]
      : m.frequency;  // fallback to raw value for old entries

    return `
      <div class="entry-item">
        <div class="entry-info">
          <h3>${m.name}</h3>
          <p>${dose} · ${freq} · ${lang.since} ${m.start_date}</p>
        </div>
        <button class="btn btn-danger"
          onclick="deleteMedication(${m.id})">${lang.stopMed}</button>
      </div>`;
  }).join("");
}

async function deleteMedication(id) {
  await fetch("/api/medications/" + id, { method: "DELETE" });
  showToast(t().toastMedRemoved);
  loadMedications();
}

async function deleteMedication(id) {
  await fetch("/api/medications/" + id, { method: "DELETE" });
  showToast("Medication removed");
  loadMedications();
}

// ════════════════════════════════════════════════════════════
// INTERACTION CHECKER
// ════════════════════════════════════════════════════════════
async function checkInteractions() {
  const res = await fetch("/api/medications");
  const meds = await res.json();
  const container = document.getElementById("interaction-results");

  if (meds.length < 2) {
    container.innerHTML = `
      <div class="warning-box">
        <span>ℹ️</span>
        <span>Add at least 2 medications to check for interactions.</span>
      </div>`;
    return;
  }

  container.innerHTML = `
    <div style="font-size:13px;color:var(--text-muted);padding:8px 0;">
      ⏳ Checking NLM → OpenFDA → DailyMed... this may take a few seconds.
    </div>`;

  let checkRes, result;

  try {
    checkRes = await fetch(
      "/api/interactions?meds=" + meds.map(m => m.name).join(",")
    );

    if (!checkRes.ok) {
      container.innerHTML = `
        <div class="warning-box" style="background:#FCEBEB;border-color:#E24B4A;color:#A32D2D;">
          <span>🚨</span>
          <span>
            <strong>Could not reach any interaction database.</strong><br>
            Do NOT assume your medications are safe to combine.<br>
            Please consult your pharmacist or doctor directly.
          </span>
        </div>`;
      return;
    }

    result = await checkRes.json();

  } catch (e) {
    container.innerHTML = `
      <div class="warning-box" style="background:#FCEBEB;border-color:#E24B4A;color:#A32D2D;">
        <span>🚨</span>
        <span>
          <strong>Network error — all interaction checks failed.</strong><br>
          Do NOT assume your medications are safe to combine.<br>
          Please consult your pharmacist or doctor directly.
        </span>
      </div>`;
    return;
  }

  let html = "";

  result.results.forEach(r => {

    // ── Interaction found ────────────────────────────────
    if (r.status === "interaction_found") {
      const sevColor = r.severity === "HIGH"
        ? "background:#FCEBEB;border-color:#E24B4A;color:#A32D2D;"
        : "background:#FAEEDA;border-color:#EF9F27;color:#854F0B;";
      html += `
        <div class="warning-box" style="${sevColor}margin-bottom:8px;">
          <span>${r.severity === "HIGH" ? "🚨" : "⚠️"}</span>
          <div>
            <strong>${r.drug1} + ${r.drug2}</strong>
            ${r.severity !== "UNKNOWN"
              ? `<span style="font-size:11px;margin-left:6px;padding:2px 8px;
                  border-radius:99px;background:rgba(0,0,0,0.08);">
                  ${r.severity} severity</span>`
              : ""}
            <br>
            <span style="font-size:12px;">${r.message}</span>
            <br>
            <span style="font-size:11px;opacity:0.7;margin-top:4px;display:block;">
              Source: ${r.source} · Also checked: ${r.sources_tried?.join(", ")}
            </span>
          </div>
        </div>`;

    // ── Drug not found in database ───────────────────────
    } else if (r.status === "drug_not_found") {
      html += `
        <div class="warning-box" style="margin-bottom:8px;">
          <span>❓</span>
          <div>
            <strong>${r.drug1} + ${r.drug2}</strong><br>
            <span style="font-size:12px;">${r.message}</span><br>
            <span style="font-size:11px;opacity:0.7;">
              Try using the generic name (e.g. "acetaminophen" instead of "Panadol")
            </span>
          </div>
        </div>`;

    // ── No data found in any source ──────────────────────
    } else if (r.status === "no_data") {
      html += `
        <div class="warning-box" style="margin-bottom:8px;">
          <span>⚠️</span>
          <div>
            <strong>${r.drug1} + ${r.drug2}</strong><br>
            <span style="font-size:12px;">${r.message}</span>
          </div>
        </div>`;

    // ── All sources failed ───────────────────────────────
    } else if (r.status === "all_sources_failed") {
      html += `
        <div class="warning-box" style="background:#FCEBEB;border-color:#E24B4A;color:#A32D2D;margin-bottom:8px;">
          <span>🚨</span>
          <div>
            <strong>Check failed: ${r.drug1} + ${r.drug2}</strong><br>
            <span style="font-size:12px;">${r.message}</span>
          </div>
        </div>`;
    }
  });

  // Always show disclaimer — loud and clear, no exceptions
  html += `
    <div style="
      background: #E1F5EE;
      border: 1px solid #1D9E75;
      border-radius: 8px;
      padding: 10px 12px;
      font-size: 12px;
      color: #085041;
      margin-top: 8px;
      line-height: 1.6;
    ">
      ${result.disclaimer}
    </div>`;

  container.innerHTML = html;
}

// ════════════════════════════════════════════════════════════
// STATS & EXPORT
// ════════════════════════════════════════════════════════════
async function loadStats() {
  const [sympRes, moodRes, medRes] = await Promise.all([
    fetch("/api/symptoms"),
    fetch("/api/mood"),
    fetch("/api/medications")
  ]);

  const symptoms = await sympRes.json();
  const moods = await moodRes.json();
  const meds = await medRes.json();

  const avgSev = symptoms.length
    ? (symptoms.reduce((a, s) => a + s.severity, 0) / symptoms.length).toFixed(1)
    : "—";

  const avgMood = moods.length
    ? (moods.reduce((a, m) => a + m.mood, 0) / moods.length).toFixed(1)
    : "—";

  // Use translation strings
  const lang = t();

  document.getElementById("stats-view").innerHTML = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
      <div style="background:var(--bg);border-radius:8px;padding:12px;text-align:center;">
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">
          ${lang.symptomsLogged}
        </p>
        <p style="font-size:24px;font-weight:500;">${symptoms.length}</p>
      </div>
      <div style="background:var(--bg);border-radius:8px;padding:12px;text-align:center;">
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">
          ${lang.avgSeverity}
        </p>
        <p style="font-size:24px;font-weight:500;">${avgSev}</p>
      </div>
      <div style="background:var(--bg);border-radius:8px;padding:12px;text-align:center;">
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">
          ${lang.checkins}
        </p>
        <p style="font-size:24px;font-weight:500;">${moods.length}</p>
      </div>
      <div style="background:var(--bg);border-radius:8px;padding:12px;text-align:center;">
        <p style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">
          ${lang.avgMood}
        </p>
        <p style="font-size:24px;font-weight:500;">${avgMood}/5</p>
      </div>
    </div>`;
}

async function exportPDF() {
  const from = document.getElementById("export-from").value;
  const to = document.getElementById("export-to").value;
  const lang = getLang();
  if (!from || !to) { showToast(t().toastSelectDate); return; }
  showToast(t().toastGenerating);
  window.location.href = `/api/export/pdf?from=${from}&to=${to}&lang=${lang}`;
}

// ─── Apply saved language and load initial data ───────────
const savedLang = getLang();
if (savedLang && savedLang !== "en") {
  applyLanguage(savedLang);
} else {
  loadSymptoms();
  loadMood();
  loadMedications();
  loadStats();
}


// ════════════════════════════════════════════════════════════
// DRUG NAME AUTOCOMPLETE — clean generic names only
// ════════════════════════════════════════════════════════════
let searchTimeout = null;

async function searchDrugNames(query) {
  const suggestions = document.getElementById("drug-suggestions");

  if (query.length < 3) {
    suggestions.style.display = "none";
    return;
  }

  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(async () => {
    try {
      const res = await fetch(`/api/drug-search?q=${encodeURIComponent(query)}`);

      if (!res.ok) throw new Error("Server error");

      const names = await res.json();

      if (!Array.isArray(names) || names.length === 0) {
        suggestions.innerHTML = `
          <div style="padding:10px 12px;font-size:13px;color:var(--text-muted);">
            ${t().noAutoComplete}
          </div>`;
        suggestions.style.display = "block";
        return;
      }

      suggestions.innerHTML = names.map(name => `
        <div onclick="selectDrug('${name.replace(/'/g, "\\'")}')" style="
          padding: 10px 12px;
          font-size: 13px;
          cursor: pointer;
          border-bottom: 0.5px solid var(--border);
          color: var(--text);
        "
        onmouseover="this.style.background='var(--bg)'"
        onmouseout="this.style.background=''"
        >${name}</div>
      `).join("");

      suggestions.style.display = "block";

    } catch (e) {
      suggestions.innerHTML = `
        <div style="padding:10px 12px;font-size:13px;color:var(--text-muted);">
          ${t().noAutoComplete}
        </div>`;
      suggestions.style.display = "block";
    }
  }, 400);
}

function selectDrug(name) {
  document.getElementById("med-name").value = name;
  document.getElementById("drug-suggestions").style.display = "none";
}

document.addEventListener("click", (e) => {
  if (!e.target.closest("#med-name") &&
      !e.target.closest("#drug-suggestions")) {
    const s = document.getElementById("drug-suggestions");
    if (s) s.style.display = "none";
  }
});