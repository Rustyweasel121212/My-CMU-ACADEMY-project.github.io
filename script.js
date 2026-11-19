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

// Add the project reflections at the bottom of the page, just above the footer.
const footer = document.querySelector(".site-footer");
if (footer) {
  const descriptions = document.createElement("section");
  descriptions.className = "project-descriptions";
  descriptions.setAttribute("aria-label", "Project descriptions");
  descriptions.innerHTML = `
    <style>
      .project-descriptions { margin-top: 30px; padding-top: 24px; border-top: 1px solid var(--border-color); }
      .project-descriptions h2 { margin: 0 0 16px; color: var(--text-primary); font-size: 1.5rem; }
      .description-list { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
      .description-card { padding: 18px; border: 1px solid var(--border-color); border-radius: 12px; background: var(--light-bg); }
      .description-card h3 { margin: 0 0 8px; color: var(--primary); font-size: 1.05rem; }
      .description-card p { margin: 0; color: var(--text-secondary); }
      .project-descriptions .code-toggle { margin: 0 0 18px; }
      @media (max-width: 900px) { .description-list { grid-template-columns: 1fr; } }
    </style>
    <h2>About These Projects</h2>
    <button class="code-toggle" type="button" aria-expanded="false" aria-controls="project-descriptions-content">Show project descriptions</button>
    <div class="description-list" id="project-descriptions-content" hidden>
      <article class="description-card">
        <h3>Project 1: Firefox Logo</h3>
        <p>In this project, I used the shape properties I learned in Unit 1 and brought them together to create a Firefox logo. I originally imagined layering a transparent Firefox logo over a pixelated fox, but I found that opacity in CMU Graphics did not look the way I wanted, so I simplified the design.</p>
      </article>
      <article class="description-card">
        <h3>Project 2: At Work</h3>
        <p>For this project, I wanted to make something more interactive than my last project. When someone clicks, the screen changes to YouTube as a joke about secretly watching videos while the boss thinks you are working. After a certain number of clicks, the boss appears and fires you.</p>
      </article>
      <article class="description-card">
        <h3>Project 3: Brilliant or Blunder</h3>
        <p>In this project, I combined <code>onMousePress</code>, <code>onMouseMove</code>, and <code>if</code> statements to make an interactive project. It shows a Brilliant or Blunder sign, inspired by chess.com. It also features a spinning loading sector whose sweep angle increases and decreases.</p>
      </article>
    </div>
  `;

  const descriptionButton = descriptions.querySelector(".code-toggle");
  descriptionButton.addEventListener("click", () => {
    const content = document.getElementById(descriptionButton.getAttribute("aria-controls"));
    const isExpanded = descriptionButton.getAttribute("aria-expanded") === "true";
    descriptionButton.setAttribute("aria-expanded", String(!isExpanded));
    descriptionButton.textContent = isExpanded ? "Show project descriptions" : "Hide project descriptions";
    content.hidden = isExpanded;
  });

  footer.before(descriptions);
}
