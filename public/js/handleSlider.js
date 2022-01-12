import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";

import {
  checkFormFilling,
  handleFormInputs,
  handleSubmitBtnAvailability,
} from "./checkFormFilling";

Swiper.use([Navigation, Pagination]);

const handleSlider = () => {
  const classToggle = "hidden";

  const hideInactiveSlides = ({ activeIndex, slides }) => {
    const inactiveSlides = slides.filter(
      (slide) => slide !== slides[activeIndex]
    );

    inactiveSlides.forEach((slide) => {
      slide.classList.add(classToggle);
    });
  };

  const swiper = new Swiper("#form-slider", {
    allowTouchMove: false,
    speed: 0,
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: "#multi-step-next-btn",
      prevEl: "#multi-step-prev-btn",
    },

    on: {
      afterInit: ({ activeIndex, slides }) => {
        hideInactiveSlides({ activeIndex, slides });
      },

      slideChange: ({ activeIndex, slides }) => {
        slides[activeIndex].classList.remove(classToggle);

        hideInactiveSlides({ activeIndex, slides });
      },
    },
  });
};

export default handleSlider;
