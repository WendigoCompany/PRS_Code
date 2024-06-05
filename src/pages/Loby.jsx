import { useEffect, useState } from "react";
import INIT from "../inits/Loby.init";
import { useParams } from "react-router-dom";
import Loby_Compo from "../components/Loby/Loby.compo";

const DATA = {};

export default function LOBY() {
  const [loaded, setLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    INIT({ lang: params.lang }).then((resp) => {
      DATA.global = resp;
      setLoaded(true);
    });
  }, []);

  return <>{loaded ? <Loby_Compo/> : ""}</>;
}

// <div>{loaded ? <Scene_Compo global={SCENE_DATA}></Scene_Compo> : ""}</div>
