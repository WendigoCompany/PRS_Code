import { useEffect, useState } from "react";
import INIT from "../inits/Scene.init";
import Scene_Compo from "../components/Scene/Scene";
import SceneProvider from "../context/Scene";
import GetParams from "../assets/getParams";
import INIT_SCENE from "../characters/init_scene_main";

export default function SCENE() {
  const [SCENE_DATA, setSD] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const params = GetParams();

  useEffect(() => {
    const data = {};

    INIT({ lang: params.lang }).then((resp) => {
      data.global = resp;
      INIT_SCENE(params).then((resp) => {
        data.scene = resp;
        setSD(data);
        setLoaded(true);
      });

      // setSD(resp)

      // setLoaded(true)
    });
  }, []);

  return (
    <div>{loaded ? <Scene_Compo global={SCENE_DATA}></Scene_Compo> : ""}</div>
  );
}
