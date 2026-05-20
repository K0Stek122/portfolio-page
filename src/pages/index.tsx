import React from 'react';
import { LaptopMinimalCheck, GraduationCap, BookOpenText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import LargeButton from '../components/ui/large-button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '../components/ui/breadcrumb';

/*
The main page will display three main buttons:
- Employers for employer information
- Students for learning information
- Blog for the main blog page.
*/

interface IndexPageProps {
    prompt?: string;
}

const IndexPage: React.FC<IndexPageProps> = () => {
    const navigate = useNavigate();

    const handleExternalLink = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div className="flex flex-col overflow-hidden justify-center items-center h-screen bg-slate-800 m-2">
            <Breadcrumb className="animate-fadeInUp hover:text-white pb-4 m-2">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink className="hover:text-white" href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center justify-center h-screen bg-slate-800 gap-4">
                <LargeButton onClick={()=> navigate('/employers')}>
                    <LaptopMinimalCheck className="size-14" data-icon="inline-start" aria-hidden="true" />
                    For Employers
                </LargeButton>

                
                <AlertDialog>
                    <AlertDialogTrigger>
                        <LargeButton>
                            <GraduationCap className="size-14" data-icon="inline-start" aria-hidden="true" />
                            For Students
                        </LargeButton>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-slate-800 text-white border-none">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Sorry!</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-300">
                                I'm working very hard to provide you understandable and easy-to-follow learning content, but I still need more time. Until then you can find tutorials on my blog.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel variant="default">Okay</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                <LargeButton onClick={() => navigate('/blog')}>
                    <BookOpenText className="size-14" data-icon="inline-start" aria-hidden="true" />
                    Blog
                </LargeButton>

            </div>
        </div>
    );
};

export default IndexPage;
