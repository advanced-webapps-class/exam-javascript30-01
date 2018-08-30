//js

function playSound(e) {
  //e.keyCode는 keydown시에  keyCode값이 들어감
  console.log(e.keyCode);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();
}

window.addEventListener('keydown', playSound);
