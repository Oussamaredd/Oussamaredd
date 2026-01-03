// api/banner.js  (CommonJS)
module.exports = (req, res) => {
  const which = (req.query?.which || "1").toString();
  const animate = (req.query?.animate || "0").toString() === "1";

  // Palette close to your screenshot
  const palettes = {
    "1": { a: "#5b2a86", b: "#a33a6f", c: "#b11b2a" }, // purple -> pink -> red
    "2": { a: "#1f3a8a", b: "#0ea5e9", c: "#22c55e" }, // blue -> cyan -> green
  };
  const p = palettes[which] || palettes["1"];

  const waveAnim1 = animate
    ? `<animate attributeName="d" dur="9s" repeatCount="indefinite"
        values="
        M0,82 C180,70 360,96 540,86 C720,76 900,98 1080,88 C1220,82 1310,84 1400,86 L1400,120 L0,120 Z;
        M0,86 C180,78 360,92 540,84 C720,82 900,92 1080,84 C1220,78 1310,80 1400,82 L1400,120 L0,120 Z;
        M0,82 C180,70 360,96 540,86 C720,76 900,98 1080,88 C1220,82 1310,84 1400,86 L1400,120 L0,120 Z
        "/>`
    : "";

  const waveAnim2 = animate
    ? `<animate attributeName="d" dur="11s" repeatCount="indefinite"
        values="
        M0,58 C220,46 420,66 620,60 C820,54 1010,70 1200,64 C1300,62 1360,61 1400,62 L1400,0 L0,0 Z;
        M0,62 C220,54 420,64 620,58 C820,52 1010,66 1200,60 C1300,58 1360,57 1400,58 L1400,0 L0,0 Z;
        M0,58 C220,46 420,66 620,60 C820,54 1010,70 1200,64 C1300,62 1360,61 1400,62 L1400,0 L0,0 Z
        "/>`
    : "";

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="1400" height="120" viewBox="0 0 1400 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="banner">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="1400" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${p.a}"/>
      <stop offset="55%" stop-color="${p.b}"/>
      <stop offset="100%" stop-color="${p.c}"/>
    </linearGradient>
    <clipPath id="clip">
      <rect x="0" y="0" width="1400" height="120" rx="12"/>
    </clipPath>
  </defs>

  <rect width="1400" height="120" rx="12" fill="url(#grad)"/>
  <g clip-path="url(#clip)">
    <rect width="1400" height="120" fill="rgba(0,0,0,0.14)"/>

    <path fill="rgba(0,0,0,0.35)"
      d="M0,82 C180,70 360,96 540,86 C720,76 900,98 1080,88 C1220,82 1310,84 1400,86 L1400,120 L0,120 Z">
      ${waveAnim1}
    </path>

    <path fill="rgba(255,255,255,0.10)"
      d="M0,58 C220,46 420,66 620,60 C820,54 1010,70 1200,64 C1300,62 1360,61 1400,62 L1400,0 L0,0 Z">
      ${waveAnim2}
    </path>
  </g>
</svg>`;

  res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.status(200).send(svg);
};
