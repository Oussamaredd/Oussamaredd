// api/banner.js
const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  try {
    const whichParam = (req.query && req.query.which) || "1";
    const which = whichParam === "2" ? "banner2.svg" : "banner.svg";

    // Try a few likely locations (covers most Vercel bundles)
    const candidates = [
      path.join(process.cwd(), "assets", which),
      path.join(process.cwd(), "public", "assets", which),
      path.join(__dirname, "..", "assets", which),
    ];

    let foundPath = null;
    for (const p of candidates) {
      if (fs.existsSync(p)) {
        foundPath = p;
        break;
      }
    }

    // Debug mode: shows what the function can "see"
    if (req.query && req.query.debug === "1") {
      return res.status(200).json({
        which,
        cwd: process.cwd(),
        __dirname,
        candidates,
        foundPath,
        cwdList: safeListDir(process.cwd()),
        assetsList: safeListDir(path.join(process.cwd(), "assets")),
      });
    }

    if (!foundPath) {
      return res.status(500).send(
        [
          `SVG not found: ${which}`,
          `Tried:`,
          ...candidates.map((c) => `- ${c}`),
          ``,
          `Tip: open /api/banner?debug=1 to see bundle paths.`,
        ].join("\n")
      );
    }

    const svg = fs.readFileSync(foundPath, "utf8");

    res.setHeader("Content-Type", "image/svg+xml; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    return res.status(200).send(svg);
  } catch (err) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    return res.status(500).send(err && err.stack ? err.stack : String(err));
  }
};

function safeListDir(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) return { exists: false, dirPath };
    return { exists: true, dirPath, files: fs.readdirSync(dirPath).slice(0, 50) };
  } catch (e) {
    return { exists: "error", dirPath, error: String(e) };
  }
}
