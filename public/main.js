const init = () => {
  const submitBtn = document.getElementById("submit-btn");
  const inputFile = document.getElementById("file");

  if (submitBtn === null || inputFile === null) return;

  inputFile.addEventListener("change", (e) => {
    const value = e.currentTarget.value;

    console.log(value);

    value === ""
      ? submitBtn.setAttribute("disabled", true)
      : submitBtn.removeAttribute("disabled");
  });
};

document.addEventListener("DOMContentLoaded", init);
