// Scroll reveal with appear and disappear behavior
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      } else {
        entry.target.classList.remove('active');
      }
    });
  }, {
    threshold: 0.15
  });
  
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
  