import { useEffect, useState } from "react";
import INIT from "../inits/.init";
import { useParams } from "react-router-dom";

export default function COPO() {
  const [loaded, setLoaded] = useState(false);
  const DATA = {};
  const params = useParams();

  useEffect(() => {
    INIT({ lang: params.lang }).then((resp) => {
      DATA.global = resp;
      DATA.params = params;
      setLoaded(true);
    });
  }, []);

  return <>{
    loaded ? "" : ""
  }</>
}

  // <div>{loaded ? <Scene_Compo global={SCENE_DATA}></Scene_Compo> : ""}</div>
