import fs from "node:fs";
import path from "node:path";

export function GET(request) {
  const url = new URL(request.url);

  const which = url.searchParams.get("which") === "2" ? "banner2.svg" : "banner.svg";
  const filePath = path.join(process.cwd(), "assets", which);

  const svg = fs.readFileSync(filePath, "utf8");

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400"
    }
  });
}
