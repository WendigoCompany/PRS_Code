import random from "../../assets/random";

const history = [];
let consecutives = 0;

export const add_consecutive = () => {
  consecutives++;
};
export const reset_consecutive = () => {
  consecutives = 0;
};

export default function Brain(select) {
  history.push(select);
  const history_predict = STUDY_PREVIOUS();
    let final = 0;
    if(consecutives >= 4){
        final = 0;
        reset_consecutive()
    }
  switch (final) {
    case 1:
      return 2;
    case 2:
      return 3;
    case 3:
      return 1;

    default:
      return random(3, 1);
  }
}

const STUDY_PREVIOUS = () => {
  const tail = history.length;
  const head = tail - 10 < 0 ? 0 : tail - 10;
  const body = history.slice(head, tail);

  const repeat_posibility = [0, 0, 0];
  for (let i = 0; i < body.length; i++) {
    let toAdd = 0;
    let counter = 1;
    do {
      if (body[i] == body[i - counter]) {
        toAdd++;
        counter++;
      } else {
        break;
      }
    } while (true);

    repeat_posibility[body[i] - 1] += toAdd;
  }

  let selected = 0;
  let posibility = 0;
  for (let i = 0; i < repeat_posibility.length; i++) {
    if (posibility + 2 < repeat_posibility[i]) {
      selected = i + 1;
      posibility = repeat_posibility[i];
    }
  }
  return selected;
};

export const COMPARE = (cpu, player) => {
  if (cpu == player) {
    return 1;
  }

  switch (cpu) {
    case 1:
      return player == 2 ? 2 : 3;

    case 2:
      return player == 3 ? 2 : 3;

    case 3:
      return player == 1 ? 2 : 3;
  }
};
