import { useEffect, useState } from "react";
import INIT from "../inits/Loby.init";
import { useLocation, useParams } from "react-router-dom";
import Loby_Compo from "../components/Loby/Loby.compo";
import SAVE_MIDDLEWARE from "../middleware/Save.mid";
import DISCLAIM_MIDDLEWARE from "../middleware/Disclaim.mid";
import LANG_MIDDLEWARE from "../middleware/Lang_mid";

const DATA = {};

export default function LOBY() {
  const [loaded, setLoaded] = useState(false);
  const params = useParams();

  LANG_MIDDLEWARE(params.lang, useLocation().pathname);
  DISCLAIM_MIDDLEWARE(params.lang, useLocation().pathname)
  SAVE_MIDDLEWARE(params.lang)



  useEffect(() => {
    INIT({ lang: params.lang }).then((resp) => {
      DATA.global = resp;
      setLoaded(true);
    });
  }, []);

  return <>{loaded ? <Loby_Compo/> : ""}</>;
}

// <div>{loaded ? <Scene_Compo global={SCENE_DATA}></Scene_Compo> : ""}</div>
