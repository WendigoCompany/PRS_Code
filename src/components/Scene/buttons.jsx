import { useDevice } from "../../context/Device";

export function SkipButton(){
    const device = useDevice();
    return <>
    <button className={`skip-btn-${device}`}>SKIP</button>
    </>
}

export function HomeButton(){
    const device = useDevice();
    return <>
    <button className={`home-btn-${device}`}>HOME</button>
    </>
}