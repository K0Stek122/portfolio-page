import type { ReactNode } from 'react';
import { GraduationCap, type LucideIcon } from 'lucide-react';
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
    icon?: LucideIcon;
    longDescription: string[];
    demoLink?: string;
    githubLink?: string;
}

function DialogLinkButton({ href, children }: { href: string; children: ReactNode }) {
    return (
        <Button size="lg" variant="default" asChild>
            <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>
        </Button>
    );
}

export default function ProjectDialog({ title, image, icon: Icon, longDescription, demoLink, githubLink }: ProjectDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" variant="secondary" className="transition-transform duration-200 hover:scale-105 hover:cursor-pointer w-full">
                    Learn More
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        {Icon && (
                            <div className="shrink-0 flex items-center justify-center size-8 rounded-md bg-primary/10 text-primary">
                                <Icon className="size-4" />
                            </div>
                        )}
                        <DialogTitle>{title}</DialogTitle>
                    </div>
                </DialogHeader>
                {image ? (
                    <div className="shrink-0 w-4/5 mx-auto">
                        <img src={image} alt={title} className="w-full h-[19.2rem] object-cover rounded-md" />
                    </div>
                ) : !Icon && (
                    <div className="shrink-0 w-4/5 mx-auto h-[19.2rem] flex items-center justify-center rounded-md bg-primary/10 text-primary">
                        <GraduationCap className="size-16" />
                    </div>
                )}
                <div className="flex-1 min-h-0 overflow-y-auto">
                    <ul className="text-muted-foreground list-disc pl-5 flex flex-col gap-1">
                        {longDescription.map((point) => (
                            <li key={point}>{point}</li>
                        ))}
                    </ul>
                </div>
                {(demoLink || githubLink) && (
                    <DialogFooter className="sm:justify-center">
                        {demoLink && <DialogLinkButton href={demoLink}>See this in action</DialogLinkButton>}
                        {githubLink && <DialogLinkButton href={githubLink}>View GitHub</DialogLinkButton>}
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
