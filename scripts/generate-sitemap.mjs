import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const postsDir = join(__dirname, '../src/posts');
const outFile = join(__dirname, '../public/sitemap.xml');

const SITE_URL = 'https://kostek.uk';

const STATIC_PATHS = ['/', '/employers/portfolio', '/blog'];

function parseFrontmatter(raw) {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return {};
    const data = {};
    match[1].split('\n').forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) return;
        const key = line.slice(0, colonIdx).trim();
        const val = line.slice(colonIdx + 1).trim();
        data[key] = val.replace(/^['"]|['"]$/g, '');
    });
    return data;
}

function escapeXml(value) {
    return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function urlEntry(loc, lastmod) {
    return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`;
}

const postFiles = (await readdir(postsDir)).filter(f => f.endsWith('.md'));

const posts = await Promise.all(postFiles.map(async file => {
    const raw = await readFile(join(postsDir, file), 'utf-8');
    const { date } = parseFrontmatter(raw);
    return { slug: file.replace(/\.md$/, ''), date };
}));

const entries = [
    ...STATIC_PATHS.map(path => urlEntry(`${SITE_URL}${path}`)),
    ...posts.map(({ slug, date }) => urlEntry(`${SITE_URL}/blog/post?slug=${slug}`, date)),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

await writeFile(outFile, xml);
console.log(`Generated sitemap.xml with ${entries.length} URLs.`);
