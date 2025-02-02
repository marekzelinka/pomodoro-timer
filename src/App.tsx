import { TooltipProvider } from "./components/ui/tooltip";
import { Dashboard } from "./layouts/dashboard";

function App() {
  return (
    <TooltipProvider>
      <Dashboard />
    </TooltipProvider>
  );
}

export default App;
