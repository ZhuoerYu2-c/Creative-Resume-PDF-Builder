import { projects, pageContent } from "./portfolio-content.js?v=20260615-usv-yolo";

const grid = document.querySelector("#projectGrid");
const dialog = document.querySelector("#projectDialog");
const dialogContent = document.querySelector("#dialogContent");

function renderPageContent() {
  const { meta, header, hero, metrics, work, experience, archive, approach, toolchain, contact, footer } = pageContent;

  document.title = meta.title;
  document.querySelector('meta[name="description"]').setAttribute("content", meta.description);
  document.querySelector(".brand-copy strong").textContent = header.brand;
  document.querySelector(".brand-copy small").textContent = header.subtitle;
  document.querySelector(".desktop-nav").innerHTML = header.nav.map(([label, href]) => `<a href="${href}">${label}</a>`).join("");
  document.querySelector(".header-actions .text-link").textContent = header.resumeLabel;

  document.querySelector(".eyebrow").innerHTML = `<span class="status-dot"></span> ${hero.eyebrow}`;
  document.querySelector(".hero h1").innerHTML = hero.titleHtml;
  document.querySelector(".hero-intro").textContent = hero.intro;
  document.querySelector(".hero-actions .primary-button").innerHTML = `${hero.primaryAction} <span>↘</span>`;
  document.querySelector(".hero-actions .primary-button").href = "#work";
  document.querySelector(".hero-actions .secondary-button").href = "https://github.com/example";
  document.querySelector(".hero-actions .secondary-button").textContent = `${hero.githubLabel} ↗`;
  document.querySelector(".hero-tags").innerHTML = hero.tags.map((tag) => `<span>${tag}</span>`).join("");
  document.querySelector(".console-head span:first-child").textContent = hero.consoleFile;
  document.querySelector(".console-live").textContent = hero.consoleStatus;
  document.querySelector(".console-portrait img").src = "/assets/avatar.svg";
  document.querySelector(".console-portrait img").alt = "示例姓名自动化工程师个人照片";
  document.querySelector(".console-portrait .mono-label").textContent = hero.profileLabel;
  document.querySelector(".console-portrait strong").textContent = hero.profileTitle;
  document.querySelector(".console-portrait small").textContent = hero.school;
  document.querySelector(".console-grid").innerHTML = hero.skills.map(([label, value]) => `<div><span>${label}</span><strong>${value}</strong></div>`).join("");
  document.querySelector(".signal-readout > span").textContent = hero.consoleSignal;

  document.querySelector(".metrics").innerHTML = metrics.map((item) => {
    const displayValue = `${Number(item.value).toLocaleString("en-US")}${item.suffix || ""}`;
    return `<article><strong data-count="${item.value}" data-suffix="${item.suffix || ""}">${displayValue}</strong><span>${item.label}</span></article>`;
  }).join("");

  document.querySelector("#work .section-index").textContent = work.index;
  document.querySelector("#work h2").textContent = work.title;
  document.querySelector("#work .section-heading p").textContent = work.intro;
  document.querySelector("#work .filter-bar").innerHTML = work.filters.map(([label, value], index) => `
    <button class="filter${index === 0 ? " active" : ""}" data-filter="${value}" type="button">${label}</button>
  `).join("");

  document.querySelector("#experience .section-index").textContent = experience.index;
  document.querySelector("#experience h2").textContent = experience.title;
  document.querySelector("#experience .timeline").innerHTML = experience.items.map((item) => `
    <article class="timeline-item reveal">
      <time>${item.time}</time>
      <div class="timeline-logo"><img src="${item.logo}" alt="${item.logoAlt}" loading="lazy" /></div>
      <div class="timeline-copy">
        <span>${item.organization}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <div class="timeline-tags">${item.tags.map((tag) => `<b>${tag}</b>`).join("")}</div>
      </div>
    </article>
  `).join("");

  document.querySelector("#archive .section-index").textContent = archive.index;
  document.querySelector("#archive h2").textContent = archive.title;
  document.querySelector("#archive .archive-grid").innerHTML = archive.items.map((item) => `
    <article class="archive-card reveal">
      <img src="${item.image}" alt="${item.imageAlt}" loading="lazy" />
      <span>${item.category}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <ul>${item.details.map((detail) => `<li>${detail}</li>`).join("")}</ul>
      <small>${item.tools}</small>
    </article>
  `).join("");

  document.querySelector("#system .section-index").textContent = approach.index;
  document.querySelector("#system h2").textContent = approach.title;
  document.querySelector("#system .section-heading p").textContent = approach.intro;
  document.querySelector("#system .system-map").innerHTML = approach.steps.map(([number, title, detail], index) => `
    ${index > 0 ? '<div class="system-arrow">→</div>' : ""}
    <div class="system-node"><span>${number}</span><strong>${title}</strong><small>${detail}</small></div>
  `).join("");
  document.querySelector("#system .capability-grid").innerHTML = approach.capabilities.map((item) => `
    <article class="capability-card reveal">
      <span class="capability-code">${item.code}</span>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div class="tag-row">${item.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
    </article>
  `).join("");

  document.querySelector("#toolchain .section-index").textContent = toolchain.index;
  document.querySelector("#toolchain h2").textContent = toolchain.title;
  document.querySelector("#toolchain .toolchain").innerHTML = toolchain.items.map(([label, value]) => `<div><span>${label}</span><p>${value}</p></div>`).join("");

  document.querySelector("#contact .section-index").textContent = contact.index;
  document.querySelector("#contact h2").textContent = contact.title;
  document.querySelector("#contact p").textContent = contact.intro;
  const contactLinks = document.querySelectorAll("#contact .contact-actions a");
  contactLinks[0].innerHTML = `${contact.projectLabel} <span>↗</span>`;
  contactLinks[0].href = "#work";
  contactLinks[1].href = "https://github.com/example";
  contactLinks[2].href = "/";
  contactLinks[1].textContent = `${contact.githubLabel} ↗`;
  contactLinks[2].textContent = `${contact.resumeLabel} ↗`;

  const footerItems = document.querySelectorAll(".site-footer span");
  footerItems[0].textContent = footer[0];
  footerItems[1].textContent = footer[1];
}

function renderProjects() {
  grid.innerHTML = projects.map((project) => `
    <article class="project-card ${project.size} reveal" data-category="${project.category.join(" ")}" data-project="${project.id}" tabindex="0" role="button" aria-label="${pageContent.ui.openProjectAria}${project.title}">
      <div class="project-visual">
        <img src="${project.image}" alt="${project.title} ${pageContent.ui.projectImageAlt}" loading="lazy" />
        <span class="project-number">${project.number}</span>
        <span class="project-status">${project.status}</span>
      </div>
      <div class="project-meta"><span>${project.category.join(" / ").toUpperCase()}</span><span>${pageContent.ui.openCaseStudy}</span></div>
      <h3>${project.title}</h3>
      <p>${project.summary}</p>
      <div class="project-result">${project.result}</div>
    </article>
  `).join("");
}

function openProject(id, syncHash = true) {
  const project = projects.find((item) => item.id === id);
  if (!project) return;

  dialogContent.innerHTML = `
    <div class="dialog-hero">
      <img src="${project.image}" alt="${project.title}" />
      <div class="dialog-title"><span>${project.number} · ${project.status}</span><h2>${project.title}</h2></div>
    </div>
    <div class="dialog-body">
      <p class="dialog-summary">${project.summary}</p>
      <div class="dialog-context">
        <span>${pageContent.ui.projectBriefLabel}</span>
        <p>${project.problem}</p>
      </div>
      <div class="dialog-stats">${project.stats.map(([value, label]) => `<div><strong>${value}</strong><span>${label}</span></div>`).join("")}</div>
      <div class="dialog-columns">
        <div><h3>${pageContent.ui.implementationTitle}</h3><ul>${project.implementation.map((item) => `<li>${item}</li>`).join("")}</ul></div>
        <div><h3>${pageContent.ui.designTitle}</h3><ul>${project.details.map((item) => `<li>${item}</li>`).join("")}</ul></div>
      </div>
      <div class="dialog-validation">
        <span>${pageContent.ui.engineeringProcessLabel}</span>
        <h3>${pageContent.ui.engineeringExperienceTitle}</h3>
        <ul>${project.engineeringExperience.map((item) => `<li>${item}</li>`).join("")}</ul>
      </div>
      ${project.gallery ? `
        <div class="dialog-gallery">
          <div class="dialog-section-head"><span>${pageContent.ui.projectResultsLabel}</span><h3>${pageContent.ui.projectResultsTitle}</h3></div>
          <div class="gallery-grid">
            ${project.gallery.map(([image, caption], index) => `
              <figure class="${project.gallery.length % 2 === 0 && index === project.gallery.length - 1 ? "gallery-wide" : ""}">
                <img src="${image}" alt="${caption}" loading="lazy" />
                <figcaption>${caption}</figcaption>
              </figure>
            `).join("")}
          </div>
        </div>
      ` : ""}
      <div class="dialog-pipeline">${project.pipeline.replaceAll(" → ", "\n→ ")}</div>
      ${project.link ? `<div class="hero-actions"><a class="primary-button" href="${project.link}" target="_blank" rel="noreferrer">${project.linkLabel || pageContent.ui.defaultProjectLink} <span>↗</span></a></div>` : ""}
    </div>
  `;

  dialog.showModal();
  dialog.scrollTop = 0;
  document.body.style.overflow = "hidden";
  if (syncHash) history.replaceState(null, "", `#project-${project.id}`);
}

function initFiltering() {
  document.querySelectorAll(".filter").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".filter").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;
      document.querySelectorAll(".project-card").forEach((card) => {
        card.classList.toggle("hidden", filter !== "all" && !card.dataset.category.includes(filter));
      });
    });
  });
}

function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

  function revealVisibleElements() {
    document.querySelectorAll(".reveal:not(.visible)").forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.08 && rect.bottom > -80) {
        element.classList.add("visible");
        observer.unobserve(element);
      }
    });
  }

  window.addEventListener("scroll", revealVisibleElements, { passive: true });
  window.addEventListener("resize", revealVisibleElements);
  requestAnimationFrame(revealVisibleElements);
  setTimeout(revealVisibleElements, 350);
}

function initCounters() {
  const metrics = document.querySelector(".metrics");
  if (!metrics) return;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll("[data-count]").forEach((element) => {
        const target = Number(element.dataset.count);
        const decimals = Number(element.dataset.decimals || 0);
        const suffix = element.dataset.suffix || "";
        const duration = 1100;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = target * eased;
          element.textContent = `${value.toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
          })}${suffix}`;
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      countObserver.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  countObserver.observe(metrics);
}

function initTheme() {
  const themeToggle = document.querySelector("#themeToggle");
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    themeToggle.setAttribute("aria-label", document.body.classList.contains("light") ? pageContent.ui.darkThemeLabel : pageContent.ui.lightThemeLabel);
  });
  themeToggle.setAttribute("aria-label", pageContent.ui.darkThemeLabel);
}

function initDialog() {
  grid.addEventListener("click", (event) => {
    const card = event.target.closest(".project-card");
    if (card) openProject(card.dataset.project);
  });
  grid.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches(".project-card")) {
      event.preventDefault();
      openProject(event.target.dataset.project);
    }
  });
  document.querySelector("#dialogClose").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.style.overflow = "";
    if (location.hash.startsWith("#project-")) history.replaceState(null, "", location.pathname);
  });

  const initialProjectId = location.hash.startsWith("#project-") ? location.hash.replace("#project-", "") : "";
  if (initialProjectId) requestAnimationFrame(() => openProject(initialProjectId, false));
}

function initSignalCanvas() {
  const canvas = document.querySelector("#signalCanvas");
  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let particles = [];

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * devicePixelRatio);
    canvas.height = Math.floor(height * devicePixelRatio);
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    particles = Array.from({ length: Math.max(36, Math.floor(width / 32)) }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: 0.16 + Math.random() * 0.42,
      amp: 10 + Math.random() * 22,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function animateSignals(time) {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = document.body.classList.contains("light") ? "rgba(8,123,77,.11)" : "rgba(125,255,196,.10)";
    ctx.fillStyle = document.body.classList.contains("light") ? "rgba(8,123,77,.28)" : "rgba(125,255,196,.35)";
    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      if (particle.x > width + 20) particle.x = -20;
      const y = particle.y + Math.sin(time * 0.0007 + particle.phase) * particle.amp;
      ctx.beginPath();
      ctx.arc(particle.x, y, index % 7 === 0 ? 2.2 : 1.2, 0, Math.PI * 2);
      ctx.fill();
    });
    requestAnimationFrame(animateSignals);
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);
  requestAnimationFrame(animateSignals);
}

if (!window.CV_SITE_ACCESS?.isPublicDomain) {
  renderPageContent();
  renderProjects();
  initFiltering();
  initReveal();
  initCounters();
  initTheme();
  initDialog();
  initSignalCanvas();
}
