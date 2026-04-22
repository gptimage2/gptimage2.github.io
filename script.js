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

const externalToolUrl = "https://www.aicovea.com/gpt-image-2";

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

document.querySelectorAll("[data-copy-prompt]").forEach((button) => {
  button.addEventListener("click", async () => {
    const card = button.closest(".prompt-example-card");
    const prompt = card?.querySelector(".prompt-body")?.textContent?.trim();

    if (!prompt) {
      return;
    }

    try {
      await navigator.clipboard.writeText(prompt);
    } catch (error) {
      const fallback = document.createElement("textarea");
      fallback.value = prompt;
      fallback.setAttribute("readonly", "");
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      document.body.removeChild(fallback);
    }

    const originalText = button.textContent;
    button.textContent = "Copied";
    button.classList.add("is-copied");

    window.setTimeout(() => {
      button.textContent = originalText || "Copy";
      button.classList.remove("is-copied");
    }, 1400);
  });
});

document.querySelectorAll("[data-prompt-chip]").forEach((chip) => {
  chip.addEventListener("click", () => {
    const prompt = chip.getAttribute("data-prompt") || chip.textContent || "";
    const input = document.querySelector("[data-generator-prompt]");

    if (input instanceof HTMLTextAreaElement) {
      input.value = prompt.trim();
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.focus();
    }
  });
});

document.querySelectorAll("[data-generate-image]").forEach((button) => {
  button.addEventListener("click", () => {
    const workbench = button.closest(".generator-workbench");
    const results = workbench?.querySelector("[data-generator-results]");

    if (!results) {
      return;
    }

    button.disabled = true;
    button.textContent = "Generating...";
    results.classList.remove("has-result");
    results.classList.add("is-loading");

    window.setTimeout(() => {
      results.classList.remove("is-loading");
      results.classList.add("has-result");
      button.disabled = false;
      button.textContent = "Generate Image";
    }, 1800);
  });
});

document.querySelectorAll("[data-variant-demo]").forEach((button) => {
  button.addEventListener("click", () => {
    const shell = button.closest(".variant-tool-wrap") || document;
    const status = shell.querySelector("[data-variant-status]");
    const readyText = button.getAttribute("data-ready-text") || "Preview ready — continue with a fuller workflow on AICovea.";

    button.disabled = true;
    button.textContent = "Generating...";

    if (status) {
      status.innerHTML = "<strong>Preparing preview</strong><span>Building a guided image workflow state.</span>";
    }

    window.setTimeout(() => {
      button.disabled = false;
      button.textContent = button.getAttribute("data-default-text") || "Generate Preview";

      if (status) {
        status.innerHTML = `<strong>Preview ready</strong><span>${readyText}</span><a class="result-cta" href="${externalToolUrl}" target="_blank" rel="noopener">Continue on AICovea</a>`;
      }
    }, 1000);
  });
});
