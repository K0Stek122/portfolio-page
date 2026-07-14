import H1 from '../components/typographyh1';
import H2 from '../components/typographyh2';
import P from '../components/typographyp';
import { Separator } from '../components/ui/separator';
import CtaButtons from '../components/cta-buttons';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import SEO from '../components/seo';
import { Rocket, Figma, TrendingUp, Sparkles } from 'lucide-react';

const services = [
    { title: 'Website from Scratch', description: 'Set up your business online swiftly, at a competitive price.', icon: Rocket },
    { title: 'Website from Wireframes', description: 'Provide your Figma or wireframe designs and watch your site come to life.', icon: Figma },
    { title: 'SEO Optimisation', description: 'Climb search rankings on Google and Bing with expert, ethical SEO.', icon: TrendingUp },
    { title: 'Modernise Your Site', description: 'Turn your old-school site into a fast, modern web app.', icon: Sparkles },
];

export default function WebsiteDevelopmentPage() {
    return (
        <div className="flex flex-col overflow-x-hidden overflow-y-auto items-center h-dvh w-full bg-background">
            <SEO
                title="Website Development — Kamil Kostrzewa"
                description="Website development specialists for hire — build a site from scratch, bring Figma designs to life, boost your search rankings, or modernise an outdated site."
                path="/website-development"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Website Development', path: '/website-development' }]}
            />

            <div className="animate-fadeInUp w-full bg-gradient-to-b from-primary/10 via-primary/5 to-transparent">
                <Breadcrumb className="animate-fadeInUp hover:text-foreground flex justify-center pt-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-foreground" href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-foreground" href="/website-development">Website Development</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex flex-col items-center text-center gap-3 w-full max-w-3xl mx-auto px-4 pt-6 pb-16">
                    <H1 className="animate-fadeInUp">Websites that work for your business</H1>
                    <H2 className="animate-fadeInUp text-muted-foreground font-medium">Web Development Specialists for hire. From scratch, from wireframes, or a full refresh.</H2>
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
                <H2 className="animate-fadeInUp">Ready to launch your website?</H2>
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
