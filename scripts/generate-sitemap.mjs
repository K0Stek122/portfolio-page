import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STATIC_PATHS } from './routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outFile = join(__dirname, '../public/sitemap.xml');

const SITE_URL = 'https://kostek.uk';

function escapeXml(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function urlEntry(loc) {
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n  </url>`;
}

const entries = STATIC_PATHS.map(path => urlEntry(`${SITE_URL}${path}`));

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

await writeFile(outFile, xml);
console.log(`Generated sitemap.xml with ${entries.length} URLs.`);
