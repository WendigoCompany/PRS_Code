import rock_img from "../../assets/icons/rock.png";
import paper_img from "../../assets/icons/paper.png";
import scis_img from "../../assets/icons/sci.png";
import { useDevice } from "../../context/Device";
import Brain, {
  COMPARE,
  add_consecutive,
  reset_consecutive,
} from "./Game.brain";
import { useEffect, useState } from "react";
import random from "../../assets/random";
import { NEXT_SPRAY } from "./Spray";
import { endgame_modal } from "../Modals/user_endgame";
import { useParams } from "react-router-dom";

export default function Game_Options({bar_txt}) {
  const device = useDevice();
  const [select, setSel] = useState(0);
  const [user_life, setLife] = useState(100);
  const [victory, setVictory] = useState(false);

  const lang = useParams().lang;
  const isSelected = (val, yes, no) => {
    return select == val || select == 0 ? yes : no;
  };

  const START_ROUND = (select) => {
    // const CPU = Brain(select);
     
    const CPU = Brain(select);
    let prev = 0;
    let interval = setInterval(() => {
      if (prev != 0) {
        document.getElementById(`op-sel-${prev}`).style.opacity = 0;
      }
      prev = random(3, 1);
      document.getElementById(`op-sel-${prev}`).style.opacity = 1;
    }, 300);

    setTimeout(() => {
      document.getElementById(`op-sel-${1}`).style.opacity = 0;
      document.getElementById(`op-sel-${2}`).style.opacity = 0;
      document.getElementById(`op-sel-${3}`).style.opacity = 0;

      document.getElementById(`op-sel-${CPU}`).style.opacity = 1;
      clearInterval(interval);

      setTimeout(() => {
        setSel(0);
        setTimeout(() => {
          try {
            document.getElementById(`op-sel-${CPU}`).style.opacity = 0;
          } catch (error) {}
        }, 500);

        switch (COMPARE(CPU, select)) {
          // DAW
          case 1:
            add_consecutive();
            break;

          case 2:
            setVictory(NEXT_SPRAY());
            add_consecutive();
            add_consecutive();
            break;

          case 3:
            const newlife = user_life - 5;
            setLife(newlife);
            reset_consecutive();
            break;
        }
      }, 1000);
    }, 3000);
  };

  useEffect(() => {
    if (user_life <= 0) {
      endgame_modal(lang, "lose")
    } else if (victory) {
      endgame_modal(lang, "win")
    }
  }, [user_life, victory]);
  return (
    <div>
      <div className={`g-btn-act-op-cont-${device}`}>
        <div id={`op-sel-${1}`} className={`g-btn-act-op-${device}`}>
          <img className="w-100" src={rock_img} alt="" />
        </div>
        <div id={`op-sel-${2}`} className={`g-btn-act-op-${device}`}>
          <img className="w-100" src={paper_img} alt="" />
        </div>
        <div id={`op-sel-${3}`} className={`g-btn-act-op-${device}`}>
          <img className="w-100" src={scis_img} alt="" />
        </div>
      </div>

      <div className={`g-btn-act-cont-${device}`}>
        <button
          disabled={select == 0 ? false : true}
          onClick={() => {
            setSel(1);
            START_ROUND(1);
          }}
          style={{ opacity: isSelected(1, 1, 0) }}
          className={`g-btn-act-${device}`}
        >
          <img className="w-100" src={rock_img} alt="" />
        </button>
        <button
          disabled={select == 0 ? false : true}
          onClick={() => {
            setSel(2);
            START_ROUND(2);
          }}
          style={{ opacity: isSelected(2, 1, 0) }}
          className={`g-btn-act-${device}`}
        >
          <img className="w-100" src={paper_img} alt="" />
        </button>
        <button
          disabled={select == 0 ? false : true}
          onClick={() => {
            setSel(3);
            START_ROUND(3);
          }}
          style={{ opacity: isSelected(3, 1, 0) }}
          className={`g-btn-act-${device}`}
        >
          <img className="w-100" src={scis_img} alt="" />
        </button>
      </div>

      <div>
        <div className={`atten-bar-${device}`}>
          <h3
            style={{
              width: `${user_life}%`,
            }}
            className={`t-center att-lb-${device}`}
          >
            {bar_txt}
          </h3>
          <div
            style={{
              width: `${user_life}%`,
            }}
            id="filled"
            className={`atten-bar-fill-${device}`}
          ></div>
        </div>
      </div>
    </div>
  );
}
