const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const reveals = document.querySelectorAll(".reveal");
const counters = document.querySelectorAll("[data-count]");
const contactForm = document.querySelector(".contact-form");

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    }
  },
  { threshold: 0.18 }
);

revealObserver.observe(document.querySelector(".hero-copy"));
revealObserver.observe(document.querySelector(".hero-card"));
revealObserver.observe(document.querySelector(".trust"));
revealObserver.observe(document.querySelector(".split"));
revealObserver.observe(document.querySelector(".timeline-section"));
revealObserver.observe(document.querySelector(".testimonial-section"));
revealObserver.observe(document.querySelector(".faq-section"));
revealObserver.observe(document.querySelector(".cta-section"));

reveals.forEach((el) => revealObserver.observe(el));

const countObserver = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;

      const target = entry.target;
      const end = Number(target.dataset.count || 0);
      const duration = 1200;
      const start = performance.now();

      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        target.textContent = String(Math.round(end * eased));
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
      countObserver.unobserve(target);
    }
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => countObserver.observe(counter));

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const button = contactForm.querySelector("button");
  const original = button.textContent;
  button.textContent = "Anfrage vorbereitet";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = original;
    button.disabled = false;
  }, 1800);
});
