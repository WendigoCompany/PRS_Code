import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useDevice } from "../../../context/Device";
import { StopAnimation } from "../Scene";
const AnimationComponent = ({ sp_data }) => {
  const device = useDevice();

  let interval_animation;
  const animationRef = useRef(null);

  window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
  });


  const START_ANIMATION = () => {
    // TIMES
    const visible = gsap.timeline();
    const notvisible = gsap.timeline();

    const TLS = [gsap.timeline(), gsap.timeline()];
    let i = 0;
    let max = sp_data.img.length - 1;
    let movement = "inc";
    let ACTUAL_TLS = 0;


    TLS[ACTUAL_TLS].to(document.getElementById(`frame-${i}`), {
      duration: 0.2,
      opacity: 0,
    });



    interval_animation = setInterval(() => {
  


      
        
      TLS[ACTUAL_TLS].to(document.getElementById(`frame-${i}`), {
        duration: 0.2,
        opacity: 0,
      });

      if(ACTUAL_TLS == 0){
        ACTUAL_TLS = 1;
      }else{
        ACTUAL_TLS = 0;
      }

      if (movement == "inc") {
        if (i == max) {
          movement = "dec";
          i--;
        } else {
          i++;
        }
      } else {
        if (i == 0) {
          movement = "inc";
          i++;
        } else {
          i--;
        }
      }

      TLS[ACTUAL_TLS].to(document.getElementById(`frame-${i}`), {
        duration: 0.2,
        opacity: 1,
      });
  
      const img1 = document.getElementById('frame-0');
      const img2 = document.getElementById('frame-1');
      if (!img1 && !img2) {
        clearInterval(interval_animation);
      }



    }, sp_data.speed * 1000);

    // // const animationTimeline = gsap.timeline();
    // const animationTimeline = gsap.timeline();
    // const animationTimeline1 = gsap.timeline();

    // setTimeout(() => {
    //     animationTimeline.to(document.getElementById(`frame-${0}`), {
    //         duration: 1,
    //         opacity: 0,
    //         delay: 0,
    //       });
    //       animationTimeline1.to(document.getElementById(`frame-${1}`), {
    //         duration: 1,
    //         opacity: 1,
    //         delay: 0.3,
    //       });
    // }, 3000);
  };



  useEffect(() => {
    if (sp_data != undefined) {
      const { img, style } = sp_data;

      img.forEach((frame, i) => {
        const IMG = new Image();
        IMG.src = frame;
        IMG.onload = () => {
          const newImage = document.createElement("img");
          newImage.src = frame;
          animationRef.current.appendChild(newImage);
          newImage.id = `frame-${i}`;
          newImage.className = "animation-basic";
   

          Object.keys(style[device][i]).map((k) => {
            newImage.style[k] = style[device][i][k];
          });

          if (i == 0) {
            START_ANIMATION();
          }
        };
      });
    }
  }, []);

  return (
    <>
      <div

      >
        <button
          className={`continue-btn-${device}`}
          onClick={() => {
            clearInterval(interval_animation)
            StopAnimation();
          }}
        >

        </button>
      </div>
      <div ref={animationRef} style={{}}></div>
    </>
  );
};

export default AnimationComponent;
