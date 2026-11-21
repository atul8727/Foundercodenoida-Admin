import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/features/theme/ThemeContext";
import IconButton from "@/components/ui/IconButton";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";
  return <IconButton icon={dark ? Sun : Moon} label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme} className="!h-10 !w-10" />;
}
