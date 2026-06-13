import React from "react";

// Saweria Hero Mascot SVG
export const HeroMascot: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 500 320"
      className={`w-full max-w-[400px] h-auto drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circles or simple playful elements */}
      <circle cx="210" cy="180" r="10" fill="#FFD166" opacity="0.3" />
      <path d="M 120,80 L 125,75 L 122,85 Z" fill="#E63946" />
      <path d="M 380,105 L 388,102 L 384,112 Z" fill="#4EA8DE" />
      <circle cx="106" cy="160" r="4" fill="#FF9F1C" />
      <circle cx="390" cy="150" r="3" fill="#E63946" />

      {/* The Red Chicken Mascot (Behind, centered-right) */}
      <g id="chicken-hero">
        {/* Legs */}
        <line x1="285" y1="180" x2="285" y2="240" stroke="#000" strokeWidth="4" strokeLinecap="round" />
        <line x1="300" y1="180" x2="300" y2="240" stroke="#000" strokeWidth="4" strokeLinecap="round" />
        {/* Feet */}
        <path d="M 275,240 L 290,240 M 285,240 L 285,245" stroke="#000" strokeWidth="4" strokeLinecap="round" />
        <path d="M 290,240 L 305,240 M 300,240 L 300,245" stroke="#000" strokeWidth="4" strokeLinecap="round" />
        
        {/* Body (Quirky red peanut shape) */}
        <path
          d="M 280,120 C 260,140 260,180 275,200 C 285,210 305,210 312,195 C 322,175 315,140 295,125 C 290,122 285,118 280,120 Z"
          fill="#E63946"
          stroke="#000"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />
        
        {/* Head Comb (Rebound red lobes) */}
        <path d="M 285,120 Q 280,105 288,100 Q 295,108 293,120" fill="#D90429" stroke="#000" strokeWidth="4" />
        <path d="M 293,118 Q 295,100 302,103 Q 306,110 298,122" fill="#D90429" stroke="#000" strokeWidth="4" />
        
        {/* Eyes (Googly, uneven) */}
        <circle cx="282" cy="140" r="13" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
        <circle cx="280" cy="140" r="5" fill="#000000" />
        
        <circle cx="301" cy="144" r="10" fill="#FFFFFF" stroke="#000" strokeWidth="3" />
        <circle cx="303" cy="144" r="4" fill="#000000" />
        
        {/* Beak */}
        <path d="M 290,152 L 294,166 L 282,157 Z" fill="#FFB703" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
        
        {/* Wattles (Red hanging skin under beak) */}
        <path d="M 288,165 C 285,175 293,178 293,165" fill="#D90429" stroke="#000" strokeWidth="2.5" />
      </g>

      {/* The Yellow Striped Tiger Mascot (Bottom, Centered-Left) */}
      <g id="tiger-hero">
        {/* Ears */}
        <path d="M 185,115 C 170,95 195,85 205,105 Z" fill="#FF9F1C" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 190,111 C 180,100 195,95 200,106" fill="#FFBF69" stroke="#000" strokeWidth="3" />
        
        <path d="M 255,110 C 270,90 245,80 235,100 Z" fill="#FF9F1C" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 250,106 C 260,95 245,90 240,101" fill="#FFBF69" stroke="#000" strokeWidth="3" />

        {/* Head / Body rounded base */}
        <path
          d="M 180,170 C 175,130 265,125 260,170 C 265,220 175,220 180,170 Z"
          fill="#FF9F1C"
          stroke="#000"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Inner Muzzle plate */}
        <path
          d="M 200,175 C 195,190 245,190 240,175 C 240,165 200,165 200,175 Z"
          fill="#FFF"
          stroke="#000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Nose */}
        <path d="M 215,168 L 225,168 L 220,175 Z" fill="#D90429" stroke="#000" strokeWidth="3" strokeLinejoin="round" />
        {/* Mouth line */}
        <path d="M 220,175 L 220,183 C 215,185 210,185 208,181 M 220,183 C 225,185 230,185 232,181" stroke="#000" strokeWidth="3" strokeLinecap="round" />

        {/* Cheeks blush circles */}
        <ellipse cx="195" cy="165" rx="6" ry="4" fill="#FF8A8A" />
        <ellipse cx="245" cy="162" rx="6" ry="4" fill="#FF8A8A" />

        {/* Eyes (Happy winking / rounded squint) */}
        <path d="M 194,152 C 196,145 205,145 207,152" stroke="#000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M 233,150 C 235,143 244,143 246,150" stroke="#000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <circle cx="200.5" cy="151" r="1.5" fill="#000" />
        <circle cx="239.5" cy="149" r="1.5" fill="#000" />

        {/* Stripes */}
        <path d="M 180,160 L 192,162 M 180,170 L 190,171 M 181,180 L 189,178" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 260,155 L 248,157 M 260,165 L 250,166 M 259,175 L 251,173" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M 220,126 L 220,138 M 214,127 L 215,134 M 226,127 L 225,134" stroke="#000" strokeWidth="3" strokeLinecap="round" />

        {/* Paws */}
        <path
          d="M 190,200 C 185,210 205,218 210,205 Z"
          fill="#FF9F1C"
          stroke="#000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path
          d="M 250,196 C 255,206 235,214 230,201 Z"
          fill="#FF9F1C"
          stroke="#000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
      </g>

      {/* The Blue Cat Mascot (Left) */}
      <g id="blue-cat-hero">
        {/* Tail */}
        <path
          d="M 125,230 C 100,240 85,220 90,205 C 95,190 110,200 115,215"
          stroke="#000"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Ears */}
        <path d="M 115,135 L 110,105 L 132,125 Z" fill="#4EA8DE" stroke="#000" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 118,131 L 115,115 L 128,125" fill="#FEEAFA" />
        
        <path d="M 168,125 L 175,95 L 152,118 Z" fill="#4EA8DE" stroke="#000" strokeWidth="3.5" strokeLinejoin="round" />
        <path d="M 163,122 L 168,105 L 154,118" fill="#FEEAFA" />

        {/* Body/Head base */}
        <path
          d="M 110,180 C 105,145 175,135 170,180 C 175,215 105,215 110,180 Z"
          fill="#4EA8DE"
          stroke="#000"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Face Inner Area */}
        <path
          d="M 122,185 C 122,165 158,165 158,185 C 158,198 122,198 122,185 Z"
          fill="#FFF"
          stroke="#000"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Eyes (Big, playful) */}
        <circle cx="128" cy="160" r="10" fill="#FFF" stroke="#000" strokeWidth="3.5" />
        <path d="M 125,157 A 3,3 0 0,0 131,161" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="127" cy="159" r="4.5" fill="#000" />
        <circle cx="125.5" cy="157.5" r="1.5" fill="#FFF" />

        <circle cx="152" cy="157" r="10" fill="#FFF" stroke="#000" strokeWidth="3.5" />
        <path d="M 149,154 A 3,3 0 0,0 155,158" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="151" cy="156" r="4.5" fill="#000" />
        <circle cx="149.5" cy="154.5" r="1.5" fill="#FFF" />

        {/* Nose */}
        <polygon points="138,172 142,172 140,175" fill="#E63946" stroke="#000" strokeWidth="2" />
        
        {/* Whiskers */}
        <line x1="110" y1="175" x2="98" y2="173" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <line x1="112" y1="184" x2="100" y2="185" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        
        <line x1="170" y1="172" x2="182" y2="169" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <line x1="168" y1="181" x2="180" y2="181" stroke="#000" strokeWidth="3" strokeLinecap="round" />

        {/* Hands/Paws reaching upward */}
        <path d="M 125,200 Q 130,205 135,198" stroke="#000" strokeWidth="3" />
        <path d="M 155,198 Q 150,203 145,196" stroke="#000" strokeWidth="3" />
      </g>
    </svg>
  );
};

// Saweria Tiger with Heart Card SVG
export const TigerHeartMascot: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 200 180"
      className={`w-full max-w-[200px] h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Pink Floating Heart Thought Bubble on Top Right */}
      <g id="thought-bubble-heart">
        <path
          d="M 148,45 C 138,45 133,35 143,25 C 153,10 178,10 183,28 C 185,42 165,55 148,45 Z"
          fill="#FFF"
          stroke="#000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Floating tiny bubble */}
        <circle cx="132" cy="54" r="5" fill="#FFF" stroke="#000" strokeWidth="2.5" />
        <circle cx="124" cy="64" r="3" fill="#FFF" stroke="#000" strokeWidth="2" />
        
        {/* Heart in bubble */}
        <path
          d="M 158,23 C 158,19 154,19 152,21 C 150,19 146,19 146,23 C 146,27 151,31 152,32 C 153,31 158,27 158,23 Z"
          fill="#E63946"
          stroke="#000"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>

      {/* Yellow Striped Tiger */}
      <g id="tiger-body">
        {/* Ears */}
        <path d="M 50,75 C 32,55 60,40 70,60 Z" fill="#FF9F1C" stroke="#000" strokeWidth="4.5" strokeLinejoin="round" />
        <path d="M 56,71 C 45,58 60,50 65,62" fill="#FFBF69" stroke="#000" strokeWidth="3" />

        <path d="M 130,75 C 148,55 120,40 110,60 Z" fill="#FF9F1C" stroke="#000" strokeWidth="4.5" strokeLinejoin="round" />
        <path d="M 124,71 C 135,58 120,50 115,62" fill="#FFBF69" stroke="#000" strokeWidth="3" />

        {/* Master Head */}
        <path
          d="M 45,130 C 35,80 145,80 135,130 C 142,180 38,180 45,130 Z"
          fill="#FF9F1C"
          stroke="#000"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* White core snout plate */}
        <path
          d="M 68,135 C 63,155 117,155 112,135 C 112,122 68,122 68,135 Z"
          fill="#FFFFFC"
          stroke="#000"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Eyes (Cute closed-happy eyes that look down/curved) */}
        <path d="M 62,112 C 67,105 77,105 82,112" stroke="#000" strokeWidth="4.5" strokeLinecap="round" fill="none" />
        <path d="M 103,112 C 108,105 118,105 123,112" stroke="#000" strokeWidth="4.5" strokeLinecap="round" fill="none" />

        {/* Cheeks blush */}
        <circle cx="58" cy="126" r="7" fill="#FF8D8D" />
        <circle cx="122" cy="126" r="7" fill="#FF8D8D" />

        {/* Little nose */}
        <polygon points="87,126 93,126 90,131" fill="#E63946" stroke="#000" strokeWidth="3.5" strokeLinejoin="round" />
        
        {/* Mouth */}
        <path d="M 90,131 L 90,138 C 84,141 80,140 78,136 M 90,138 C 96,141 100,140 102,136" stroke="#000" strokeWidth="3.5" strokeLinecap="round" fill="none" />

        {/* Tiger Stripes */}
        {/* Forehead */}
        <path d="M 90,86 L 90,100 M 83,88 L 84,95 M 97,88 L 96,95" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
        {/* Left side */}
        <path d="M 45,115 L 58,118 M 44,127 L 55,129 M 46,138 L 54,136" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
        {/* Right side */}
        <path d="M 135,115 L 122,118 M 136,127 L 125,129 M 134,138 L 126,136" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />

        {/* Two little paws */}
        <path
          d="M 58,162 C 54,172 70,180 75,166 M 122,162 C 126,172 110,180 105,166"
          stroke="#000"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
};

// Saweria Blue Lemur/Squirrel Mascot with Big Eyes SVG
export const SquirrelMascot: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 160 160"
      className={`w-full max-w-[150px] h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Big Striped Tail */}
      <path
        d="M 115,130 C 145,130 155,90 145,70 C 135,50 115,65 115,85 C 115,100 130,110 110,125"
        stroke="#000"
        strokeWidth="4.5"
        fill="#FF9F1C" // Cute yellow/orange tail contrasts with the blue squirrel
        strokeLinejoin="round"
      />
      {/* Tail stripes */}
      <path d="M 134,80 C 138,82 142,86 144,92" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 125,98 C 132,100 138,104 140,112" stroke="#000" strokeWidth="3.5" strokeLinecap="round" />

      {/* Squirrel Body */}
      <g id="lemur-head">
        {/* Ears */}
        <path d="M 32,58 Q 15,35 40,40 Z" fill="#4EA8DE" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
        <path d="M 88,52 Q 105,29 80,36 Z" fill="#4EA8DE" stroke="#000" strokeWidth="4" strokeLinejoin="round" />
        
        {/* Core Head */}
        <path
          d="M 25,90 C 20,60 100,55 95,90 C 100,125 20,125 25,90 Z"
          fill="#4EA8DE"
          stroke="#000"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Big expressive round eyes */}
        <circle cx="45" cy="78" r="14" fill="#FFFFFF" stroke="#000" strokeWidth="3.5" />
        <circle cx="47" cy="78" r="7" fill="#000000" />
        <circle cx="44" cy="74" r="2.5" fill="#FFFFFF" />

        <circle cx="80" cy="74" r="14" fill="#FFFFFF" stroke="#000" strokeWidth="3.5" />
        <circle cx="78" cy="74" r="7" fill="#000000" />
        <circle cx="75" cy="70" r="2.5" fill="#FFFFFF" />

        {/* Blush cheeks */}
        <ellipse cx="34" cy="94" rx="5" ry="3.5" fill="#FF8D8D" />
        <ellipse cx="88" cy="90" rx="5" ry="3.5" fill="#FF8D8D" />

        {/* Tiny nose */}
        <polygon points="61,85 65,85 63,88" fill="#E63946" stroke="#000" strokeWidth="2.5" />

        {/* Smiling Whiskers */}
        <line x1="24" y1="92" x2="14" y2="92" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <line x1="26" y1="99" x2="16" y2="101" stroke="#000" strokeWidth="3" strokeLinecap="round" />

        <line x1="94" y1="88" x2="104" y2="86" stroke="#000" strokeWidth="3" strokeLinecap="round" />
        <line x1="92" y1="95" x2="102" y2="97" stroke="#000" strokeWidth="3" strokeLinecap="round" />

        {/* Chubby Hands reaching out */}
        <path d="M 40,116 C 45,124 55,124 60,116" stroke="#000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
};

// Quirky Red Chicken/Rooster Mascot SVG
export const RoosterMascot: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <svg
      viewBox="0 0 160 180"
      className={`w-full max-w-[120px] h-auto ${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Tall legs */}
      <line x1="70" y1="120" x2="70" y2="165" stroke="#000" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="88" y1="120" x2="88" y2="165" stroke="#000" strokeWidth="4.5" strokeLinecap="round" />
      {/* Feet */}
      <path d="M 60,165 L 76,165 M 70,165 L 70,172" stroke="#000" strokeWidth="4" strokeLinecap="round" />
      <path d="M 82,165 L 98,165 M 88,165 L 88,172" stroke="#000" strokeWidth="4" strokeLinecap="round" />

      {/* Pear shaped red body */}
      <path
        d="M 75,50 C 50,75 45,125 75,130 C 105,125 100,75 83,52 C 80,48 78,46 75,50 Z"
        fill="#E63946"
        stroke="#000"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* Yellow beak */}
      <path d="M 78,92 L 85,108 L 72,100 Z" fill="#FFB703" stroke="#000" strokeWidth="4" strokeLinejoin="round" />

      {/* Googly uneven eyes */}
      <circle cx="65" cy="78" r="14" fill="#FFFFFF" stroke="#000" strokeWidth="4" />
      <circle cx="63" cy="78" r="6" fill="#000000" />
      <circle cx="61" cy="75" r="2.5" fill="#FFFFFF" />

      <circle cx="88" cy="82" r="10" fill="#FFFFFF" stroke="#000" strokeWidth="3.5" />
      <circle cx="91" cy="82" r="5" fill="#000000" />
      <circle cx="89" cy="79" r="2" fill="#FFFFFF" />

      {/* Red Comb */}
      <path d="M 74,48 Q 63,30 75,25 Q 85,35 80,48" fill="#C30F2E" stroke="#000" strokeWidth="3.5" />
      <path d="M 80,46 Q 88,32 94,36 Q 96,44 84,50" fill="#C30F2E" stroke="#000" strokeWidth="3.5" />

      {/* Little white wings on the sides */}
      <path d="M 52,105 Q 42,98 48,90 Q 56,92 53,103" fill="#E63946" stroke="#000" strokeWidth="3" />
      <path d="M 103,102 Q 113,95 107,88 Q 99,90 102,100" fill="#E63946" stroke="#000" strokeWidth="3" />
    </svg>
  );
};
