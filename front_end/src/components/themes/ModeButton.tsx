import React from 'react';
import { Moon, Sun } from 'lucide-react';

import { useTheme } from '@/components/themes/ThemeProvider';

import { Button } from '../ui/button';

const ModeButton = () => {
  const { theme, setTheme } = useTheme(); // Lấy theme hiện tại và hàm cập nhật theme

  // Kiểm tra nếu theme hiện tại là "dark"
  const isDarkTheme = theme === 'dark';

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => {
        // Chuyển đổi giữa theme "dark" và "light"
        setTheme(isDarkTheme ? 'light' : 'dark');
      }}
    >
      {!isDarkTheme ? (
        <Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Sun className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
    </Button>
  );
};

export default ModeButton;
