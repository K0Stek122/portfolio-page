interface UlProps {
    children: React.ReactNode;
    className?: string;
}

export default function Ul({ children, className }: UlProps) {
    return (
        <ul className={`my-6 ml-6 list-disc text-foreground [&>li]:mt-2 ${className || ''}`}>
            {children}
        </ul>
    );
}
