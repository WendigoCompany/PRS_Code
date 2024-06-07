import { useEffect, useState } from "react";
import INIT from "../inits/Disclaim.init";
import { useLocation, useParams } from "react-router-dom";
import Disclaim_Compo from "../components/Disclaim/Disclaim.compo";
import LANG_MIDDLEWARE from "../middleware/Lang_mid";

const DATA = {};

export default function DISCLAIM() {
  const [loaded, setLoaded] = useState(false);
  const params = useParams();

  LANG_MIDDLEWARE(params.lang, useLocation().pathname);



  useEffect(() => {
    INIT({ lang: params.lang }).then((resp) => {
      DATA.global = resp;
      setLoaded(true);
    });
  }, []);

  return <>{loaded ? <Disclaim_Compo data={DATA} /> : ""}</>;
}
