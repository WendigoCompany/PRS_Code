import { useParams } from "react-router-dom";
import back_img from "../../assets/icons/back.png";
import { back_modal } from "../Modals/back.modal";
import User_Button from "../UserBar/User_Button";
import { useDevice } from "../../context/Device";
import "../../style/less/Components/Game.less";
import { loadImagesSequentially } from "../../assets/preload";
import { useEffect, useState } from "react";
import GAME_SPRAY from "./Spray";

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
        elements.push(
          <div
            className="g-bc-mob"
            style={{
              "background-image": `url(${data.game.bc.url})`,
            }}
          ></div>
        );
      } else {
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
      <GAME_SPRAY sp_data={data.game.sprays}></GAME_SPRAY>
    </div>
  );
}
