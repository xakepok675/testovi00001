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


// Функция для проверки позиции при загрузке / пересчёте
function checkPosition() {
  const rect = section.getBoundingClientRect();
  // Если секция полностью выше экрана — мы ниже неё
  if (rect.bottom <= 0) {
    nav__scroll.classList.add('active');
  }
}

// IntersectionObserver для нормального срабатывания при прокрутке
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      nav__scroll.classList.add('active');
    } else {
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

// 🔹 Проверка сразу после рендера
window.addEventListener('load', () => {
  setTimeout(checkPosition, 50); // даём Safari стабилизировать viewport
});

// 🔹 Дополнительная страховка: если страница уже проскроллена до нужной позиции
document.addEventListener('scroll', checkPosition, { passive: true });


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

