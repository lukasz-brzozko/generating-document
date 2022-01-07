import download from "downloadjs";
const docx = require("docx-preview");

console.log(docx);
const handleInputTag = () => {
  const inputs = [...document.querySelectorAll(".tag-input")];
  const submitBtns = document.querySelectorAll(".submit-btn");

  const form = document.getElementById("tag-form");
  const progress = document.getElementById("progress");
  const filename = document.getElementById("filename");

  if (inputs.length === 0) return;

  // move to function
  fetch("/file/preview")
    .then((resp) => resp.blob())
    .then((blob) => {
      docx
        .renderAsync(blob, document.getElementById("container"), undefined, {
          inWrapper: false,
        })
        .then((x) => console.log("docx: finished"));
    });

  const toggleButtons = (force = false) => {
    submitBtns.forEach((btn) => {
      btn.toggleAttribute("disabled", force);
    });
  };

  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      const isFormFilled = inputs.every((input) => input.value !== "");

      isFormFilled ? toggleButtons(false) : toggleButtons(true);
    });
  });

  submitBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      progress?.classList.remove("hidden");

      const target = e.currentTarget;

      const body = new URLSearchParams(new FormData(form));

      const url = target.getAttribute("formaction");

      fetch(url, { method: "POST", body })
        .then((resp) => resp.blob())
        .then((blob) => {
          progress?.classList.add("hidden");
          download(blob, filename?.textContent);
        })
        .catch((err) => console.log(err));
    });
  });
};

export default handleInputTag;
