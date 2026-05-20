import React from 'react';
import H1 from './typographyh1';
import { CodeIcon } from 'lucide-react';
import { Button } from './button';
import P from './typographyp';

interface ProjectCardProps {
    className?: string;
    projectTitle: string;
    projectDescription: string;
    image: string;
    link: string;
    totalIndex: number;
    curIndex: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    className,
    projectTitle,
    projectDescription,
    image,
    link,
    totalIndex,
    curIndex
}) => {

    const handleExternalLink = (url: string) => {
        window.open(url, '_blank');
    };

    const buttonStyle = "transition-transform duration-200 hover:scale-110 mb-4 mt-0 hover:cursor-pointer animate-fadeInUp";
    const divStyle = "flex-1 h-full min-w-0 flex bg-slate-800 flex-col items-center p-4 gap-2"

    return (
        <div
            className={`${divStyle} ${className}`}
        >
            <H1 className="line-clamp-1 animate-fadeInUp w-full">{projectTitle}</H1>
            <P className="line-clamp-1 animate-fadeInUp w-full text-center">{projectDescription}</P>
            <Button className={buttonStyle} size="lg" onClick={() => handleExternalLink(link)}>
                <CodeIcon data-icon="inline-start" aria-hidden={false} />
                See it yourself
            </Button>
            <div className="w-full flex-1 min-h-0 rounded-lg shadow-lg animate-fadeInUp overflow-hidden">
                <img src={image} className="rounded-lg h-full w-full object-cover"></img>
            </div>
            <P>
                {"◦".repeat(curIndex)}
                {"•"}
                {"◦".repeat(totalIndex - curIndex - 1)}
            </P>
        </div>
    );
};