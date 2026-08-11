import { Newspaper } from 'lucide-react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from './ui/dialog';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from './ui/tooltip';

interface BlogEntry {
    title: string;
    description: string;
    url?: string;
}

const blogs: BlogEntry[] = [
    {
        title: 'Ambition',
        description: 'Explore productivity and what it means to be — and stay — productive.',
        url: 'https://kostek.uk/ambition/',
    },
    {
        title: 'Computer Whizz',
        description: 'Personal projects, GitHub, and LeetCode — computer science, explored.',
        url: 'https://kostek.uk/computer-whizz/',
    },
    {
        title: 'Math Whizz',
        description: 'Get perplexed and excited by mathematics and analysis.',
    },
    {
        title: 'fp-enthusiast',
        description: 'Fountain pens and notebooks — the art of stationery.',
    },
];

export default function BlogDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default" size="lg">
                    <Newspaper data-icon="inline-start" />
                    Blog
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[90vw] max-w-[30.36rem] h-auto gap-4">
                <DialogHeader>
                    <DialogTitle>Blogs</DialogTitle>
                </DialogHeader>
                <TooltipProvider>
                    <div className="flex flex-col gap-4">
                        {blogs.map((blog) => (
                            <div key={blog.title} className="flex items-center gap-3">
                                {blog.url ? (
                                    <Button
                                        size="sm"
                                        variant="secondary"
                                        className="shrink-0 w-32"
                                        onClick={() => window.open(blog.url, '_blank', 'noopener,noreferrer')}
                                    >
                                        {blog.title}
                                    </Button>
                                ) : (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="shrink-0 w-32 cursor-not-allowed">
                                                <Button size="sm" variant="secondary" disabled className="w-full">
                                                    {blog.title}
                                                </Button>
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>Coming soon!</TooltipContent>
                                    </Tooltip>
                                )}
                                <p className="text-muted-foreground text-sm line-clamp-2 flex-1">{blog.description}</p>
                            </div>
                        ))}
                    </div>
                </TooltipProvider>
            </DialogContent>
        </Dialog>
    );
}
