import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { Dashboard } from "./layouts/dashboard";

export function App() {
  return (
    <TooltipProvider>
      <ThemeProvider>
        <Dashboard />
        <Toaster position="top-center" />
      </ThemeProvider>
    </TooltipProvider>
  );
}
