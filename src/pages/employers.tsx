import React from 'react';
import H1 from '../components/ui/typographyh1';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { FileUser, Globe, Code, Phone } from 'lucide-react';
import LinImage from '../assets/LinkedIn.jpg'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogMedia, AlertDialogCancel} from '../components/ui/alert-dialog';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import P from '../components/ui/typographyp';
import { useNavigate } from 'react-router-dom';

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
    const buttonStyles = "bg-slate-700 transition-transform duration-200 hover:scale-110 hover:cursor-pointer animate-fadeInUp";
    
    const handleExternalLink = (url: string) => {
        window.open(url, '_blank');
    };

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
                    <P>
                        "Do More with Less. Be Pragmatic."
                    </P>
                    <div className="flex flex-row items-center justify-center gap-4">

                        <Button
                            variant="default"
                            size="lg"
                            className={buttonStyles}
                            onClick={() => handleExternalLink("https://www.linkedin.com/in/kamil-kostek/")}>
                                <Globe data-icon="inline-start" />
                                LinkedIn
                        </Button>

                        <Button
                            variant="default"
                            size="lg"
                            className={buttonStyles}
                            onClick={() => handleExternalLink("https://docs.google.com/document/d/1q6EBuYkSe4tXu3gUG89antRiKxH-XCKnsW3TovMqB9w/edit?usp=drive_link")}
                            >
                                <FileUser data-icon="inline-start" />
                                CV
                        </Button>

                        <Button
                            variant="default"
                            size="lg"
                            className={buttonStyles}
                            onClick={() => navigate('/employers/portfolio')}
                            >
                                <Code data-icon="inline-start" />
                                Portfolio
                        </Button>
                    </div>

                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="default" size="lg" className={buttonStyles}>
                                <Phone data-icon="inline-start" />
                                Contact Me
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent size="sm" className="text-white bg-slate-800 border-none m-0 rounded rounded-xl shadow-lg">
                            <AlertDialogHeader>
                                <AlertDialogMedia className="bg-slate-700 text-white">
                                    <Phone data-icon="inline-start" />
                                </AlertDialogMedia>
                                <AlertDialogTitle>Contact Details</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-300">
                                    <b>Email:</b> kamilianos3@gmail.com <br />
                                    <b>Phone:</b> 7862 019098
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel size="lg" variant="default">Close</AlertDialogCancel>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>
            <Separator className="animate-fadeInUp max-w-5/6 md:max-w-1/2" />
            <div className="animate-fadeInUp flex flex-col items-center w-screen max-w-5/6 md:max-w-1/2">
                <H1>About Me</H1>
                <P>
                    I'm a software engineer who builds and improves real-world systems for businesses — from internal tools and data workflows to reliable websites.
                    I focus on clear communication and clean code, so your systems are faster, easier to maintain, and easier to scale. You can view selected projects on GitHub.
                </P>
                <P>
                    Most of my work is about creating solid foundations that last.
                    I'm particularly helpful when dealing with messy data, repetitive admin work, or systems that need stabilising and simplifying.
                </P>

                <H1>Full-Time & Part-Time Work</H1>
                <P className="mr-4">
                    I am seeking work in Software Engineering & IT Engineering.
                </P>
                <P>
                    I enjoy working in fast-paced environments where problem-solving and critical thinking are key.
                    I deliver cost and time savings by thinking outside the box and coming up with solutions.
                    Please take a look at my CV and contact me if you're an employer looking for a disciplined and an eager to learn individual.
                </P>
                
                <H1>Freelance & Contract Work</H1>
                <P>
                    I work with small and medium-sized businesses, startups, and teams that need an extra pair of hands for short-term projects or ongoing improvements.
                    Whether you're fixing an existing system or building something new, I focus on practical solutions that save time and make day-to-day work easier.
                </P>

                <P>
                    How I Can Help:
                </P>

                <ul className="ml-6 list-disc mt-2 text-white">
                    <li className="mb-2">Data & reporting tools — spreadsheets, dashboards, automation to cut down manual work.</li>
                    <li className="mb-2">Application improvements — refactoring, documentation, performance tuning, and CI/CD setup.</li>
                    <li className="mb-2">Internal tools — Small custom apps for bookkeeping, operations, or team workflows.</li>
                    <li className="mb-6">Website & web apps — clean, maintainable sites built to last.</li>
                </ul>

                <P>
                    I offer free consultations and clear, fixed pricing. If you're not sure whether your problem fits, feel free to reach out — I'm always happy to chat and see how I can help.
                </P>

                <P><b>Available for freelance projects and open to full-time opportunities.</b></P>
            </div>
        </div>
    );
};

export default EmployersPage;