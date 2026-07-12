import H1 from '../components/typographyh1';
import H2 from '../components/typographyh2';
import P from '../components/typographyp';
import { Separator } from '../components/ui/separator';
import CtaButtons from '../components/cta-buttons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import SEO from '../components/seo';
import { Bot, Lightbulb, Layers, UserPlus } from 'lucide-react';

const services = [
    { title: 'Get agentic code production-ready', description: 'Turn AI-generated prototypes into secure, tested, and maintainable software you can actually ship.', icon: Bot },
    { title: 'Prototype a business idea', description: 'Validate your concept fast with a working MVP built to prove the idea, not just pitch it.', icon: Lightbulb },
    { title: 'Outsource labour-intensive system components', description: 'Hand off the heavy lifting — we build and integrate the pieces that eat up your team\'s time.', icon: Layers },
    { title: 'Hire a developer', description: 'Bring dedicated engineering expertise onto your team, on your timeline, without the overhead of a full-time hire.', icon: UserPlus },
];

export default function SoftwareOnDemandPage() {
    return (
        <div className="flex flex-col overflow-x-hidden overflow-y-auto items-center h-dvh w-full bg-background">
            <SEO
                title="Software-on-Demand — Kamil Kostrzewa"
                description="Software development specialists for hire. Create custom tools at a competitive price."
                path="/software-on-demand"
            />

            <div className="animate-fadeInUp w-full bg-gradient-to-b from-primary/10 via-primary/5 to-transparent">
                <Breadcrumb className="animate-fadeInUp hover:text-foreground flex justify-center pt-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-foreground" href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-foreground" href="/software-on-demand">Software-on-Demand</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex flex-col items-center text-center gap-3 w-full max-w-3xl mx-auto px-4 pt-6 pb-16">
                    <H1 className="animate-fadeInUp">Software, built on demand</H1>
                    <H2 className="animate-fadeInUp text-muted-foreground font-medium">Software Development Specialists for hire. Create custom tools at a competitive price.</H2>
                </div>
            </div>

            <div className="animate-fadeInUp w-full max-w-6xl px-4 pb-16">
                <div className="animate-fadeInUp grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map(({ title, description, icon: Icon }) => (
                        <div
                            key={title}
                            className="animate-fadeInUp flex flex-col gap-3 bg-card text-card-foreground border border-border rounded-lg p-6"
                        >
                            <div className="animate-fadeInUp flex items-center justify-center size-10 rounded-md bg-primary/10 text-primary">
                                <Icon className="size-5" />
                            </div>
                            <H2 className="animate-fadeInUp text-left">{title}</H2>
                            <P className="animate-fadeInUp text-muted-foreground">{description}</P>
                        </div>
                    ))}
                </div>
            </div>

            <div className="animate-fadeInUp flex flex-col items-center gap-4 pb-20 text-center px-4">
                <H2 className="animate-fadeInUp">Ready to build something great?</H2>
                <CtaButtons />
            </div>

            <Separator className="animate-fadeInUp max-w-5/6 md:max-w-1/2" />

            <footer className="animate-fadeInUp w-full py-6 px-4 text-center">
                <P className="animate-fadeInUp text-muted-foreground text-sm !mt-0">
                    © {new Date().getFullYear()} Kamil Kostrzewa. All rights reserved.
                </P>
            </footer>
        </div>
    );
}
