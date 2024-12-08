//burger
const burgerBtn = document.querySelectorAll('.burger-btn');
const burgerMenu = document.querySelector('.burger-menu');

burgerBtn.forEach((item) => {
  item.addEventListener('click', () => {
    burgerMenu.classList.toggle('burger-menu-active');
  });
});




let competitorsSwiper = new Swiper(".competitors__sliders", {
  slidesPerView: 6,
  spaceBetween: 15,
  breakpoints: {
    '1299': {
      slidesPerView: 6,
      slidesPerGroup: 1,
      spaceBetween: 15,
    },
    '1024': {
      slidesPerView: 5,
      slidesPerGroup: 1,
    },
    '760': {
      slidesPerView: 4,
      slidesPerGroup: 1,
    },
    '480': {
      slidesPerView: 4,
      slidesPerGroup: 1,
    },
    '320': {
      slidesPerView: 3,
      slidesPerGroup: 1,
    },
  },

});