import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css";

import { checkFormFilling, handleFormInputs } from "./checkFormFilling";

Swiper.use([Navigation, Pagination]);

const handleSlider = () => {
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
      afterInit: (swiper) => {
        const {
          activeIndex,
          slides,
          navigation: { nextEl },
        } = swiper;
        const activeSlide = slides[activeIndex];

        slides.forEach((slide, index) => {
          const inputs = [...slide.querySelectorAll("input")];

          const isStepFilled = handleFormInputs(inputs);

          if (index === 0) {
            const isFormFilled = checkFormFilling(undefined, inputs, false);
            isFormFilled
              ? nextEl.toggleAttribute("disabled", false)
              : nextEl.toggleAttribute("disabled", true);
            isFormFilled
              ? nextEl.classList.remove("swiper-button-disabled")
              : nextEl.classList.add("swiper-button-disabled");
          }
        });
      },
    },
  });
};

export default handleSlider;
