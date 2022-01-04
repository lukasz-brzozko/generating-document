const handleInputTag = () => {
  const inputs = [...document.querySelectorAll(".tag-input")];
  const submitBtns = document.querySelectorAll(".submit-btn");

  if (inputs.length === 0) return;

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
};

export default handleInputTag;
