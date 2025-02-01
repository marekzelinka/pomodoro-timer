import { PomodoroManager } from "./components/pomodoro-manager";
import { DashboardLayout } from "./layouts/dashboard";

function App() {
  return (
    <DashboardLayout>
      <PomodoroManager />
    </DashboardLayout>
  );
}

export default App;
