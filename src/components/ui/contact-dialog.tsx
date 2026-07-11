import { Phone } from 'lucide-react';
import { Button } from './button';
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogCancel,
} from './alert-dialog';

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
                    <AlertDialogDescription className="text-foreground">
                        <b>Email:</b> kamilianos3@gmail.com <br />
                        <b>Phone:</b> 7862 019098
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel size="lg" variant="default" style={{ animation: 'none' }}>Close</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
