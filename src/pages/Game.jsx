import { useEffect, useState } from "react";
import INIT from "../inits/Game.init";
import { useLocation, useParams } from "react-router-dom";
import Game_Compo from "../components/Game/Game.compo";
import SAVE_MIDDLEWARE from "../middleware/Save.mid";
import DISCLAIM_MIDDLEWARE from "../middleware/Disclaim.mid";
import LANG_MIDDLEWARE from "../middleware/Lang_mid";
import GAME_CHARACTER_INIT from "../characters/game.init";

const DATA = {};

export default function GAME() {
  const [loaded, setLoaded] = useState(false);
  const params = useParams();

  LANG_MIDDLEWARE(params.lang, useLocation().pathname);
  DISCLAIM_MIDDLEWARE(params.lang, useLocation().pathname);
  SAVE_MIDDLEWARE(params.lang);



   

  useEffect(() => {
    INIT({ lang: params.lang }).then((resp) => {
      DATA.global = resp;
      GAME_CHARACTER_INIT(params.id).then((res) => {
        DATA.game = res;
        setLoaded(true);
      });
    });
  }, []);

  return <>{loaded ? <Game_Compo data={DATA} /> : ""}</>;
}

// <div>{loaded ? <Scene_Compo global={SCENE_DATA}></Scene_Compo> : ""}</div>
