import { useEffect, useState } from "react";
import INIT from "../inits/Home.init";
import { useLocation, useParams } from "react-router-dom";
import Home_Compo from "../components/Home/Home.compo";
import DISCLAIM_MIDDLEWARE from "../middleware/Disclaim.mid";
import LANG_MIDDLEWARE from "../middleware/Lang_mid";

const DATA = {};
export default function HOME() {
  const [loaded, setLoaded] = useState(false);
  const params = useParams();


  LANG_MIDDLEWARE(params.lang, useLocation().pathname);
  DISCLAIM_MIDDLEWARE(params.lang, useLocation().pathname)

  useEffect(() => {
    INIT({ lang: params.lang }).then((resp) => {
      DATA.global = resp;
      setLoaded(true);
    });
  }, []);

  return <>{loaded ? <Home_Compo data={DATA}/> : ""}</>;
}

// <div>{loaded ? <Scene_Compo global={SCENE_DATA}></Scene_Compo> : ""}</div>
