import type { ReactNode } from 'react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from './ui/dialog';

interface ProjectDialogProps {
    title: string;
    image?: string;
    longDescription: string;
    demoLink?: string;
    githubLink?: string;
}

function DialogLinkButton({ href, variant, children }: { href: string; variant: 'default' | 'outline'; children: ReactNode }) {
    return (
        <Button size="lg" variant={variant} asChild>
            <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
        </Button>
    );
}

export default function ProjectDialog({ title, image, longDescription, demoLink, githubLink }: ProjectDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="secondary" className="transition-transform duration-200 hover:scale-105 hover:cursor-pointer w-full">
                    Learn More
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {image && (
                    <div className="shrink-0 w-4/5 mx-auto">
                        <img src={image} alt={title} className="w-full h-[19.2rem] object-cover rounded-md" />
                    </div>
                )}
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <p className="text-muted-foreground">{longDescription}</p>
                </div>
                {(demoLink || githubLink) && (
                    <DialogFooter className="sm:justify-center">
                        {demoLink && <DialogLinkButton href={demoLink} variant="default">See this in action</DialogLinkButton>}
                        {githubLink && <DialogLinkButton href={githubLink} variant="outline">View GitHub</DialogLinkButton>}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
