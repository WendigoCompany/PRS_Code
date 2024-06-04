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

