import "./styles.css";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { resumeData } from "./resume-data.js";

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
    : `<div class="avatar-placeholder"><strong>${profile.name.slice(0, 1)}</strong><span>个人头像</span></div>`;

  return `<div class="avatar-frame">${image}</div>`;
}

function sectionTitle(title) {
  return `<h2 class="section-title">${title}</h2>`;
}

function bullets(items) {
  return `<ul class="bullets">${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;
}

function renderHeader() {
  const { brand, profile } = resumeData;

  return `
    <header class="header">
      <div class="brand-line">
        ${logoBlock(brand.targetCompany, "left")}
        ${logoBlock(brand.school, "right")}
      </div>

      <div class="identity">
        ${avatarBlock(profile)}
        <div class="identity-main">
          <div class="label">Visual Communication · Illustration · Editorial Design</div>
          <h1>${profile.name}<span>${profile.englishName}</span></h1>
          <h3>${profile.headline}</h3>
          <p>${profile.summary}</p>
        </div>
      </div>

      <div class="contacts">
        ${profile.contacts.map((x) => `<span>${x}</span>`).join("")}
      </div>
    </header>
  `;
}

function renderEducation() {
  return `
    <section class="section">
      ${sectionTitle("教育背景")}
      ${resumeData.education
        .map(
          (edu) => `
          <div class="entry compact-entry">
            <div class="entry-head">
              <div>
                <h3>${edu.school}</h3>
                <p>${edu.degree}</p>
              </div>
              <time>${edu.time}</time>
            </div>
            <div class="entry-note">${edu.detail}</div>
          </div>`
        )
        .join("")}
    </section>
  `;
}

function renderLabs() {
  return `
    <section class="section">
      ${sectionTitle("创作方向")}
      <ul class="plain-list">
        ${resumeData.labs.map((lab) => `<li>${lab}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderSkills() {
  return `
    <section class="section">
      ${sectionTitle("专业技能")}
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
      ${sectionTitle("项目作品")}
      ${resumeData.projects
        .map(
          (p) => `
          <article class="project">
            <div class="project-head">
              <h3>${p.title}</h3>
              <span>${p.source}</span>
            </div>
            <p>${p.text}</p>
            ${
              p.repo
                ? `<div class="repo-line"><strong>Repo：</strong><span>${p.repo}</span></div>`
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
      ${sectionTitle("展览与荣誉")}
      <div class="subsection">
        <h3 class="small-title">展览记录</h3>
        ${bullets(resumeData.patents)}
      </div>
      <div class="subsection">
        <h3 class="small-title">荣誉奖项</h3>
        ${bullets(resumeData.awards)}
      </div>
    </section>
  `;
}

async function waitForImages(root) {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    images.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    })
  );
}

async function exportFixedPagesPdf() {
  const pages = Array.from(document.querySelectorAll(".pdf-page"));
  const button = document.querySelector("#exportPdfBtn");

  if (!pages.length) return;

  const oldText = button.textContent;
  button.textContent = "正在导出两页 PDF...";
  button.disabled = true;

  try {
    await document.fonts.ready;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true
    });

    for (let i = 0; i < pages.length; i += 1) {
      const page = pages[i];
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

      const imgData = canvas.toDataURL("image/jpeg", 0.98);

      if (i > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, "JPEG", 0, 0, 210, 297);
    }

    const now = new Date();
    const pad = (number) => String(number).padStart(2, "0");
    const timestamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    pdf.save(`创意简历_${timestamp}.pdf`);
  } catch (error) {
    console.error(error);
    alert("PDF 导出失败，请打开浏览器 Console 查看错误。");
  } finally {
    button.textContent = oldText;
    button.disabled = false;
  }
}

function render() {
  app.innerHTML = `
    <div class="toolbar no-print">
      <div>
        <strong>艺术生两页视觉简历模板</strong>
        <span>每个白色页面对应 PDF 的一页，主要内容集中在 src/resume-data.js。</span>
      </div>
      <button id="exportPdfBtn">导出两页固定 PDF</button>
    </div>

    <main class="resume-document">
      <section class="pdf-page page-one">
        ${renderHeader()}
        ${renderEducation()}
        ${renderLabs()}
        ${renderSkills()}
        ${renderExperience("创作与策展经历", resumeData.labExperience, "organization")}
      </section>

      <section class="pdf-page page-two">
        ${renderExperience("实习与实践经历", resumeData.companyExperience, "company")}
        ${renderProjects()}
        ${renderPatentsAwards()}
      </section>
    </main>
  `;

  document.querySelector("#exportPdfBtn").addEventListener("click", exportFixedPagesPdf);
}

render();
