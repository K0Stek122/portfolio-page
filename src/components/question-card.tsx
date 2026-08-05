interface QuestionCardProps {
    question: string;
    answer: string;
}

export default function QuestionCard({ question, answer }: QuestionCardProps) {
    return (
        <div className="animate-fadeInUp relative flex flex-col gap-4 w-full bg-card text-card-foreground border border-border rounded-lg p-4 pl-6 overflow-hidden">
            <span className="absolute left-0 top-0 h-1/2 w-px bg-primary" aria-hidden="true" />
            <span className="absolute left-0 bottom-0 h-1/2 w-px bg-sky-500 dark:bg-sky-400" aria-hidden="true" />

            <div className="flex items-start gap-3">
                <span className="text-3xl font-normal leading-none text-primary">Q</span>
                <p className="font-bold pt-1">{question}</p>
            </div>
            <div className="flex items-start gap-3">
                <span className="text-3xl font-normal leading-none text-sky-500 dark:text-sky-400">A</span>
                <p className="text-muted-foreground pt-1">{answer}</p>
            </div>
        </div>
    );
}
