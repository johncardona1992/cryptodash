import Dashboard from "../Dashboard";
import Settings from "../Settings";
import Content from "../Shared/Content";
import "./App.css";
import AppBar from "./AppBar";
import AppLayout from "./AppLayout";
import { AppProvider } from "./AppProvider";

const App = () => {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        <Content>
          <Settings />
          <Dashboard />
        </Content>
      </AppProvider>
    </AppLayout>
  );
};

export default App;
