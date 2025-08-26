// toggle icon navbar
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// --- ACTIVE SECTION + STICKY HEADER + FOOTER ANIM ---

const sections = Array.from(document.querySelectorAll("section"));
const navLinks = Array.from(document.querySelectorAll("header nav a"));
const header = document.querySelector("header");

// helper: activa el link exacto por hash
function setActiveById(id) {
  const hash = `#${id}`;
  navLinks.forEach((a) => {
    a.classList.toggle("active", a.getAttribute("href") === hash);
  });
}

window.addEventListener("scroll", () => {
  const headerH = header?.offsetHeight || 0;

  // posición “real” considerando el header (sin restar 150 a todo)
  const scrollPos = window.scrollY + headerH + 1;

  let currentId = null;

  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const bottom = top + sec.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      currentId = sec.id;
      // animación on-scroll
      sec.classList.add("show-animate");
    } else {
      sec.classList.remove("show-animate");
    }
  });

  // borde inferior: fuerza la última sección (contact) al llegar al final
  const atBottom =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 2;
  if (atBottom && sections.length) {
    currentId = sections[sections.length - 1].id;
  }

  if (currentId) setActiveById(currentId);

  // sticky header
  header.classList.toggle("sticky", window.scrollY > 100);

  // cerrar el menú al hacer scroll
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

  // animación footer
  const footer = document.querySelector("footer");
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;
  if (Math.ceil(scrolled) >= scrollable) {
    footer.classList.add("show-animate");
  } else {
    footer.classList.remove("show-animate");
  }
});

// --- CLICK EN NAV: scroll suave + activa de inmediato ---
navLinks.forEach((a) => {
  const href = a.getAttribute("href") || "";
  if (!href.startsWith("#")) return;

  a.addEventListener("click", (e) => {
    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    // activa inmediatamente
    navLinks.forEach((l) => l.classList.remove("active"));
    a.classList.add("active");

    // scroll suave, ajustado por header
    const headerH = header?.offsetHeight || 0;
    const top = target.offsetTop - headerH;
    window.scrollTo({ top, behavior: "smooth" });

    // cierra el menú en móvil
    menuIcon.classList.remove("bx-x");
    navbar.classList.remove("active");
  });
});
