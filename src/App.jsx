import SCENE from "./pages/Scene";
import "./assets/base.css";
import DeviceProvider from "./context/Device";
import Router from "./router/Router";

export default function App() {
  return (
    <>
      <DeviceProvider>
        <Router />
      </DeviceProvider>
    </>
  );
}
