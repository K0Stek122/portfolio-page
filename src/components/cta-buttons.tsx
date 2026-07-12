import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import ContactDialog from './contact-dialog';

interface CtaButtonsProps {
    contactLabel?: string;
    learnMoreLabel?: string;
    learnMoreTo?: string;
}

export default function CtaButtons({ contactLabel = 'Contact Us', learnMoreLabel = 'Learn More', learnMoreTo = '/' }: CtaButtonsProps) {
    const navigate = useNavigate();

    return (
        <div className="flex flex-row flex-wrap items-center justify-center gap-4">
            <ContactDialog triggerLabel={contactLabel} />
            <Button variant="default" size="lg" onClick={() => navigate(learnMoreTo)}>
                {learnMoreLabel}
                <ArrowRight data-icon="inline-end" />
            </Button>
        </div>
    );
}
