import React from 'react';
import { Button } from './button';

interface LargeButtonProps {
    children: React.ReactNode,
    label?: string
    onClick?: () => void;
    variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    className?: string;
}

const LargeButton: React.FC<LargeButtonProps> = ({
    children,
    label,
    onClick,
    variant = 'default',
    className = ''
}) => {
    const style = "h-24 w-30 transition-transform duration-200 hover:scale-110 flex flex-col items-center justify-center gap-2 hover:cursor-pointer animate-fadeInUp";

    return (
        <Button 
            variant={variant} 
            onClick={onClick}
            className={`${style} ${className}`}
        >
            {children}
            {label}
        </Button>
    );
};

export default LargeButton;