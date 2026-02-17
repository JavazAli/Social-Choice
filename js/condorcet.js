/* ===== CONDORCET LOGIC (original) ===== */

let firstVote = null;
let riggedWinner = null;
let remaining = [];
let secondVote = null;
let prefOrder = [];
let voters = [];
let compareSteps = [];

document.getElementById("btnStart").addEventListener("click", () => showScreen("screen-intro"));
document.getElementById("btnGoVote").addEventListener("click", () => showScreen("screen-vote"));

document.querySelectorAll("#screen-vote .ballot-opt").forEach(opt=>{
  opt.addEventListener("click", ()=>{
    firstVote = opt.dataset.vote;
    if(firstVote==="tri") riggedWinner="sq";
    if(firstVote==="cir") riggedWinner="tri";
    if(firstVote==="sq")  riggedWinner="cir";
    showScreen("screen-count");
    setTimeout(()=>{
      const winnerName = CAND[riggedWinner].name;
      document.getElementById("winnerName").textContent = "برنده: " + winnerName;
      document.getElementById("winnerIcon").innerHTML = candSvg(riggedWinner, "winner");
      const youName = CAND[firstVote].name;
      document.getElementById("resLine1").textContent =
        `شما به ${youName} رای دادید اما ${winnerName} برنده شد!`;
      document.getElementById("majorityName").textContent = winnerName;
      showScreen("screen-result");
    }, 1100);
  });
});

document.getElementById("btnToCondorcet").addEventListener("click", ()=>{
  remaining = ["tri","cir","sq"].filter(x => x !== firstVote);
  buildCondorcet1();
  showScreen("screen-cond1");
});

function buildMiniCand(el, key){
  el.innerHTML = `
    <div style="display:flex; justify-content:center;">${iconSVG(key, "normal", 84)}</div>
    <div class="cand-name">${CAND[key].name}</div>
    <div class="cand-desc">${CAND[key].desc}</div>
  `;
}

function buildCondorcet1(){
  const left = document.getElementById("condLeft");
  const right = document.getElementById("condRight");
  buildMiniCand(left, remaining[0]);
  buildMiniCand(right, remaining[1]);
  const condOptions = document.getElementById("condOptions");
  condOptions.innerHTML = "";
  remaining.forEach(key=>{
    const div = document.createElement("div");
    div.className = "ballot-opt";
    div.dataset.pick = key;
    div.innerHTML = `
      <strong>${CAND[key].name}</strong>
      ${iconSVG(key, "normal", 40)}
    `;
    div.addEventListener("click", ()=>{
      secondVote = key;
      const third = remaining.find(x => x !== secondVote);
      prefOrder = [firstVote, secondVote, third];
      buildCondorcet2();
      showScreen("screen-cond2");
    });
    condOptions.appendChild(div);
  });
}

function buildCondorcet2(){
  const prefList = document.getElementById("prefList");
  prefList.innerHTML = "";
  const labels = ["انتخاب اول", "انتخاب دوم", "انتخاب سوم"];
  prefOrder.forEach((k, i)=>{
    const row = document.createElement("div");
    row.className = "pref-item";
    row.innerHTML = `
      <div class="rank">${labels[i]}</div>
      <div class="label">${CAND[k].name}</div>
      ${iconSVG(k, "normal", 40)}
    `;
    prefList.appendChild(row);
  });

  const A = CAND[prefOrder[0]].name;
  const B = CAND[prefOrder[1]].name;
  const C = CAND[prefOrder[2]].name;
  document.getElementById("transA").textContent = A;
  document.getElementById("transA2").textContent = A;
  document.getElementById("transB").textContent = B;
  document.getElementById("transB2").textContent = B;
  document.getElementById("transC").textContent = C;
  document.getElementById("transC2").textContent = C;

  const dynRemoved = document.getElementById("dynRemoved");
  const dynPref1 = document.getElementById("dynPref1");
  const dynPref2 = document.getElementById("dynPref2");
  if(dynRemoved && dynPref1 && dynPref2){
    dynRemoved.textContent = B;
    dynPref1.textContent = A;
    dynPref2.textContent = C;
  }
}

document.getElementById("btnCond2Next").addEventListener("click", ()=>{
  buildCondorcet3();
  showScreen("screen-cond3");
});

function buildTicket(title, order){
  return `
    <div class="card ticket float">
      <h4>${title}</h4>
      <div class="tiny muted">ترتیب ترجیح</div>
      <div style="margin-top:10px;">
        ${order.map((k, idx)=>`
          <div class="pref-item" style="margin-top:8px;">
            <div class="rank">${idx+1}</div>
            <div class="label">${CAND[k].name}</div>
            ${iconSVG(k,"normal",34)}
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function buildCondorcet3(){
  const v1 = prefOrder.slice();
  const v2 = [v1[1], v1[2], v1[0]];
  const v3 = [v1[2], v1[0], v1[1]];
  voters = [v1, v2, v3];
  const top = document.getElementById("ticketsTop");
  top.innerHTML = "";
  top.insertAdjacentHTML("beforeend", buildTicket("برگه رای شما", v1));
  top.insertAdjacentHTML("beforeend", buildTicket("برگه رای رای‌دهنده اول", v2));
  top.insertAdjacentHTML("beforeend", buildTicket("برگه رای رای‌دهنده دوم", v3));
  prepareCompare();
}

document.getElementById("btnToCompare").addEventListener("click", ()=>{
  showScreen("screen-compare");
});

function prefers(ballot, a, b){
  return ballot.indexOf(a) < ballot.indexOf(b);
}

function majorityPref(a,b){
  const supportersA = [];
  const supportersB = [];
  voters.forEach((v, idx)=>{
    if(prefers(v,a,b)) supportersA.push(idx);
    else supportersB.push(idx);
  });
  const win = (supportersA.length > supportersB.length) ? a : b;
  const lose = (win === a) ? b : a;
  const supporters = (win === a) ? supportersA : supportersB;
  return { win, lose, supporters };
}

function prepareCompare(){
  const all = ["tri","cir","sq"];
  compareSteps = [
    {a: all[0], b: all[2]},
    {a: all[2], b: all[1]},
    {a: all[1], b: all[0]},
  ];
}

document.querySelector("#bgTri .spin").innerHTML = iconSVG("tri","cool",140);
document.querySelector("#bgCir .spin").innerHTML = iconSVG("cir","normal",140);
document.querySelector("#bgSq .spin").innerHTML  = iconSVG("sq","normal",110);

let compareIdx = 0;
const compareBtn = document.getElementById("compareBtn");
const compareLog = document.getElementById("compareLog");

function resetCompareUI(){
  compareIdx = 0;
  compareLog.innerHTML = "";
  renderCompareBtn();
}

function voterLabel(i){
  if(i === 0) return `<span class="hl-you">شما</span>`;
  if(i === 1) return `<span class="hl-voter">رای‌دهنده اول</span>`;
  return `<span class="hl-voter">رای‌دهنده دوم</span>`;
}

function renderCompareBtn(){
  if(compareIdx >= compareSteps.length){
    compareBtn.textContent = "چه اتفاقی افتاد؟!";
    compareBtn.onclick = () => showScreen("screen-cycle");
    return;
  }
  const {a,b} = compareSteps[compareIdx];
  compareBtn.textContent = `مقایسه ${CAND[a].name} و ${CAND[b].name}`;
  compareBtn.onclick = () => runCompareStep();
}

function runCompareStep(){
  const {a,b} = compareSteps[compareIdx];
  const res = majorityPref(a,b);
  const supportNames = res.supporters.map(i=>voterLabel(i)).join(" و ");
  const line1 = document.createElement("div");
  line1.className = "logline";
  line1.innerHTML = `${supportNames}، <strong>${CAND[res.win].name}</strong> را به <strong>${CAND[res.lose].name}</strong> ترجیح می‌دهند.`;
  const line2 = document.createElement("div");
  line2.className = "logline";
  line2.innerHTML = `طبق نظر اکثریت جامعه، <strong>${CAND[res.win].name}</strong>، <strong>${CAND[res.lose].name}</strong> را شکست می‌دهد.`;
  compareLog.appendChild(line1);
  compareLog.appendChild(line2);
  compareIdx++;
  renderCompareBtn();
}

renderCompareBtn();

document.getElementById("btnEndCondorcet").addEventListener("click", ()=>{
  showScreen("screen-gs-intro");
});
