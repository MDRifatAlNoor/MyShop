
// Animate elements when they enter viewport
const animatedItems = document.querySelectorAll('.fade-in, .slide-left, .slide-right, .zoom-in');

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

animatedItems.forEach(el => observer.observe(el));