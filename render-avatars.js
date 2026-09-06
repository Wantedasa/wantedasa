// render-avatars.js — WANTEDASA profile avatars
// Run:  node render-avatars.js
// Needs: @resvg/resvg-js  (npm i @resvg/resvg-js)
//
// Produces:
//   avatar.svg        -> circular avatar (transparent corners)  -> avatar.png
//   avatar_square.svg -> square version (fill bg, no transparency) -> avatar_square.png

const fs = require('fs');
const path = require('path');
const { Resvg } = require('@resvg/resvg-js');

const W = 460;

// ---------- shared defs ----------
const DEFS = `
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#06080f"/>
      <stop offset="55%" stop-color="#0b1020"/>
      <stop offset="100%" stop-color="#141a30"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00ffd1"/>
      <stop offset="50%" stop-color="#36a2ff"/>
      <stop offset="100%" stop-color="#b76bff"/>
      <animate attributeName="x1" values="0;1;0" dur="8s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="1;0;1" dur="8s" repeatCount="indefinite"/>
    </linearGradient>
    <linearGradient id="wgrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#00ffd1"/>
      <stop offset="100%" stop-color="#36a2ff"/>
    </linearGradient>
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="7" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#16223a" stroke-width="1"/>
    </pattern>
  </defs>`;

// ---------- circular version ----------
const CIRCLE_SVG = `<svg width="${W}" height="${W}" viewBox="0 0 ${W} ${W}" xmlns="http://www.w3.org/2000/svg" font-family="'Fira Code','Segoe UI',monospace">
${DEFS}
  <clipPath id="cc"><circle cx="230" cy="230" r="220"/></clipPath>
  <g clip-path="url(#cc)">
    <circle cx="230" cy="230" r="220" fill="url(#bg)"/>
    <circle cx="230" cy="230" r="220" fill="url(#grid)" opacity="0.6"/>
    <text x="230" y="290" font-size="250" font-weight="700" text-anchor="middle" fill="url(#wgrad)" filter="url(#glow)" letter-spacing="-6">W</text>
    <rect x="130" y="318" width="200" height="6" rx="3" fill="url(#accent)" filter="url(#glow)">
      <animate attributeName="width" values="130;220;130" dur="4s" repeatCount="indefinite"/>
      <animate attributeName="x" values="165;120;165" dur="4s" repeatCount="indefinite"/>
    </rect>
    <text x="230" y="372" font-size="22" letter-spacing="10" text-anchor="middle" fill="#7d92b3">WANTEDASA</text>
  </g>
  <circle cx="230" cy="230" r="220" fill="none" stroke="url(#accent)" stroke-width="3" opacity="0.9" filter="url(#glow)"/>
</svg>`;

// ---------- square version (filled bg, no transparency) ----------
const SQUARE_SVG = `<svg width="${W}" height="${W}" viewBox="0 0 ${W} ${W}" xmlns="http://www.w3.org/2000/svg" font-family="'Fira Code','Segoe UI',monospace">
${DEFS}
  <rect width="${W}" height="${W}" fill="url(#bg)"/>
  <rect width="${W}" height="${W}" fill="url(#grid)" opacity="0.6"/>
  <rect x="22" y="22" width="416" height="416" rx="28" fill="none" stroke="url(#accent)" stroke-width="2.5" opacity="0.85" filter="url(#glow)"/>
  <text x="230" y="312" font-size="260" font-weight="700" text-anchor="middle" fill="url(#wgrad)" filter="url(#glow)" letter-spacing="-6">W</text>
  <rect x="120" y="338" width="220" height="6" rx="3" fill="url(#accent)" filter="url(#glow)">
    <animate attributeName="width" values="140;240;140" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="x" values="160;110;160" dur="4s" repeatCount="indefinite"/>
  </rect>
  <text x="230" y="392" font-size="20" letter-spacing="10" text-anchor="middle" fill="#7d92b3">WANTEDASA</text>
</svg>`;

function render(svg, outFile, transparent) {
  const r = new Resvg(svg, { background: transparent ? 'transparent' : '#06080f', fitTo: { mode: 'width', value: W } });
  fs.writeFileSync(outFile, r.render().asPng());
  console.log('wrote', outFile);
}

fs.writeFileSync('avatar.svg', CIRCLE_SVG);
fs.writeFileSync('avatar_square.svg', SQUARE_SVG);
render(CIRCLE_SVG, 'avatar.png', true);
render(SQUARE_SVG, 'avatar_square.png', false);
console.log('done.');
