const body = document.body;
const drawer = document.getElementById("drawer");
const backdrop = document.getElementById("drawerBackdrop");
const menuTrigger = document.getElementById("menuTrigger");
const closeMenu = document.getElementById("closeMenu");

function openMenu() {
  drawer.classList.add("open");
  backdrop.classList.add("show");
  body.classList.add("menu-open");
  drawer.setAttribute("aria-hidden", "false");
  menuTrigger.setAttribute("aria-expanded", "true");
}

function hideMenu() {
  drawer.classList.remove("open");
  backdrop.classList.remove("show");
  body.classList.remove("menu-open");
  drawer.setAttribute("aria-hidden", "true");
  menuTrigger.setAttribute("aria-expanded", "false");
}

menuTrigger.addEventListener("click", openMenu);
closeMenu.addEventListener("click", hideMenu);
backdrop.addEventListener("click", hideMenu);

document.querySelectorAll(".drawer-nav a").forEach(link => {
  link.addEventListener("click", hideMenu);
});

/* SERVICES ACCORDION */
const servicesToggle = document.getElementById("servicesToggle");
const servicesSubnav = document.getElementById("servicesSubnav");

servicesToggle.addEventListener("click", () => {
  const active = servicesToggle.classList.toggle("active");
  servicesSubnav.classList.toggle("open");
  servicesToggle.setAttribute("aria-expanded", active);
});

/* GALLERY */
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const galleryDots = document.getElementById("galleryDots");
let galleryIndex = 0;

galleryItems.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.className = "gallery-dot" + (index === 0 ? " active" : "");
  dot.setAttribute("aria-label", `Go to gallery image ${index + 1}`);
  dot.addEventListener("click", () => setGallery(index));
  galleryDots.appendChild(dot);
});

function setGallery(index) {
  galleryIndex = (index + galleryItems.length) % galleryItems.length;

  galleryItems.forEach((item, i) => {
    item.classList.toggle("active", i === galleryIndex);
  });

  document.querySelectorAll(".gallery-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === galleryIndex);
  });

  galleryItems[galleryIndex].scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "center"
  });
}

document.getElementById("galleryPrev").addEventListener("click", () => {
  setGallery(galleryIndex - 1);
});

document.getElementById("galleryNext").addEventListener("click", () => {
  setGallery(galleryIndex + 1);
});


// GALLERY SWIPE SUPPORT

let galleryTouchStartX = 0;
let galleryTouchEndX = 0;

galleryItems.forEach((item) => {

  item.addEventListener("touchstart", (e) => {
    galleryTouchStartX = e.touches[0].clientX;
  }, { passive: true });

  item.addEventListener("touchend", (e) => {
    galleryTouchEndX = e.changedTouches[0].clientX;

    const swipeDistance = galleryTouchEndX - galleryTouchStartX;

    if (Math.abs(swipeDistance) > 50) {

      if (swipeDistance < 0) {
        // Swipe left → next image
        setGallery(galleryIndex + 1);
      } else {
        // Swipe right → previous image
        setGallery(galleryIndex - 1);
      }

    }
  }, { passive: true });

});
/* REVIEWS */
const reviews = [
  {
    text: "“Replace this with a real customer review once Imran provides one.”",
    name: "CUSTOMER NAME"
  },
  {
    text: "“A second real customer review can go here.”",
    name: "CUSTOMER NAME"
  },
  {
    text: "“Keep reviews short, genuine and easy to read on mobile.”",
    name: "CUSTOMER NAME"
  }
];

const reviewTrack = document.getElementById("reviewTrack");
const reviewDots = document.getElementById("reviewDots");

let reviewIndex = 0;
let reviewTimer;

reviews.forEach((review, index) => {
  const card = document.createElement("div");
  card.className = "review-card";

  card.innerHTML = `
    <div class="stars">★★★★★</div>
    <p>${review.text}</p>
    <strong>${review.name}</strong>
  `;

  reviewTrack.appendChild(card);

  const dot = document.createElement("button");
  dot.className = "review-dot";
  dot.setAttribute("aria-label", `Go to review ${index + 1}`);

  dot.addEventListener("click", () => {
    setReview(index);
    restartReviewTimer();
  });

  reviewDots.appendChild(dot);
});

const reviewDotElements = document.querySelectorAll(".review-dot");

function setReview(index) {
  reviewIndex = (index + reviews.length) % reviews.length;

  reviewTrack.style.transform = `translateX(-${reviewIndex * 100}%)`;

  reviewDotElements.forEach((dot, i) => {
    dot.classList.toggle("active", i === reviewIndex);
  });
}

function startReviewTimer() {
  reviewTimer = setInterval(() => {
    setReview(reviewIndex + 1);
  }, 5000);
}

function restartReviewTimer() {
  clearInterval(reviewTimer);
  startReviewTimer();
}

setReview(0);
startReviewTimer();
// REVIEW SWIPE SUPPORT
let reviewTouchStartX = 0;
let reviewTouchEndX = 0;

reviewTrack.addEventListener("touchstart", (e) => {
  reviewTouchStartX = e.touches[0].clientX;
  clearInterval(reviewTimer);
}, { passive: true });

reviewTrack.addEventListener("touchend", (e) => {
  reviewTouchEndX = e.changedTouches[0].clientX;

  const swipeDistance = reviewTouchEndX - reviewTouchStartX;

  if (Math.abs(swipeDistance) > 50) {
    if (swipeDistance < 0) {
      setReview(reviewIndex + 1);
    } else {
      setReview(reviewIndex - 1);
    }
  }

  startReviewTimer();
}, { passive: true });

/* SCROLL REVEALS */
const revealTargets = document.querySelectorAll(
  ".about, .service-card, .stat, .project-feature, .social-card, .gallery-item, .review-card, .contact-box"
);

revealTargets.forEach(el => el.classList.add("reveal"));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealTargets.forEach(el => revealObserver.observe(el));

/* ESCAPE KEY */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    hideMenu();
  }
});

/* HEADER SHADOW ON SCROLL */
const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  header.style.boxShadow =
    window.scrollY > 20
      ? "0 10px 35px rgba(0,0,0,.35)"
      : "none";
}, { passive: true });
