const sliders = document.querySelectorAll('.slider');
const prevButtons = document.querySelectorAll('.prev-button');
const nextButtons = document.querySelectorAll('.next-button');

for(let i= 0; i< sliders.length; i++){
  const slider = sliders[i];
  const prevButton = prevButtons[i]
  const nextButton = nextButtons[i]
  const slides = Array.from(slider.querySelectorAll('.slider__slide'));
  const slideCount = slides.length;
  let slideIndex = 0;

  prevButton.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    slide();
  });

  nextButton.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % slideCount;
    slide();
  });

  const slide = () => {
    const imageWidth = slider.clientWidth;
    const slideOffset = -slideIndex * imageWidth;
    slider.style.transform = `translateX(${slideOffset}px)`;
  }

  window.addEventListener('load', () => {
    slide();
  });
}