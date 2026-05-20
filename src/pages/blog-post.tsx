import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Separator } from '../components/ui/separator';

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
        <div className="flex items-center justify-center h-screen bg-slate-800 text-white">
            Post not found.
        </div>
    );

    if (!post) return (
        <div className="flex items-center justify-center h-screen bg-slate-800 text-white">
            Loading...
        </div>
    );

    return (
        <div className="flex flex-col overflow-x-hidden overflow-y-auto items-center h-screen w-full bg-slate-800 gap-6 py-8 px-4">
            <Breadcrumb className="animate-fadeInUp hover:text-white">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-white" href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-white" href="/blog">Blog</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <span className="text-white text-sm">{post.title}</span>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="animate-fadeInUp w-full max-w-3xl flex flex-col gap-3 items-center text-center">
                <h1 className="text-4xl font-extrabold text-white">{post.title}</h1>
                <div className="flex items-center gap-4">
                    <span className="text-slate-400 text-sm">{post.date}</span>
                    <div className="flex gap-1">
                        {post.tags.map(tag => (
                            <span key={tag} className="bg-slate-600 text-slate-300 text-xs px-2 py-0.5 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <Separator className="animate-fadeInUp w-full max-w-3xl" />

            <article className="animate-fadeInUp w-full max-w-3xl pb-16 prose prose-invert prose-slate max-w-none text-white text-center
                [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-8 [&_h1]:mb-4
                [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-6 [&_h2]:mb-3
                [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-4 [&_h3]:mb-2
                [&_p]:text-slate-300 [&_p]:leading-7 [&_p]:mb-4
                [&_ul]:text-slate-300 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
                [&_ol]:text-slate-300 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
                [&_li]:mb-1
                [&_code]:bg-slate-700 [&_code]:text-slate-200 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm
                [&_pre]:bg-slate-700 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-4
                [&_pre_code]:bg-transparent [&_pre_code]:p-0
                [&_blockquote]:border-l-4 [&_blockquote]:border-slate-500 [&_blockquote]:pl-4 [&_blockquote]:text-slate-400 [&_blockquote]:italic
                [&_a]:text-blue-400 [&_a]:underline [&_a]:hover:text-blue-300
                [&_hr]:border-slate-600">
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
        </div>
    );
}
