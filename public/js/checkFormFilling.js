export const handleChoosingInputs = (e, inputs) => {
  if (e === undefined) return;

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
};

export const checkFormFilling = (e, inputs, checkChoosingInputs) => {
  let isFormFilled = false;

  if (checkChoosingInputs) {
    handleChoosingInputs();
  }

  isFormFilled = inputs.every(({ disabled, required, value }) => {
    if (disabled || !required) return true;

    return value !== "";
  });

  console.log(isFormFilled);

  return isFormFilled;
};

export const addEvent = (input, inputs) => {
  const nextBtn = document.getElementById("multi-step-next-btn");

  input.addEventListener("change", (e) => {
    const isFormFilled = checkFormFilling(e, inputs);

    isFormFilled
      ? nextBtn.toggleAttribute("disabled", false)
      : nextBtn.toggleAttribute("disabled", true);
    isFormFilled
      ? nextBtn.classList.remove("swiper-button-disabled")
      : nextBtn.classList.add("swiper-button-disabled");
  });
};

export const handleFormInputs = (inputs = []) => {
  inputs.forEach((input) => addEvent(input, inputs));
};
