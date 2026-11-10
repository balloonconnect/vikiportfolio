// Pulls the plugin UI (ui.html) from github.com/balloonconnect/global-design-check at a pinned commit
// into public/plugin/ui.html. The only change made to the file is one <link> to Inter so it renders like Figma.
//   node scripts/sync-plugin.mjs            -> fetch the pinned commit from GitHub
//   node scripts/sync-plugin.mjs <ref>      -> fetch another commit/branch/tag
//   node scripts/sync-plugin.mjs --local ~/global-design-check/ui.html
import { readFile, writeFile, mkdir } from "node:fs/promises";

const REPO = "balloonconnect/global-design-check";
const PINNED = "f11626769ba99475f6944fd76b3c2f1294850651";
const args = process.argv.slice(2);
let html, from;
if (args[0] === "--local") { html = await readFile(args[1], "utf8"); from = `local file ${args[1]}`; }
else { const ref = args[0] || PINNED; const r = await fetch(`https://raw.githubusercontent.com/${REPO}/${ref}/ui.html`); if (!r.ok) throw new Error(`GitHub ${r.status} for ${ref}`); html = await r.text(); from = `${REPO}@${ref}`; }
if (!html.includes('href="inter.css"')) html = html.replace("</head>", '<link rel="stylesheet" href="inter.css">\n</head>');
await mkdir("public/plugin", { recursive: true });
await writeFile("public/plugin/ui.html", html);
console.log(`Wrote public/plugin/ui.html (${html.length} bytes) from ${from}`);
