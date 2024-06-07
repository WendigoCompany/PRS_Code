import { useState } from "react";
import { loadImagesSequentially } from "../../assets/preload";
import { useDevice } from "../../context/Device";
import { BASEURL } from "../../assets/page_importants";
import { useParams } from "react-router-dom";

// sessionStorage.setItem("tigger", false);

export default function GAME_SPRAY({ sp_data }) {
  const [sprayID, setSPID] = useState(parseInt(sessionStorage.getItem("sidg")));
  // const [preloaded, setPL] = useState(false);
  const device = useDevice();
  const lang = useParams().lang;
  // const PRELOAD = () => {
  //     loadImagesSequentially([data.game.bc.url])
  //       .then((res) => {
  //         setPL(true);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   };
  

  const LOAD_SPRAY = () => {
    const spray_data = sp_data.filter((sp) => sp.id == sprayID)[0];
    if(spray_data.trigger != false && sessionStorage.getItem("tigger") == "false"){
        if(spray_data.trigger == "END"){
            alert("YOU ARE WINNER")
        }else{
            window.location.href = BASEURL + lang + "/scene/" + `${sessionStorage.getItem("widg")}-${spray_data.trigger}`;
        }
    }else{
      setTimeout(() => {
        sessionStorage.setItem("tigger", false)
      }, 2000);
      return sp_data.filter((sp) => sp.id == sprayID)[0].url;  
    }
    
  };

  return (
    <div>
      <img
        src=""
        id="main-img"
        alt=""
        style={{
          position: "absolute",
          opacity: 1,
          bottom: 0,
          left: 0,
          width: "100%",
        }}
      />

      <img
        style={{
          position: "absolute",
          opacity: 0,
          top: 0,
          left: 0,
          width: "10px",
        }}
        src={LOAD_SPRAY()}
        onLoad={() => {
          document.getElementById("main-img").src = LOAD_SPRAY();
        }}
        alt=""
      />
    </div>
  );
}
