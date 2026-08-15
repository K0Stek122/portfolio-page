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
    SquareTerminal,
    type LucideIcon,
} from "lucide-react";
import H1 from "../components/typographyh1";
import H2 from "../components/typographyh2";
import P from "../components/typographyp";
import SEO from "../components/seo";
import ProjectDialog from "../components/project-dialog";

import cbImage from ".././assets/projects/cb_avif.avif";
import ugImage from ".././assets/projects/ug_avif.avif"
import wjbImage from ".././assets/projects/wjb_avif.avif"
import whahImage from ".././assets/projects/whah_avif.avif"
import oxfamImage from ".././assets/projects/oxfam_avif.avif"
import culturesentwinedImage from ".././assets/projects/culturesentwined_avif.avif"
import bachelorDissertationImage from ".././assets/projects/dissertation_avif.avif"
import pandasImage from ".././assets/projects/pandas_avif.avif"
import autokeyImage from ".././assets/projects/autokey_avif.avif"
import rpiImage from ".././assets/projects/rpi_avif.avif"
import kindleExtractorImage from ".././assets/projects/kindle_extractor_avif.avif"
import xdumpImage from ".././assets/projects/xdump_avif.avif"
import conwayImage from ".././assets/projects/c-conway-game-of-life.gif"
import castHudImage from ".././assets/projects/casthud.gif"
import fileSplitterImage from ".././assets/projects/filesplitter_avif.avif"
import wordlistImage from ".././assets/projects/wordlist_avif.avif"
import pygameOverlayImage from ".././assets/projects/pygameoverlay_avif.avif"

interface Project {
    title: string;
    subtitle?: string;
    description: string;
    longDescription: string[];
    image?: string;
    /** Image shown in the ProjectDialog only, when the card itself should keep showing its icon instead of a thumbnail. Falls back to `image` if unset. */
    dialogImage?: string;
    icon?: LucideIcon;
    demoLink?: string;
    githubLink?: string;
}

function ProjectCard({ title, subtitle, description, longDescription, image, dialogImage, icon: Icon, demoLink, githubLink }: Project) {
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
            <ProjectDialog title={title} image={dialogImage ?? image} icon={Icon} longDescription={longDescription} demoLink={demoLink} githubLink={githubLink} />
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
            longDescription: [
                "Engineered Change Birmingham's website from the ground up, utilising UI/UX principles.",
                "Engineered Postgresql database from scratch. Engineered internal tools to access the SQL database.",
                "Gave the therapy practice a reliable, well-structured system to run on day to day.",
            ],
            image: cbImage,
            demoLink: "https://changebrieftherapy.org",
        },
        {
            title: "We Job Box",
            subtitle: "Role: IT Support",
            description: "1st Line IT Support in the Microsoft ecosystem.",
            longDescription: [
                "Provided first-line IT support across the Microsoft ecosystem.",
                "Kept the team's day-to-day tooling running smoothly.",
                "Resolved issues quickly to minimise downtime.",
                "Performed on-call IT Support through unexpected scenarios and absences."
            ],
            image: wjbImage,
            demoLink: "https://www.wejobbox.com",
        },
        {
            title: "Cultures Entwined",
            subtitle: "Role: Data Automation",
            description: "Utilised Excel and UI/UX Principles to develop a custom solution.",
            longDescription: [
                "Combined Excel-based automation with UI/UX design principles.",
                "Built a custom solution that replaced manual, error-prone processes.",
                "Delivered a tool that the team could rely on.",
            ],
            image: culturesentwinedImage,
            demoLink: "https://culturesentwined.co.uk"
        }
    ];

    const foss_projects: Project[] = [
        {
            title: "Pandas Contribution",
            description: "Triage'd and fixed bug reports in the pandas data analysis tool.",
            longDescription: [
                "Triage'd incoming bug reports for the pandas data analysis library.",
                "Shipped fixes to resolve reported issues.",
                "Helped maintain up-to-date documentation.",
            ],
            icon: GitPullRequest,
            dialogImage: pandasImage,
            demoLink: "https://pandas.pydata.org/",
            githubLink: "https://github.com/pandas-dev/pandas"
        },
        {
            title: "AutoKey Contribution",
            description: "Fixed bug reports in the autokey automation tool.",
            longDescription: [
                "Diagnosed and fixed bug reports in the AutoKey desktop automation tool.",
                "Contributed directly to an open source project used by its community for everyday automation.",
            ],
            icon: GitPullRequest,
            dialogImage: autokeyImage,
            demoLink: "https://autokey.github.io/",
        },
        {
            title: "Raspberry PI Self-Hosting",
            description: "Server hosting with RPI using only FOSS and self-made software.",
            longDescription: [
                "Set up and self-hosted services on a Raspberry Pi.",
                "Used entirely free and open source software, including custom-built tooling.",
                "A hands-on exercise in server administration.",
            ],
            icon: Server,
            dialogImage: rpiImage,
            demoLink: "https://www.kostek.uk",
        },
        {
            title: "Kindle Quote Extractor",
            description: "Engineered a Python tool that later became a Rust UI app for automating quote extraction. Allows for output to JSON and Markdown.",
            longDescription: [
                "Built a Python tool that automates extracting highlighted quotes from Kindle.",
                "Supports output to both JSON and Markdown.",
                "Results slot straight into other workflows.",
            ],
            icon: BookOpen,
            dialogImage: kindleExtractorImage,
            githubLink: "https://github.com/K0Stek122/kindle-extractor",
        },
        {
            title: "xdump: Hexdump utility tool",
            description: "Engineered a Pure-C tool for analysing raw binary data of any file.",
            longDescription: [
                "Wrote a pure C hexdump utility for inspecting the raw binary contents of any file.",
                "Focused on being small, fast, and dependency-free.",
            ],
            icon: Binary,
            dialogImage: xdumpImage,
            githubLink: "https://github.com/K0Stek122/xdump",
        },
        {
            title: "Conway's Game of Life",
            description: "Designed Conway's game of life in Pure-C. Utilises mathematics and computation theory to implement a Pushdown Automaton.",
            longDescription: [
                "Implemented Conway's Game of Life in pure C.",
                "Applied computation theory by modelling the simulation as a pushdown automaton rather than a naive grid loop.",
            ],
            icon: Grid3x3,
            dialogImage: conwayImage,
            githubLink: "https://github.com/K0Stek122/c-conway-game-of-life",
        },
        {
            title: "CastHud: C++ GUI overlay tool",
            description: "Designed a GUI overlay tool letting users design any user interface on top of another application.",
            longDescription: [
                "Designed a C++ GUI overlay tool.",
                "Lets users lay out and render any custom interface on top of another running application.",
            ],
            icon: AppWindow,
            dialogImage: castHudImage,
            githubLink: "https://github.com/K0Stek122/CastHud",
        },
        {
            title: "File Splitter and Unsplitter",
            description: "Engineered in pure C.",
            longDescription: [
                "A pure C command-line utility for splitting large files into chunks.",
                "Reassembles split files back into the original.",
                "Built as a low-level exercise in file I/O and buffer handling.",
            ],
            icon: Scissors,
            dialogImage: fileSplitterImage,
            githubLink: "https://github.com/K0Stek122/c-file-splitter",
        },
        {
            title: "Hatch",
            description: "Wordlist generation for Cyber Security.",
            longDescription: [
                "A wordlist generation tool built for cyber security work.",
                "Used to produce targeted wordlists for password auditing and related security testing.",
            ],
            icon: KeyRound,
            dialogImage: wordlistImage,
            githubLink: "https://github.com/K0Stek122/hatch"
        },
        {
            title: "PyOverlay",
            description: "Tool for modifying any app's UI.",
            longDescription: [
                "A Python/Pygame-based tool for overlaying and modifying the UI of other applications.",
                "Built as an exploration of real-time rendering on top of third-party windows.",
            ],
            icon: Layers,
            dialogImage: pygameOverlayImage,
            githubLink: "https://github.com/K0Stek122/Python-pygame-overlay"
        }
    ];

    const volunteering_projects: Project[] = [
        {
            title: "Unify Giving",
            subtitle: "Role: Software Engineer",
            description: "Engineered full-stack AI-Driven software.",
            longDescription: [
                "Worked as a full-stack software engineer building AI-driven features for Unify Giving.",
                "Contributed across both the backend logic and the user-facing product.",
            ],
            image: ugImage,
            demoLink: "https://unifygiving.com/",
        },
        {
            title: "We Hold a Hand",
            subtitle: "Role: IT Team Lead",
            description: "Managing IT Support, Web Dev, and internal data automation.",
            longDescription: [
                "Led IT support, web development, and internal data automation as IT Team Lead.",
                "Kept the charity's technical operations running.",
                "Improved how its internal processes worked.",
            ],
            image: whahImage,
            demoLink: "https://weholdahand.org/",
        },
        {
            title: "Unify Giving",
            subtitle: "Role: Book Shop Technician",
            description: "Technician at Oxfam Rugby's Local bookshop.",
            longDescription: [
                "Worked as a technician at Oxfam Rugby's local bookshop.",
                "Supported day-to-day retail operations for a charity-run store.",
            ],
            image: oxfamImage,
            demoLink: "https://www.oxfam.org.uk/",
        }
    ];

    const academic_projects: Project[] = [
        {
            title: "Bachelor's Dissertation",
            description: "Network Intrusion Detection System for Microservices with Novel Hybrid Finite Automata",
            longDescription: [
                "A bachelor's dissertation proposing a novel hybrid finite automata approach to network intrusion detection for microservice architectures.",
                "Combined formal automata theory with practical detection performance.",
            ],
            image: bachelorDissertationImage,
            demoLink: "https://drive.google.com/file/d/1KM0cII-CPsCitqQ0H2YRtf5pCoDhdfa3/view?usp=sharing",
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
                <div className="animate-fadeInUp flex flex-row items-center gap-2 pb-8">
                    <Button
                        variant="secondary"
                        className="transition-transform duration-200 hover:scale-105 hover:cursor-pointer"
                        onClick={() => window.open("https://github.com/K0Stek122", "_blank", "noopener,noreferrer")}
                    >
                        <CodeIcon data-icon="inline-start" aria-hidden={false} />
                        GitHub
                    </Button>

                    <Button
                        variant="secondary"
                        className="transition-transform duration-200 hover:scale-105 hover:cursor-pointer"
                        onClick={() => window.open("https://leetcode.com/u/Kostek122/", "_blank", "noopener,noreferrer")}
                    >
                        <SquareTerminal data-icon="inline-start" aria-hidden={false} />
                        LeetCode
                    </Button>
                </div>
            </div>

        </div>
    );
}
