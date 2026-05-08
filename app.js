// ===== APEX AI — APP.JS =====

// ===== COUNTDOWN TO JAPANESE GP =====
function updateCountdown() {
  const raceDate = new Date('2026-03-29T04:00:00Z'); // Suzuka race time in UTC
  const now = new Date();
  const diff = raceDate - now;

  const lights = document.getElementById('f1-lights');

  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    if (lights) lights.setAttribute('data-state', 'green');
    return;
  }

  if (lights) lights.setAttribute('data-state', 'red');

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('cd-days').textContent = String(days).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('cd-mins').textContent = String(mins).padStart(2, '0');
  document.getElementById('cd-secs').textContent = String(secs).padStart(2, '0');
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ===== RENDER DRIVERS GRID =====
function renderDrivers() {
  const grid = document.getElementById('drivers-container');
  if (!grid) return;

  const teamColors = {
    "mercedes": "#00d2be",
    "ferrari": "#dc0000",
    "mclaren": "#FF8000",
    "redbull": "#3671C6",
    "williams": "#37BEDD",
    "alpine": "#FF87BC",
    "haas": "#B6BABD",
    "audi": "#B5B6B7",
    "astonmartin": "#358C75",
    "racingbulls": "#6692FF",
    "cadillac": "#FF6B35",
  };

  grid.innerHTML = F1_DATA.drivers.map(driver => {
    const color = teamColors[driver.team] || '#e10600';
    const tc = driver.team;
    const nameParts = driver.name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');

    return `
      <div class="driver-card" style="--team-color:${color}">
        <div class="driver-team-stripe"></div>
        <div class="driver-card-inner">
          <div class="driver-number">${driver.number}</div>
          <div class="driver-name">${firstName}<br>${lastName}</div>
          <div class="driver-team-name">${F1_DATA.teams[driver.team]?.name.toUpperCase() || driver.team.toUpperCase()}</div>
          <span class="driver-flag">${driver.country}</span>
          <div class="driver-pts">
            <span class="driver-pts-label">PTS</span>
            <span class="driver-pts-num">${driver.pts}</span>
          </div>
          <div style="margin-top:8px">
            <span class="podium-team-badge ${tc}" style="font-size:9px;letter-spacing:1px">${F1_DATA.teams[driver.team]?.name || driver.team}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ===== RENDER STANDINGS TABLE =====
function renderStandings() {
  const tbody = document.getElementById('champ-tbody');
  if (!tbody) return;

  const teamColors = {
    "mercedes": "#00d2be", "ferrari": "#dc0000", "mclaren": "#FF8000", "redbull": "#3671C6",
    "williams": "#37BEDD", "alpine": "#FF87BC", "haas": "#B6BABD", "audi": "#B5B6B7",
    "astonmartin": "#358C75", "racingbulls": "#6692FF", "cadillac": "#FF6B35",
  };

  tbody.innerHTML = F1_DATA.drivers.map(d => {
    const bgColor = teamColors[d.team] || '#e10600';
    const textColor = ['mercedes', 'williams', 'haas', 'audi'].includes(d.team) ? '#000' : '#fff';

    const r1Class = d.r1 === 25 ? 'race-pts win' : 'race-pts';
    const r2Class = d.r2 === 25 ? 'race-pts win' : 'race-pts';

    return `
      <tr>
        <td><span class="pos-num">${d.pos}</span></td>
        <td>
          <span class="driver-name-cell">${d.name}</span>
          <span style="font-size:12px;margin-left:6px">${d.country}</span>
        </td>
        <td>
          <span class="team-cell-badge" style="background:${bgColor};color:${textColor}">
            ${F1_DATA.teams[d.team]?.name || d.team}
          </span>
        </td>
        <td><span class="${r1Class}">${d.r1 > 0 ? '+' + d.r1 : '—'}</span></td>
        <td><span class="${r2Class}">${d.r2 > 0 ? '+' + d.r2 : '—'}</span></td>
        <td><span class="pts-cell">${d.pts}</span></td>
      </tr>
    `;
  }).join('');
}

// ===== RECENT RACE RESULTS =====
function renderRecentRace() {
  const tbody = document.getElementById('recent-race-tbody');
  if (!tbody) return;

  const results = [
    { pos: 1, name: "Kimi Antonelli", team: "mercedes", time: "1:33:15.607" },
    { pos: 2, name: "George Russell", team: "mercedes", time: "+5.515s" },
    { pos: 3, name: "Lewis Hamilton", team: "ferrari", time: "+25.267s" },
    { pos: 4, name: "Charles Leclerc", team: "ferrari", time: "+28.112s" },
    { pos: 5, name: "Lando Norris", team: "mclaren", time: "+35.091s" },
    { pos: 6, name: "Oscar Piastri", team: "mclaren", time: "+41.123s" },
    { pos: 7, name: "Max Verstappen", team: "redbull", time: "+45.890s" },
    { pos: 8, name: "Isack Hadjar", team: "redbull", time: "+48.901s" },
    { pos: 9, name: "Carlos Sainz", team: "williams", time: "+52.124s" },
    { pos: 10, name: "Alexander Albon", team: "williams", time: "+55.871s" },
  ];

  const teamColors = {
    "mercedes": "#00d2be", "ferrari": "#dc0000", "mclaren": "#FF8000", "redbull": "#3671C6",
    "williams": "#37BEDD", "alpine": "#FF87BC", "haas": "#B6BABD", "audi": "#B5B6B7",
    "astonmartin": "#358C75", "racingbulls": "#6692FF", "cadillac": "#FF6B35",
  };

  tbody.innerHTML = results.map(d => {
    const bgColor = teamColors[d.team] || '#e10600';
    const textColor = ['mercedes', 'williams', 'haas', 'audi'].includes(d.team) ? '#000' : '#fff';

    let posStr = d.pos;
    if (d.pos === 1) posStr = '🥇 1';
    if (d.pos === 2) posStr = '🥈 2';
    if (d.pos === 3) posStr = '🥉 3';

    let rowClass = (d.pos <= 3) ? 'row-p1' : '';

    return `
      <tr class="${rowClass}">
        <td><span class="pos-num" style="padding-left:10px">${posStr}</span></td>
        <td>
          <span class="driver-name-cell" style="${d.pos <= 3 ? 'font-weight:700;color:#fff' : ''}">${d.name}</span>
        </td>
        <td>
          <span class="team-cell-badge" style="background:${bgColor};color:${textColor}">
            ${F1_DATA.teams[d.team]?.name || d.team}
          </span>
        </td>
        <td><span class="pts-cell mono">${d.time}</span></td>
      </tr>
    `;
  }).join('');
}

// ===== AI PREDICTOR =====
async function runPrediction() {
  const raceSelect = document.getElementById('race-select');
  if (!raceSelect) return;
  const raceKey = raceSelect.value;
  const depthKey = document.getElementById('depth-select').value;
  const btn = document.getElementById('btn-predict');
  const output = document.getElementById('predictor-output');

  const round = parseInt(raceKey);
  const raceData = (typeof F1_DATA !== 'undefined' && F1_DATA.calendar) ? F1_DATA.calendar.find(r => r.round === round) : null;
  const raceName = raceData ? raceData.name : raceSelect.options[raceSelect.selectedIndex].text;
  const raceCircuit = raceData ? raceData.location : "Circuit";

  const raceInfo = { round: raceKey, name: raceName, circuit: raceCircuit, context: "Focus on speed and tire degradation" };

  if (!btn) return;

  // Loading state
  btn.disabled = true;
  btn.textContent = '⏳ ANALYSING RACE DATA...';
  output.style.display = 'block';
  output.innerHTML = `
    <div class="loading-state">
      <div style="font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:4px;color:#e10600">
        APEX AI PROCESSING
      </div>
      <div class="loading-track"><div class="loading-car"></div></div>
      <div class="loading-text">RUNNING RACE SIMULATION...</div>
      <div style="font-family:'Share Tech Mono',monospace;font-size:11px;color:#555;letter-spacing:2px;margin-top:8px">
        Analysing: 2026 season data · circuit history · driver form · team performance
      </div>
    </div>
  `;

  // Build the prediction prompt
  const depthInstructions = {
    quick: "Give a concise race prediction focusing on top-3 finishers with brief reasoning (200-300 words).",
    full: "Give a comprehensive full race simulation: predicted top 10 finishers with probabilities, key race strategy analysis, circuit-specific driver advantages, and key moments to watch. Be detailed (400-600 words).",
    champ: "Give full race prediction PLUS a championship impact analysis: how this race result could affect the title fight, gaps between top 3 contenders, and who needs what result. Be thorough (500-700 words)."
  };

  const systemPrompt = "You are APEX AI, an elite Formula 1 race prediction AI specializing in the 2026 season.\n\nCURRENT 2026 SEASON STATE:\n- 2 races completed. George Russell leads (51pts), Kimi Antonelli 2nd (47pts)\n- Mercedes dominant: back-to-back 1-2 finishes in Australia and China\n- Ferrari strong: Hamilton P3 China, Leclerc P3 Australia\n- McLaren off-pace in 2026 regs (Norris P5, Piastri P6 typical results)\n- Red Bull STRUGGLING badly with new regulations (Verstappen P7, despite fastest laps)\n- NEW teams: Audi (ex-Sauber), Cadillac (debut)\n- 2026 key rule: active aerodynamics, no mandatory 2-stop at Monaco, new power units 1000bhp+\n- Lewis Hamilton: moved to Ferrari for 2026. 103 career wins. Suzuka lap record holder.\n- Kimi Antonelli: 19-year-old Mercedes rookie. Won China on only his 2nd F1 race.";

  const prompt = `${systemPrompt}

RACE TO PREDICT: ${raceInfo.name} (Round ${raceInfo.round})
CIRCUIT: ${raceInfo.circuit}
CIRCUIT CONTEXT: ${raceInfo.context}

CURRENT 2026 CHAMPIONSHIP STANDINGS:
1. George Russell (Mercedes) — 51 pts
2. Kimi Antonelli (Mercedes) — 47 pts  
3. Charles Leclerc (Ferrari) — 34 pts
4. Lewis Hamilton (Ferrari) — 33 pts
5. Lando Norris (McLaren) — 24 pts
6. Oscar Piastri (McLaren) — 18 pts
7. Max Verstappen (Red Bull) — 12 pts

KEY NOTES FOR PREDICTION:
- Mercedes dominant in 2026: won both races, 1-2 finishes
- Hamilton: 5 Suzuka wins, holds lap record — SUZUKA SPECIALIST
- Verstappen: 4 Suzuka wins — but Red Bull BADLY struggling with 2026 regulations
- Antonelli: 19yo rookie, no F1 Suzuka experience but INCREDIBLE raw pace
- Ferrari 3rd+4th in championship — consistent podiums

TASK: ${depthInstructions[depthKey]}

Format your response with these sections:
## 🏆 PREDICTED PODIUM
List P1, P2, P3 with win probability %

## 📊 PREDICTED TOP 10
Short list with finishing positions

## 🔍 KEY ANALYSIS
Main factors determining this race outcome

## ⚡ RACE DEFINING MOMENTS
2-3 moments that could change the outcome

${depthKey === 'championship' ? '## 🏁 CHAMPIONSHIP IMPACT\nHow this affects the title fight' : ''}

Be confident, passionate, analytical. Use F1 terminology. This is what real fans want to read!`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();

    if (data.content && data.content[0] && data.content[0].text) {
      renderPrediction(data.content[0].text, raceInfo);
    } else {
      throw new Error("Invalid response");
    }

  } catch (err) {
    console.error("API Error:", err);
    // Fallback: use pre-built prediction
    renderFallbackPrediction(raceKey, raceInfo);
  }

  btn.disabled = false;
  btn.textContent = '🤖 RUN AI PREDICTION';
}

// ===== RENDER PREDICTION OUTPUT =====
function renderPrediction(text, raceInfo) {
  const output = document.getElementById('predictor-output');

  // Parse sections from markdown
  const sections = parseMarkdownSections(text);

  let html = `
    <div class="prediction-header">
      <div>
        <div style="font-family:'Share Tech Mono',monospace;font-size:10px;color:#e10600;letter-spacing:3px;margin-bottom:6px">AI PREDICTION — ROUND ${raceInfo.round}</div>
        <div class="pred-race-name">${raceInfo.name.toUpperCase()}</div>
        <div style="font-size:13px;color:#666;margin-top:4px;font-family:'Share Tech Mono',monospace">${raceInfo.circuit}</div>
      </div>
      <div class="pred-confidence">🤖 APEX AI ACTIVE</div>
    </div>
    <div class="prediction-body">
      ${renderMarkdown(text)}
    </div>
  `;

  output.innerHTML = html;

  // Animate in
  output.style.opacity = '0';
  setTimeout(() => { output.style.transition = 'opacity 0.5s'; output.style.opacity = '1'; }, 50);
}

function renderMarkdown(text) {
  // Convert markdown to styled HTML
  let html = text
    // Headers
    .replace(/^## (🏆 .+)$/gm, '<h3 style="font-family:\'Bebas Neue\',sans-serif;font-size:22px;letter-spacing:3px;color:#FFD700;margin:24px 0 12px;border-left:4px solid #FFD700;padding-left:12px">$1</h3>')
    .replace(/^## (📊 .+)$/gm, '<h3 style="font-family:\'Bebas Neue\',sans-serif;font-size:22px;letter-spacing:3px;color:#00ff88;margin:24px 0 12px;border-left:4px solid #00ff88;padding-left:12px">$1</h3>')
    .replace(/^## (🔍 .+)$/gm, '<h3 style="font-family:\'Bebas Neue\',sans-serif;font-size:22px;letter-spacing:3px;color:#4da6ff;margin:24px 0 12px;border-left:4px solid #4da6ff;padding-left:12px">$1</h3>')
    .replace(/^## (⚡ .+)$/gm, '<h3 style="font-family:\'Bebas Neue\',sans-serif;font-size:22px;letter-spacing:3px;color:#ff8800;margin:24px 0 12px;border-left:4px solid #ff8800;padding-left:12px">$1</h3>')
    .replace(/^## (🏁 .+)$/gm, '<h3 style="font-family:\'Bebas Neue\',sans-serif;font-size:22px;letter-spacing:3px;color:#e10600;margin:24px 0 12px;border-left:4px solid #e10600;padding-left:12px">$1</h3>')
    .replace(/^## (.+)$/gm, '<h3 style="font-family:\'Bebas Neue\',sans-serif;font-size:22px;letter-spacing:3px;color:#e10600;margin:24px 0 12px;border-left:4px solid #e10600;padding-left:12px">$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#fff">$1</strong>')
    // List items with P1/P2/P3
    .replace(/^- \*\*P1\*\*(.+)$/gm, '<div style="padding:12px 16px;background:rgba(255,215,0,0.08);border-left:4px solid #FFD700;margin:4px 0;font-size:15px">🥇 <strong style="color:#FFD700">P1</strong>$1</div>')
    .replace(/^- \*\*P2\*\*(.+)$/gm, '<div style="padding:12px 16px;background:rgba(192,192,192,0.06);border-left:4px solid #C0C0C0;margin:4px 0;font-size:15px">🥈 <strong style="color:#C0C0C0">P2</strong>$1</div>')
    .replace(/^- \*\*P3\*\*(.+)$/gm, '<div style="padding:12px 16px;background:rgba(205,127,50,0.06);border-left:4px solid #CD7F32;margin:4px 0;font-size:15px">🥉 <strong style="color:#CD7F32">P3</strong>$1</div>')
    // Other list items
    .replace(/^- (.+)$/gm, '<div style="padding:8px 14px;background:rgba(255,255,255,0.03);border-left:2px solid #333;margin:3px 0;font-size:14px;color:#ccc">▸ $1</div>')
    // Numbered list
    .replace(/^(\d+)\. (.+)$/gm, '<div style="padding:8px 14px;background:rgba(255,255,255,0.02);margin:3px 0;font-size:14px;color:#ccc"><span style="color:#e10600;font-family:\'Bebas Neue\',sans-serif;font-size:18px;margin-right:10px">$1</span>$2</div>')
    // Paragraphs
    .replace(/^([^<\n#].+)$/gm, '<p style="margin:8px 0;font-size:15px;color:#bbb;line-height:1.7">$1</p>')
    // Empty lines
    .replace(/^\s*$/gm, '');

  return `<div style="line-height:1.6">${html}</div>`;
}

function parseMarkdownSections(text) {
  const sections = {};
  const parts = text.split(/^## /gm);
  parts.forEach(part => {
    const lines = part.split('\n');
    if (lines[0]) sections[lines[0].trim()] = lines.slice(1).join('\n').trim();
  });
  return sections;
}

// ===== FALLBACK PREDICTION (when API unavailable) =====
function renderFallbackPrediction(raceKey, raceInfo) {
  const fallbacks = {
    japan: {
      p1: { driver: "George Russell", team: "Mercedes", prob: "34%" },
      p2: { driver: "Lewis Hamilton", team: "Ferrari", prob: "28%" },
      p3: { driver: "Kimi Antonelli", team: "Mercedes", prob: "22%" },
      analysis: `<strong>Suzuka — the circuit that could shake up the 2026 order!</strong>
      <br><br>
      Mercedes arrives on a dominant streak — back-to-back 1-2 finishes. However, <strong>Suzuka is Hamilton's playground</strong>: 5 wins here, holds the lap record (1:30.983 from 2019). At 41, Hamilton knows every centimetre of this track and <strong>Ferrari's power unit</strong> should give him an edge in Sector 1.
      <br><br>
      <strong>The wildcard: Max Verstappen</strong>. Red Bull is struggling horrifically with 2026 regs, but Verstappen has 4 Suzuka wins. His qualifying pace (fastest lap in Australia!) suggests the car isn't as slow as it looks. If he can string it together...
      <br><br>
      <strong>Antonelli has no F1 Suzuka experience</strong> — Suzuka requires perfection. Expect the rookie to be quick but potentially make a small error in qualifying or the hairpin sequence. Russell, cool as ever, favoured to lead the pack once again.`,
      top10: ["1. Russell (Mercedes)", "2. Hamilton (Ferrari)", "3. Antonelli (Mercedes)", "4. Leclerc (Ferrari)", "5. Verstappen (Red Bull)", "6. Norris (McLaren)", "7. Hadjar (Red Bull)", "8. Piastri (McLaren)", "9. Sainz (Williams)", "10. Gasly (Alpine)"]
    },
    default: {
      p1: { driver: "George Russell", team: "Mercedes", prob: "35%" },
      p2: { driver: "Kimi Antonelli", team: "Mercedes", prob: "28%" },
      p3: { driver: "Lewis Hamilton", team: "Ferrari", prob: "20%" },
      analysis: `<strong>Based on 2026 season data</strong>, Mercedes enters as overwhelming favourite. Russell leads the championship and the Brackley team has mastered the new 2026 hybrid regulations better than anyone.
      <br><br>
      Ferrari's <strong>Hamilton and Leclerc</strong> represent the best challenge to the Silver Arrows. Ferrari's power unit is strong and both drivers have the experience to capitalise on any Mercedes errors.
      <br><br>
      <strong>Watch for Verstappen</strong> — his Red Bull struggles with the 2026 active aero, but the Dutchman's raw talent means he's never truly out of the fight. A surprise podium cannot be ruled out.`,
      top10: ["1. Russell (Mercedes)", "2. Antonelli (Mercedes)", "3. Hamilton (Ferrari)", "4. Leclerc (Ferrari)", "5. Norris (McLaren)", "6. Piastri (McLaren)", "7. Verstappen (Red Bull)", "8. Hadjar (Red Bull)", "9. Sainz (Williams)", "10. Albon (Williams)"]
    }
  };

  const pred = fallbacks[raceKey] || fallbacks.default;
  const output = document.getElementById('predictor-output');

  output.innerHTML = `
    <div class="prediction-header">
      <div>
        <div style="font-family:'Share Tech Mono',monospace;font-size:10px;color:#e10600;letter-spacing:3px;margin-bottom:6px">AI PREDICTION — ROUND ${raceInfo.round}</div>
        <div class="pred-race-name">${raceInfo.name.toUpperCase()}</div>
        <div style="font-size:13px;color:#666;margin-top:4px;font-family:'Share Tech Mono',monospace">${raceInfo.circuit}</div>
      </div>
      <div class="pred-confidence">🔮 APEX AI MODE</div>
    </div>

    <div class="pred-podium">
      <div class="pred-podium-title">🏆 PREDICTED PODIUM</div>
      <div class="pred-p1">
        <div class="pred-pos">P1</div>
        <div>
          <div class="pred-driver-name">🥇 ${pred.p1.driver}</div>
          <div style="font-size:12px;color:#888">${pred.p1.team}</div>
        </div>
        <div class="pred-prob">WIN: ${pred.p1.prob}</div>
      </div>
      <div class="pred-p2">
        <div class="pred-pos">P2</div>
        <div>
          <div class="pred-driver-name">🥈 ${pred.p2.driver}</div>
          <div style="font-size:12px;color:#888">${pred.p2.team}</div>
        </div>
        <div class="pred-prob">${pred.p2.prob}</div>
      </div>
      <div class="pred-p3">
        <div class="pred-pos">P3</div>
        <div>
          <div class="pred-driver-name">🥉 ${pred.p3.driver}</div>
          <div style="font-size:12px;color:#888">${pred.p3.team}</div>
        </div>
        <div class="pred-prob">${pred.p3.prob}</div>
      </div>
    </div>

    <div class="pred-analysis" style="margin-bottom:24px">
      ${pred.analysis}
    </div>

    <div class="pred-grid-title">📊 PREDICTED TOP 10</div>
    <div class="pred-grid-list">
      ${pred.top10.map((d, i) => {
    const pct = Math.max(8, 95 - i * 9);
    return `
          <div class="pred-grid-item">
            <span class="pred-pos-sm">P${i + 1}</span>
            <span style="flex:1;font-size:14px;font-weight:600">${d}</span>
            <div class="pred-bar-wrap">
              <div class="pred-bar" style="width:${pct}%"></div>
            </div>
            <span style="font-family:'Share Tech Mono',monospace;font-size:11px;color:#666;margin-left:10px;width:35px;text-align:right">${pct}%</span>
          </div>
        `;
  }).join('')}
    </div>

    <div style="margin-top:20px;padding:14px;background:rgba(225,6,0,0.08);border:1px solid rgba(225,6,0,0.2);font-family:'Share Tech Mono',monospace;font-size:11px;color:#777;letter-spacing:1px">
      ⚠️ To enable live AI predictions, add your Anthropic API key in the fetch headers inside app.js. Fallback mode uses built-in 2026 season analysis.
    </div>
  `;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  renderDrivers();
  renderStandings();
  renderRecentRace();

  const predBtn = document.getElementById('btn-predict');
  if (predBtn) {
    predBtn.addEventListener('click', runPrediction);
  }

  // Animate cards in on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(el => {
      if (el.isIntersecting) {
        if (el.target.classList.contains('fade-in')) {
          el.target.classList.add('visible');
        } else {
          el.target.style.opacity = '1';
          el.target.style.transform = 'translateY(0)';
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  document.querySelectorAll('.driver-card, .result-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    observer.observe(el);
  });
});