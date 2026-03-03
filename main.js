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

function checkInitialPosition() {
  const rect = section.getBoundingClientRect();

  // Если секция уже выше экрана — мы ниже неё
  if (rect.bottom <= 0) {
    nav__scroll.classList.add('active');
  }
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {
      nav__scroll.classList.add('active');
    } else {
      // Убираем только если вышли вверх
      if (entry.boundingClientRect.top > 0) {
        nav__scroll.classList.remove('active');
      }
    }

  });
}, {
  threshold: 0.5,
  rootMargin: "0px 0px -50% 0px"
});

observer.observe(section);

// 🔥 ВАЖНО: проверяем сразу
checkInitialPosition();


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

