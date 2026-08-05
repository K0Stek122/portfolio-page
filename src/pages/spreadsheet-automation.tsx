import H1 from '../components/typographyh1';
import H2 from '../components/typographyh2';
import P from '../components/typographyp';
import { Separator } from '../components/ui/separator';
import CtaButtons from '../components/cta-buttons';
import QuestionCard from '../components/question-card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../components/ui/breadcrumb';
import SEO from '../components/seo';
import { FileSpreadsheet, Database, BarChart3, ShieldCheck } from 'lucide-react';

const services = [
    { title: 'Excel Automation', description: 'Turn spreadsheet hell into well-defined data input sites and automated data analysis.', icon: FileSpreadsheet },
    { title: 'Database Engineering', description: 'Turn your data into a database and abstract away the messiness.', icon: Database },
    { title: 'Business Intelligence', description: 'Let us analyse your business and show you the science in a clear manner.', icon: BarChart3 },
    { title: 'GDPR Compliance', description: 'Hire a consultant to ensure proper laws are followed.', icon: ShieldCheck },
];

const faqs = [
    {
        question: 'How much does a typical project cost?',
        answer: 'Depending on the size of the database and the amount of data processed, the service can cost from £350 - £4000. If the database exceeds 10,000 records then a monthly maintenance charge will be necessary.'
    },
    {
        question: 'What is your process for designing a system?',
        answer: "Everything starts with requirements analysis, an interview where we get details of what we can do for you. We will then implement the system utilising Agile principles."
    },
    {
        question: 'Can you help with GDPR compliance for our data?',
        answer: 'Yes — GDPR compliance review and remediation is one of the core services I offer, alongside the automation and database work itself.'
    },
];

export default function SpreadsheetAutomationPage() {
    return (
        <div className="flex flex-col overflow-x-hidden overflow-y-auto items-center h-dvh w-full bg-background">
            <SEO
                title="Spreadsheet Automation — Kamil Kostrzewa"
                description="Spreadsheet automation for hire. Eliminate repetitive admin work with expert spreadsheet automation and database engineering."
                path="/spreadsheet-automation"
                breadcrumbs={[{ name: 'Home', path: '/' }, { name: 'Spreadsheet Automation', path: '/spreadsheet-automation' }]}
                service={{ name: 'Spreadsheet Automation', serviceType: 'Spreadsheet Automation & Database Engineering' }}
                faqs={faqs}
            />

            <div className="animate-fadeInUp w-full bg-gradient-to-b from-primary/10 via-primary/5 to-transparent">
                <Breadcrumb className="animate-fadeInUp hover:text-foreground flex justify-center pt-6">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-foreground" href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink className="hover:text-foreground" href="/spreadsheet-automation">Spreadsheet Automation</BreadcrumbLink>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex flex-col items-center text-center gap-3 w-full max-w-3xl mx-auto px-4 pt-6 pb-16">
                    <H1 className="animate-fadeInUp">Say goodbye to admin work</H1>
                    <H2 className="animate-fadeInUp text-muted-foreground font-medium">Automation Specialists for hire. Get the IT help you need.</H2>
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
                <H2 className="animate-fadeInUp">Ready to eliminate the busywork?</H2>
                <CtaButtons />
            </div>

            <Separator className="animate-fadeInUp max-w-5/6 md:max-w-1/2" />

            <div className="animate-fadeInUp flex flex-col items-center gap-4 w-full max-w-5/6 md:max-w-1/2 py-16 px-4">
                <H2 className="animate-fadeInUp">Frequently Asked Questions</H2>
                <div className="animate-fadeInUp flex flex-col gap-4 w-full">
                    {faqs.map((faq) => (
                        <QuestionCard key={faq.question} {...faq} />
                    ))}
                </div>
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
