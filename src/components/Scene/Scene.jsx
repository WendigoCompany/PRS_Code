import { useEffect, useState } from "react";
import { useDevice } from "../../context/Device";
import Background_D from "./desk/Background.d";
import Background_M from "./mob/Background.m";
import Sprays_M from "./mob/Sprays_m";
import { loadImagesSequentially } from "../../assets/preload";
import MEMORY from "../../store/manager";
import Selections_M from "./mob/Selecctions_m";
import DialogBox_M from "./mob/Text_m";
import { HomeButton, SkipButton } from "./buttons";
import { BASEURL } from "../../assets/page_importants";
import { useParams } from "react-router-dom";

let userWait = false;
// http://localhost:3000/#/?lang=en&id=0-1
let COUNTER = 0;

// getter of NEXTSCENE for StopAnimation
let NEXT_SCENE_SERVICE;


export const get_userWait =()=>{
  return userWait
}

export const set_userWait =(value)=>{
    userWait = value;
}

export const StopAnimation = () => {
  userWait = false;
  NEXT_SCENE_SERVICE();
};

export default function Scene_Compo({ global }) {
  const [reload, reset] = useState(false);
  const lang = useParams().lang;

  const device = useDevice();
  const [loaded, setL] = useState(false);
  // const [SCENE_COUNTER, setSC] = useState(0);
  // const [DATA, setDATA] = useState(global.scene.data[SCENE_COUNTER]);
  const GLOBAL = global.global;
  const CB = global.scene.cbs;
  // const DATA = global.scene.data[SCENE_COUNTER];

  let DATA = global.scene.data[COUNTER];

  const prepare_image = (img, sprays) => {
    if (Array.isArray(img.img)) {
      img.img.map((wim, i) => {
        sprays[parseInt(img.tags[i]) - 1] = {
          url: img.img[i],
          style: img.style[i],
        };
      });
    } else {
    }
  };

  const PRELOAD_BC = () => {
    let images = [];
    if (DATA != undefined) {
      if (Array.isArray(DATA.background.img)) {
        images = images.concat(DATA.background.img);
      } else {
        images.push(DATA.background.img);
      }
    }

    // Preloading the next BC
    const NEXTDATA = global.scene.data[COUNTER + 1];
    if (NEXTDATA != undefined && NEXTDATA.background != undefined) {
      if (Array.isArray(NEXTDATA.background.img)) {
        images = images.concat(NEXTDATA.background.img);
      } else {
        images.push(NEXTDATA.background.img);
      }
    }

    return images.filter(
      (img) => img != null && img != "same" && img != undefined
    );
  };

  const PRELOAD_SPRAY = () => {
    if (DATA != undefined) {
      if (DATA.sprays.type == "basic") {
        let sprays = MEMORY.get("sp");
        let images = [];

        if (sprays.length == 0) {
          prepare_image(DATA.sprays, sprays);
        } else {
          let auxsprays = [];
          prepare_image(DATA.sprays, auxsprays);
          auxsprays.map((sp, i) => {
            if (sp.url == undefined || sp.url == null) {
              sprays[i] = null;
            } else if (sp.url != "same") {
              sprays[i] = auxsprays[i];
            }
          });
        }
        sprays.map((img) => {
          if (img != undefined && img != null) {
            images.push(img.url);
          }
        });
        MEMORY.set("sp", sprays);

        return images;
      } else if (DATA.sprays.type == "anima") {
        let images = [];
        if (Array.isArray(DATA.sprays.img)) {
          images = images.concat(DATA.sprays.img);
        }
        return images;
      }
    }
  };

  const SceneController = (data) => {
    let images = [];
    if (DATA !== undefined && DATA.type !== "select") {
      images = images.concat(PRELOAD_BC());
      images = images.concat(PRELOAD_SPRAY());
    }

    loadImagesSequentially(images)
      .then(() => {
        if (DATA == undefined) {
        } else {
          setL(true);

          // setTimeout(() => {
          //   setSC(1)
          //   SceneController();
          // }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error al cargar las imágenes:", error);
      });
  };

  const NEXT_SCENE = () => {
    if (!userWait) {
      userWait = true;

      // const counter = SCENE_COUNTER + 1;
      // setSC(counter);
      // setDATA(JSON.parse(JSON.stringify(global.scene.data[SCENE_COUNTER])))

      COUNTER++;
      DATA = global.scene.data[COUNTER];
      reset(!reload);
      SceneController();

      setTimeout(() => {
        if (
          DATA !== undefined &&
          DATA.sprays !== undefined &&
          DATA.sprays.type != "anima"
        ) {
          userWait = false;
        }
      }, 700);
    }
  };

  NEXT_SCENE_SERVICE = NEXT_SCENE;

  document.body.onclick = NEXT_SCENE;

  const SCENE_COMPONENT = () => {
    if (DATA !== undefined) {
      if (loaded) {
        if (DATA.type == "select") {
          DATA.sprays = { type: "basic" };
          DATA.background = { img: "same" };
        }

        return (
          <>
            {device == "mob" ? (
              <Background_M bc_data={DATA.background} />
            ) : (
              <Background_D bc_data={DATA.background} />
            )}
            {DATA.type == "select" ? <Selections_M /> : ""}
            <Sprays_M sp_data={DATA.sprays} />
            <DialogBox_M tx_data={DATA.text} />
          </>
        );
      } else {
        return "";
      }
    } else {
      END_SCENE();
    }
  };


  
  const END_SCENE = () => {
    //EN CADA SCENE, CREAR UNA CB , QUE SE VA A EJECUTAR ACA
    sessionStorage.setItem("tigger", true);
    sessionStorage.setItem("sidg",(parseInt(sessionStorage.getItem("sidg")))+1)
    window.location.href =
      BASEURL +
      lang +
      "/game/" +
      `${sessionStorage.getItem("widg")}-${sessionStorage.getItem("cidg")}`;
    //   setTimeout(function() {
    //     window.location.reload();
    // }, 100); 
    // alert("SE TERMINO!");
  };

  useEffect(() => {
    if (DATA !== undefined && DATA.sprays.type != "anima") {
      userWait = false;
    }
    SceneController();
  }, []);

  return (
    <>
      <SkipButton cb={END_SCENE}/>
      {SCENE_COMPONENT()}
      <HomeButton />
    </>
  );
}
