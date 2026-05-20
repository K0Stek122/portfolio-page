interface H2Props {
    children: React.ReactNode;
    className?: string;
}

export default function H2({ children, className }: H2Props) {
    return (
        <h2 className={`scroll-m-20 text-center text-2xl font-bold tracking-tight text-white ${className || ''}`}>
            {children}
        </h2>
    );
}
