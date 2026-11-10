const object = document.querySelector("#canvasObject");
const rotation = document.querySelector("#rotation");
const scale = document.querySelector("#scale");
const speed = document.querySelector("#speed");
const rotationOut = document.querySelector("#rotationOut");
const scaleOut = document.querySelector("#scaleOut");
const speedOut = document.querySelector("#speedOut");
const playButton = document.querySelector("#playButton");
const resetButton = document.querySelector("#resetButton");
const modes = [...document.querySelectorAll(".mode")];
let activeMode = "float";
let playing = true;

function updateTransform() {
  const degrees = Number(rotation.value);
  const factor = Number(scale.value) / 100;
  object.style.transform = `rotate(${degrees}deg) scale(${factor})`;
  rotationOut.value = `${degrees}°`;
  scaleOut.value = `${scale.value}%`;
}
function updateSpeed() {
  const duration = Math.max(.35, 4 - Number(speed.value) * .11);
  object.style.animationDuration = `${duration}s`;
  speedOut.value = `${(Number(speed.value) / 10).toFixed(1)}×`;
}
function setMode(mode) {
  activeMode = mode;
  object.classList.remove("float", "spin", "pulse");
  object.classList.add(mode);
  modes.forEach(button => button.classList.toggle("active", button.dataset.mode === mode));
  object.style.animationPlayState = playing ? "running" : "paused";
}
[rotation, scale].forEach(input => input.addEventListener("input", updateTransform));
speed.addEventListener("input", updateSpeed);
modes.forEach(button => button.addEventListener("click", () => setMode(button.dataset.mode)));
playButton.addEventListener("click", () => {
  playing = !playing;
  object.style.animationPlayState = playing ? "running" : "paused";
  playButton.innerHTML = playing ? "Ⅱ &nbsp; PAUSE" : "▶ &nbsp; PLAY";
});
resetButton.addEventListener("click", () => {
  rotation.value = 0; scale.value = 100; speed.value = 10;
  updateTransform(); updateSpeed(); playing = true;
  playButton.innerHTML = "Ⅱ &nbsp; PAUSE";
  setMode("float");
});
updateTransform(); updateSpeed(); setMode(activeMode);