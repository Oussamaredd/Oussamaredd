import fs from "node:fs";
import path from "node:path";

export function GET(request) {
  const url = new URL(request.url);
  const which = url.searchParams.get("which") === "2" ? "banner2.svg" : "banner.svg";

  const filePath = path.join(process.cwd(), "assets", which);

  let svg;
  try {
    svg = fs.readFileSync(filePath, "utf8");
  } catch (err) {
    return new Response(
      `Failed to read ${which} at ${filePath}\n${err?.message ?? err}`,
      { status: 500, headers: { "Content-Type": "text/plain; charset=utf-8" } }
    );
  }

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
