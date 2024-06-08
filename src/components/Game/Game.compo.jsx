import { useParams } from "react-router-dom";
import back_img from "../../assets/icons/back.png";
import { back_modal } from "../Modals/back.modal";
import User_Button from "../UserBar/User_Button";
import { useDevice } from "../../context/Device";
import "../../style/less/Components/Game.less";
import { loadImagesSequentially } from "../../assets/preload";
import { useEffect, useState } from "react";
import GAME_SPRAY from "./Spray";
import Game_Options from "./Game_Options";
import { disableScroll, enableScroll } from "../../assets/scroll_manager";

export default function Game_Compo({ data }) {
  const lang = useParams().lang;
  const device = useDevice();
  const [preloaded, setPL] = useState(false);

  const PRELOAD = () => {
    loadImagesSequentially([data.game.bc.url])
      .then((res) => {
        setPL(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const LOAD_COMPO_BC = () => {
    const elements = [];

    if (preloaded) {
      if (device == "mob") {
        disableScroll()
        document.body.style.overflow = "auto";
        elements.push(
          <div
            className="g-bc-mob"
            style={{
              "background-image": `url(${data.game.bc.url})`,
            }}
          ></div>
        );
      } else {
        enableScroll()
        document.body.style.overflow = "hidden";
        elements.push(
          <div
            className="g-bc-desk"
            // style={{
            //   "background-image": `url(${data.game.bc.url})`,
            // }}
          >
            <img className="w-100" src={data.game.bc.url} alt="" />
          </div>
        );

      }
    }

    return elements;
  };

  useEffect(() => {
    PRELOAD();
  }, []);

  return (
    <div>
      <User_Button cb={back_modal} params={lang} image={back_img} />
      {LOAD_COMPO_BC()}
      <GAME_SPRAY sp_data={data.game.sprays}/>
      <Game_Options bar_txt={data.global.bar}/>
    </div>
  );
}
