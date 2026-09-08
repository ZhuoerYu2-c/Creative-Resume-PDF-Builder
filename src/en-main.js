import "./styles.css";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { resumeData } from "./en-resume-data.js";

const app = document.querySelector("#app");

function logoBlock(item, side) {
  const image = item.logo
    ? `<img src="${item.logo}" alt="${item.name}" />`
    : `<div class="logo-placeholder">${item.name}</div>`;

  return `
    <div class="logo-block ${side}">
      <div class="logo-frame">${image}</div>
      <div class="logo-text">
        <strong>${item.name}</strong>
        <span>${item.caption}</span>
      </div>
    </div>
  `;
}

function avatarBlock(profile) {
  const image = profile.avatar
    ? `<img src="${profile.avatar}" alt="${profile.name}" />`
    : `<div class="avatar-placeholder"><strong>${profile.name.slice(0, 1)}</strong><span>Profile Photo</span></div>`;

  return `<div class="avatar-frame">${image}</div>`;
}

function sectionTitle(title) {
  return `<h2 class="section-title">${title}</h2>`;
}

function bullets(items) {
  return `<ul class="bullets">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function renderHeader() {
  const { brand, profile } = resumeData;

  return `
    <header class="header">
      <div class="brand-line">
        <div class="brand-spacer" aria-hidden="true"></div>
        ${logoBlock(brand.school, "right")}
      </div>

      <div class="identity">
        ${avatarBlock(profile)}
        <div class="identity-main">
          <div class="label">Robotics · Control · Artificial Intelligence</div>
          <h1>${profile.name}${profile.englishName ? `<span>${profile.englishName}</span>` : ""}</h1>
          ${profile.preferredName ? `<div class="preferred-name">${profile.preferredName}</div>` : ""}
          <h3>${profile.headline}</h3>
          <p>${profile.summary}</p>
        </div>
      </div>

      <div class="contacts">
        ${(profile.contacts || []).map((item) => `<span>${item}</span>`).join("")}
      </div>
    </header>
  `;
}

function renderEducation() {
  return `
    <section class="section">
      ${sectionTitle("EDUCATION")}
      ${resumeData.education
        .map(
          (education) => `
          <div class="entry compact-entry">
            <div class="entry-head">
              <div>
                <h3>${education.school}</h3>
                <p>${education.degree}</p>
              </div>
              <time>${education.time}</time>
            </div>
            <div class="entry-note">${education.detail}</div>
          </div>`
        )
        .join("")}
    </section>
  `;
}

function renderLabs() {
  return `
    <section class="section">
      ${sectionTitle("RESEARCH PLATFORMS")}
      <ul class="plain-list">
        ${resumeData.labs.map((lab) => `<li>${lab}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderSkills() {
  return `
    <section class="section">
      ${sectionTitle("TECHNICAL SKILLS")}
      <div class="skill-list">
        ${resumeData.skills
          .map(
            (group) => `
            <div class="skill-row">
              <strong>${group.title}</strong>
              <span>${group.items}</span>
            </div>`
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderExperience(title, list, nameKey) {
  return `
    <section class="section">
      ${sectionTitle(title)}
      ${list
        .map((item) => {
          const logo = item.logo
            ? `<img class="company-logo-inline" src="${item.logo}" alt="${item[nameKey]} logo" />`
            : "";

          return `
          <article class="entry">
            <div class="entry-head">
              <div>
                <h3 class="company-title">
                  <span>${item[nameKey]}</span>
                  ${logo}
                </h3>
                <p>${item.role}</p>
              </div>
              <time>${item.time}</time>
            </div>
            ${bullets(item.bullets)}
          </article>`;
        })
        .join("")}
    </section>
  `;
}

function renderProjects() {
  return `
    <section class="section">
      ${sectionTitle("SELECTED PROJECTS")}
      ${resumeData.projects
        .map(
          (project) => `
          <article class="project">
            <div class="project-head">
              <h3>${project.title}</h3>
              <span>${project.source}</span>
            </div>
            <p>${project.text}</p>
            ${
              project.repo
                ? `<div class="repo-line"><strong>Repository:</strong><span>${project.repo}</span></div>`
                : ""
            }
          </article>`
        )
        .join("")}
    </section>
  `;
}

function renderPatentsAwards() {
  return `
    <section class="section">
      ${sectionTitle("PATENTS & HONORS")}
      <div class="subsection">
        <h3 class="small-title">PATENTS</h3>
        ${bullets(resumeData.patents)}
      </div>
      <div class="subsection">
        <h3 class="small-title">HONORS & AWARDS</h3>
        ${bullets(resumeData.awards)}
      </div>
    </section>
  `;
}

function renderPortfolioLinks() {
  const portfolioLinks = (resumeData.portfolioLinks || [])
    .map(
      (item) => `
        <a class="portfolio-link" href="${item.url}" target="_blank" rel="noreferrer">
          <strong>${item.label}</strong>
          <span>${item.text}</span>
        </a>`
    )
    .join("");

  return `
    <section class="section portfolio-links-section">
      ${sectionTitle("PORTFOLIO & GITHUB")}
      <div class="portfolio-links">${portfolioLinks}</div>
    </section>
  `;
}

async function waitForImages(root) {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    images.map((image) => {
      if (image.complete) return Promise.resolve();
      return new Promise((resolve) => {
        image.onload = resolve;
        image.onerror = resolve;
      });
    })
  );
}

async function exportFixedPagesPdf() {
  const pages = Array.from(document.querySelectorAll(".pdf-page"));
  const button = document.querySelector("#exportPdfBtn");

  if (!pages.length) return;

  const oldText = button.textContent;
  button.textContent = "Exporting PDF...";
  button.disabled = true;

  try {
    await document.fonts.ready;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true
    });

    for (let index = 0; index < pages.length; index += 1) {
      const page = pages[index];
      await waitForImages(page);

      const canvas = await html2canvas(page, {
        scale: 2.4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: document.documentElement.scrollWidth,
        windowHeight: document.documentElement.scrollHeight
      });

      if (index > 0) pdf.addPage();
      pdf.addImage(canvas.toDataURL("image/png"), "PNG", 0, 0, 210, 297);
    }

    const now = new Date();
    const pad = (number) => String(number).padStart(2, "0");
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    pdf.save(`Alex_Chen_Robotics_AI_Engineer_${timestamp}.pdf`);
  } catch (error) {
    console.error(error);
    alert("PDF export failed. Please open the browser console for details.");
  } finally {
    button.textContent = oldText;
    button.disabled = false;
  }
}

function render() {
  document.title = "Alex Chen | Robotics and AI Engineer Resume";

  app.innerHTML = `
    <div class="resume-controls no-print">
      <div class="resume-primary-actions">
        <a class="portfolio-callout" href="/en/portfolio/">
          <span class="portfolio-callout-kicker">ENGINEERING PORTFOLIO</span>
          <strong>View Engineering Portfolio</strong>
          <i>↗</i>
        </a>
        <a class="language-switch" href="/" aria-label="Open Chinese resume">
          <span>LANGUAGE</span>
          <strong>CHINESE<br />RESUME</strong>
          <i>ZH ↗</i>
        </a>
      </div>
      <div class="pdf-control">
        <span>RESUME PDF</span>
        <button id="exportPdfBtn">Export PDF</button>
      </div>
    </div>

    <main class="resume-document">
      <section class="pdf-page page-one">
        ${renderHeader()}
        ${renderEducation()}
        ${renderLabs()}
        ${renderSkills()}
        ${renderExperience("RESEARCH EXPERIENCE", resumeData.labExperience, "organization")}
      </section>

      <section class="pdf-page page-two">
        ${renderExperience("INDUSTRY & ENGINEERING EXPERIENCE", resumeData.companyExperience, "company")}
        ${renderProjects()}
        ${renderPatentsAwards()}
        ${renderPortfolioLinks()}
      </section>
    </main>
  `;

  document.querySelector("#exportPdfBtn").addEventListener("click", exportFixedPagesPdf);
}

if (!window.CV_SITE_ACCESS?.isPublicDomain) {
  render();
}
