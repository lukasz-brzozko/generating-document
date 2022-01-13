import "materialize-css/dist/js/materialize.min.js";

import handleTooltips from "./handleTooltips";
import handleInputTag from "./handleInputTag";
import handleOpenFolderBtn from "./handleOpenFolderBtn";

import "materialize-css/dist/css/materialize.min.css";
import "../styles/style.scss";

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
  handleTooltips();
  handleInputTag();
  handleOpenFolderBtn();
});
