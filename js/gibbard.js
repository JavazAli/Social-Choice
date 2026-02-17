/* ===== GIBBARD-SATTERTHWAITE PAGES LOGIC ===== */

/* ---- GS Intro ---- */
document.getElementById("btnGsIntro").addEventListener("click", ()=>{
  showScreen("screen-gs-meet");
});

/* ---- Meet Dictator ---- */
document.getElementById("btnGsMeet").addEventListener("click", ()=>{
  showScreen("screen-gs-dictator");
});

/* ---- Dictator page: render character ---- */
(function(){
  const el = document.getElementById("dictCharacter");
  if(el) el.innerHTML = dictatorSVGLarge("smug");
})();

document.getElementById("btnGsDictator").addEventListener("click", ()=>{
  buildDictatorBallot();
  showScreen("screen-gs-dict-ballot");
});

function buildDictatorBallot(){
  const el = document.getElementById("dictBallotList");
  if(!el || !prefOrder.length) return;
  const order4 = [...prefOrder, "dict"];
  const labels = ["انتخاب اول", "انتخاب دوم", "انتخاب سوم", "انتخاب چهارم"];
  el.innerHTML = order4.map((k, i) => `
    <div class="pref-item${k==='dict' ? ' hl-second' : ''}" style="margin-top:8px;">
      <div class="rank">${labels[i]}</div>
      <div class="label">${CAND[k].name}</div>
      ${iconSVG(k, "normal", 34)}
    </div>
  `).join("");
}

/* Mod 8: Dict-ballot now goes to machine-intro (NEW page) instead of conditions */
document.getElementById("btnGsDictBallot").addEventListener("click", ()=>{
  // Render machine intro display
  const el = document.getElementById("machineIntroDisplay");
  if(el) el.innerHTML = votingMachineSVG(200);
  showScreen("screen-gs-machine-intro");
});

/* Mod 8: Machine intro goes to conditions */
document.getElementById("btnGsMachineIntro").addEventListener("click", ()=>{
  showScreen("screen-gs-conditions");
});

/* ---- Conditions page: render machine ---- */
(function(){
  const el = document.getElementById("machineDisplay");
  if(el) el.innerHTML = votingMachineSVG(180);
})();

document.getElementById("btnGsCond1").addEventListener("click", ()=>{
  showScreen("screen-gs-cond1");
});

/* ---- Condition 1 detail ---- */
document.getElementById("btnGsCond1Example").addEventListener("click", ()=>{
  buildCond1Example();
  showScreen("screen-gs-cond1-ballots");
});

function buildCond1Example(){
  const container = document.getElementById("cond1BallotsContainer");
  if(!container || !prefOrder.length) return;

  const userOrder = [...prefOrder, "dict"];
  const voter2Order = [prefOrder[0], prefOrder[2], prefOrder[1], "dict"];
  const voter3Order = [prefOrder[0], prefOrder[2], "dict", prefOrder[1]];

  window._cond1Ballots = [
    { title: "برگه رای شما", order: userOrder },
    { title: "برگه رای شهروند دوم", order: voter2Order },
    { title: "برگه رای شهروند سوم", order: voter3Order },
  ];

  const labels = ["اول", "دوم", "سوم", "چهارم"];
  container.innerHTML = window._cond1Ballots.map(b => `
    <div class="card ballot-4 float">
      <h4>${b.title}</h4>
      <div class="tiny muted">ترتیب ترجیحات</div>
      ${b.order.map((k, i) => `
        <div class="pref-item" data-rank="${i}" style="margin-top:8px;">
          <div class="rank">${labels[i]}</div>
          <div class="label">${CAND[k].name}</div>
          ${iconSVG(k, "normal", 28)}
        </div>
      `).join("")}
    </div>
  `).join("");
}

document.getElementById("btnCond1Run").addEventListener("click", ()=>{
  buildCond1Ballots();
  showScreen("screen-gs-cond1-result");
});

function buildCond1Ballots(){
  const container = document.getElementById("cond1ResultBallots");
  if(!container || !window._cond1Ballots) return;

  const labels = ["اول", "دوم", "سوم", "چهارم"];
  container.innerHTML = window._cond1Ballots.map(b => `
    <div class="card ballot-4">
      <h4>${b.title}</h4>
      ${b.order.map((k, i) => `
        <div class="pref-item${i===1 ? ' hl-second' : ''}" style="margin-top:5px;">
          <div class="rank">${labels[i]}</div>
          <div class="label">${CAND[k].name}</div>
          ${iconSVG(k, "normal", 24)}
        </div>
      `).join("")}
    </div>
  `).join("");
}

document.getElementById("btnCond1Machine").addEventListener("click", ()=>{
  buildCond1Machine();
  showScreen("screen-gs-cond1-machine");
});

/* Mod 11: Machine in separate display, explanation in smaller box */
function buildCond1Machine(){
  const machineDisplay = document.getElementById("cond1MachineDisplay");
  const machineOut = document.getElementById("cond1MachineOutput");
  if(!machineOut || !window._cond1Ballots) return;

  const secondPrefs = window._cond1Ballots.map(b => b.order[1]);
  const counts = {};
  secondPrefs.forEach(k => { counts[k] = (counts[k]||0) + 1; });
  let maxK = null, maxC = 0;
  for(const k in counts){ if(counts[k]>maxC){ maxC=counts[k]; maxK=k; } }

  const unanimousFirst = prefOrder[0];

  // Render large machine separately
  if(machineDisplay){
    machineDisplay.innerHTML = votingMachineSVG(180, true, CAND[maxK].name);
  }

  machineOut.innerHTML = `
    <p class="muted" style="margin-top:8px;">
      مکانیزم «نگاه به اولویت دوم» خروجی‌اش <strong>${CAND[maxK].name}</strong> است.
    </p>
    <p style="font-weight:800; margin-top:10px; color:#c62828;">
      اما همه جامعه یکصدا <strong>${CAND[unanimousFirst].name}</strong> را انتخاب اول خود قرار داده بودند!
    </p>
    <p class="muted" style="margin-top:8px;">
      پس این مکانیزم شرط اول (اتفاق آرا) را نقض می‌کند.
    </p>
    <div style="margin-top:16px;">
      <button class="btn" id="btnGsPlurality">حالا بیایید مکانیزم‌های واقعی را بررسی کنیم</button>
    </div>
  `;

  document.getElementById("btnGsPlurality").addEventListener("click", ()=>{
    showScreen("screen-gs-plurality");
  });
}

/* ---- Plurality ---- */

document.getElementById("btnPluralityExample").addEventListener("click", ()=>{
  buildPluralityBallots();
  showScreen("screen-gs-plurality-ex");
});

function buildPluralityBallots(){
  const container = document.getElementById("pluralityBallots");
  if(!container || !window._cond1Ballots) return;

  const labels = ["اول", "دوم", "سوم", "چهارم"];
  container.innerHTML = window._cond1Ballots.map(b => `
    <div class="card ballot-4">
      <h4>${b.title}</h4>
      ${b.order.map((k, i) => `
        <div class="pref-item${i===0 ? ' hl-first' : ''}" style="margin-top:5px;">
          <div class="rank">${labels[i]}</div>
          <div class="label">${CAND[k].name}</div>
          ${iconSVG(k, "normal", 24)}
        </div>
      `).join("")}
    </div>
  `).join("");
}

document.getElementById("btnPluralityRun").addEventListener("click", ()=>{
  buildPluralityResult();
  showScreen("screen-gs-plurality-result");
});

function buildPluralityResult(){
  const resultDiv = document.getElementById("pluralityResult");
  if(!resultDiv || !window._cond1Ballots) return;

  const firstPrefs = window._cond1Ballots.map(b => b.order[0]);
  const counts = {};
  firstPrefs.forEach(k => { counts[k] = (counts[k]||0) + 1; });
  const unanimousFirst = prefOrder[0];

  resultDiv.innerHTML = `
    <div style="display:flex; justify-content:center; margin-bottom:8px;">${votingMachineSVG(150, true, CAND[unanimousFirst].name)}</div>
    <p style="font-weight:800; margin-top:10px; color:#2e7d32;">
      ${CAND[unanimousFirst].name} با ${counts[unanimousFirst] || 3} رای از ${window._cond1Ballots.length} رای، برنده است.
    </p>
    <p class="muted" style="margin-top:6px;">شرط اول برآورده شد! ${checkSVG(20)}</p>
    <div style="margin-top:16px;">
      <button class="btn" id="btnGsBorda">مکانیزم بعدی: جمع امتیازها</button>
    </div>
  `;

  document.getElementById("btnGsBorda").addEventListener("click", ()=>{
    showScreen("screen-gs-borda");
  });
}

/* ---- Borda ---- */

document.getElementById("btnBordaExample").addEventListener("click", ()=>{
  buildBordaBallots();
  showScreen("screen-gs-borda-ex");
});

function buildBordaBallots(){
  const container = document.getElementById("bordaBallots");
  if(!container || !window._cond1Ballots) return;

  const labels = ["اول", "دوم", "سوم", "چهارم"];
  const points = [1, 2, 3, 4];

  container.innerHTML = window._cond1Ballots.map(b => `
    <div class="card ballot-4">
      <h4>${b.title}</h4>
      ${b.order.map((k, i) => `
        <div class="pref-item" style="margin-top:6px;">
          <div class="rank">${labels[i]} (${points[i]})</div>
          <div class="label">${CAND[k].name}</div>
          ${iconSVG(k, "normal", 26)}
        </div>
      `).join("")}
    </div>
  `).join("");
}

document.getElementById("btnBordaRun").addEventListener("click", ()=>{
  buildBordaResult();
  showScreen("screen-gs-borda-result");
});

function buildBordaResult(){
  const resultDiv = document.getElementById("bordaResult");
  if(!resultDiv || !window._cond1Ballots) return;

  const points = [1, 2, 3, 4];

  const scores = {};
  ["tri","cir","sq","dict"].forEach(k => scores[k] = 0);
  window._cond1Ballots.forEach(b => {
    b.order.forEach((k, i) => {
      scores[k] += points[i];
    });
  });

  let minK = null, minS = 999;
  for(const k in scores){ if(scores[k] < minS){ minS = scores[k]; minK = k; } }

  const sortedKeys = Object.keys(scores).sort((a,b) => scores[a] - scores[b]);
  const tableRows = sortedKeys.map(k => `
    <tr>
      <td>${iconSVG(k, "normal", 24)} ${CAND[k].name}</td>
      <td class="${k===minK ? 'winner-cell' : ''}">${scores[k]}</td>
    </tr>
  `).join("");

  resultDiv.innerHTML = `
    <table class="score-table">
      <thead><tr><th>کاندیدا</th><th>مجموع امتیاز</th></tr></thead>
      <tbody>${tableRows}</tbody>
    </table>
    <div style="text-align:center; margin-top:10px;">
      ${votingMachineSVG(130, true, CAND[minK].name)}
      <p style="font-weight:800; margin-top:6px; color:#2e7d32;">
        ${CAND[minK].name} با کمترین مجموع امتیاز (${minS}) برنده است.
      </p>
      <p class="muted" style="margin-top:4px;">شرط اول برآورده شد! ${checkSVG(20)}</p>
    </div>
    <div style="margin-top:16px;">
      <button class="btn" id="btnBothPass">هر دو مکانیزم شرط اول را گذراندند!</button>
    </div>
  `;

  document.getElementById("btnBothPass").addEventListener("click", ()=>{
    showScreen("screen-gs-both-pass");
  });
}

document.getElementById("btnGoCond2").addEventListener("click", ()=>{
  showScreen("screen-gs-cond2");
});

/* ---- Condition 2: Truthfulness ---- */
const infoToggle = document.getElementById("cond2InfoToggle");
const infoBox = document.getElementById("cond2InfoBox");
if(infoToggle && infoBox){
  infoToggle.addEventListener("click", ()=>{
    infoBox.classList.toggle("visible");
  });
}

document.getElementById("btnGsPoliceIntro").addEventListener("click", ()=>{
  showScreen("screen-gs-police-intro");
});

/* ---- Police character float ---- */
(function(){
  const el = document.getElementById("policeCharFloat");
  if(el) el.innerHTML = policeCarSVG(80);

  const introCard = document.getElementById("policeNewCharCard");
  if(introCard){
    introCard.innerHTML = `
      <div class="police-cand-avatar">${socialPoliceSVG(118)}</div>
      <div class="cand-name">پلیس: ناظم اجتماعی</div>
      <div class="cand-desc">هدفش حفظ امنیت جامعه است.</div>
    `;
  }

  ["policePeekIntro", "policePeekMean", "policePeekMedian"].forEach(id=>{
    const peek = document.getElementById(id);
    if(peek) peek.innerHTML = `<div class="dict-float">${socialPoliceSVG(90)}</div>`;
  });
})();

/* ===== Mod 18: POLICE DRAG GAME (complete replacement) ===== */

/* --- Drag logic (adapted from old code) --- */
function getHousePositions(method){
  const roadId = method === "mean" ? "meanRoad" : "medianRoad";
  const road = document.getElementById(roadId);
  if(!road) return [];
  const houses = road.querySelectorAll(".house-icon");
  return Array.from(houses).map(h => parseFloat(h.dataset.pos));
}

function updatePolicePosition(method){
  const positions = getHousePositions(method);
  if(!positions.length) return;
  let carPos;
  if(method === "mean"){
    carPos = positions.reduce((a, b) => a + b, 0) / positions.length;
  } else {
    const sorted = positions.slice().sort((a, b) => a - b);
    carPos = sorted[Math.floor(sorted.length / 2)];
  }
  const carId = method === "mean" ? "police-mean" : "police-med";
  const car = document.getElementById(carId);
  if(car) car.style.left = carPos + "%";
}

function setupDrag(houseId, method){
  const house = document.getElementById(houseId);
  if(!house) return;
  const roadId = method === "mean" ? "meanRoad" : "medianRoad";
  const road = document.getElementById(roadId);
  if(!road) return;
  let dragging = false;
  let hasDragged = false;

  function startDrag(e){ dragging = true; e.preventDefault(); }
  function doDrag(e){
    if(!dragging) return;
    const rect = road.getBoundingClientRect();
    let clientX = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
    let pos = ((clientX - rect.left) / rect.width) * 100;
    pos = Math.max(0, Math.min(100, pos));
    house.style.left = pos + "%";
    house.dataset.pos = pos;
    updatePolicePosition(method);
    if(!hasDragged && pos > 85){
      hasDragged = true;
      showDragFeedback(method);
    }
  }
  function endDrag(){ dragging = false; }

  house.addEventListener("mousedown", startDrag);
  house.addEventListener("touchstart", startDrag, { passive: false });
  document.addEventListener("mousemove", doDrag);
  document.addEventListener("touchmove", doDrag, { passive: false });
  document.addEventListener("mouseup", endDrag);
  document.addEventListener("touchend", endDrag);
}

function showDragFeedback(method){
  if(method === "mean"){
    const fb = document.getElementById("meanFeedback");
    if(fb) fb.classList.remove("hidden");
  } else {
    const fb = document.getElementById("medianFeedback");
    if(fb) fb.classList.remove("hidden");
    setTimeout(()=>{
      const conn = document.getElementById("medianConnection");
      if(conn) conn.classList.remove("hidden");
    }, 1200);
  }
}

// Setup drag for both mean and median houses
setupDrag("h5-mean", "mean");
setupDrag("h5-med", "median");

// Initialize police positions
updatePolicePosition("mean");
updatePolicePosition("median");

/* Police intro → mean game */
document.getElementById("btnStartPolice").addEventListener("click", ()=>{
  updatePolicePosition("mean");
  showScreen("screen-gs-police-mean");
});

/* Mean → median game */
document.getElementById("btnToMedianMethod").addEventListener("click", ()=>{
  updatePolicePosition("median");
  showScreen("screen-gs-police-median");
});

/* ---- Police Lesson → Strategic Intro ---- */
document.getElementById("btnPoliceLesson").addEventListener("click", ()=>{
  showScreen("screen-gs-strategic-intro");
});

/* ---- Strategic Voting Intro ---- */
document.getElementById("btnStrategicStart").addEventListener("click", ()=>{
  buildStrategicPoll();
  showScreen("screen-gs-strategic-poll");
});

function buildStrategicPoll(){
  const pollDiv = document.getElementById("strategicPollContent");
  if(!pollDiv || !prefOrder.length) return;

  const loved = prefOrder[0];
  const ok = prefOrder[1];
  const hated = prefOrder[2];

  window._strategicData = { loved, ok, hated };

  pollDiv.innerHTML = `
    <div style="text-align:center; margin-bottom:14px;">
      ${scaleSVG(50)}
    </div>
    <div class="title-md" style="font-size:20px; text-align:center;">نظرسنجی فعلی</div>
    <div class="poll-display" style="margin-top:14px;">
      <div class="poll-row">
        <div class="poll-icon">${iconSVG(ok, "normal", 36)}</div>
        <div class="poll-name">${CAND[ok].name}</div>
        <div class="poll-bar"><div class="poll-fill" style="width:48%; background:${CAND[ok].color};"></div></div>
        <div class="poll-pct">48%</div>
      </div>
      <div class="poll-row">
        <div class="poll-icon">${iconSVG(hated, "normal", 36)}</div>
        <div class="poll-name">${CAND[hated].name}</div>
        <div class="poll-bar"><div class="poll-fill" style="width:49%; background:${CAND[hated].color};"></div></div>
        <div class="poll-pct">49%</div>
      </div>
      <div class="poll-row">
        <div class="poll-icon">${iconSVG(loved, "normal", 36)}</div>
        <div class="poll-name">${CAND[loved].name}</div>
        <div class="poll-bar"><div class="poll-fill" style="width:3%; background:${CAND[loved].color};"></div></div>
        <div class="poll-pct">3%</div>
      </div>
    </div>
    <div style="text-align:center; margin-top:16px;">
      <p style="font-weight:800;">${CAND[loved].name} (کاندیدای محبوب شما) شانسی ندارد.</p>
      <p class="muted" style="margin-top:4px;">
        اگر صادقانه به او رای بدهید، <strong>${CAND[hated].name}</strong> برنده می‌شود (که شما از او متنفرید!).
      </p>
      <p class="muted" style="margin-top:4px;">
        اما اگر به <strong>${CAND[ok].name}</strong> رای بدهید...
      </p>
    </div>
  `;
}

document.getElementById("btnStrategicChoice").addEventListener("click", ()=>{
  showScreen("screen-gs-strategic-choice");
  buildStrategicChoice();
});

function buildStrategicChoice(){
  const el = document.getElementById("strategicChoiceContent");
  if(!el || !window._strategicData) return;

  const { loved, ok, hated } = window._strategicData;

  el.innerHTML = `
    <div style="text-align:center;">
      <div class="title-md" style="font-size:22px;">چه می‌کنید؟</div>
      <p class="muted" style="margin-top:6px;">
        رای شما تعیین‌کننده است. صادقانه رای می‌دهید یا استراتژیک؟
      </p>
      <div class="choice-row" style="margin-top:18px;">
        <div class="choice-btn honest" onclick="strategicResult('honest')">
          <div style="margin-bottom:8px;">${heartSVG(36)}</div>
          <div style="font-weight:900;">رای صادقانه</div>
          <div class="muted" style="font-size:14px; margin-top:4px;">رای به ${CAND[loved].name}</div>
        </div>
        <div class="choice-btn strategic" onclick="strategicResult('strategic')">
          <div style="margin-bottom:8px;">${brainSVG(36)}</div>
          <div style="font-weight:900;">رای استراتژیک</div>
          <div class="muted" style="font-size:14px; margin-top:4px;">رای به ${CAND[ok].name}</div>
        </div>
      </div>
    </div>
  `;
}

window.strategicResult = function(choice){
  showScreen("screen-gs-strategic-result");
  buildStrategicResult(choice);
};

function buildStrategicResult(choice){
  const el = document.getElementById("strategicResultContent");
  if(!el || !window._strategicData) return;

  const { loved, ok, hated } = window._strategicData;

  if(choice === "honest"){
    el.innerHTML = `
      <div style="text-align:center;">
        <div class="title-md" style="font-size:22px;">نتیجه رای صادقانه</div>
        <div class="poll-display" style="margin-top:14px;">
          <div class="poll-row">
            <div class="poll-icon">${iconSVG(hated, "normal", 36)}</div>
            <div class="poll-name">${CAND[hated].name}</div>
            <div class="poll-bar"><div class="poll-fill" style="width:49%; background:${CAND[hated].color};"></div></div>
            <div class="poll-pct">49%</div>
          </div>
          <div class="poll-row">
            <div class="poll-icon">${iconSVG(ok, "normal", 36)}</div>
            <div class="poll-name">${CAND[ok].name}</div>
            <div class="poll-bar"><div class="poll-fill" style="width:48%; background:${CAND[ok].color};"></div></div>
            <div class="poll-pct">48%</div>
          </div>
          <div class="poll-row">
            <div class="poll-icon">${iconSVG(loved, "normal", 36)}</div>
            <div class="poll-name">${CAND[loved].name}</div>
            <div class="poll-bar"><div class="poll-fill" style="width:3%; background:${CAND[loved].color};"></div></div>
            <div class="poll-pct">3%</div>
          </div>
        </div>
        <p style="font-weight:800; margin-top:14px; color:#c62828;">
          ${CAND[hated].name} برنده شد! بدترین گزینه شما!
        </p>
        <p class="muted" style="margin-top:6px;">
          صداقت شما باعث شد بدترین نتیجه رقم بخورد.
        </p>
        <div style="margin-top:14px;">
          <button class="btn small" onclick="showScreen('screen-gs-strategic-choice'); buildStrategicChoice();">برگردید و دوباره انتخاب کنید</button>
        </div>
      </div>
    `;
  } else {
    el.innerHTML = `
      <div style="text-align:center;">
        <div class="title-md" style="font-size:22px;">نتیجه رای استراتژیک</div>
        <div class="poll-display" style="margin-top:14px;">
          <div class="poll-row">
            <div class="poll-icon">${iconSVG(ok, "normal", 36)}</div>
            <div class="poll-name">${CAND[ok].name}</div>
            <div class="poll-bar"><div class="poll-fill" style="width:49%; background:${CAND[ok].color};"></div></div>
            <div class="poll-pct">49%</div>
          </div>
          <div class="poll-row">
            <div class="poll-icon">${iconSVG(hated, "normal", 36)}</div>
            <div class="poll-name">${CAND[hated].name}</div>
            <div class="poll-bar"><div class="poll-fill" style="width:48%; background:${CAND[hated].color};"></div></div>
            <div class="poll-pct">48%</div>
          </div>
          <div class="poll-row">
            <div class="poll-icon">${iconSVG(loved, "normal", 36)}</div>
            <div class="poll-name">${CAND[loved].name}</div>
            <div class="poll-bar"><div class="poll-fill" style="width:3%; background:${CAND[loved].color};"></div></div>
            <div class="poll-pct">3%</div>
          </div>
        </div>
        <p style="font-weight:800; margin-top:14px; color:#2e7d32;">
          ${CAND[ok].name} برنده شد!
        </p>
        <p class="muted" style="margin-top:6px;">
          رای شما تعیین‌کننده بود! حداقل ${CAND[hated].name} نبرد...
          اما شما مجبور بودید دروغ بگویید.
        </p>
        <div style="margin-top:14px;">
          <button class="btn" onclick="showScreen('screen-gs-borda-problem')">ادامه</button>
        </div>
      </div>
    `;
  }
}

/* ---- Borda Problem ---- */
document.getElementById("btnBordaProblem").addEventListener("click", ()=>{
  showScreen("screen-gs-punchline");
});

/* ---- Punchline ---- */
document.getElementById("btnPunchline").addEventListener("click", ()=>{
  showScreen("screen-gs-dictator-right");
});

/* ---- Dictator was right ---- */
(function(){
  const el = document.getElementById("dictRightCharacter");
  if(el) el.innerHTML = dictatorSVGLarge("laugh");
})();

document.getElementById("btnDictRight").addEventListener("click", ()=>{
  showScreen("screen-gs-theorem");
});

/* ---- Theorem ---- */
document.getElementById("btnTheorem").addEventListener("click", ()=>{
  // Mod 21: Init conclusion floating chars
  initConclusionChars();
  showScreen("screen-gs-conclusion");
});

/* Mod 21: Conclusion floating characters */
function initConclusionChars(){
  const container = document.getElementById("conclusionChars");
  const topLine = document.getElementById("conclusionTopChars");
  if(!container) return;

  if(!container.dataset.init){
    container.dataset.init = "1";
    const bgChars = [
      { svg: iconSVG("tri","normal",80), left:"5%", top:"12%", dur:"11s", dx:"30px", dy:"-18px" },
      { svg: iconSVG("cir","normal",90), left:"80%", top:"15%", dur:"13s", dx:"-25px", dy:"20px" },
      { svg: iconSVG("sq","normal",60), left:"15%", top:"70%", dur:"12s", dx:"22px", dy:"24px" },
      { svg: dictatorSVG(70,"smug"), left:"75%", top:"65%", dur:"10s", dx:"-20px", dy:"-15px" },
      { svg: socialPoliceSVG(64), left:"45%", top:"80%", dur:"14s", dx:"15px", dy:"-20px" },
    ];

    container.innerHTML = bgChars.map(c => `
      <div class="blob" style="left:${c.left};top:${c.top};animation-duration:${c.dur};--dx:${c.dx};--dy:${c.dy};width:auto;">
        <div class="spin">${c.svg}</div>
      </div>
    `).join("");
  }

  if(topLine && !topLine.dataset.init){
    topLine.dataset.init = "1";
    const topChars = [
      iconSVG("tri","normal",52),
      iconSVG("cir","normal",52),
      iconSVG("sq","normal",50),
      dictatorSVG(52,"smug"),
      socialPoliceSVG(54),
    ];
    topLine.innerHTML = topChars.map((svg, i)=>`<div class="item" style="animation-delay:${i*0.18}s">${svg}</div>`).join("");
  }
}



function initFinalCharacters(){
  const one = document.getElementById("finalCharOne");
  const two = document.getElementById("finalCharTwo");
  const m1 = document.getElementById("modalCharOne");
  const m2 = document.getElementById("modalCharTwo");
  if(one) one.innerHTML = creatorTwoSVG(132);
  if(two) two.innerHTML = creatorOneSVG(132);
  if(m1) m1.innerHTML = creatorTwoSVG(92);
  if(m2) m2.innerHTML = creatorOneSVG(92);
}

const btnRestartFresh = document.getElementById("btnRestartFresh");
if(btnRestartFresh){
  btnRestartFresh.addEventListener("click", ()=>{
    try{ localStorage.clear(); }catch(e){}
    try{ sessionStorage.clear(); }catch(e){}
    window.location.href = window.location.pathname;
    window.location.reload();
  });
}

/* Mod 22: Final page → conclusion and credits */
document.getElementById("btnToFinal").addEventListener("click", ()=>{
  initFinalCharacters();
  showScreen("screen-final");
});

const btnFinalContact = document.getElementById("btnFinalContact");
if(btnFinalContact){
  btnFinalContact.addEventListener("click", ()=>{
    const contactModal = document.getElementById("contactModal");
    if(contactModal){
      contactModal.classList.add("active");
      contactModal.setAttribute("aria-hidden","false");
    }
  });
}
