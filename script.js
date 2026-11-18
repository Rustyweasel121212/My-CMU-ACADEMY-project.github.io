document.querySelectorAll(".fullscreen-button").forEach((button) => {
  button.addEventListener("click", async () => {
    const frame = document.getElementById(button.dataset.fullscreen);
    if (!frame) return;

    try {
      if (document.fullscreenElement === frame) {
        await document.exitFullscreen();
      } else if (frame.requestFullscreen) {
        await frame.requestFullscreen();
      } else if (frame.webkitRequestFullscreen) {
        frame.webkitRequestFullscreen();
      }
    } catch (error) {
      console.error("Unable to enter fullscreen mode:", error);
    }
  });
});

document.querySelectorAll(".code-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const code = document.getElementById(button.getAttribute("aria-controls"));
    if (!code) return;

    const isExpanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isExpanded));
    button.textContent = isExpanded ? "Show project code" : "Hide project code";
    code.hidden = isExpanded;
  });
});
