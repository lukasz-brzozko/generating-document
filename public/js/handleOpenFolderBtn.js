const handleOpenFolderBtn = () => {
  const btn = document.getElementById("btn-open-folder");

  if (btn === null) return;

  btn.addEventListener("click", (e) => {
    const options = { open: true };

    fetch("/templates", {
      method: "POST",
      body: JSON.stringify(options),
    });
  });
};

export default handleOpenFolderBtn;
