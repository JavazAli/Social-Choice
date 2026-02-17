/* ===== NAVIGATION & CORE LOGIC ===== */

const screens = [...document.querySelectorAll(".screen")];
const dots = [...document.querySelectorAll(".dot")];
const dock = document.getElementById("dock");

const sectionOrder = [
  "screen-cover",
  "screen-intro",
  "screen-vote",
  "screen-cond1",
  "screen-gs-intro",
  "screen-gs-machine-intro",
  "screen-gs-cond1",
  "screen-gs-cond2",
  "screen-gs-police-intro",
  "screen-gs-punchline",
  "screen-gs-conclusion"
];

const screenToSection = {
  "screen-cover":"screen-cover",
  "screen-intro":"screen-intro",
  "screen-vote":"screen-vote",
  "screen-count":"screen-vote",
  "screen-result":"screen-vote",
  "screen-cond1":"screen-cond1",
  "screen-cond2":"screen-cond1",
  "screen-cond3":"screen-cond1",
  "screen-compare":"screen-cond1",
  "screen-cycle":"screen-cond1",
  "screen-gs-intro":"screen-gs-intro",
  "screen-gs-meet":"screen-gs-intro",
  "screen-gs-dictator":"screen-gs-intro",
  "screen-gs-dict-ballot":"screen-gs-intro",
  "screen-gs-machine-intro":"screen-gs-machine-intro",
  "screen-gs-conditions":"screen-gs-machine-intro",
  "screen-gs-cond1":"screen-gs-cond1",
  "screen-gs-cond1-ballots":"screen-gs-cond1",
  "screen-gs-cond1-result":"screen-gs-cond1",
  "screen-gs-cond1-machine":"screen-gs-cond1",
  "screen-gs-plurality":"screen-gs-cond1",
  "screen-gs-plurality-ex":"screen-gs-cond1",
  "screen-gs-plurality-result":"screen-gs-cond1",
  "screen-gs-borda":"screen-gs-cond1",
  "screen-gs-borda-ex":"screen-gs-cond1",
  "screen-gs-borda-result":"screen-gs-cond1",
  "screen-gs-both-pass":"screen-gs-cond1",
  "screen-gs-cond2":"screen-gs-cond2",
  "screen-gs-police-intro":"screen-gs-police-intro",
  "screen-gs-police-mean":"screen-gs-police-intro",
  "screen-gs-police-median":"screen-gs-police-intro",
  "screen-gs-strategic-intro":"screen-gs-police-intro",
  "screen-gs-strategic-poll":"screen-gs-police-intro",
  "screen-gs-strategic-choice":"screen-gs-police-intro",
  "screen-gs-strategic-result":"screen-gs-police-intro",
  "screen-gs-borda-problem":"screen-gs-punchline",
  "screen-gs-punchline":"screen-gs-punchline",
  "screen-gs-dictator-right":"screen-gs-punchline",
  "screen-gs-theorem":"screen-gs-punchline",
  "screen-gs-conclusion":"screen-gs-conclusion",
  "screen-final":"screen-gs-conclusion"
};

function showScreen(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));

  const sectionId = screenToSection[id] || "screen-cover";
  const currentIdx = sectionOrder.indexOf(sectionId);

  dots.forEach((d, idx) => {
    d.classList.toggle("active", idx <= currentIdx);
    d.classList.toggle("current", d.dataset.target === sectionId);
  });

  dock.classList.toggle("hidden", id === "screen-cover");
  if(id === "screen-compare"){
    resetCompareUI();
  }
  if(id === "screen-gs-conclusion" && typeof initConclusionChars === "function"){
    initConclusionChars();
  }
}


dots.forEach(d => {
  d.addEventListener("click", () => showScreen(d.dataset.target));
});

/* ===== SOUND (Mod 2: autoplay + Mod 3: waveform toggle) ===== */
const bgMusic = document.getElementById("bgMusic");
const btnSound = document.getElementById("btnSound");
const waves = document.getElementById("waves");
const muteX = document.getElementById("muteX");
let soundOn = false;

function updateSoundIcons(){
  // Dock icons
  if(waves) waves.style.display = soundOn ? "" : "none";
  if(muteX) muteX.style.display = soundOn ? "none" : "";
  // Cover icons
  const wavesCover = document.getElementById("wavesCover");
  const muteXCover = document.getElementById("muteXCover");
  if(wavesCover) wavesCover.style.display = soundOn ? "" : "none";
  if(muteXCover) muteXCover.style.display = soundOn ? "none" : "";
}

async function toggleSound(){
  try{
    if(!soundOn){
      await bgMusic.play();
      soundOn = true;
    }else{
      bgMusic.pause();
      soundOn = false;
    }
  }catch(e){
    soundOn = false;
  }
  updateSoundIcons();
}

btnSound.addEventListener("click", toggleSound);
const btnSoundCover = document.getElementById("btnSoundCover");
if(btnSoundCover) btnSoundCover.addEventListener("click", toggleSound);

// Mod 2: Attempt autoplay on load, with click fallback
(function(){
  updateSoundIcons();

  bgMusic.play().then(()=>{
    soundOn = true;
    updateSoundIcons();
  }).catch(()=>{
    function autoPlayOnce(){
      if(soundOn) return;
      bgMusic.play().then(()=>{
        soundOn = true;
        updateSoundIcons();
      }).catch(()=>{});
      document.removeEventListener("click", autoPlayOnce);
    }
    document.addEventListener("click", autoPlayOnce);
  });
})();

/* ===== CONTACT MODAL ===== */
const contactModal = document.getElementById("contactModal");
function openContact(){
  if(typeof initFinalCharacters === "function") initFinalCharacters();
  contactModal.classList.add("active");
  contactModal.setAttribute("aria-hidden","false");
}

document.getElementById("btnContact").addEventListener("click", openContact);
const btnContactCover = document.getElementById("btnContactCover");
if(btnContactCover) btnContactCover.addEventListener("click", openContact);

document.getElementById("closeModal").addEventListener("click", () => {
  contactModal.classList.remove("active");
  contactModal.setAttribute("aria-hidden","true");
});

contactModal.addEventListener("click", (e) => {
  if(e.target === contactModal){
    contactModal.classList.remove("active");
    contactModal.setAttribute("aria-hidden","true");
  }
});

/* ===== PARALLAX ===== */
(function(){
  const mainLayer = document.getElementById("coverMainLayer");
  const tri = document.getElementById("coverTri");
  const cir = document.getElementById("coverCir");
  const sq  = document.getElementById("coverSq");
  let tx = 0, ty = 0;
  let cx = 0, cy = 0;
  function setT(el, x, y){
    if(!el) return;
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }
  window.addEventListener("mousemove", (e)=>{
    const nx = (e.clientX / window.innerWidth) - 0.5;
    const ny = (e.clientY / window.innerHeight) - 0.5;
    tx = nx; ty = ny;
  });
  document.addEventListener("mouseleave", ()=>{
    tx = 0; ty = 0;
  });
  function tick(){
    cx += (tx - cx) * 0.08;
    cy += (ty - cy) * 0.08;
    setT(mainLayer, cx * 14, cy * 10);
    setT(tri,      cx * 22, cy * 18);
    setT(cir,      cx * 18, cy * 16);
    setT(sq,       cx * 16, cy * 14);
    requestAnimationFrame(tick);
  }
  tick();
})();

showScreen("screen-cover");
