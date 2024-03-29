import download from "downloadjs";

const docx = require("docx-preview");

import findText from "./findText";
import handleSlider from "./handleSlider";

const handleInputTag = () => {
  const inputs = [...document.querySelectorAll(".tag-input")];
  const submitBtns = document.querySelectorAll(".btn-submit");
  const searchBtns = document.querySelectorAll(".btn-search");

  if (inputs.length === 0) return;

  const docxContainer = document.querySelector(".docx-container");

  const form = document.getElementById("tag-form");
  const progress = document.getElementById("progress");
  const filename = document.getElementById("filename");
  const previewInput = document.getElementById("temaplate-prev-input");
  const nextStepBtn = document.getElementById("multi-step-next-btn");
  const prevStepBtn = document.getElementById("multi-step-prev-btn");

  const filledInputs = inputs.filter((input) => input.getAttribute("value"));

  const fetchTemplate = (filename) => {
    if (docxContainer.children.length > 0) return;

    fetch("/file/preview", {
      method: "POST",
      body: new URLSearchParams({ filename: `${filename}.docx` }),
    })
      .then((resp) => resp.blob())
      .then((blob) => {
        docx
          .renderAsync(
            blob,
            document.querySelector(".docx-container"),
            undefined,
            {
              inWrapper: false,
            }
          )
          .catch((err) => console.log(err));
      });
  };

  const toggleButtons = (force = false) => {
    submitBtns.forEach((btn) => {
      // btn.toggleAttribute("disabled", force);
    });
  };

  const handleDocxContainerState = (mode = "auto") => {
    const modeMap = {
      auto: "toggle",
      show: "remove",
      hide: "add",
    };

    docxContainer.style.transition = "height 0.3s ease";
    docxContainer.classList[modeMap[mode]]("shrink");
    setTimeout(() => {
      docxContainer.style.transition = null;
    }, 300);
  };

  const scrollToText = (tagName, delay) => {
    setTimeout(() => {
      findText(`${tagName}}`);
    }, delay);
  };

  previewInput?.addEventListener("change", (e) => {
    const { target } = e;

    handleDocxContainerState();
  });

  inputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      const { chooseGroupId } = e.target.dataset;
      const { value } = e.target;

      if (chooseGroupId !== undefined) {
        const choosingInputs = inputs.filter(
          (input) =>
            input !== e.target && input.dataset.chooseGroupId === chooseGroupId
        );

        choosingInputs.forEach((input) => {
          value === ""
            ? input.toggleAttribute("disabled", false)
            : input.toggleAttribute("disabled", true);
        });
      }

      const isFormFilled = inputs.every(({ disabled, required, value }) => {
        if (disabled || !required) return true;

        return value !== "";
      });

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

  searchBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let delay = 0;

      docxContainer.classList.contains("shrink") ? (delay = 300) : (delay = 0);

      handleDocxContainerState("show");
      previewInput.checked = true;

      const target = e.currentTarget;
      const tagName = target.dataset.name;
      const containerTagName = docxContainer.dataset.name;

      if (tagName === containerTagName) {
        return scrollToText(tagName, delay);
      }

      scrollToText(tagName, delay);
    });
  });

  filledInputs.forEach((input) => {
    const { chooseGroupId } = input.dataset;
    if (chooseGroupId === undefined) return;

    const inputsWithTheSameGroup = inputs.filter(
      (el) => el !== input && el.dataset.chooseGroupId === chooseGroupId
    );

    inputsWithTheSameGroup.forEach((input) =>
      input.toggleAttribute("disabled", true)
    );
  });

  fetchTemplate(filename.textContent);
  handleSlider();
};

export default handleInputTag;
