/* ==========================================================================
   RESUME_DATA
   Every visible fact on the page lives here. Edit this object only —
   the render functions below read it and build the DOM automatically,
   so nothing else in this file needs to change when you update your CV.
   ========================================================================== */
const RESUME_DATA = {
  firstName: "Muhammadaziz",
  lastName: "Anvarov",
  age: 16,
  title: "Digital Marketer",
  photo:
    "https://placehold.co/480x480/1a1d2e/9fb4ff?text=M.A.&font=montserrat",

  contact: {
    phone: "+123-456-7890",
    email: "hello@reallygreatsite.com",
    location: "123 Anywhere St., Any City",
  },

  aboutMe:
    "I have been working in the digital marketing industry for more than nine years. I have many experiences working individually and as a team member. My principle in working is exposure because the core of digital marketing is all about how to increase the exposure of the promoted product.",

  education: {
    degree: "Bachelor of Science in Marketing",
    university: "University of Muhammad Patel",
    period: "May 2007 — August 2011",
    gpa: "3.90",
  },

  languages: [
    { name: "English", level: 85 },
    { name: "Spanish", level: 60 },
    { name: "Japanese", level: 75 },
    { name: "Russian", level: 70 },
  ],

  experience: [
    {
      title: "Digital Marketer Intern",
      company: "Thynk Unlimited",
      location: "123 Anywhere St., Any City",
      period: "2012 — 2015",
      details: [
        "Created the testing plan for Studio Shodwe's social media campaign, leading to the improvement of the ROI by 25% within two months after the template application.",
        "Assisted the marketing team on the SEO project of the Rimberio Co. website, which has successfully increased the traffic by 15%, or 90 new customers per month.",
      ],
    },
    {
      title: "Digital Marketing Manager",
      company: "Liceria & Co.",
      location: "123 Anywhere St., Any City",
      period: "2013 — March 2022",
      details: [
        "Designed, implemented, and optimized the new promotion campaign for Salford & Co. that increased sales from the social media platform by 500%.",
        "Led the SEO project of Wardrobe Inc.'s official online store, which increased monthly visitors by 170,000 and raised the conversion rate to 45%.",
      ],
    },
  ],

  skills: [
    { name: "Market Analytics", level: 4 },
    { name: "SEO", level: 4 },
    { name: "Copywriting", level: 3 },
    { name: "Web Programming", level: 4 },
  ],

  references: [
    {
      name: "Olivia Wilson",
      role: "Liceria & Co. / CEO",
      phone: "123-456-7890",
    },
    {
      name: "Juliana Silva",
      role: "Liceria & Co. / CEO",
      phone: "123-456-7890",
    },
  ],
};

/* ==========================================================================
   SMALL HELPERS
   ========================================================================== */

// Shorthand for document.createElement + attribute/child assignment, so the
// render functions below stay readable instead of a wall of createElement calls.
function el(tag, options = {}, children = []) {
  const node = document.createElement(tag);
  if (options.className) node.className = options.className;
  if (options.text !== undefined) node.textContent = options.text;
  if (options.html !== undefined) node.innerHTML = options.html;
  if (options.attrs) {
    for (const [key, value] of Object.entries(options.attrs)) {
      node.setAttribute(key, value);
    }
  }
  children.forEach((child) => child && node.appendChild(child));
  return node;
}

// Escapes text that gets dropped into innerHTML templates (defensive, since
// this data is meant to be user-edited).
function escapeHTML(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

/* ==========================================================================
   RENDER: SIDEBAR
   ========================================================================== */

function renderProfileCard(data) {
  const card = el("section", { className: "glass profile-card" });

  const photoWrap = el("div", { className: "profile-photo-wrap" });
  const photo = el("img", {
    className: "profile-photo",
    attrs: {
      src: data.photo,
      alt: `Portrait of ${data.firstName} ${data.lastName}`,
      loading: "lazy",
    },
  });
  photoWrap.appendChild(photo);

  const name = el("h1", { className: "profile-name" }, [
    el("span", { className: "profile-name__first", text: data.firstName + " " }),
    el("span", { className: "profile-name__last", text: data.lastName }),
  ]);

  const meta = el("p", {
    className: "profile-meta",
    text: `Age ${data.age} · ${data.title}`,
  });

  card.append(photoWrap, name, meta);
  return card;
}

function renderContactCard(contact) {
  const card = el("section", { className: "glass side-card" }, [
    el("h2", { className: "side-card__title", text: "Contact" }),
  ]);

  const list = el("ul", { className: "contact-list" });

  const items = [
    { icon: iconPhone(), label: "Phone", value: contact.phone },
    { icon: iconMail(), label: "Email", value: contact.email },
    { icon: iconPin(), label: "Location", value: contact.location },
  ];

  items.forEach((item) => {
    const li = el("li", { className: "contact-list__item" });
    const iconWrap = el("span", { className: "contact-list__icon", attrs: { "aria-hidden": "true" } });
    iconWrap.appendChild(item.icon);
    const text = el("span", { className: "contact-list__text" }, [
      el("span", { className: "contact-list__label", text: item.label }),
      el("span", { className: "contact-list__value", text: item.value }),
    ]);
    li.append(iconWrap, text);
    list.appendChild(li);
  });

  card.appendChild(list);
  return card;
}

function renderEducationCard(education) {
  const card = el("section", { className: "glass side-card" }, [
    el("h2", { className: "side-card__title", text: "Education" }),
  ]);

  const block = el("div", { className: "education-block" }, [
    el("p", { className: "education-block__degree", text: education.degree }),
    el("p", { className: "education-block__uni", text: education.university }),
    el("p", { className: "education-block__period", text: education.period }),
    el("p", { className: "education-block__gpa" }, [
      el("span", { className: "education-block__gpa-label", text: "GPA " }),
      el("span", { className: "education-block__gpa-value", text: education.gpa }),
    ]),
  ]);

  card.appendChild(block);
  return card;
}

function renderLanguagesCard(languages) {
  const card = el("section", { className: "glass side-card" }, [
    el("h2", { className: "side-card__title", text: "Languages" }),
  ]);

  const list = el("div", { className: "language-list" });

  languages.forEach((lang) => {
    const row = el("div", { className: "language-row" });
    const top = el("div", { className: "language-row__top" }, [
      el("span", { className: "language-row__name", text: lang.name }),
      el("span", { className: "language-row__value", text: `${lang.level}%` }),
    ]);
    const track = el("div", { className: "language-row__track" });
    const fill = el("div", { className: "language-row__fill" });
    // Store the target width as a data attribute; the animation observer
    // below sets the real width once the card scrolls into view.
    fill.dataset.targetWidth = `${lang.level}%`;
    track.appendChild(fill);
    row.append(top, track);
    list.appendChild(row);
  });

  card.appendChild(list);
  return card;
}

function renderReferencesCard(references) {
  const card = el("section", { className: "glass side-card" }, [
    el("h2", { className: "side-card__title", text: "References" }),
  ]);

  const list = el("div", { className: "reference-list" });

  references.forEach((ref) => {
    const item = el("div", { className: "reference-item" }, [
      el("p", { className: "reference-item__name", text: ref.name }),
      el("p", { className: "reference-item__role", text: ref.role }),
      el("p", { className: "reference-item__phone", text: ref.phone }),
    ]);
    list.appendChild(item);
  });

  card.appendChild(list);
  return card;
}

/* ==========================================================================
   RENDER: MAIN CONTENT
   ========================================================================== */

function renderMainHeader(data) {
  const header = el("header", { className: "glass main-header" });

  const heading = el("h1", { className: "main-header__name" }, [
    el("span", { text: data.firstName }),
    el("span", { className: "main-header__name-last", text: data.lastName }),
  ]);
  const title = el("p", { className: "main-header__title", text: data.title });

  header.append(heading, title);
  return header;
}

function renderAbout(aboutMe) {
  const section = el("section", { className: "glass content-card" }, [
    el("h2", { className: "content-card__title", text: "About Me" }),
    el("p", { className: "about-text", text: aboutMe }),
  ]);
  return section;
}

function renderExperience(experience) {
  const section = el("section", { className: "glass content-card" }, [
    el("h2", { className: "content-card__title", text: "Work Experience" }),
  ]);

  const timeline = el("div", { className: "timeline" });

  experience.forEach((job) => {
    const item = el("div", { className: "timeline__item" });
    const marker = el("div", { className: "timeline__marker" });
    const body = el("div", { className: "timeline__body" });

    const headRow = el("div", { className: "timeline__head" }, [
      el("h3", { className: "timeline__role", text: job.title }),
      el("span", { className: "timeline__period", text: job.period }),
    ]);

    const company = el("p", {
      className: "timeline__company",
      text: `${job.company} — ${job.location}`,
    });

    const detailList = el("ul", { className: "timeline__details" });
    job.details.forEach((point) => {
      detailList.appendChild(el("li", { text: point }));
    });

    body.append(headRow, company, detailList);
    item.append(marker, body);
    timeline.appendChild(item);
  });

  section.appendChild(timeline);
  return section;
}

function renderSkills(skills) {
  const section = el("section", { className: "glass content-card" }, [
    el("h2", { className: "content-card__title", text: "Skills" }),
  ]);

  const grid = el("div", { className: "skills-grid" });

  skills.forEach((skill) => {
    const row = el("div", { className: "skill-row" });
    const name = el("span", { className: "skill-row__name", text: skill.name });
    const dots = el("div", {
      className: "skill-row__dots",
      attrs: {
        role: "img",
        "aria-label": `${skill.name}: ${skill.level} out of 5`,
      },
    });

    for (let i = 1; i <= 5; i++) {
      const dot = el("span", {
        className: "skill-dot" + (i <= skill.level ? " skill-dot--filled" : ""),
      });
      // Stagger the fill-in animation slightly per dot for a nicer reveal.
      dot.style.transitionDelay = `${i * 60}ms`;
      dots.appendChild(dot);
    }

    row.append(name, dots);
    grid.appendChild(row);
  });

  section.appendChild(grid);
  return section;
}

/* ==========================================================================
   TINY INLINE ICONS (no external icon font / network request needed)
   ========================================================================== */

function svgIcon(pathData) {
  const wrapper = el("span");
  wrapper.innerHTML = `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${pathData}</svg>`;
  return wrapper.firstElementChild;
}

function iconPhone() {
  return svgIcon(
    '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>'
  );
}
function iconMail() {
  return svgIcon(
    '<path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6 12 13 2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/>'
  );
}
function iconPin() {
  return svgIcon(
    '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>'
  );
}

/* ==========================================================================
   MOUNT: build the full page from RESUME_DATA
   ========================================================================== */

function renderPage(data) {
  const page = document.getElementById("page");
  page.innerHTML = ""; // clear the "Loading resume…" placeholder

  const sidebar = el("aside", { className: "sidebar" }, [
    renderProfileCard(data),
    renderContactCard(data.contact),
    renderEducationCard(data.education),
    renderLanguagesCard(data.languages),
    renderReferencesCard(data.references),
  ]);

  const main = el("main", { className: "content" }, [
    renderMainHeader(data),
    renderAbout(data.aboutMe),
    renderExperience(data.experience),
    renderSkills(data.skills),
  ]);

  const layout = el("div", { className: "layout" }, [sidebar, main]);
  page.appendChild(layout);
}

/* ==========================================================================
   INTERACTIONS
   ========================================================================== */

// 1) Animate language bars + skill dots the first time each card scrolls
//    into view, rather than all at once on load.
function setupRevealAnimations() {
  const targets = document.querySelectorAll(".side-card, .content-card, .profile-card, .main-header");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");

        // Language bars inside this card
        entry.target.querySelectorAll(".language-row__fill").forEach((fill) => {
          fill.style.width = fill.dataset.targetWidth;
        });

        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  targets.forEach((target) => observer.observe(target));
}

// 2) Pointer-tracked glow: every glass card exposes CSS custom properties
//    (--mx / --my) that a radial-gradient in style.css uses to draw a soft
//    light following the cursor.
//
//    Performance note: the original version attached one "pointermove"
//    listener per card, each doing a synchronous getBoundingClientRect()
//    (forces layout) and a style write on every single mouse pixel of
//    movement. With several glass cards on screen that's many forced
//    layouts per frame — the main cause of stutter, especially on
//    integrated GPUs. This version uses ONE delegated listener on the
//    page and batches the actual style write into a single
//    requestAnimationFrame callback, so the DOM is only touched once per
//    frame no matter how fast the mouse moves.
function setupPointerGlow() {
  let pendingEvent = null;
  let rafId = null;

  function applyGlow() {
    rafId = null;
    if (!pendingEvent) return;
    const card = pendingEvent.target.closest(".glass");
    if (card) {
      const rect = card.getBoundingClientRect();
      const x = ((pendingEvent.clientX - rect.left) / rect.width) * 100;
      const y = ((pendingEvent.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--mx", `${x}%`);
      card.style.setProperty("--my", `${y}%`);
    }
    pendingEvent = null;
  }

  document.addEventListener(
    "pointermove",
    (e) => {
      pendingEvent = e;
      if (rafId === null) {
        rafId = requestAnimationFrame(applyGlow);
      }
    },
    { passive: true }
  );
}

// 3) Subtle 3D tilt on the profile photo only — one deliberate moment of
//    "high-level micro-interaction" rather than scattering the effect
//    across every card. Also batched to one requestAnimationFrame write
//    per frame instead of one per raw mouse-move event.
function setupProfileTilt() {
  const wrap = document.querySelector(".profile-photo-wrap");
  if (!wrap) return;

  let pendingEvent = null;
  let rafId = null;

  function applyTilt() {
    rafId = null;
    if (!pendingEvent) return;
    const rect = wrap.getBoundingClientRect();
    const px = (pendingEvent.clientX - rect.left) / rect.width - 0.5;
    const py = (pendingEvent.clientY - rect.top) / rect.height - 0.5;
    wrap.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 14}deg)`;
    pendingEvent = null;
  }

  wrap.addEventListener(
    "pointermove",
    (e) => {
      pendingEvent = e;
      if (rafId === null) {
        rafId = requestAnimationFrame(applyTilt);
      }
    },
    { passive: true }
  );

  wrap.addEventListener("pointerleave", () => {
    pendingEvent = null;
    wrap.style.transform = "rotateY(0deg) rotateX(0deg)";
  });
}

/* ==========================================================================
   INIT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  renderPage(RESUME_DATA);
  setupRevealAnimations();
  setupPointerGlow();
  setupProfileTilt();
});
