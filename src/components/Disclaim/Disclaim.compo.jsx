import { useLocation, useParams } from "react-router-dom";
import { useDevice } from "../../context/Device";
import { BASEURL } from "../../assets/page_importants";
import "../../style/less/Components/Disclaim.less";
import { useState } from "react";
import { prepare_special_text } from "../../assets/special_text";



export default function Disclaim_Compo({ data }) {
  const device = useDevice();
  let origin;
  const params = useParams();

  const [reload, setRelo] = useState(false);
  try {
    origin = sessionStorage.getItem("origin").substring(1);
  } catch (error) {
    origin = params.lang + "/home";
  }
  const move = () => {
    setTimeout(() => {
      sessionStorage.removeItem("origin");
      window.location.href = BASEURL + origin;
    }, 3000);
  };
  const YES = () => {
    sessionStorage.setItem("disclaim", "");
    setRelo(!reload);
  };

  const NO = () => {
    window.location.href = "https://www.google.com/";
  };

  return (
    <div>
      <div>
        {sessionStorage.getItem("disclaim") == null ? (
          <>
            {prepare_special_text(data.global.text, device)}
            <div class={`btn-cont-${device} t-center`}>
              <button onClick={YES} class={`btn-success btn-page-${device}`}>
                {data.global.yes_button}
              </button>
              <button onClick={NO} class={`btn-danger btn-page-${device}`}>
                {data.global.no_button}
              </button>
            </div>
          </>
        ) : (
          <>
            {prepare_special_text(data.global.sectext, device)}
            {move()}
          </>
        )}

        {/* <p class={`text-${device} t-center`}>{}</p> */}
      </div>
    </div>
  );
}
