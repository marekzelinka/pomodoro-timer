import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { Dashboard } from "./layouts/dashboard";

function App() {
  return (
    <TooltipProvider>
      <ThemeProvider>
        <Dashboard />
      </ThemeProvider>
    </TooltipProvider>
  );
}

export default App;
