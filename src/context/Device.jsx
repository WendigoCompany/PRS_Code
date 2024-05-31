import { createContext, useContext, useState } from "react";

const Device_Context = createContext();
export const useDevice = () => useContext(Device_Context);

const IS_MOBILE = () => {
  const width = window.innerWidth;
  if (width <= 768) {
    return "mob";
  }
  return "desk";
};

export default function DeviceProvider({ children }) {
  const [device, setDevice] = useState(IS_MOBILE());

  window.onresize = () => {
    setDevice(IS_MOBILE());
  };

  return (
    <Device_Context.Provider value={device}>{children}</Device_Context.Provider>
  );
}
