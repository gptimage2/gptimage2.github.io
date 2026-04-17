const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector("#site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("details").forEach((detail) => {
  detail.addEventListener("toggle", () => {
    detail.dataset.state = detail.open ? "open" : "closed";
  });
});

const externalToolUrl = "https://你的承接页URL";

document.querySelectorAll("[data-tool-tab]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const targetMode = tab.getAttribute("data-tool-tab");

    document.querySelectorAll("[data-tool-tab]").forEach((item) => {
      const isActive = item === tab;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    document.querySelectorAll("[data-tool-mode]").forEach((mode) => {
      mode.classList.toggle("is-active", mode.getAttribute("data-tool-mode") === targetMode);
    });
  });
});

document.querySelectorAll("[data-select-chip]").forEach((chip) => {
  chip.addEventListener("click", () => {
    const row = chip.closest(".option-row");

    if (!row) {
      return;
    }

    row.querySelectorAll("[data-select-chip]").forEach((item) => {
      item.classList.toggle("is-selected", item === chip);
    });
  });
});

document.querySelectorAll("[data-external-tool]").forEach((button) => {
  button.addEventListener("click", () => {
    window.open(externalToolUrl, "_blank");
  });
});

document.querySelectorAll("[data-count-input]").forEach((input) => {
  const counter = input.parentElement?.querySelector("[data-count-output]");
  const maxLength = input.getAttribute("maxlength") || "2000";

  const updateCount = () => {
    if (counter) {
      counter.textContent = `${input.value.length} / ${maxLength}`;
    }
  };

  input.addEventListener("input", updateCount);
  updateCount();
});
