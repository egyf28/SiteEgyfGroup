document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.getElementById("carousel");
  if (!carouselContainer) return; // aucune section carousel → on arrête

  const carousel = carouselContainer.querySelector(".carousel");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const dotsContainer = document.getElementById("carousel-dots");
  const cards = carousel.querySelectorAll(".service-card");

  if (cards.length === 0) return;

  let scrollAmount = cards[0].offsetWidth + 20;
  let autoScrollInterval;

  // recalcul si resize
  window.addEventListener("resize", () => {
    scrollAmount = cards[0].offsetWidth + 20;
  });

  // Crée les points
  cards.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      carousel.scrollTo({ left: i * scrollAmount, behavior: "smooth" });
      updateDots();
      resetAutoScroll();
    });
    dotsContainer.appendChild(dot);
  });
  const dots = dotsContainer.querySelectorAll(".dot");

  function updateDots() {
    const currentIndex = Math.round(carousel.scrollLeft / scrollAmount);
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentIndex]) dots[currentIndex].classList.add("active");
  }

  // Boutons
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
      resetAutoScroll();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      resetAutoScroll();
    });
  }

  // Auto défilement
  function startAutoScroll() {
    autoScrollInterval = setInterval(() => {
      if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 1) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000);
  }

  function stopAutoScroll() {
    clearInterval(autoScrollInterval);
  }

  function resetAutoScroll() {
    stopAutoScroll();
    setTimeout(startAutoScroll, 5000);
  }

  // Survol = pause
  carousel.addEventListener("mouseover", stopAutoScroll);
  carousel.addEventListener("mouseout", startAutoScroll);

  // Scroll → maj des dots
  carousel.addEventListener("scroll", updateDots);

  // Lance le défilement auto
  setTimeout(() => startAutoScroll(), 200);
});
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("mobile-menu");
  const navList = document.querySelector(".nav-list");

  menuToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
  });
});

