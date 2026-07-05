/* ============================================================
   Feliz Cumpleaños Vickyy ❤️ — interacciones
   (SIN música de fondo — el único audio es el del video)
   ============================================================ */

/* ---- Datos de la galería (orden cronológico, de antes a después) ---- */
const FOTOS = [
  { src: "media/fotos/foto-01.jpg", cap: "14 sep 2025" },
  { src: "media/fotos/foto-02.jpg", cap: "12 oct 2025" },
  { src: "media/fotos/foto-03.jpg", cap: "12 oct 2025" },
  { src: "media/fotos/foto-04.jpg", cap: "16 dic 2025" },
  { src: "media/fotos/foto-05.jpg", cap: "19 dic 2025" },
  { src: "media/fotos/foto-06.jpg", cap: "26 dic 2025" },
  { src: "media/fotos/foto-07.jpg", cap: "05 mar 2026" },
  { src: "media/fotos/foto-08.jpg", cap: "26 jun 2026" },
];

/* ---- Estrellas titilantes ---- */
function makeStars(n) {
  const sky = document.getElementById("starfield");
  if (!sky) return;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.className = "star";
    const size = (Math.sin(i * 12.9898) * 43758.5453) % 1;
    const sz = 1 + Math.abs(size) * 2.4;
    s.style.width = sz + "px";
    s.style.height = sz + "px";
    s.style.left = ((i * 37) % 100) + Math.abs(size) * 3 + "%";
    s.style.top = ((i * 53) % 100) + "%";
    s.style.setProperty("--dur", (3 + Math.abs(size) * 4).toFixed(1) + "s");
    s.style.animationDelay = (Math.abs(size) * 5).toFixed(1) + "s";
    frag.appendChild(s);
  }
  sky.appendChild(frag);
}

/* ---- Estrellas también en la intro ---- */
function makeIntroStars(n) {
  const sky = document.getElementById("introSky");
  if (!sky) return;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    s.className = "star";
    const r = Math.abs((Math.sin(i * 7.1) * 9999) % 1);
    const sz = 1 + r * 2.2;
    s.style.width = sz + "px";
    s.style.height = sz + "px";
    s.style.left = ((i * 29) % 100) + "%";
    s.style.top = ((i * 41) % 100) + "%";
    s.style.setProperty("--dur", (3 + r * 3).toFixed(1) + "s");
    s.style.animationDelay = (r * 4).toFixed(1) + "s";
    sky.appendChild(s);
  }
}

/* ---- Corazones flotantes (suaves, cada tanto) ---- */
let heartsTimer = null;
const HEART_EMOJIS = ["💙", "💙", "💙", "🩵", "✨", "💫", "🤍"];
function spawnHeart() {
  const layer = document.getElementById("heartsLayer");
  if (!layer || document.hidden) return;
  const h = document.createElement("span");
  h.className = "floating-heart";
  h.textContent = HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)];
  h.style.left = 4 + Math.random() * 92 + "%";
  const dur = 8 + Math.random() * 7;
  h.style.animationDuration = dur + "s";
  h.style.fontSize = 0.9 + Math.random() * 1.4 + "rem";
  layer.appendChild(h);
  setTimeout(() => h.remove(), dur * 1000 + 200);
}
function startHearts() {
  if (heartsTimer) return;
  spawnHeart();
  heartsTimer = setInterval(spawnHeart, 1400);
}

/* ---- Confeti al abrir (DOM, sin librerías) ---- */
function burstConfetti() {
  const colors = ["#e9c877", "#ff9db8", "#2f5bbf", "#ffffff", "#cfe0ff", "#f2dca0"];
  const total = 90;
  const box = document.createElement("div");
  box.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:150;overflow:hidden";
  document.body.appendChild(box);
  for (let i = 0; i < total; i++) {
    const c = document.createElement("span");
    const isHeart = Math.random() < 0.25;
    const size = 6 + Math.random() * 8;
    c.style.cssText = `position:absolute;left:${Math.random() * 100}%;top:-20px;` +
      (isHeart
        ? `font-size:${size + 6}px;`
        : `width:${size}px;height:${size * 0.6}px;background:${colors[i % colors.length]};border-radius:2px;`);
    if (isHeart) c.textContent = "💙";
    const x = (Math.random() - 0.5) * 260;
    const rot = Math.random() * 720 - 360;
    const dur = 2200 + Math.random() * 2200;
    c.animate(
      [
        { transform: "translate(0,0) rotate(0deg)", opacity: 1 },
        { transform: `translate(${x}px, 105vh) rotate(${rot}deg)`, opacity: 1, offset: 0.9 },
        { transform: `translate(${x}px, 110vh) rotate(${rot}deg)`, opacity: 0 },
      ],
      { duration: dur, easing: "cubic-bezier(.2,.6,.4,1)", delay: Math.random() * 400 }
    );
    box.appendChild(c);
  }
  setTimeout(() => box.remove(), 5200);
}

/* ---- Reveal al scrollear ---- */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    els.forEach((e) => e.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add("in-view");
          io.unobserve(en.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  els.forEach((e) => io.observe(e));
}

/* ---- Galería ---- */
function buildGallery() {
  const g = document.getElementById("gallery");
  if (!g) return;
  FOTOS.forEach((f, i) => {
    const fig = document.createElement("figure");
    fig.innerHTML =
      `<img src="${f.src}" alt="Vicky y Tommy — ${f.cap}" loading="lazy">` +
      `<figcaption>💙 ${f.cap}</figcaption>`;
    fig.addEventListener("click", () => openLightbox(f.src, f.cap));
    g.appendChild(fig);
  });
}

/* ---- Lightbox ---- */
function openLightbox(src, cap) {
  const lb = document.getElementById("lightbox");
  document.getElementById("lbImg").src = src;
  document.getElementById("lbCap").textContent = cap ? "💙 " + cap : "";
  lb.classList.add("is-open");
  lb.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  const lb = document.getElementById("lightbox");
  lb.classList.remove("is-open");
  lb.setAttribute("aria-hidden", "true");
  document.getElementById("lbImg").src = "";
}

/* ---- Video: tap-to-play CON sonido (sirve para todos los videos) ---- */
function pauseOtherVideos(current) {
  document.querySelectorAll("video").forEach((v) => { if (v !== current) v.pause(); });
}
function initVideo(videoId, overlayId) {
  const video = document.getElementById(videoId);
  const overlay = document.getElementById(overlayId);
  if (!video || !overlay) return;

  const start = () => {
    pauseOtherVideos(video);   // que no se solapen los audios
    video.muted = false;       // ¡con sonido!
    video.volume = 1.0;
    video.controls = true;     // mostrar controles nativos al arrancar
    const p = video.play();
    if (p && p.catch) {
      p.catch(() => {
        // Si el navegador bloquea el audio, al menos que se vea el control
        video.controls = true;
      });
    }
    overlay.classList.add("is-hidden");
  };

  overlay.addEventListener("click", start);
  video.addEventListener("play", () => {
    pauseOtherVideos(video);
    overlay.classList.add("is-hidden");
  });
  // Si termina, volver a mostrar el botón para "ver de nuevo"
  video.addEventListener("ended", () => {
    overlay.querySelector(".play-label").textContent = "Verlo de nuevo 💙";
    overlay.classList.remove("is-hidden");
  });
}

/* ---- Apertura del sobre ---- */
function openGift() {
  const intro = document.getElementById("intro");
  const site = document.getElementById("site");
  if (!intro || intro.classList.contains("is-open")) return;

  burstConfetti();
  intro.classList.add("is-open");
  site.classList.add("is-visible");
  site.setAttribute("aria-hidden", "false");
  startHearts();
  // dejar el foco al inicio del sitio
  setTimeout(() => { window.scrollTo({ top: 0, behavior: "auto" }); }, 60);
  setTimeout(() => { intro.style.display = "none"; }, 1000);
}

/* ---- Init ---- */
document.addEventListener("DOMContentLoaded", () => {
  makeStars(70);
  makeIntroStars(40);
  buildGallery();
  initReveal();
  initVideo("bdayVideo", "playOverlay");
  initVideo("estherVideo", "estherOverlay");

  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("openBtn");
  [envelope, openBtn].forEach((el) => {
    if (!el) return;
    el.addEventListener("click", (e) => { e.stopPropagation(); openGift(); });
  });
  if (envelope) {
    envelope.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openGift(); }
    });
  }

  document.getElementById("lbClose").addEventListener("click", closeLightbox);
  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  const back = document.getElementById("backToVideo");
  if (back) back.addEventListener("click", () => {
    document.getElementById("video").scrollIntoView({ behavior: "smooth" });
  });
});
