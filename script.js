// Smooth scroll & sidebar navigation highlight
document.addEventListener('DOMContentLoaded', function () {
  // Sidebar smooth scroll and active highlight
  document.querySelectorAll('.sidebar a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
      // Remove and set active class
      document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Highlight sidebar item on scroll based on visible section
  function updateSidebarActive() {
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
  }
  window.addEventListener('scroll', updateSidebarActive);

  // Swiper.js setup for about section images
  if (typeof Swiper !== "undefined") {
    new Swiper('.swiper', {
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
  }

  // Animate timeline dots when visible on scroll
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

  // Initial triggers
  updateSidebarActive();
  animateTimelineDots();
});
