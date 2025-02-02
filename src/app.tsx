import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { Dashboard } from "./layouts/dashboard";

export function App() {
  return (
    <TooltipProvider>
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    </TooltipProvider>
  );
}
