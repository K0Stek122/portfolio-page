import { execSync } from 'node:child_process';
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STATIC_ROUTES } from './routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outFile = join(root, 'public/sitemap.xml');

const SITE_URL = 'https://kostek.uk';
const today = new Date().toISOString().slice(0, 10);

function escapeXml(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function lastCommitDate(file) {
    try {
        const output = execSync(`git log -1 --format=%cI -- "${file}"`, { cwd: root, encoding: 'utf-8' }).trim();
        return output ? output.slice(0, 10) : undefined;
    } catch {
        return undefined;
    }
}

function urlEntry(loc, lastmod) {
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
}

// External pages hosted outside this app (e.g. the Jekyll-based blog) that still belong in this
// site's sitemap. No local file to derive `lastmod` from via git, so these use today's date.
const EXTERNAL_URLS = [
    'https://kostek.uk/ambition/',
];

const entries = [
    ...STATIC_ROUTES.map(({ path, file }) => urlEntry(`${SITE_URL}${path}`, lastCommitDate(file) ?? today)),
    ...EXTERNAL_URLS.map(url => urlEntry(url, today)),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

await writeFile(outFile, xml);
console.log(`Generated sitemap.xml with ${entries.length} URLs.`);
