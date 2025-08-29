// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(17, 24, 39, 0.98)";
  } else {
    navbar.style.background = "rgba(17, 24, 39, 0.95)";
  }
});

// Animate skill bars when in view
const observerOptions = {
  threshold: 0.5,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-progress");
      skillBars.forEach((bar) => {
        const width = bar.style.width;
        bar.style.width = "0%";
        setTimeout(() => {
          bar.style.width = width;
        }, 200);
      });
    }
  });
}, observerOptions);

// Observe skills section
const skillsSection = document.querySelector(".skills");
if (skillsSection) {
  observer.observe(skillsSection);
}

// Add loading animation to cards
const cards = document.querySelectorAll(
  ".project-card, .skill-category, .contact-card"
);
cards.forEach((card, index) => {
  card.style.animationDelay = `${index * 0.1}s`;
});

// Dynamic typing effect for hero subtitle (optional enhancement)
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect on load
document.addEventListener("DOMContentLoaded", () => {
  const subtitle = document.querySelector(".hero-subtitle");
  if (subtitle) {
    const originalText = subtitle.textContent;
    typeWriter(subtitle, originalText, 30);
  }
});

// Add hover effects for project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-8px) scale(1.02)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0) scale(1)";
  });
});

// Contact form handling (if you add a form later)
function handleContactForm(event) {
  event.preventDefault();
  // Add your form handling logic here
  alert("Thank you for your message! I'll get back to you soon.");
}

// Performance optimization: Lazy load images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}
