//slider

if (document.querySelector(".prices-swiper")) {
  const swiper = new Swiper('.prices-swiper', {
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
    },
  });
}


if (document.querySelector(".roadmap-slider")) {
  const roadmapSlider = new Swiper('.roadmap-slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    autoHeight: true,
    navigation: {
      nextEl: '.roadmap-slider__next',
      prevEl: '.roadmap-slider__prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      390: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      428: {
        slidesPerView: 2,
        spaceBetween: 18,
      },
      868: {
        slidesPerView: 3,
        spaceBetween: 7,
      },
      1024: {
        spaceBetween: 8,
        slidesPerView: 3,
      },
      1280: {
        spaceBetween: 22,
        slidesPerView: 3,
      },
      1440: {
        spaceBetween: 20,
        slidesPerView: 3,
      },
      1728: {
        spaceBetween: 30,
        slidesPerView: 3,
      },
      2560: {
        spaceBetween: 30,
        slidesPerView: 3,
      },
    },
  });
}

//accordeon
let extraHeight = 20;
let media = [1280, 1024, 868, 428, 375, 328];
if (window.matchMedia(`max-width: ${media[0]}px`)) extraHeight = 23;
if (window.matchMedia(`max-width: ${media[1]}px`)) extraHeight = 20;
if (window.matchMedia(`max-width: ${media[2]}px`)) extraHeight = 18;
if (window.matchMedia(`max-width: ${media[3]}px`)) extraHeight = 25;
if (window.matchMedia(`max-width: ${media[4]}px`)) extraHeight = 22;
if (window.matchMedia(`max-width: ${media[5]}px`)) extraHeight = 15;

const accordeons = document.querySelectorAll('.faq-accordeons__accordeon');
accordeons.forEach((accordeon) => {
  accordeon.addEventListener('click', function () {
    accordeon.classList.toggle('faq-accordeons__item--active');
    const path = accordeon.querySelectorAll('.faq-accordeons__path');
    path.forEach((item) => {
      item.classList.toggle('faq-accordeons__path--active');
    });
    accordeon.querySelectorAll('.faq-accordeons__path1').forEach((item) => {
      item.classList.toggle('faq-accordeons__path1--active');
    });

    const item = accordeon.nextElementSibling;
    if (accordeon.classList.contains('faq-accordeons__item--active')) {
      item.style.height = `${item.scrollHeight + extraHeight}px`;
    } else {
      item.removeAttribute('style');
    }
  });
});

const anchors = document.querySelectorAll('a[href*="#"]');
if(location.pathname.substring(0,5)!="/team"){
  for (let t of anchors)
    // break;
    t.addEventListener('click', function (e) {
      e.preventDefault();
      const o = t.getAttribute('href').substr(1);
      document.getElementById(o).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
}

//loading animation
window.onload = () => {
  const topLines = document.querySelectorAll('.top-items__item');
  const particlesTop = document.querySelector('.particles-top');
  const particlesBottom = document.querySelector('.particles-bottom');
  const jellyfishMiddle = document.querySelector('.jellyfish-middle');
  const jellyfishMiddle1728 = document.querySelector('.jellyfish-middle-1728 ');
  const jellyfishMiddle1440 = document.querySelector('.jellyfish-middle-1440');
  const jellyfishMiddle1280 = document.querySelector('.jellyfish-middle-1280');
  const jellyfishMiddle1024 = document.querySelector('.jellyfish-middle-1024');

  const jellyfishRight = document.querySelector('.jellyfish-right');
  const jellyfishleft = document.querySelector('.jellyfish-left');
  const jellyfishRight1728 = document.querySelector('.jellyfish-right-1728');
  const jellyfishRight1440 = document.querySelector('.jellyfish-right-1440');
  const jellyfishRight1280 = document.querySelector('.jellyfish-right-1280');
  const jellyfishRight1024 = document.querySelector('.jellyfish-right-1024');
  const jellyfishRight768 = document.querySelector('.jellyfish-right-768');

  const jellyfishleft1728 = document.querySelector('.jellyfish-left-1728');
  const jellyfishleft1440 = document.querySelector('.jellyfish-left-1440');
  const jellyfishleft1280 = document.querySelector('.jellyfish-left-1280');
  const jellyfishleft1024 = document.querySelector('.jellyfish-left-1024');
  const jellyfishleft768 = document.querySelector('.jellyfish-left-768');

  const nav = document.querySelector('.nav');
  const top = document.querySelector('.top');
  const bottom = document.querySelector('.bottom');
  topLines.forEach((line) => {
    line.classList.remove('top-items__item--remove');
  });
  particlesTop.classList.remove('particles-top--remove');
  particlesBottom.classList.remove('particles-bottom--remove');
  jellyfishMiddle.classList.remove('jellyfish-middle--remove');
  jellyfishMiddle1728.classList.remove('jellyfish-middle-1728--remove');
  jellyfishMiddle1440.classList.remove('jellyfish-middle-1440--remove');
  jellyfishMiddle1280.classList.remove('jellyfish-middle-1280--remove');
  jellyfishMiddle1024.classList.remove('jellyfish-middle-1024--remove');

  jellyfishRight1728.classList.remove('jellyfish-right-1728--remove');
  jellyfishRight1440.classList.remove('jellyfish-right-1440--remove');
  jellyfishRight1280.classList.remove('jellyfish-right-1280--remove');
  jellyfishRight1024.classList.remove('jellyfish-right-1024--remove');
  jellyfishRight768.classList.remove('jellyfish-right-768--remove');

  jellyfishRight.classList.remove('jellyfish-right--remove');
  jellyfishleft.classList.remove('jellyfish-left--remove');
  jellyfishleft1440.classList.remove('jellyfish-left-1440--remove');
  jellyfishleft1280.classList.remove('jellyfish-left-1280--remove');
  jellyfishleft1728.classList.remove('jellyfish-left-1728--remove');
  jellyfishleft1024.classList.remove('jellyfish-left-1024--remove');
  jellyfishleft768.classList.remove('jellyfish-left-768--remove');

  nav.classList.remove('nav--remove');
  top.classList.remove('top--remove');
  bottom.classList.remove('bottom--remove');
};

let cnt = 1;







