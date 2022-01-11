import download from "downloadjs";
import M from "materialize-css";
const docx = require("docx-preview");

const handleInputTag = () => {
  const inputs = [...document.querySelectorAll(".tag-input")];
  const submitBtns = document.querySelectorAll(".btn-submit");
  const searchBtns = document.querySelectorAll(".btn-search");
  const tooltips = document.querySelectorAll(".tooltipped");

  if (inputs.length === 0) return;

  const docxContainer = document.querySelector(".docx-container");

  const form = document.getElementById("tag-form");
  const progress = document.getElementById("progress");
  const filename = document.getElementById("filename");
  const previewInput = document.getElementById("temaplate-prev-input");

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
      btn.toggleAttribute("disabled", force);
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

  const scrollToText = (delay) => {
    setTimeout(() => {
      document
        .getElementById("highlighted-text")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
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

      const isFormFilled = inputs.every((input) => {
        if (input.disabled) return true;

        return input.value !== "";
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

  tooltips.forEach((tooltip) => {
    M.Tooltip.init(tooltip);
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
        return scrollToText(delay);
      }

      let docxContainerContent = docxContainer.innerHTML;

      docxContainerContent = docxContainerContent.replaceAll(
        '<mark id="highlighted-text">',
        ""
      );

      docxContainerContent = docxContainerContent.replaceAll("</mark>", "");
      docxContainerContent = docxContainerContent.replaceAll(
        `${tagName}}`,
        `<mark id="highlighted-text">${tagName}</mark>}`
      );

      docxContainer.innerHTML = docxContainerContent;

      docxContainer.dataset.name = tagName;

      scrollToText(delay);
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
};

export default handleInputTag;
