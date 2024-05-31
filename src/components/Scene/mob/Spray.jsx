import { useEffect, useState } from "react";
import { useDevice } from "../../../context/Device";

export default function Spray({ id, data }) {
  const device = useDevice();



  const [style, setST] = useState({});
  useEffect(() => {
    try {
      if (data != undefined && data != null) {
        setST(data.style[device]);
      }
    } catch (error) {}
  }, [data]);

  return (
    <>
      {data != undefined && data != null? (
        <>
          <div className="sp-visi" id={`sp-${id}`} style={{}}>
            <img
              onLoad={(e) => {
                setTimeout(() => {
                  e.target.style.opacity = 1;
                }, 500);
              }}
              src={data.url}
              class="sp"
              style={{ ...style }}
              alt=""
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}

{
  /* <div v-if="pack != undefined" class="sp-cont-ins" :id="`ba-${i}`">
<Individual_Spray
  :url="pack.url"
  :sty="pack.style"
  :tag="i"
></Individual_Spray>
</div>


<div class="sp-visi" :id="`sp-${tag}`" :style="`opacity : ${opacity}`">
<img class="sp" :style="sty" :src="url" alt="" @load="show_img" />
</div> */
}
