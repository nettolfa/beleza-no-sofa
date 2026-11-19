// Galeria com ampliação de fotos
(() => {
  const tiles = [...document.querySelectorAll(".work")];
  const box = document.querySelector("dialog.lightbox");
  const img = box.querySelector("img");
  const count = box.querySelector(".count");
  let i = 0;
  const show = n => {
    i = (n + tiles.length) % tiles.length;
    const t = tiles[i];
    img.src = t.dataset.full;
    img.alt = t.querySelector("img").alt;
    count.textContent = `${i + 1} de ${tiles.length}`;
  };
  tiles.forEach((t, n) => t.addEventListener("click", () => { show(n); box.showModal(); }));
  box.querySelector(".close").addEventListener("click", () => box.close());
  box.querySelector(".prev").addEventListener("click", () => show(i - 1));
  box.querySelector(".next").addEventListener("click", () => show(i + 1));
  box.addEventListener("click", e => { if (e.target === box || e.target.classList.contains("frame")) box.close(); });
  let x0 = null;
  box.addEventListener("touchstart", e => { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(dx < 0 ? i + 1 : i - 1); x0 = null; });
  box.addEventListener("keydown", e => { if (e.key === "ArrowLeft") show(i - 1); if (e.key === "ArrowRight") show(i + 1); });
})();

// Menu do celular
(() => {
  const menu = document.getElementById("menu-celular");
  const open = document.querySelector(".menu-btn[aria-controls]");
  // Com o menu aberto, o resto da página fica inacessível ao teclado e ao leitor de tela
  const behind = [document.querySelector("header"), document.querySelector("main"), document.querySelector("footer"), document.querySelector(".wa-float")];
  const focusables = () => [...menu.querySelectorAll("a, button")];
  const setOpen = on => {
    menu.classList.toggle("open", on);
    open.setAttribute("aria-expanded", on);
    document.body.style.overflow = on ? "hidden" : "";
    behind.forEach(el => { if (el) el.inert = on; });
    (on ? menu.querySelector(".menu-close") : open).focus();
  };
  open.addEventListener("click", () => setOpen(true));
  menu.querySelector(".menu-close").addEventListener("click", () => setOpen(false));
  menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", e => {
    if (!menu.classList.contains("open")) return;
    if (e.key === "Escape") { setOpen(false); return; }
    if (e.key !== "Tab") return;
    const list = focusables(), first = list[0], last = list[list.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();

// Celular: brilhos quando aparecem na tela; botão flutuante some na chamada final
(() => {
  if (!("IntersectionObserver" in window)) return;
  if (matchMedia("(hover: none)").matches) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-shining"); io.unobserve(e.target); } }), { threshold: 0.8 });
    document.querySelectorAll(".btn-shine").forEach(el => io.observe(el));
  }
  const fab = document.querySelector(".wa-float");
  const end = document.getElementById("agendar");
  new IntersectionObserver(([e]) => fab.classList.toggle("hide", e.isIntersecting), { threshold: 0.2 }).observe(end);
})();

// Cursor de tesoura: a cada clique fora de botões e links, a tesoura fecha e abre ("corte")
(() => {
  if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  // Carrega a tesoura fechada antes, para o primeiro corte não piscar
  for (const s of ["", "@2x", "@3x"]) new Image().src = `img/cursor-tesoura-fechada${s}.png`;
  const root = document.documentElement;
  let t;
  document.addEventListener("mousedown", e => {
    if (e.button !== 0) return;
    clearTimeout(t);
    root.classList.add("corte");
    t = setTimeout(() => root.classList.remove("corte"), 160);
  });
})();
