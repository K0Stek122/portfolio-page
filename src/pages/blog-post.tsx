import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Separator } from '../components/ui/separator';
import SEO from '../components/seo';

interface PostData {
    title: string;
    date: string;
    tags: string[];
    content: string;
}

function parseFrontmatter(raw: string): { data: Record<string, string | string[]>; content: string } {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
    if (!match) return { data: {}, content: raw };
    const data: Record<string, string | string[]> = {};
    match[1].split('\n').forEach(line => {
        const colonIdx = line.indexOf(':');
        if (colonIdx === -1) return;
        const key = line.slice(0, colonIdx).trim();
        const val = line.slice(colonIdx + 1).trim();
        if (val.startsWith('[') && val.endsWith(']')) {
            data[key] = val.slice(1, -1).split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
        } else {
            data[key] = val.replace(/^['"]|['"]$/g, '');
        }
    });
    return { data, content: match[2] };
}

const postModules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' });

function getExcerpt(markdown: string, length = 160): string {
    const plain = markdown
        .replace(/```[\s\S]*?```/g, '')
        .replace(/!\[.*?\]\(.*?\)/g, '')
        .replace(/\[(.*?)\]\(.*?\)/g, '$1')
        .replace(/[#*_`>]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
    return plain.length > length ? `${plain.slice(0, length).trim()}…` : plain;
}

export default function BlogPostPage() {
    const [searchParams] = useSearchParams();
    const slug = searchParams.get('slug') ?? '';
    const [post, setPost] = useState<PostData | null>(null);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const key = `../posts/${slug}.md`;
        const loader = postModules[key];
        if (!loader) { setNotFound(true); return; }
        loader().then(raw => {
            const { data, content } = parseFrontmatter(raw as string);
            setPost({
                title: (data.title as string) ?? slug,
                date: (data.date as string) ?? '',
                tags: (data.tags as string[]) ?? [],
                content,
            });
        });
    }, [slug]);

    if (notFound) return (
        <div className="flex items-center justify-center h-dvh bg-background text-foreground">
            <SEO title="Post not found — Kamil Kostrzewa" description="This blog post could not be found." path={`/blog/post?slug=${slug}`} />
            Post not found.
        </div>
    );

    if (!post) return (
        <div className="flex items-center justify-center h-dvh bg-background text-foreground">
            Loading...
        </div>
    );

    return (
        <div className="flex flex-col overflow-x-hidden overflow-y-auto items-center h-dvh w-full bg-background gap-6 py-8 px-4">
            <SEO
                title={`${post.title} — Kamil Kostrzewa`}
                description={getExcerpt(post.content)}
                path={`/blog/post?slug=${slug}`}
                type="article"
            />
            <Breadcrumb className="animate-fadeInUp hover:text-foreground">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-foreground" href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-foreground" href="/blog">Blog</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <span className="text-foreground text-sm">{post.title}</span>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="animate-fadeInUp w-full max-w-3xl flex flex-col gap-3 items-center text-center">
                <h1 className="text-4xl font-extrabold text-foreground">{post.title}</h1>
                <div className="flex items-center gap-4">
                    <span className="text-muted-foreground text-sm">{post.date}</span>
                    <div className="flex gap-1">
                        {post.tags.map(tag => (
                            <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <Separator className="animate-fadeInUp w-full max-w-3xl" />

            <article className="animate-fadeInUp w-full max-w-3xl pb-16 prose prose-invert prose-slate max-w-none text-foreground text-center
                [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mt-8 [&_h1]:mb-4
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mt-6 [&_h2]:mb-3
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mt-4 [&_h3]:mb-2
                [&_p]:text-muted-foreground [&_p]:leading-7 [&_p]:mb-4
                [&_ul]:text-muted-foreground [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
                [&_ol]:text-muted-foreground [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
                [&_li]:mb-1
                [&_code]:bg-muted [&_code]:text-foreground [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
                [&_pre]:bg-muted [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-4
                [&_pre_code]:bg-transparent [&_pre_code]:p-0
                [&_blockquote]:border-l-4 [&_blockquote]:border-border [&_blockquote]:pl-4 [&_blockquote]:text-muted-foreground [&_blockquote]:italic
                [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80
                [&_hr]:border-border">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
        </div>
    );
}
