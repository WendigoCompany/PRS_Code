import { useEffect, useState } from "react";
import INIT from "../inits/Home.init";
import { useParams } from "react-router-dom";
import Home_Compo from "../components/Home/Home.compo";

const DATA = {};
export default function HOME() {
  const [loaded, setLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    INIT({ lang: params.lang }).then((resp) => {
      DATA.global = resp;
      setLoaded(true);
    });
  }, []);

  return <>{loaded ? <Home_Compo data={DATA}/> : ""}</>;
}

// <div>{loaded ? <Scene_Compo global={SCENE_DATA}></Scene_Compo> : ""}</div>
