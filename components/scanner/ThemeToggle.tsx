
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun } from 'lucide-react';
import { useIsMobile } from "@/hooks/use-mobile";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Button
      variant="ghost"
      size={isMobile ? "icon" : "sm"}
      className={isMobile ? "w-9 h-9 p-0" : "flex items-center"}
      onClick={toggleTheme}
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {isDarkMode ? (
        <>
          <Sun className="h-4 w-4 text-yellow-400" />
          {!isMobile && <span className="ml-1.5">Light</span>}
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 text-indigo-500" />
          {!isMobile && <span className="ml-1.5">Dark</span>}
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;
