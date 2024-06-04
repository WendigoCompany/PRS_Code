const PLAYER_NAME = (sessionStorage.getItem("save") == null) ? ("Player") : (sessionStorage.getItem("save").name);


export const getActorColor = (actor) => {
  switch (actor.toLowerCase()) {
    case PLAYER_NAME.toLowerCase():
        return "#749eff"
    case "kurumi":
        return "#e73636"

    default:
      return "#000000";
  }
};
