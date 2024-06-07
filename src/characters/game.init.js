export default async function GAME_CHARACTER_INIT(id) {
  sessionStorage.removeItem("lang");
  sessionStorage.removeItem("wid");
  sessionStorage.removeItem("sid");

  sessionStorage.setItem("widg", id.split("-")[0]);
  sessionStorage.setItem("cidg", id.split("-")[1]);

  if (sessionStorage.getItem("sidg") == null) {
    sessionStorage.setItem("sidg", 0);
  }
  switch (parseInt(sessionStorage.getItem("widg"))) {
    case 0: {
      return (await import("./Kurumi_Tokisaki/init_game_kurumi_tokisaki"))
        .default;
    }
  }
}
