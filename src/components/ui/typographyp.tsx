interface PProps {
    children: React.ReactNode;
    className?: string
}

export default function P({ children, className }: PProps) {
    return (
        <p className={`leading-7 [&:not(:first-child)]:mb-4 mt-4 text-white ${className || ''}`}>
            {children}
        </p>
    );
}