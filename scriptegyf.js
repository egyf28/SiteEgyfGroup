document.addEventListener("DOMContentLoaded", () => {

  /* ===============================
     MENU NAVBAR MOBILE
  ================================ */
  const menuToggle = document.querySelector(".menu-toggle");
  const navList = document.querySelector(".nav-list");

  if (menuToggle && navList) {
    menuToggle.addEventListener("click", () => {
      navList.classList.toggle("active");
    });
  }

  /* ===============================
     CAROUSEL SERVICES
  ================================ */
  const carouselContainer = document.getElementById("carousel");
  if (!carouselContainer) return;

  const carousel = carouselContainer.querySelector(".carousel");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const dotsContainer = document.getElementById("carousel-dots");
  const cards = carousel.querySelectorAll(".service-card");

  if (!carousel || cards.length === 0) return;

  let scrollAmount = cards[0].offsetWidth + 20;
  let autoScrollInterval;

  /* Recalcul au resize */
  window.addEventListener("resize", () => {
    scrollAmount = cards[0].offsetWidth + 20;
  });

  /* Création des dots */
  cards.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      carousel.scrollTo({
        left: index * scrollAmount,
        behavior: "smooth"
      });
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

  /* Boutons */
  nextBtn?.addEventListener("click", () => {
    carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
    resetAutoScroll();
  });

  prevBtn?.addEventListener("click", () => {
    carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    resetAutoScroll();
  });

  /* Auto scroll */
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

  /* Pause au survol */
  carousel.addEventListener("mouseover", stopAutoScroll);
  carousel.addEventListener("mouseout", startAutoScroll);

  /* Mise à jour des dots au scroll */
  carousel.addEventListener("scroll", updateDots);

  /* Lancement auto */
  setTimeout(startAutoScroll, 200);

});
