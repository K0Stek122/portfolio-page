import H1 from '../components/ui/typographyh1';
import H2 from '../components/ui/typographyh2';
import P from '../components/ui/typographyp';
import { Separator } from '../components/ui/separator';
import ContactDialog from '../components/ui/contact-dialog';
import SEO from '../components/seo';

const services = [
    { title: 'Excel Automation', description: 'Turn spreadsheet hell into well-defined data input sites and automated data analysis.' },
    { title: 'Database Engineering', description: 'Turn your data into a database and abstract away the messiness.' },
    { title: 'Business Intelligence', description: 'Let us analyse your business and show you the science in a clear manner.' },
    { title: 'GDPR Compliance', description: 'Hire a consultant to ensure proper laws are followed.' },
];

export default function SpreadsheetAutomationPage() {
    return (
        <div className="flex flex-col items-center w-full bg-background">
            <SEO
                title="Spreadsheet Automation — Kamil Kostrzewa"
                description="Automation specialists for hire. Get the IT help you need to eliminate repetitive admin work."
                path="/spreadsheet-automation"
            />

            <div className="animate-fadeInUp flex flex-col items-center text-center gap-3 w-full max-w-3xl px-4 pt-20 pb-16">
                <H1 className="animate-fadeInUp">Say goodbye to admin work</H1>
                <H2 className="animate-fadeInUp text-muted-foreground font-medium">Automation Specialists for hire. Get the IT help you need.</H2>
            </div>

            <div className="animate-fadeInUp w-full max-w-6xl px-4 pb-16">
                <div className="animate-fadeInUp grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map(service => (
                        <div
                            key={service.title}
                            className="animate-fadeInUp flex flex-col gap-2 bg-card text-card-foreground border border-border rounded-lg p-6"
                        >
                            <H2 className="animate-fadeInUp text-left">{service.title}</H2>
                            <P className="animate-fadeInUp text-muted-foreground">{service.description}</P>
                        </div>
                    ))}
                </div>
            </div>

            <div className="animate-fadeInUp pb-20">
                <ContactDialog triggerLabel="Contact Us" />
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
