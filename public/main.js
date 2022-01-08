import "materialize-css/dist/js/materialize.min.js";

import handleInputTag from "./handleInputTag";

import "materialize-css/dist/css/materialize.min.css";
import "./style.css";

const init = () => {
  const templateInputs = document.querySelectorAll(".template-input");

  const submitBtn = document.querySelector(".btn-submit");

  if (submitBtn === null || templateInputs === null) return;

  templateInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const isChecked = e.currentTarget.checked;

      if (!isChecked) return;
      submitBtn.removeAttribute("disabled");
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  init();
  handleInputTag();
});
