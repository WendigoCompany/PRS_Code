import { useState } from "react";
import { useDevice } from "../../context/Device";
import Background_D from "./desk/Background.d";
import Background_M from "./mob/Background.m";
import Sprays_M from "./mob/Sprays_m";
import { loadImagesSequentially } from "../../assets/preload";
import MEMORY from "../../store/manager";

// http://localhost:3000/#/?lang=en&id=0-1

export default function Scene_Compo({ global }) {
  const device = useDevice();
  const [loaded, setL] = useState(false);
  const [SCENE_COUNTER, setSC] = useState(0);

  const GLOBAL = global.global;
  const CB = global.scene.cbs;
  const DATA = global.scene.data[SCENE_COUNTER];

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
    if (MEMORY.get("bc") == undefined) {
      if (DATA != undefined) {
        if (Array.isArray(DATA.background.img)) {
          images = images.concat(DATA.background.img);
        } else {
          images.push(DATA.background.img);
        }
      }

      const NEXTDATA = global.scene.data[SCENE_COUNTER + 1];

      if (NEXTDATA != undefined) {
        if (Array.isArray(NEXTDATA.background.img)) {
          images = images.concat(NEXTDATA.background.img);
        } else {
          images.push(NEXTDATA.background.img);
        }
      }

      return images.filter(
        (img) => img != null && img != "same" && img != undefined
      );
    }
  };

  const PRELOAD_SPRAY = () => {
    if (DATA != undefined) {
      let sprays = MEMORY.get("sp");
      let images = [];
      if (sprays.length == 0) {
        prepare_image(DATA.sprays, sprays);

      } else {
        let auxsprays = [];
        prepare_image(DATA.sprays, auxsprays);
        auxsprays.map( (sp , i ) => {
          if(sp.url == undefined || sp.url == null){
              sprays[i] = null;
          }else if(sp.url != "same"){
            sprays[i] = auxsprays[i];
          }
        })
      
      }
      sprays.map((img) => {
        if(img != undefined && img != null){
          images.push(img.url);
        }
      });
      MEMORY.set("sp", sprays);
      return images;
    }

  };

  const SceneController = () => {
    let images = [];
    images = images.concat(PRELOAD_BC());
    images = images.concat(PRELOAD_SPRAY());
    console.log(images);
    // console.log(PRELOAD_SPRAY(DATA));
    // console.log(PRELOAD_SPRAY(global.scene.data[SCENE_COUNTER + 1]));

    loadImagesSequentially(images)
      .then(() => {
        if (DATA == undefined) {
        } else {
          setL(true);

          setTimeout(() => {
            setSC(1)
            SceneController();
          }, 3000);
        }
      })
      .catch((error) => {
        console.error("Error al cargar las imágenes:", error);
      });

    // if (DATA != undefined) {
    //   if (Array.isArray(DATA.background.img)) {
    //     images = images.concat(DATA.background.img);
    //   } else {
    //     images.push(DATA.background.img);
    //   }

    //   if (Array.isArray(DATA.sprays.img)) {
    //     images = images.concat(DATA.sprays.img);
    //   } else {
    //     images.push(DATA.sprays.img);
    //   }
    // }

    // if (global.scene.data[SCENE_COUNTER + 1] != undefined) {
    //   const NEXTDATA = global.scene.data[SCENE_COUNTER + 1];
    //   if (Array.isArray(NEXTDATA.background.img)) {
    //     images = images.concat(NEXTDATA.background.img);
    //   } else {
    //     images.push(NEXTDATA.background.img);
    //   }

    //   if (Array.isArray(NEXTDATA.sprays.img)) {
    //     images = images.concat(NEXTDATA.sprays.img);
    //   } else {
    //     images.push(NEXTDATA.sprays.img);
    //   }
    // }

    // images = images.filter(
    //   (img) => img != null && img != "same" && img != undefined
    // );

    // loadImagesSequentially(images)
    //   .then(() => {
    //     if (DATA == undefined) {
    //     } else {
    //       setL(true);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error al cargar las imágenes:", error);
    //   });
  };
  SceneController();

  return (
    <div>
      {loaded ? (
        device == "mob" ? (
          <>
            <Background_M bc_data={DATA.background} />
            <Sprays_M sp_data={DATA.sprays} />
          </>
        ) : (
          <>
            <Background_D />
          </>
        )
      ) : (
        ""
      )}
    </div>
  );
}
