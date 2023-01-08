import "./App.css";
import AppBar from "./AppBar";
import AppLayout from "./AppLayout";
import { AppProvider } from "./AppProvider";

const App = () => {
  return (
    <AppLayout>
      <AppProvider>
        <AppBar />
        Welcome to CryptoDash
      </AppProvider>
    </AppLayout>
  );
};

export default App;
