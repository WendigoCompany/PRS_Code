import { useEffect, useState } from "react";
import INIT from "../inits/Game.init";
import { useParams } from "react-router-dom";
import Game_Compo from "../components/Game/Game.compo";

const DATA = {};

export default function GAME() {
  const [loaded, setLoaded] = useState(false);
  const params = useParams();

  useEffect(() => {
    INIT({ lang: params.lang }).then((resp) => {
      DATA.global = resp;
      setLoaded(true);
    });
  }, []);

  return <>{
    loaded ? <Game_Compo/> : ""
  }</>
}

  // <div>{loaded ? <Scene_Compo global={SCENE_DATA}></Scene_Compo> : ""}</div>
