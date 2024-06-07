// const load_scene_en = async () => {
//   const SCENE_DATA = await (async () => {
//     switch (parseInt(sessionStorage.getItem("sid"))) {
//       case 1:
//         return (
//           await import("./en/scene_1/init")
//         ).default;
//     }
//   })();

//   return SCENE_DATA;
// };

// const load_scene_sp = async () => {
//     const SCENE_DATA = await (async () => {
//       switch (parseInt(sessionStorage.getItem("sid"))) {
//         case 1:
//           return (
//             await import("./sp/scene_1/init")
//           ).default;
//       }
//     })();

//     return SCENE_DATA;
//   };

// // LANG
// export default (async () => {
//   const SCENE_DATA = await (async () => {
//     switch (sessionStorage.getItem("lang")) {
//       case "en":
//         return load_scene_en();
//         case "sp":
//             return load_scene_sp();
//     }
//   })();

//   return SCENE_DATA;
// })();

export default (async () => {
  switch (parseInt(sessionStorage.getItem("cidg"))) {
    case 0:
      return (await import("./game/costume_0.json")).default;
  }
})();
