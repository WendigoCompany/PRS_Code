import SCENE from "./pages/Scene";
import "./assets/base.css";
import DeviceProvider from "./context/Device";


export default function App(){
    return <>
    <DeviceProvider>
    <SCENE></SCENE>
    </DeviceProvider>
    </>
}