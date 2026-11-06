

function render() {
  const selected = currentPortfolio();
  document.querySelector("#portfolio-count").textContent = `${portfolios.length} Portfolios`;
  document.querySelector("#selected-portfolio-name").textContent = selected?.slotLabel ?? "-";
  document.querySelector("#selected-item-count").textContent = selected ? `${selected.items.length} Items` : "0 Items";
  document.querySelector("#save-item").disabled = !selected;
  document.querySelector("#preview-person").textContent = selected?.slotLabel ?? "-";

   renderPreview(selected);
   

function renderPreview(portfolio) {
  const preview = document.querySelector("#portfolio-preview");
  if (!portfolio || portfolio.name === "ยังไม่ได้กรอกข้อมูล") {
    preview.innerHTML = `<div class="preview-empty">เลือก Person แล้วกรอกข้อมูล Portfolio ด้านบน จากนั้นกด “บันทึกข้อมูล Portfolio” เพื่อดูตัวอย่างที่นี่</div>`;
    return;
  }

  const items = portfolio.items.length
    ? portfolio.items.map(renderPreviewItem).join("")
    : `<div class="preview-empty">${escapeHtml(portfolio.slotLabel)} ยังไม่มี Portfolio Item</div>`;

  preview.innerHTML = `
    <div class="preview-profile mb-3">
      <h3 class="h4 mb-1">${escapeHtml(portfolio.name)}</h3>
      <p class="mb-2 text-muted">${escapeHtml(portfolio.displayName || portfolio.slotLabel)}</p>
      <dl class="row mb-0 small">
        <dt class="col-sm-4">What I Enjoy</dt><dd class="col-sm-8">${escapeHtml(portfolio.enjoy || "-")}</dd>
        <dt class="col-sm-4">What I've Tried</dt><dd class="col-sm-8">${escapeHtml(portfolio.tried || "-")}</dd>
        <dt class="col-sm-4">What I'm Curious About</dt><dd class="col-sm-8 mb-0">${escapeHtml(portfolio.curious || "-")}</dd>
      </dl>
    </div>
    <div class="vstack gap-3">${items}</div>`;
}
function renderPreviewItem(item) {
  return `<article class="preview-item border rounded p-3">
    <div class="d-flex flex-wrap justify-content-between gap-2"><h3 class="h5 mb-1">${escapeHtml(item.title)}</h3><span class="small text-muted">${escapeHtml(item.date)}</span></div>
    <p class="small mb-2"><strong>${escapeHtml(item.type)}</strong> · ${escapeHtml(item.role)}</p>
    <p>${escapeHtml(item.description)}</p>
    <div class="mb-2">${item.skills.map((skill) => `<span class="badge text-bg-light border text-dark">${escapeHtml(skill)}</span>`).join("")}</div>
    <div class="preview-reflection mb-2"><strong>Reflection:</strong> ${escapeHtml(item.reflection.whatLearned)} · Next: ${escapeHtml(item.reflection.nextStep)}</div>
    <a class="small" href="${escapeHtml(item.evidence[0])}" target="_blank" rel="noopener">ดู Evidence</a>
  </article>`;
}

portfolioForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!portfolioForm.checkValidity()) { portfolioForm.classList.add("was-validated"); return; }
  const portfolio = currentPortfolio();
  if (!portfolio) return;
  const form = new FormData(portfolioForm);
  portfolio.name = form.get("name").trim();
  portfolio.displayName = form.get("displayName").trim();
  portfolio.enjoy = form.get("enjoy").trim();
  portfolio.tried = form.get("tried").trim();
  portfolio.curious = form.get("curious").trim();
  savePortfolios();
  portfolioForm.reset();
  portfolioForm.classList.remove("was-validated");
  render();
  showNotice(`บันทึกข้อมูลลงใน ${portfolio.slotLabel} แล้ว`);
});

itemForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!itemForm.checkValidity()) { itemForm.classList.add("was-validated"); return; }
  const portfolio = currentPortfolio();
  if (!portfolio) return;
  const form = new FormData(itemForm);
  const item = {
    id: `item-${crypto.randomUUID()}`,
    title: form.get("title").trim(), type: form.get("type").trim(), date: form.get("date"),
    role: form.get("role").trim(), description: form.get("description").trim(),
    skills: form.get("skills").split(",").map((skill) => skill.trim()).filter(Boolean),
    reflection: { whatDid: form.get("whatDid").trim(), whatLearned: form.get("whatLearned").trim(), challenge: form.get("challenge").trim(), nextStep: form.get("nextStep").trim() },
    evidence: [form.get("evidence").trim()],
  };
  // Items are pushed only into the selected portfolio's own nested items array.
  portfolio.items.push(item);
  savePortfolios();
  itemForm.reset();
  itemForm.classList.remove("was-validated");
  render();
  showNotice(`บันทึก “${item.title}” ลงใน ${portfolio.slotLabel} แล้ว`);
});
