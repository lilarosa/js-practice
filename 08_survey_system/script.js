// 📝 Mini Survey with localStorage summary
// 🇩🇪 Umfrage + Auswertung lokal  ·  🇨🇳 前端本地统计

const form = document.getElementById("survey");
const results = document.getElementById("results");
const summary = document.getElementById("summary");
const chart = document.getElementById("chart");
const ctx = chart.getContext("2d");

// Load existing submissions
const KEY = "survey_submissions_v1";
let submissions = JSON.parse(localStorage.getItem(KEY) || "[]");

form.addEventListener("submit", (e)=>{
  e.preventDefault();
  const data = new FormData(form);

  const area = data.get("area");                   // radio
  const tools = data.getAll("tools");              // checkboxes
  const comment = (data.get("comment")||"").trim();

  if(!area){ alert("Please choose your preferred area."); return; }

  submissions.push({ area, tools, comment, ts: Date.now() });
  localStorage.setItem(KEY, JSON.stringify(submissions));

  renderResults();
  results.classList.remove("hidden");
  form.reset();
});

function renderResults(){
  // Aggregate counts
  const areaCount = { frontend:0, backend:0, fullstack:0 };
  const toolCount = {};
  submissions.forEach(s=>{
    if (areaCount[s.area] !== undefined) areaCount[s.area]++;
    s.tools.forEach(t => toolCount[t] = (toolCount[t]||0)+1);
  });

  // Summary HTML
  const total = submissions.length;
  summary.innerHTML = `
    <p><strong>Total submissions:</strong> ${total}</p>
    <p><strong>Area:</strong>
      Frontend ${areaCount.frontend} · Backend ${areaCount.backend} · Full-stack ${areaCount.fullstack}
    </p>
    <p><strong>Top tools:</strong> ${
      Object.entries(toolCount).sort((a,b)=>b[1]-a[1]).map(([k,v])=>`${k}(${v})`).join(", ") || "—"
    }</p>
  `;

  // Draw a tiny bar chart (no libs)
  drawBarChart(ctx, areaCount);
}

function drawBarChart(ctx, areaCount){
  ctx.clearRect(0,0,chart.width,chart.height);
  const labels = ["frontend","backend","fullstack"];
  const values = labels.map(l=>areaCount[l]);
  const max = Math.max(1, ...values);
  const pad = 30, w = chart.width, h = chart.height;
  const bw = (w - pad*2) / labels.length * 0.6;
  const gap = (w - pad*2) / labels.length;

  ctx.fillStyle = "#ffffff";
  ctx.font = "12px system-ui";
  labels.forEach((lab,i)=>{
    const x = pad + i*gap + (gap-bw)/2;
    const bh = (h - pad*2) * (values[i]/max);
    const y = h - pad - bh;
    // bar
    ctx.fillStyle = "#60a5fa";
    ctx.fillRect(x,y,bw,bh);
    // label
    ctx.fillStyle = "#e5e7eb";
    ctx.fillText(lab, x, h - pad + 14);
    ctx.fillText(String(values[i]), x + bw/2 - 6, y - 6);
  });

  // axis
  ctx.strokeStyle = "#334155";
  ctx.beginPath(); ctx.moveTo(pad, h-pad); ctx.lineTo(w-pad, h-pad); ctx.stroke();
}

if (submissions.length) {
  results.classList.remove("hidden");
  renderResults();
}
