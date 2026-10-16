/* ==========================================================
   ΡΥΘΜΙΣΕΙΣ: συμπληρώστε εδώ τα στοιχεία της Μαρίας.
   Ό,τι μείνει κενό ("") απλώς δεν εμφανίζεται.
   ========================================================== */
const CONFIG = {
  phone: "",            // π.χ. "+306912345678" (χρησιμοποιείται και για WhatsApp/Viber)
  email: "",            // π.χ. "maria@example.com"
  storeCode: "GR-9511007", // κωδικός καταστήματος της Μαρίας, μπαίνει σε όλους τους συνδέσμους Oriflame
  shopUrl: "https://gr.oriflame.com/", // το e-shop (ο κωδικός προστίθεται αυτόματα)
  facebook: "https://www.facebook.com/koliarakimaria",
  messenger: "https://m.me/koliarakimaria",
  instagram: "https://www.instagram.com/mariakoliarake/",
  // Σύνδεσμοι αναρτήσεων Instagram για ενσωμάτωση, π.χ.
  // "https://www.instagram.com/p/XXXXXXXXXXX/"
  instagramPosts: []
};

document.addEventListener("DOMContentLoaded", () => {
  const digits = CONFIG.phone.replace(/[^\d]/g, "");
  const messageUrl = digits ? `https://wa.me/${digits}` : CONFIG.messenger;
  const external = (a) => { a.target = "_blank"; a.rel = "noopener"; };

  /* Add Maria's store code to every Oriflame link */
  const withStore = (url) => {
    if (!CONFIG.storeCode || !url) return url;
    const u = new URL(url);
    u.searchParams.set("store", CONFIG.storeCode);
    return u.toString();
  };
  if (CONFIG.shopUrl) CONFIG.shopUrl = withStore(CONFIG.shopUrl);
  document.querySelectorAll(".js-store").forEach((a) => { a.href = withStore(a.href); external(a); });

  /* Message buttons go straight to WhatsApp (or Messenger until a phone is set) */
  document.querySelectorAll(".js-message").forEach((a) => { a.href = messageUrl; external(a); });
  document.querySelectorAll(".js-shop-keep").forEach((a) => {
    a.href = CONFIG.shopUrl || messageUrl; external(a);
  });
  if (CONFIG.shopUrl) {
    document.querySelectorAll(".js-shop").forEach((a) => {
      a.href = CONFIG.shopUrl; a.textContent = "Δείτε στο e-shop"; external(a);
    });
  } else {
    document.querySelectorAll(".js-shop").forEach((a) => { a.href = messageUrl; external(a); });
  }

  /* Contact buttons */
  const actions = [
    digits && { label: "WhatsApp", href: `https://wa.me/${digits}`, solid: true },
    digits && { label: "Viber", href: `viber://chat?number=%2B${digits}` },
    { label: "Messenger", href: CONFIG.messenger, solid: !digits },
    CONFIG.shopUrl && { label: "E-shop", href: CONFIG.shopUrl },
    { label: "Instagram", href: CONFIG.instagram },
    { label: "Facebook", href: CONFIG.facebook },
    CONFIG.email && { label: CONFIG.email, href: `mailto:${CONFIG.email}` },
    CONFIG.phone && { label: CONFIG.phone, href: `tel:${CONFIG.phone.replace(/\s/g, "")}` }
  ].filter(Boolean);
  const box = document.getElementById("contact-actions");
  actions.forEach((item) => {
    const a = document.createElement("a");
    a.className = "btn " + (item.solid ? "btn-solid" : "btn-ghost");
    a.href = item.href;
    a.textContent = item.label;
    if (item.href.startsWith("http")) external(a);
    box.appendChild(a);
  });

  /* Offer countdowns */
  const dayMs = 86400000;
  document.querySelectorAll(".offer[data-ends]").forEach((card) => {
    const end = new Date(card.dataset.ends);
    const label = card.querySelector(".offer-ends");
    const left = Math.ceil((end - Date.now()) / dayMs);
    const dateText = end.toLocaleDateString("el-GR", { day: "numeric", month: "long" });
    if (left < 0) { card.classList.add("is-expired"); label.textContent = `Έληξε στις ${dateText}`; }
    else if (left <= 1) { label.textContent = "Λήγει σήμερα"; label.classList.add("is-urgent"); }
    else { label.textContent = `Έως ${dateText} · απομένουν ${left} μέρες`; if (left <= 4) label.classList.add("is-urgent"); }
  });

  /* Mobile menu */
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");
  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Κλείσιμο μενού" : "Άνοιγμα μενού");
  };
  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

  /* Active nav link */
  const links = [...nav.querySelectorAll("a")];
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + e.target.id));
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  document.querySelectorAll("main section[id]").forEach((s) => observer.observe(s));

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  /* 3D tilt on cards */
  if (!reduceMotion && finePointer) {
    document.querySelectorAll(".tilt").forEach((el) => {
      el.addEventListener("pointermove", (ev) => {
        const r = el.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        el.classList.add("is-tilting");
        el.style.transform = `perspective(900px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) translateZ(8px)`;
      });
      el.addEventListener("pointerleave", () => { el.classList.remove("is-tilting"); el.style.transform = ""; });
    });
  }

  /* Instagram post embeds */
  if (CONFIG.instagramPosts.length) {
    const wrap = document.getElementById("ig-posts");
    CONFIG.instagramPosts.forEach((url) => {
      const q = document.createElement("blockquote");
      q.className = "instagram-media";
      q.setAttribute("data-instgrm-permalink", url);
      q.setAttribute("data-instgrm-version", "14");
      wrap.appendChild(q);
    });
    const s = document.createElement("script");
    s.async = true; s.src = "https://www.instagram.com/embed.js";
    document.body.appendChild(s);
  }

  initPearls(reduceMotion);
});

/* ==========================================================
   3D πέρλες στην αρχική (Three.js)
   ========================================================== */
function initPearls(reduceMotion) {
  const canvas = document.getElementById("pearls");
  const hero = document.querySelector(".hero");
  let renderer;
  try {
    if (!window.THREE) throw new Error("no three");
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) {
    hero.classList.add("no-webgl");
    return;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 14);

  scene.add(new THREE.HemisphereLight(0xffffff, 0xb8dcd2, 1.6));
  const key = new THREE.DirectionalLight(0xfff3dd, 3.2); key.position.set(4, 6, 8); scene.add(key);
  const rim = new THREE.DirectionalLight(0xe7c6bc, 2.2); rim.position.set(-6, -2, -4); scene.add(rim);
  const fill = new THREE.PointLight(0xffffff, 40, 30); fill.position.set(-3, 3, 6); scene.add(fill);

  const materials = [
    new THREE.MeshPhysicalMaterial({ color: 0xc8a15e, metalness: 1, roughness: 0.28, clearcoat: 1, clearcoatRoughness: 0.2 }),
    new THREE.MeshPhysicalMaterial({ color: 0xe9d3a5, metalness: 0.85, roughness: 0.32, clearcoat: 1 }),
    new THREE.MeshPhysicalMaterial({ color: 0xf6ece6, metalness: 0.15, roughness: 0.18, clearcoat: 1, sheen: 1 }),
    new THREE.MeshPhysicalMaterial({ color: 0xe7c6bc, metalness: 0.35, roughness: 0.25, clearcoat: 1 }),
    new THREE.MeshPhysicalMaterial({ color: 0xb8dcd2, metalness: 0.2, roughness: 0.3, clearcoat: 1 })
  ];
  const geo = new THREE.SphereGeometry(1, 48, 48);
  const group = new THREE.Group();
  scene.add(group);

  const pearls = [];
  const count = 26;
  for (let i = 0; i < count; i++) {
    const m = new THREE.Mesh(geo, materials[i % materials.length]);
    const big = i < 3;
    const s = big ? 1.1 + Math.random() * 0.6 : 0.18 + Math.random() * 0.5;
    m.scale.setScalar(s);
    const angle = Math.random() * Math.PI * 2;
    const radius = big ? 1 + Math.random() * 1.5 : 1.5 + Math.random() * 4;
    m.userData = {
      base: new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.75, (Math.random() - 0.5) * 5),
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2
    };
    m.position.copy(m.userData.base);
    group.add(m);
    pearls.push(m);
  }

  const pointer = { x: 0, y: 0 };
  window.addEventListener("pointermove", (e) => {
    pointer.x = e.clientX / window.innerWidth - 0.5;
    pointer.y = e.clientY / window.innerHeight - 0.5;
  });

  function resize() {
    const w = hero.clientWidth, h = hero.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Keep pearls on the right on wide screens, at the top on phones
    if (w > 760) { group.position.set(3.4 * Math.min(camera.aspect, 2) / 1.6, 0.2, 0); group.scale.setScalar(1); }
    else { group.position.set(0.4, 4.2, -2); group.scale.setScalar(0.5); }
  }
  window.addEventListener("resize", resize);
  resize();

  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);

  const clock = new THREE.Clock();
  function frame() {
    const t = clock.getElapsedTime();
    pearls.forEach((m) => {
      const d = m.userData;
      m.position.y = d.base.y + Math.sin(t * d.speed + d.phase) * 0.25;
      m.position.x = d.base.x + Math.cos(t * d.speed * 0.7 + d.phase) * 0.15;
    });
    group.rotation.y += ((pointer.x * 0.5) - group.rotation.y) * 0.05;
    group.rotation.x += ((pointer.y * 0.3) - group.rotation.x) * 0.05;
    group.rotation.z = t * 0.03;
    renderer.render(scene, camera);
  }

  if (reduceMotion) { frame(); return; }
  renderer.setAnimationLoop(() => { if (visible) frame(); });
}
