function createFirework(x, y) {
  const firework = document.createElement("div");
  firework.className = "firework";
  firework.style.left = x + "px";
  firework.style.top = y + "px";
  document.body.appendChild(firework);

  firework.addEventListener("animationend", () => {
    firework.remove();
  });
}

document.getElementById("confirm").addEventListener("click", () => {
  // create fireworks effect when user click btn pay
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  for (let i = 0; i < 200; i++) {
    const x = Math.random() * screenWidth;
    const y = Math.random() * screenHeight;
    createFirework(x, y);
  }
  document.getElementById("popup").style.display = "block";
  setTimeout(function () {
    document.getElementById("popup").style.display = "none";
  }, 1000);
});
