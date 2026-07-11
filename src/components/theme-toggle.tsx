import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';
import { useTheme } from './theme-provider';

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="fixed bottom-4 left-4 z-50 rounded-full hover:cursor-pointer"
        >
            {theme === 'dark' ? <Sun /> : <Moon />}
        </Button>
    );
}
