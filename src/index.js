import handleInputTag from "./handleInputTag";

import "./style.css";

const init = () => {
  const inputFile = document.getElementById("file");

  const submitBtn = document.querySelector(".submit-btn");

  if (submitBtn === null || inputFile === null) return;

  inputFile.addEventListener("change", (e) => {
    const value = e.currentTarget.value;

    value === ""
      ? submitBtn.setAttribute("disabled", true)
      : submitBtn.removeAttribute("disabled");
  });
};

document.addEventListener("DOMContentLoaded", () => {
  init();
  handleInputTag();
});
