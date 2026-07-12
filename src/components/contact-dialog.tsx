import { Mail, Phone } from 'lucide-react';
import { Button } from './ui/button';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogCancel,
} from './ui/alert-dialog';

interface ContactDialogProps {
    triggerLabel?: string;
}

export default function ContactDialog({ triggerLabel = 'Contact Me' }: ContactDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="default" size="lg">
                    <Phone data-icon="inline-start" />
                    {triggerLabel}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent size="sm" className="m-0 rounded-xl shadow-lg">
                <AlertDialogHeader>
                    <AlertDialogTitle>Contact Details</AlertDialogTitle>
                    <AlertDialogDescription className="text-foreground flex flex-col items-start gap-1">
                        <span className="inline-flex items-center gap-2">
                            <Mail className="size-4" />
                            kamilianos3@gmail.com
                        </span>
                        <span className="inline-flex items-center gap-2">
                            <Phone className="size-4" />
                            +44 7862 019098
                        </span>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel size="lg" variant="default" style={{ animation: 'none' }}>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
