import { createContext, useContext, useState } from "react";

const Scene_Context = createContext();
export const useScene = () => useContext(Scene_Context);

export default function SceneProvider({ children, global }) {
  const [SCENE_COUNTER, setSC] = useState(0);

  return (
    <Scene_Context.Provider
      value={{
        GLOBAL: global.global,
        CB: global.scene.cbs,
        SC: { set: setSC, get: SCENE_COUNTER },
        DATA : global.scene.data
      }}
    >
      {children}
    </Scene_Context.Provider>
  );
}
