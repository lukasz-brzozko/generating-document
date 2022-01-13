import M from "materialize-css";

const handleTooltips = () => {
  const tooltips = document.querySelectorAll(".tooltipped");

  tooltips.forEach((tooltip) => {
    M.Tooltip.init(tooltip);
  });
};

export default handleTooltips;
