import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "../components/ui/breadcrumb";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../components/ui/carousel";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import { CodeIcon } from "lucide-react";
import H1 from "../components/ui/typographyh1";
import H2 from "../components/ui/typographyh2";
import P from "../components/ui/typographyp";

import xdumpImage from ".././assets/projects/xdump.png";
import conwayImage from ".././assets/projects/c-conway-game-of-life.gif";
import kindleImage from ".././assets/projects/kindle-extractor.png";
import cbImage from ".././assets/projects/cb.png";
import ugImage from ".././assets/projects/ug.png"
import wjbImage from ".././assets/projects/wjb.png"
import pandasImage from ".././assets/projects/pandas.png"
import autokeyImage from ".././assets/projects/autokey.png"
import casthudImage from ".././assets/projects/casthud.gif"
import filesplitterImage from ".././assets/projects/filesplitter.jpg"
import wordlistImage from ".././assets/projects/wordlist.png"
import overlayImage from ".././assets/projects/pygameoverlay.png"
import rpiImage from ".././assets/projects/rpi.png"
import whahImage from ".././assets/projects/whah.png"
import oxfamImage from ".././assets/projects/oxfam.png"

interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
}

function ProjectCard({ title, description, image, link }: Project) {
    const handleExternalLink = (url: string) => window.open(url, "_blank");
    return (
        <div className="bg-slate-700 rounded-lg p-4 flex flex-col gap-3 h-80">
            <div className="h-40 w-full overflow-hidden rounded-lg shrink-0">
                <img src={image} alt={title} className="h-full w-full object-cover" />
            </div>
            <p className="text-white font-bold line-clamp-1">{title}</p>
            <p className="text-gray-300 text-sm line-clamp-2 flex-1">{description}</p>
            <Button
                size="sm"
                className="bg-slate-600 hover:bg-slate-800 transition-transform duration-200 hover:scale-105 hover:cursor-pointer w-full"
                onClick={() => handleExternalLink(link)}
            >
                <CodeIcon data-icon="inline-start" aria-hidden={false} />
                See it yourself
            </Button>
        </div>
    );
}

function ProjectCarousel({ projects }: { projects: Project[] }) {
    return (
        <Carousel className="w-full px-12" opts={{ align: "start" }}>
            <CarouselContent>
                {projects.map((project, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                        <ProjectCard {...project} />
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="bg-slate-700 border-none text-white hover:bg-slate-600 hover:text-white" />
            <CarouselNext className="bg-slate-700 border-none text-white hover:bg-slate-600 hover:text-white" />
        </Carousel>
    );
}

export default function PortfolioPage() {

    const work_projects: Project[] = [
        {
            title: "Database Engineer",
            description: "Engineered Change Birmingham's database for storing and retrieving client data.",
            image: cbImage,
            link: "https://changebrieftherapy.org",
        },
        {
            title: "1st Line IT Support",
            description: "IT Support at We Job Box with Microsoft Azure and Entra.",
            image: wjbImage,
            link: "https://www.wejobbox.com",
        },
    ];

    const foss_projects: Project[] = [
        {
            title: "Pandas Contribution",
            description: "Triage'd and fixed bug reports in the pandas data analysis tool.",
            image: pandasImage,
            link: "https://pandas.pydata.org/",
        },
        {
            title: "AutoKey Contribution",
            description: "Fixed bug reports in the autokey automation tool.",
            image: autokeyImage,
            link: "https://autokey.github.io/",
        },
        {
            title: "Raspberry PI Self-Hosting",
            description: "Server hosting with RPI using only FOSS and self-made software.",
            image: rpiImage,
            link: "https://www.kostek.uk",
        },
        {
            title: "Kindle Quote Extractor",
            description: "Engineered a Python tool for automating quote extraction. Allows for output to JSON and Markdown.",
            image: kindleImage,
            link: "https://github.com/K0Stek122/kindle-extractor",
        },
        {
            title: "xdump: Hexdump utility tool",
            description: "Engineered a Pure-C tool for analysing raw binary data of any file.",
            image: xdumpImage,
            link: "https://github.com/K0Stek122/xdump",
        },
        {
            title: "Conway's Game of Life",
            description: "Designed Conway's game of life in Pure-C. Utilises mathematics and computation theory to implement a Pushdown Automaton.",
            image: conwayImage,
            link: "https://github.com/K0Stek122/c-conway-game-of-life",
        },
        {
            title: "CastHud: C++ GUI overlay tool",
            description: "Designed a GUI overlay tool letting users design any user interface on top of another application.",
            image: casthudImage,
            link: "https://github.com/K0Stek122/CastHud",
        },
        {
            title: "File Splitter and Unsplitter",
            description: "Engineered in pure C.",
            image: filesplitterImage,
            link: "https://github.com/K0Stek122/c-file-splitter",
        },
        {
            title: "Hatch",
            description: "Wordlist generation for Cyber Security.",
            image: wordlistImage,
            link: "https://github.com/K0Stek122/hatch"
        },
        {
            title: "PyOverlay",
            description: "Tool for modifying any app's UI.",
            image: overlayImage,
            link: "https://github.com/K0Stek122/Python-pygame-overlay"
        }
    ];

    const volunteering_projects: Project[] = [
        {
            title: "Software Engineer",
            description: "Engineered full-stack AI-Driven software for 'Unify Giving'.",
            image: ugImage,
            link: "https://unifygiving.com/",
        },
        {
            title: "IT Team Lead",
            description: "IT Team Lead at We Hold A Hand. Handling IT Support and Web Dev.",
            image: whahImage,
            link: "https://weholdahand.org/",
        },
        {
            title: "Book Shop Technician",
            description: "Technician at Oxfam Rugby's Local bookshop.",
            image: oxfamImage,
            link: "https://www.oxfam.org.uk/",
        }
    ];

    return (
        <div className="flex flex-col overflow-x-hidden overflow-y-auto items-center h-screen w-full bg-slate-800 gap-6 py-8 px-4">
            <Breadcrumb className="animate-fadeInUp hover:text-white">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-white" href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-white" href="/employers">For Employers</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-white" href="/employers/portfolio">Portfolio</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="animate-fadeInUp flex flex-col items-center gap-2 max-w-2xl text-center">
                <H1>Portfolio</H1>
                <P>"An investment in knowledge always pays the best interest."</P>
            </div>

            <Separator className="animate-fadeInUp w-full max-w-5xl" />

            <div className="animate-fadeInUp flex flex-col gap-4 w-full max-w-5xl">
                <H2>Work Experience</H2>
                <ProjectCarousel projects={work_projects} />
            </div>

            <Separator className="animate-fadeInUp w-full max-w-5xl" />

            <div className="animate-fadeInUp flex flex-col gap-4 w-full max-w-5xl">
                <H2>Open Source</H2>
                <ProjectCarousel projects={foss_projects} />
            </div>

            <Separator className="animate-fadeInUp w-full max-w-5xl" />

            <div className="animate-fadeInUp flex flex-col gap-4 w-full max-w-5xl pb-8">
                <H2>Volunteering</H2>
                <ProjectCarousel projects={volunteering_projects} />
            </div>

            <Separator className="animate-fadeInUp w-full max-w-5xl" />

            <div className="animate-fadeInUp flex flex-col items-center gap-2 pb-8">
                <P>For a full range of my projects, have a look at my GitHub:</P>
                <Button
                    className="bg-slate-600 hover:bg-slate-900 transition-transform duration-200 hover:scale-105 hover:cursor-pointer"
                    onClick={() => window.open("https://github.com/K0Stek122", "_blank")}
                >
                    <CodeIcon data-icon="inline-start" aria-hidden={false} />
                    GitHub
                </Button>
            </div>

        </div>
    );
}
