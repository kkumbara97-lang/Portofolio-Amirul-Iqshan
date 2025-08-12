// Smooth scroll for sidebar navigation
document.addEventListener('DOMContentLoaded', function () {
  // Sidebar active highlight & smooth scroll
  document.querySelectorAll('.sidebar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Highlight sidebar item on scroll according to visible section
  window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('section.main-section');
    let currentId = '';
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 90 && rect.bottom > 90) {
        currentId = section.id;
      }
    });
    if (currentId) {
      document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
      const activeLink = document.querySelector('.sidebar a[href="#' + currentId + '"]');
      if (activeLink) activeLink.classList.add('active');
    }
  });

  // Tambahan Slide dengan Swiper.js
  const swiper = new Swiper('.swiper', {
    loop: true,
    grabCursor: true,
    effect: 'slide',
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  // Optional: Animate timeline dots when visible on scroll
  const timelineDots = document.querySelectorAll('.timeline-dot');
  function animateTimelineDots() {
    timelineDots.forEach(dot => {
      const rect = dot.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60 && rect.bottom > 60) {
        dot.classList.add('active-dot');
      } else {
        dot.classList.remove('active-dot');
      }
    });
  }
  window.addEventListener('scroll', animateTimelineDots);
  animateTimelineDots();
});