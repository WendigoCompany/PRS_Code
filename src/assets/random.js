export default function random(max, min = 0) {
    max ++
  return Math.floor(Math.random() * (max - min)) + min;
}
