const backToTopButton = document.getElementById("backtotop");

backToTopButton.addEventListener("click", () => {
  // Hide the button when clicked
  backToTopButton.classList.add("hidden");

  // Scroll to the top
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

window.addEventListener("scroll", () => {
  // Show the button when user has scrolled down
  if (window.scrollY > 100) {
    backToTopButton.classList.remove("hidden");
  } else {
    backToTopButton.classList.add("hidden");
  }
});
