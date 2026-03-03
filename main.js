const gap = 6;
const carousel = document.getElementById("carousel"),
content = document.getElementById("content"),
next = document.getElementById("next"),
prev = document.getElementById("prev");

next.addEventListener("click", e => {
  carousel.scrollBy(width + gap, 0);
  if (carousel.scrollWidth !== 0) {
    prev.style.display = "flex";
  }
  if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "none";
  }
});

prev.addEventListener("click", e => {
  carousel.scrollBy(-(width + gap), 0);
  if (carousel.scrollLeft - width - gap <= 0) {
    prev.style.display = "none";
  }
  if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
    next.style.display = "flex";
  }
});

let width = carousel.offsetWidth;

window.addEventListener("resize", e => (width = carousel.offsetWidth));

const section = document.querySelector('.rpdsss');
const nextSection = document.querySelector('.hero');
const nav__scroll = document.querySelector('.nav__scroll'); 

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      nav__scroll.classList.add('active');
    } 
    else {
      if (entry.boundingClientRect.top > 0) {
        nav__scroll.classList.remove('active');
      }
    }
  });
}, {
  threshold: 0.8
});
observer.observe(section);

const nextObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      nav__scroll.classList.remove('active');
    }
  });
}, {
  threshold: 0.3
});
nextObserver.observe(nextSection);

window.addEventListener('load', () => {
  const rect = section.getBoundingClientRect();
  const triggerPoint = window.innerHeight * 0.5;
  if (rect.top < triggerPoint) {
    nav__scroll.classList.add('active');
  }
});