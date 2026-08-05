import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "../components/ui/breadcrumb";
import { Separator } from "../components/ui/separator";
import { Button } from "../components/ui/button";
import {
    CodeIcon,
    GraduationCap,
    GitPullRequest,
    Server,
    BookOpen,
    Binary,
    Grid3x3,
    AppWindow,
    Scissors,
    KeyRound,
    Layers,
    type LucideIcon,
} from "lucide-react";
import H1 from "../components/typographyh1";
import H2 from "../components/typographyh2";
import P from "../components/typographyp";
import SEO from "../components/seo";

import cbImage from ".././assets/projects/cb_avif.avif";
import ugImage from ".././assets/projects/ug_avif.avif"
import wjbImage from ".././assets/projects/wjb_avif.avif"
import whahImage from ".././assets/projects/whah_avif.avif"
import oxfamImage from ".././assets/projects/oxfam_avif.avif"
import culturesentwinedImage from ".././assets/projects/culturesentwined_avif.avif"
import bachelorDissertationImage from ".././assets/projects/dissertation_avif.avif"

interface Project {
    title: string;
    subtitle?: string;
    description: string;
    image?: string;
    icon?: LucideIcon;
    link: string;
}

function ProjectCard({ title, subtitle, description, image, icon: Icon, link }: Project) {
    const handleExternalLink = (url: string) => window.open(url, "_blank", "noopener,noreferrer");
    return (
        <div className="animate-fadeInUp flex flex-col gap-2 bg-card text-card-foreground border border-border rounded-lg p-4">
            {image ? (
                <img src={image} alt={title} loading="lazy" className="h-[9.6rem] w-full object-cover rounded-md" />
            ) : (
                <div className="flex items-center justify-center size-8 rounded-md bg-primary/10 text-primary">
                    {Icon ? <Icon className="size-4" /> : <GraduationCap className="size-4" />}
                </div>
            )}
            <p className="font-bold line-clamp-1">{title}</p>
            {subtitle && <p className="font-bold text-sm text-white/75 line-clamp-1">{subtitle}</p>}
            <p className="text-muted-foreground text-sm line-clamp-3 flex-1">{description}</p>
            <Button
                size="sm"
                variant="secondary"
                className="transition-transform duration-200 hover:scale-105 hover:cursor-pointer w-full"
                onClick={() => handleExternalLink(link)}
            >
                Learn More
            </Button>
        </div>
    );
}

function ProjectGrid({ projects }: { projects: Project[] }) {
    return (
        <div className="animate-fadeInUp grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
            ))}
        </div>
    );
}

export default function PortfolioPage() {

    const work_projects: Project[] = [
        {
            title: "Change Birmingham",
            subtitle: "Role: Database Engineer",
            description: "Engineered Postgresql Database + Full IT setup.",
            image: cbImage,
            link: "https://changebrieftherapy.org",
        },
        {
            title: "We Job Box",
            subtitle: "Role: IT Support",
            description: "1st Line IT Support in the Microsoft ecosystem.",
            image: wjbImage,
            link: "https://www.wejobbox.com",
        },
        {
            title: "Cultures Entwined",
            subtitle: "Role: Data Automation",
            description: "Utilised Excel and UI/UX Principles to develop a custom solution.",
            image: culturesentwinedImage,
            link: "https://culturesentwined.co.uk"
        }
    ];

    const foss_projects: Project[] = [
        {
            title: "Pandas Contribution",
            description: "Triage'd and fixed bug reports in the pandas data analysis tool.",
            icon: GitPullRequest,
            link: "https://pandas.pydata.org/",
        },
        {
            title: "AutoKey Contribution",
            description: "Fixed bug reports in the autokey automation tool.",
            icon: GitPullRequest,
            link: "https://autokey.github.io/",
        },
        {
            title: "Raspberry PI Self-Hosting",
            description: "Server hosting with RPI using only FOSS and self-made software.",
            icon: Server,
            link: "https://www.kostek.uk",
        },
        {
            title: "Kindle Quote Extractor",
            description: "Engineered a Python tool for automating quote extraction. Allows for output to JSON and Markdown.",
            icon: BookOpen,
            link: "https://github.com/K0Stek122/kindle-extractor",
        },
        {
            title: "xdump: Hexdump utility tool",
            description: "Engineered a Pure-C tool for analysing raw binary data of any file.",
            icon: Binary,
            link: "https://github.com/K0Stek122/xdump",
        },
        {
            title: "Conway's Game of Life",
            description: "Designed Conway's game of life in Pure-C. Utilises mathematics and computation theory to implement a Pushdown Automaton.",
            icon: Grid3x3,
            link: "https://github.com/K0Stek122/c-conway-game-of-life",
        },
        {
            title: "CastHud: C++ GUI overlay tool",
            description: "Designed a GUI overlay tool letting users design any user interface on top of another application.",
            icon: AppWindow,
            link: "https://github.com/K0Stek122/CastHud",
        },
        {
            title: "File Splitter and Unsplitter",
            description: "Engineered in pure C.",
            icon: Scissors,
            link: "https://github.com/K0Stek122/c-file-splitter",
        },
        {
            title: "Hatch",
            description: "Wordlist generation for Cyber Security.",
            icon: KeyRound,
            link: "https://github.com/K0Stek122/hatch"
        },
        {
            title: "PyOverlay",
            description: "Tool for modifying any app's UI.",
            icon: Layers,
            link: "https://github.com/K0Stek122/Python-pygame-overlay"
        }
    ];

    const volunteering_projects: Project[] = [
        {
            title: "Unify Giving",
            subtitle: "Role: Software Engineer",
            description: "Engineered full-stack AI-Driven software.",
            image: ugImage,
            link: "https://unifygiving.com/",
        },
        {
            title: "We Hold a Hand",
            subtitle: "Role: IT Team Lead",
            description: "Managing IT Support, Web Dev, and internal data automation.",
            image: whahImage,
            link: "https://weholdahand.org/",
        },
        {
            title: "Unify Giving",
            subtitle: "Role: Book Shop Technician",
            description: "Technician at Oxfam Rugby's Local bookshop.",
            image: oxfamImage,
            link: "https://www.oxfam.org.uk/",
        }
    ];

    const academic_projects: Project[] = [
        {
            title: "Bachelor's Dissertation",
            description: "Network Intrusion Detection System for Microservices with Novel Hybrid Finite Automata",
            image: bachelorDissertationImage,
            link: "https://drive.google.com/file/d/1KM0cII-CPsCitqQ0H2YRtf5pCoDhdfa3/view?usp=sharing",
        }
    ];

    return (
        <div className="flex flex-col overflow-x-hidden overflow-y-auto items-center h-dvh w-full bg-background gap-6 py-8 px-4">
            <SEO
                title="Portfolio — Kamil Kostrzewa"
                description="Explore Kamil Kostrzewa's portfolio: professional work, open source contributions, volunteering projects, and academic research in software engineering."
                path="/employers/portfolio"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Portfolio', path: '/employers/portfolio' }]}
            />
            <Breadcrumb className="animate-fadeInUp hover:text-foreground">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-foreground" href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-foreground" href="/employers/portfolio">Portfolio</BreadcrumbLink>
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
                <ProjectGrid projects={work_projects} />
            </div>

            <Separator className="animate-fadeInUp w-full max-w-5xl" />

            <div className="animate-fadeInUp flex flex-col gap-4 w-full max-w-5xl">
                <H2>Open Source</H2>
                <ProjectGrid projects={foss_projects} />
            </div>

            <Separator className="animate-fadeInUp w-full max-w-5xl" />

            <div className="animate-fadeInUp flex flex-col gap-4 w-full max-w-5xl pb-8">
                <H2>Volunteering</H2>
                <ProjectGrid projects={volunteering_projects} />
            </div>

            <Separator className="animate-fadeInUp w-full max-w-5xl" />

            <div className="animate-fadeInUp flex flex-col gap-4 w-full max-w-5xl pb-8">
                <H2>Academic</H2>
                <ProjectGrid projects={academic_projects} />
            </div>

            <Separator className="animate-fadeInUp w-full max-w-5xl" />

            <div className="animate-fadeInUp flex flex-col items-center gap-2 pb-8">
                <P>For a full range of my projects, have a look at my GitHub:</P>
                <Button
                    variant="secondary"
                    className="transition-transform duration-200 hover:scale-105 hover:cursor-pointer"
                    onClick={() => window.open("https://github.com/K0Stek122", "_blank", "noopener,noreferrer")}
                >
                    <CodeIcon data-icon="inline-start" aria-hidden={false} />
                    GitHub
                </Button>
            </div>

        </div>
    );
}
