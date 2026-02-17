/* ===== SVG COMPONENTS ===== */

const CAND = {
  tri: { name:"آقای مثلث", desc:"پوپولیست تندرو و عملگرا", color:"var(--tri)" },
  cir: { name:"خانم دایره", desc:"سازش‌کار میانه‌رو و صلح‌طلب", color:"var(--cir)" },
  sq:  { name:"جناب چارچوب", desc:"بروکرات سنتی و محافظه‌کار", color:"var(--sq)" },
  dict:{ name:"آقای دیکتاتور", desc:"معتقد است دموکراسی کارا نیست!", color:"var(--dict)" },
};

function iconSVG(key, mood="normal", size=72){
  if(key==="tri"){
    if(mood==="surprised"){
      return `
      <svg width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M60 10 L108 102 L12 102 Z" fill="var(--tri)" stroke="var(--border)" stroke-width="4"/>
        <circle cx="47" cy="54" r="9" fill="#fff" stroke="var(--border)" stroke-width="3"/>
        <circle cx="73" cy="54" r="9" fill="#fff" stroke="var(--border)" stroke-width="3"/>
        <circle cx="47" cy="54" r="4" fill="var(--border)"/>
        <circle cx="73" cy="54" r="4" fill="var(--border)"/>
        <circle cx="60" cy="76" r="7" fill="#fff" stroke="var(--border)" stroke-width="3"/>
      </svg>`;
    }
    if(mood==="cool"){
      return `
      <svg width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">
        <path d="M60 10 L108 102 L12 102 Z" fill="var(--tri)" stroke="var(--border)" stroke-width="4"/>
        <ellipse cx="45" cy="52" rx="14" ry="8" fill="var(--border)"/>
        <ellipse cx="75" cy="52" rx="14" ry="8" fill="var(--border)"/>
        <path d="M42 74 Q60 88 78 74" fill="none" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
      </svg>`;
    }
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">
      <path d="M60 10 L108 102 L12 102 Z" fill="var(--tri)" stroke="var(--border)" stroke-width="4"/>
      <ellipse cx="45" cy="52" rx="14" ry="8" fill="var(--border)"/>
      <ellipse cx="75" cy="52" rx="14" ry="8" fill="var(--border)"/>
      <path d="M42 74 Q60 88 78 74" fill="none" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
    </svg>`;
  }
  if(key==="cir"){
    if(mood==="surprised"){
      return `
      <svg width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="45" fill="var(--cir)" stroke="var(--border)" stroke-width="4"/>
        <circle cx="45" cy="52" r="9" fill="#fff" stroke="var(--border)" stroke-width="3"/>
        <circle cx="75" cy="52" r="9" fill="#fff" stroke="var(--border)" stroke-width="3"/>
        <circle cx="45" cy="52" r="4" fill="var(--border)"/>
        <circle cx="75" cy="52" r="4" fill="var(--border)"/>
        <circle cx="60" cy="78" r="7" fill="#fff" stroke="var(--border)" stroke-width="3"/>
      </svg>`;
    }
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="45" fill="var(--cir)" stroke="var(--border)" stroke-width="4"/>
      <circle cx="45" cy="52" r="9" fill="#fff"/>
      <circle cx="75" cy="52" r="9" fill="#fff"/>
      <circle cx="45" cy="52" r="4" fill="var(--border)"/>
      <circle cx="75" cy="52" r="4" fill="var(--border)"/>
      <path d="M40 76 Q60 96 80 76" fill="none" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
    </svg>`;
  }
  if(key==="sq"){
    return `
    <svg width="${size}" height="${size}" viewBox="0 0 120 120" aria-hidden="true">
      <rect x="26" y="26" width="68" height="68" fill="var(--sq)" stroke="var(--border)" stroke-width="4"/>
      <polygon points="60,38 54,52 66,52" fill="var(--border)"/>
      <polygon points="54,52 66,52 64,88 56,88" fill="var(--border)"/>
      <line x1="40" y1="58" x2="54" y2="58" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
      <line x1="66" y1="58" x2="80" y2="58" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
      <line x1="44" y1="80" x2="76" y2="80" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
    </svg>`;
  }
  if(key==="dict"){
    return dictatorSVG(size, mood);
  }
  return "";
}

function dictatorSVG(size=100, mood="normal"){
  const smirk = mood==="smug"
    ? `<path d="M58 88 Q75 78 92 88" fill="none" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>`
    : mood==="laugh"
    ? `<path d="M55 84 Q75 100 95 84" fill="none" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
       <path d="M62 90 Q75 96 88 90" fill="#fff" stroke="none"/>`
    : `<path d="M60 88 Q75 80 90 88" fill="none" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>`;

  return `
  <svg width="${size}" height="${size}" viewBox="0 0 150 160" aria-hidden="true">
    <!-- body: pentagon -->
    <polygon points="75,35 120,55 110,110 40,110 30,55" fill="var(--dict)" stroke="var(--border)" stroke-width="4"/>
    <!-- crown -->
    <g style="animation: crownGlow 2s ease-in-out infinite;">
      <polygon points="45,38 55,15 65,30 75,8 85,30 95,15 105,38" fill="#ffd54f" stroke="var(--border)" stroke-width="3"/>
      <circle cx="75" cy="18" r="4" fill="#e53935"/>
      <circle cx="55" cy="24" r="3" fill="#1e88e5"/>
      <circle cx="95" cy="24" r="3" fill="#1e88e5"/>
    </g>
    <!-- monocle -->
    <circle cx="60" cy="65" r="13" fill="#fff" stroke="var(--border)" stroke-width="3"/>
    <circle cx="60" cy="65" r="6" fill="var(--border)"/>
    <line x1="47" y1="65" x2="30" y2="80" stroke="var(--border)" stroke-width="2"/>
    <!-- other eye -->
    <g>
      <ellipse cx="92" cy="65" rx="10" ry="8" fill="var(--border)"/>
    </g>
    <!-- eyebrow -->
    <line x1="82" y1="52" x2="102" y2="48" stroke="var(--border)" stroke-width="3" stroke-linecap="round"/>
    <!-- mouth -->
    ${smirk}
    <!-- mustache -->
    <path d="M62 80 Q75 76 88 80" fill="var(--border)" stroke="none"/>
    <path d="M62 80 Q55 82 52 78" fill="var(--border)" stroke="none"/>
    <path d="M88 80 Q95 82 98 78" fill="var(--border)" stroke="none"/>
    <!-- medal -->
    <circle cx="75" cy="120" r="10" fill="#ffd54f" stroke="var(--border)" stroke-width="2"/>
    <text x="75" y="124" text-anchor="middle" font-size="10" font-weight="900" fill="var(--border)">D</text>
    <path d="M65 108 L75 115 L85 108" fill="#e53935" stroke="none"/>
  </svg>`;
}

function dictatorSVGLarge(mood="normal"){
  return dictatorSVG(140, mood);
}

function candSvg(key, variant="full"){
  const cls = variant === "winner" ? "winner-main" : "";
  if(key === "tri"){
    return `
      <svg class="${cls}" viewBox="0 0 150 150">
        <path d="M 75 20 L 130 120 L 20 120 Z" fill="var(--tri)" stroke="var(--border)" stroke-width="3"/>
        <ellipse cx="60" cy="60" rx="15" ry="8" fill="#2d2d2d"/>
        <ellipse cx="90" cy="60" rx="15" ry="8" fill="#2d2d2d"/>
        <g class="mouth">
          <path d="M 58 88 Q 75 112 92 88" fill="none" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
        </g>
        ${variant==="winner" ? winnerStarsSvg() : ""}
      </svg>`;
  }
  if(key === "cir"){
    return `
      <svg class="${cls}" viewBox="0 0 150 150">
        <circle cx="75" cy="75" r="55" fill="var(--cir)" stroke="var(--border)" stroke-width="3"/>
        <circle cx="58" cy="62" r="10" fill="#fff"/>
        <circle cx="92" cy="62" r="10" fill="#fff"/>
        <circle cx="58" cy="62" r="5" fill="var(--border)"/>
        <circle cx="92" cy="62" r="5" fill="var(--border)"/>
        <g class="mouth">
          <path d="M 52 92 Q 75 114 98 92" fill="none" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
        </g>
        ${variant==="winner" ? winnerStarsSvg() : ""}
      </svg>`;
  }
  if(key === "dict"){
    return `<div class="dict-float">${dictatorSVG(130, "smug")}</div>`;
  }
  return `
    <svg class="${cls}" viewBox="0 0 150 150">
      <rect x="35" y="35" width="80" height="80" fill="var(--sq)" stroke="var(--border)" stroke-width="3"/>
      <polygon points="75,52 69,66 81,66" fill="var(--border)"/>
      <polygon points="69,66 81,66 79,104 71,104" fill="var(--border)"/>
      <line x1="52" y1="70" x2="64" y2="70" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
      <line x1="86" y1="70" x2="98" y2="70" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
      <g class="mouth">
        <path d="M 58 92 Q 75 104 92 92" fill="none" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
      </g>
      ${variant==="winner" ? winnerStarsSvg() : ""}
    </svg>`;
}

function winnerStarsSvg(){
  return `
    <g>
      <path class="star" style="--sx:6px;--sy:-6px;animation-delay:.0s" d="M124 40 L128 50 L139 51 L130 58 L133 69 L124 63 L115 69 L118 58 L109 51 L120 50 Z" fill="#ffd54f" stroke="var(--border)" stroke-width="2"/>
      <path class="star" style="--sx:-6px;--sy:6px;animation-delay:.15s" d="M22 52 L25 60 L34 61 L27 66 L29 75 L22 70 L15 75 L17 66 L10 61 L19 60 Z" fill="#ffd54f" stroke="var(--border)" stroke-width="2"/>
      <path class="star" style="--sx:7px;--sy:7px;animation-delay:.25s" d="M120 108 L123 116 L132 117 L125 122 L127 131 L120 126 L113 131 L115 122 L108 117 L117 116 Z" fill="#ffd54f" stroke="var(--border)" stroke-width="2"/>
      <path class="star" style="--sx:-7px;--sy:-5px;animation-delay:.35s" d="M30 106 L33 114 L42 115 L35 120 L37 129 L30 124 L23 129 L25 120 L18 115 L27 114 Z" fill="#ffd54f" stroke="var(--border)" stroke-width="2"/>
    </g>`;
}

/* Voting Machine SVG */
function votingMachineSVG(size=200, showOutput=false, outputName=""){
  return `
  <svg width="${size}" height="${size * 1.2}" viewBox="0 0 200 240" aria-hidden="true" class="machine-idle">
    <!-- Machine body -->
    <rect x="30" y="40" width="140" height="140" rx="12" fill="#fff" stroke="var(--border)" stroke-width="4"/>
    <!-- Screen -->
    <rect x="50" y="55" width="100" height="50" rx="6" fill="#e8eaf6" stroke="var(--border)" stroke-width="3"/>
    <!-- Screen content -->
    <text x="100" y="78" text-anchor="middle" font-size="11" font-weight="700" fill="var(--border)">ماشین رای‌گیری</text>
    <text x="100" y="95" text-anchor="middle" font-size="9" fill="var(--border)" opacity=".7">مکانیزم انتخابات</text>
    <!-- Slot -->
    <rect x="65" y="115" width="70" height="10" rx="5" fill="var(--border)" opacity=".3">
      <animate attributeName="opacity" values=".3;.7;.3" dur="2s" repeatCount="indefinite"/>
    </rect>
    <!-- Lever -->
    <g transform="translate(170,80)">
      <line x1="0" y1="0" x2="0" y2="-30" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
      <circle cx="0" cy="-34" r="8" fill="#e53935" stroke="var(--border)" stroke-width="3"/>
    </g>
    <!-- Gears -->
    <circle cx="60" cy="150" r="12" fill="none" stroke="var(--border)" stroke-width="2" opacity=".4">
      <animateTransform attributeName="transform" type="rotate" from="0 60 150" to="360 60 150" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="82" cy="158" r="8" fill="none" stroke="var(--border)" stroke-width="2" opacity=".4">
      <animateTransform attributeName="transform" type="rotate" from="360 82 158" to="0 82 158" dur="3s" repeatCount="indefinite"/>
    </circle>
    <!-- Buttons -->
    <circle cx="110" cy="148" r="6" fill="var(--tri)" stroke="var(--border)" stroke-width="2"/>
    <circle cx="128" cy="148" r="6" fill="var(--cir)" stroke="var(--border)" stroke-width="2"/>
    <circle cx="146" cy="148" r="6" fill="var(--sq)" stroke="var(--border)" stroke-width="2"/>
    <!-- Output slot -->
    <rect x="60" y="180" width="80" height="8" rx="4" fill="var(--border)" opacity=".2"/>
    ${showOutput ? `
    <g style="animation: paperOut .5s ease both;">
      <rect x="70" y="190" width="60" height="40" rx="4" fill="#fff" stroke="var(--border)" stroke-width="2"/>
      <text x="100" y="215" text-anchor="middle" font-size="11" font-weight="900" fill="var(--border)">${outputName}</text>
    </g>` : ""}
  </svg>`;
}





/* Final page fantasy avatars (project creators) - head only */
function creatorOneSVG(size=108){
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 170 160" aria-hidden="true">
    <ellipse cx="84" cy="148" rx="34" ry="8" fill="rgba(0,0,0,.12)"/>
    <circle cx="84" cy="82" r="46" fill="#f0d0ad" stroke="var(--border)" stroke-width="4"/>
    <path d="M28 88 Q16 56 34 38 Q52 20 80 20 Q112 20 132 42 Q148 60 140 92 Q124 72 106 64 Q84 54 60 62 Q40 69 28 88" fill="#22262d" stroke="var(--border)" stroke-width="3.3"/>
    <path d="M30 84 Q44 112 66 124" fill="none" stroke="#22262d" stroke-width="9" stroke-linecap="round"/>
    <path d="M139 84 Q126 112 104 124" fill="none" stroke="#22262d" stroke-width="9" stroke-linecap="round"/>
    <path d="M44 65 Q60 54 76 59" fill="none" stroke="var(--border)" stroke-width="3" stroke-linecap="round"/>
    <path d="M92 59 Q108 54 124 65" fill="none" stroke="var(--border)" stroke-width="3" stroke-linecap="round"/>
    <rect x="43" y="69" width="40" height="24" rx="11" fill="none" stroke="var(--border)" stroke-width="3"/>
    <rect x="85" y="69" width="40" height="24" rx="11" fill="none" stroke="var(--border)" stroke-width="3"/>
    <line x1="83" y1="81" x2="85" y2="81" stroke="var(--border)" stroke-width="3"/>
    <circle cx="62" cy="81" r="4" fill="var(--border)"/>
    <circle cx="105" cy="81" r="4" fill="var(--border)"/>
    <path d="M66 99 Q84 111 102 99" fill="none" stroke="var(--border)" stroke-width="3" stroke-linecap="round"/>
    <path d="M64 103 Q84 118 104 103" fill="none" stroke="var(--border)" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M68 114 Q84 122 100 114" fill="none" stroke="var(--border)" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M60 93 Q84 88 108 93" fill="none" stroke="var(--border)" stroke-width="2.3" stroke-linecap="round"/>
  </svg>`;
}

function creatorTwoSVG(size=108){
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 170 160" aria-hidden="true">
    <ellipse cx="84" cy="148" rx="34" ry="8" fill="rgba(0,0,0,.12)"/>
    <circle cx="84" cy="82" r="46" fill="#f3d7bc" stroke="var(--border)" stroke-width="4"/>
    <path d="M36 84 Q30 54 50 40 Q67 28 90 33 Q117 39 132 59 Q111 51 89 51 Q64 51 47 64 Q40 69 36 84" fill="#141414" stroke="var(--border)" stroke-width="3.3"/>
    <path d="M34 85 Q36 63 50 52" fill="none" stroke="#141414" stroke-width="6.5" stroke-linecap="round"/>
    <path d="M48 67 Q61 59 74 62" fill="none" stroke="var(--border)" stroke-width="3" stroke-linecap="round"/>
    <path d="M94 62 Q107 59 120 67" fill="none" stroke="var(--border)" stroke-width="3" stroke-linecap="round"/>
    <rect x="42" y="71" width="37" height="22" rx="10" fill="none" stroke="var(--border)" stroke-width="3"/>
    <rect x="89" y="71" width="37" height="22" rx="10" fill="none" stroke="var(--border)" stroke-width="3"/>
    <line x1="79" y1="82" x2="89" y2="82" stroke="var(--border)" stroke-width="3"/>
    <circle cx="60" cy="82" r="4" fill="var(--border)"/>
    <circle cx="108" cy="82" r="4" fill="var(--border)"/>
    <path d="M72 101 Q84 95 96 101" fill="none" stroke="var(--border)" stroke-width="3" stroke-linecap="round"/>
    <path d="M70 106 Q84 118 98 106" fill="none" stroke="var(--border)" stroke-width="2.8" stroke-linecap="round"/>
    <path d="M66 96 Q84 104 102 96" fill="none" stroke="var(--border)" stroke-width="2.4" stroke-linecap="round"/>
    <path d="M68 114 Q84 121 100 114" fill="none" stroke="var(--border)" stroke-width="2.4" stroke-linecap="round"/>
  </svg>`;
}

/* Social order police character SVG */
function socialPoliceSVG(size=92){
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 140 150" aria-hidden="true">
    <ellipse cx="70" cy="136" rx="34" ry="8" fill="rgba(0,0,0,.1)"/>
    <path d="M32 88 Q70 72 108 88 L100 124 Q70 138 40 124 Z" fill="#90caf9" stroke="var(--border)" stroke-width="4"/>
    <rect x="61" y="90" width="18" height="24" rx="6" fill="#fff" stroke="var(--border)" stroke-width="3"/>
    <circle cx="70" cy="58" r="28" fill="#ffe0b2" stroke="var(--border)" stroke-width="4"/>
    <path d="M48 56 Q58 40 70 40 Q82 40 92 56" fill="none" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
    <circle cx="60" cy="60" r="4" fill="var(--border)"/>
    <circle cx="80" cy="60" r="4" fill="var(--border)"/>
    <path d="M59 74 Q70 82 81 74" fill="none" stroke="var(--border)" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M42 47 L70 24 L98 47 L92 60 L48 60 Z" fill="#1e88e5" stroke="var(--border)" stroke-width="4"/>
    <rect x="58" y="42" width="24" height="8" rx="4" fill="#fff" stroke="var(--border)" stroke-width="2"/>
    <path d="M54 105 L40 128" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
    <path d="M86 105 L100 128" stroke="var(--border)" stroke-width="4" stroke-linecap="round"/>
    <rect x="36" y="121" width="14" height="7" rx="3" fill="var(--border)"/>
    <rect x="92" y="121" width="14" height="7" rx="3" fill="var(--border)"/>
  </svg>`;
}

/* Police car SVG */
function policeCarSVG(size=60){
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 60 50" aria-hidden="true">
    <rect x="5" y="20" width="50" height="20" rx="6" fill="#1e88e5" stroke="var(--border)" stroke-width="2"/>
    <rect x="12" y="10" width="36" height="16" rx="4" fill="#fff" stroke="var(--border)" stroke-width="2"/>
    <!-- light -->
    <rect x="24" y="5" width="12" height="8" rx="3" fill="#e53935" stroke="var(--border)" stroke-width="2">
      <animate attributeName="fill" values="#e53935;#1e88e5;#e53935" dur="1s" repeatCount="indefinite"/>
    </rect>
    <!-- wheels -->
    <circle cx="18" cy="40" r="5" fill="var(--border)"/>
    <circle cx="42" cy="40" r="5" fill="var(--border)"/>
    <!-- window -->
    <rect x="18" y="14" width="10" height="8" rx="2" fill="#e3f2fd" stroke="var(--border)" stroke-width="1"/>
    <rect x="32" y="14" width="10" height="8" rx="2" fill="#e3f2fd" stroke="var(--border)" stroke-width="1"/>
  </svg>`;
}

/* House SVG for police game */
function houseSVG(pos, isSelected=false, color="#fff"){
  const fill = isSelected ? "#e3f2fd" : color;
  return `
  <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true" class="house-svg">
    <polygon points="22,4 40,18 40,40 4,40 4,18" fill="${fill}" stroke="var(--border)" stroke-width="2"/>
    <rect x="16" y="26" width="12" height="14" fill="#fff" stroke="var(--border)" stroke-width="1.5"/>
    <text x="22" y="22" text-anchor="middle" font-size="10" font-weight="900" fill="var(--border)">${pos}</text>
  </svg>`;
}

/* Brain/Logic SVG */
function brainSVG(size=50){
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 50 50" aria-hidden="true">
    <path d="M25 8 C15 8 8 16 8 24 C8 30 12 35 18 38 L18 42 L32 42 L32 38 C38 35 42 30 42 24 C42 16 35 8 25 8Z" fill="#fff9c4" stroke="var(--border)" stroke-width="2"/>
    <path d="M25 14 L25 32" stroke="var(--border)" stroke-width="2" stroke-linecap="round"/>
    <path d="M18 20 C18 16 25 14 25 20" stroke="var(--border)" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M32 20 C32 16 25 14 25 20" stroke="var(--border)" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M18 28 C18 24 25 22 25 28" stroke="var(--border)" stroke-width="2" fill="none" stroke-linecap="round"/>
    <path d="M32 28 C32 24 25 22 25 28" stroke="var(--border)" stroke-width="2" fill="none" stroke-linecap="round"/>
  </svg>`;
}

/* Heart SVG */
function heartSVG(size=50){
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 50 50" aria-hidden="true">
    <path d="M25 42 C15 34 4 26 4 16 C4 10 9 5 15 5 C19 5 23 7 25 11 C27 7 31 5 35 5 C41 5 46 10 46 16 C46 26 35 34 25 42Z" fill="#ff8a80" stroke="var(--border)" stroke-width="2"/>
  </svg>`;
}

/* Scale/Justice SVG */
function scaleSVG(size=60){
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 60 60" aria-hidden="true">
    <line x1="30" y1="8" x2="30" y2="50" stroke="var(--border)" stroke-width="3" stroke-linecap="round"/>
    <rect x="22" y="48" width="16" height="6" rx="2" fill="var(--border)"/>
    <line x1="8" y1="22" x2="52" y2="22" stroke="var(--border)" stroke-width="3" stroke-linecap="round"/>
    <path d="M8 22 L4 36 L16 36 Z" fill="#fff9c4" stroke="var(--border)" stroke-width="2"/>
    <path d="M52 22 L44 36 L56 36 Z" fill="#c8e6c9" stroke="var(--border)" stroke-width="2"/>
  </svg>`;
}

/* Checkmark SVG */
function checkSVG(size=24){
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#c8e6c9" stroke="var(--border)" stroke-width="2"/>
    <path d="M7 12 L10.5 15.5 L17 9" fill="none" stroke="var(--border)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

/* Cross SVG */
function crossSVG(size=24){
  return `
  <svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" fill="#ff8a80" stroke="var(--border)" stroke-width="2"/>
    <path d="M8 8 L16 16 M16 8 L8 16" fill="none" stroke="var(--border)" stroke-width="2.5" stroke-linecap="round"/>
  </svg>`;
}
