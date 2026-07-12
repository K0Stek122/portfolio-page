import React from 'react';
import H1 from '../components/typographyh1';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { FileUser, Globe, Code, BookOpenText } from 'lucide-react';
import LinImage from '../assets/LinkedIn.jpg'
import ContactDialog from '../components/contact-dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '../components/ui/breadcrumb';
import P from '../components/typographyp';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/seo';

/*
The main page will display three main buttons:
- Employers for employer information
- Students for learning information
- Blog for the main blog page.
*/

interface EmployersPageProps {
    prompt?: string;
}

const EmployersPage: React.FC<EmployersPageProps> = () => {
    const navigate = useNavigate();

    const handleExternalLink = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div className="flex flex-col overflow-x-hidden overflow-y-auto items-center h-dvh w-full bg-background gap-6 py-8 px-4">
            <SEO
                title="Kamil Kostrzewa — Software Engineer Portfolio"
                description="Portfolio and blog of Kamil Kostrzewa, a software engineer building pragmatic, real-world systems, data workflows, and reliable web apps."
                path="/"
            />
            <Breadcrumb className="animate-fadeInUp hover:text-foreground">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-foreground" href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="animate-fadeInUp flex flex-col md:flex-row items-center justify-center gap-4 v-screen w-full max-w-4xl">
                <img
                    src={LinImage}
                    alt="Description of the image"
                    className="rounded shadow-lg rounded-full h-24 md:h-56"
                />
                <div className="flex flex-col items-center justify-center gap-4">
                    <H1>Kamil Kostrzewa</H1>
                    <P>Open To Work</P>
                    <div className="flex flex-row flex-wrap items-center justify-center gap-4">

                        <Button
                            variant="default"
                            size="lg"
                            onClick={() => handleExternalLink("https://www.linkedin.com/in/kamil-kostek/")}>
                                <Globe data-icon="inline-start" />
                                LinkedIn
                        </Button>

                        <Button
                            variant="default"
                            size="lg"
                            onClick={() => handleExternalLink("https://docs.google.com/document/d/1q6EBuYkSe4tXu3gUG89antRiKxH-XCKnsW3TovMqB9w/edit?usp=drive_link")}
                            >
                                <FileUser data-icon="inline-start" />
                                CV
                        </Button>

                        <Button
                            variant="default"
                            size="lg"
                            onClick={() => navigate('/employers/portfolio')}
                            >
                                <Code data-icon="inline-start" />
                                Portfolio
                        </Button>
                    </div>

                    <div className="flex flex-row flex-wrap items-center justify-center gap-4">
                        <Button
                            variant="default"
                            size="lg"
                            onClick={() => navigate('/blog')}
                            >
                                <BookOpenText data-icon="inline-start" />
                                Blog
                        </Button>

                        <ContactDialog triggerLabel="Contact Me" />
                    </div>
                </div>
            </div>
            <Separator className="animate-fadeInUp max-w-5/6 md:max-w-1/2" />
            <div className="animate-fadeInUp flex flex-col items-center w-screen max-w-5/6 md:max-w-1/2">
                <H1>About Me</H1>
                <P>
                    I'm a software engineer who builds and improves real-world systems for businesses — from internal tools and data workflows to reliable websites.
                    I focus on clear communication so that your systems are faster, easier to maintain, and easier to scale. You can view selected projects on GitHub.
                </P>

                <H1>Freelance & Contract Work</H1>
                <P>
                    I work with small and medium-sized businesses that need an extra pair of hands.
                    I focus on practical solutions that save time and make day-to-day work easier.
                </P>

                <P>
                    I offer free consultations and I charge per product.
                </P>

                <P>Services: </P>

                <div className="animate-fadeInUp flex flex-row flex-wrap md:flex-col justify-center items-center gap-4 w-full max-w-full h-full">
                    <Button onClick={() => navigate('/spreadsheet-automation')}>Spreadsheet Automation</Button>
                    <Button onClick={() => navigate('/software-on-demand')}>Software-on-Demand</Button>
                    <Button>Website Development</Button>
                </div>
            </div>
        </div>
    );
};

export default EmployersPage;
