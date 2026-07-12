import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import { Input } from '../components/ui/input';
import H1 from '../components/typographyh1';
import P from '../components/typographyp';
import { Separator } from '../components/ui/separator';
import SEO from '../components/seo';

interface PostMeta {
    slug: string;
    title: string;
    date: string;
    tags: string[];
}

function parseFrontmatter(raw: string): Record<string, string | string[]> {
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!match) return {};
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
    return data;
}

const postModules = import.meta.glob('../posts/*.md', { query: '?raw', import: 'default' });

export default function BlogPage() {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<PostMeta[]>([]);
    const [titleSearch, setTitleSearch] = useState('');
    const [tagSearch, setTagSearch] = useState('');

    useEffect(() => {
        const load = async () => {
            const loaded: PostMeta[] = [];
            for (const [path, loader] of Object.entries(postModules)) {
                const raw = await loader() as string;
                const data = parseFrontmatter(raw);
                const slug = path.replace('../posts/', '').replace('.md', '');
                loaded.push({
                    slug,
                    title: (data.title as string) ?? slug,
                    date: (data.date as string) ?? '',
                    tags: (data.tags as string[]) ?? [],
                });
            }
            loaded.sort((a, b) => b.date.localeCompare(a.date));
            setPosts(loaded);
        };
        load();
    }, []);

    const filtered = posts
        .filter(p => !titleSearch.trim() || p.title.toLowerCase().includes(titleSearch.toLowerCase()))
        .filter(p => !tagSearch.trim() || p.tags.some(t => t.toLowerCase().includes(tagSearch.toLowerCase())));

    return (
        <div className="flex flex-col overflow-x-hidden overflow-y-auto items-center h-dvh w-full bg-background gap-6 py-8 px-4">
            <SEO
                title="The Mind Palace — Kamil Kostrzewa's Blog"
                description="Articles and notes from Kamil Kostrzewa on software engineering, writing, and more."
                path="/blog"
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
                </BreadcrumbList>
            </Breadcrumb>

            <div className="animate-fadeInUp flex flex-col items-center gap-2 max-w-2xl text-center">
                <H1>The Mind Palace</H1>
                <P>"An investment in knowledge always pays the best interest."</P>
                <P>This blog page is still W.I.P. To view all posts please visit: <a href="https://themindpalace.bearblog.dev/">The Mind Palace</a> </P>
            </div>

            <Separator className="animate-fadeInUp w-full max-w-3xl" />

            <div className="animate-fadeInUp w-full max-w-3xl flex items-center justify-between">
                <div className="flex-1 flex justify-center">
                    <Input
                        placeholder="Search by title..."
                        value={titleSearch}
                        onChange={e => setTitleSearch(e.target.value)}
                        className="w-96"
                    />
                </div>
                <Input
                    placeholder="Search by tag..."
                    value={tagSearch}
                    onChange={e => setTagSearch(e.target.value)}
                    className="w-48"
                />
            </div>

            <div className="animate-fadeInUp w-full max-w-3xl flex flex-col gap-1">
                <div className="grid grid-cols-[120px_1fr_200px] text-muted-foreground text-sm pb-2 border-b border-border">
                    <span>Date</span>
                    <span>Title</span>
                    <span>Tags</span>
                </div>
                {filtered.map(post => (
                    <div
                        key={post.slug}
                        onClick={() => navigate(`/blog/post?slug=${post.slug}`)}
                        className="grid grid-cols-[120px_1fr_200px] py-3 border-b border-border hover:bg-accent hover:text-accent-foreground rounded px-2 cursor-pointer transition-colors duration-150 group"
                    >
                        <span className="text-muted-foreground text-sm self-center">{post.date}</span>
                        <span className="text-foreground group-hover:text-accent-foreground self-center">{post.title}</span>
                        <div className="flex flex-wrap gap-1 self-center">
                            {post.tags.map(tag => (
                                <span key={tag} className="bg-secondary text-secondary-foreground text-xs px-2 py-0.5 rounded-full">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <P className="text-center text-muted-foreground">No posts found.</P>
                )}
            </div>
        </div>
    );
}
