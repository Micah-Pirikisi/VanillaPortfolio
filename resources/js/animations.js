// Intersection Observer for fade-in animations (one-time only)
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && !entry.target.classList.contains("animated")) {
      // Only animate once
      entry.target.classList.add("animated");
      entry.target.classList.add("fade-in-up");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Animate sections
document.querySelectorAll("main section").forEach((section, index) => {
  section.style.opacity = "0";
  section.style.setProperty("--delay", `${index * 0.2}s`);
  observer.observe(section);
});

// Animate skill items
document.querySelectorAll(".skill-item").forEach((item, index) => {
  item.style.opacity = "0";
  item.style.setProperty("--delay", `${index * 0.15}s`);
  observer.observe(item);
});

// Animate cards
document.querySelectorAll("article.card").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.setProperty("--delay", `${index * 0.1}s`);
  observer.observe(card);
});

// Project Modal and Slider
const modal = document.getElementById("projectModal");
const modalClose = document.querySelector(".modal-close");
const sliderImage = document.getElementById("sliderImage");
const sliderDotsContainer = document.querySelector(".slider-dots");
const prevBtn = document.querySelector(".slider-btn.prev");
const nextBtn = document.querySelector(".slider-btn.next");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const modalLink = document.getElementById("modalLink");

let currentSlide = 0;
let currentScreenshots = [];

// Open modal when clicking a card
document.querySelectorAll("article.card").forEach((card) => {
  card.addEventListener("click", (e) => {
    // Don't open modal if clicking action buttons
    if (e.target.closest(".action-btn") || e.target.closest(".card-actions")) {
      return;
    }

    const projectId = card.dataset.projectId;
    const projectTitle = card.dataset.projectTitle;
    const projectDescription = card.dataset.projectDescription;
    const projectTech = card.dataset.projectTech;
    const projectLink = card.dataset.projectLink;
    const projectScreenshots = JSON.parse(card.dataset.projectScreenshots);

    // Populate modal
    modalTitle.textContent = projectTitle;
    modalDescription.textContent = projectDescription;
    modalTech.textContent = projectTech;
    modalLink.href = projectLink;

    // Set up slider
    currentScreenshots = projectScreenshots;
    currentSlide = 0;
    updateSlider();

    // Show modal
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Close modal
function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
}

modalClose.addEventListener("click", closeModal);

// Close modal when clicking outside the modal content
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("active")) return;

  if (e.key === "Escape") {
    closeModal();
  } else if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});

// Slider functions
function updateSlider() {
  if (currentScreenshots.length === 0) return;

  sliderImage.src = currentScreenshots[currentSlide];

  // Update dots
  sliderDotsContainer.innerHTML = "";
  currentScreenshots.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = "slider-dot";
    if (index === currentSlide) {
      dot.classList.add("active");
    }
    dot.addEventListener("click", () => {
      currentSlide = index;
      updateSlider();
    });
    sliderDotsContainer.appendChild(dot);
  });

  // Hide buttons if only one screenshot
  if (currentScreenshots.length <= 1) {
    prevBtn.style.display = "none";
    nextBtn.style.display = "none";
  } else {
    prevBtn.style.display = "flex";
    nextBtn.style.display = "flex";
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % currentScreenshots.length;
  updateSlider();
}

function prevSlide() {
  currentSlide =
    (currentSlide - 1 + currentScreenshots.length) % currentScreenshots.length;
  updateSlider();
}

prevBtn.addEventListener("click", prevSlide);
nextBtn.addEventListener("click", nextSlide);

// Image Lightbox
const lightbox = document.getElementById("imageLightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.querySelector(".lightbox-close");

sliderImage.addEventListener("click", () => {
  lightboxImage.src = sliderImage.src;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
});

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

lightboxClose.addEventListener("click", closeLightbox);

// Close lightbox when clicking outside the image
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Close lightbox with Escape key
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;
  if (e.key === "Escape") {
    closeLightbox();
  }
});
