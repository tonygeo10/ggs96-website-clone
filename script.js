document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");

  menuToggle.addEventListener("click", () => {
    const isOpen = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden", isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Άνοιγμα μενού" : "Κλείσιμο μενού");

    const iconHolder = menuToggle.querySelector("svg");
    if (iconHolder) {
      iconHolder.outerHTML = isOpen
        ? '<i data-lucide="menu" aria-hidden="true"></i>'
        : '<i data-lucide="x" aria-hidden="true"></i>';
      lucide.createIcons();
    }
  });

  document.querySelectorAll(".mobile-nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Άνοιγμα μενού");
      const iconHolder = menuToggle.querySelector("svg");
      if (iconHolder) {
        iconHolder.outerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
        lucide.createIcons();
      }
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link:not(.mobile-nav-link)");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === "#" + entry.target.id);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

  sections.forEach((section) => sectionObserver.observe(section));
});