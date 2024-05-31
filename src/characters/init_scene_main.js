export default async function INIT_SCENE(params) {
  const data = {
    lang: params.lang,
    wid: params.id.split("-")[0],
    sid: params.id.split("-")[1],
  };

  sessionStorage.setItem("lang", params.lang);
  sessionStorage.setItem("wid", params.id.split("-")[0]);
  sessionStorage.setItem("sid", params.id.split("-")[1]);

  const SCENE_DATA = await (async () => {
    switch (parseInt(data.wid)) {
      case 0: {
        return (await import("./Kurumi_Tokisaki/init_scene_kurumi_tokisaki"))
          .default;
      }
    }
  })();

  return SCENE_DATA;
}
