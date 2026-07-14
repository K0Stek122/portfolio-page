import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { STATIC_PATHS } from './routes.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const rawTemplate = await readFile(join(distDir, 'index.html'), 'utf-8');
// Strip the static title/description — each route injects its own via <SEO>.
const template = rawTemplate
    .replace(/<title>[\s\S]*?<\/title>\s*\n?/, '')
    .replace(/<meta name="description"[^>]*>\s*\n?/, '');

const { render } = await import(join(ssrDir, 'entry-server.js').replaceAll('\\', '/'));

function extractHead(appHtml) {
    let head = '';
    let body = appHtml;

    const titleMatch = body.match(/<title>[\s\S]*?<\/title>/);
    if (titleMatch) {
        head += titleMatch[0];
        body = body.replace(titleMatch[0], '');
    }

    for (const tag of body.match(/<(meta|link)\b[^>]*>/g) ?? []) {
        head += tag;
        body = body.replace(tag, '');
    }

    return { head, body };
}

for (const routePath of STATIC_PATHS) {
    const appHtml = render(routePath);
    const { head, body } = extractHead(appHtml);

    const page = template
        .replace('</head>', `${head}</head>`)
        .replace('<div id="root"></div>', `<div id="root">${body}</div>`);

    const outDir = routePath === '/' ? distDir : join(distDir, routePath);
    await mkdir(outDir, { recursive: true });
    await writeFile(join(outDir, 'index.html'), page);
}

await rm(ssrDir, { recursive: true, force: true });

console.log(`Prerendered ${STATIC_PATHS.length} routes.`);
