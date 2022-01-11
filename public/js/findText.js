let TRange = null;

function findString(str) {
  const isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1;

  if (!isFirefox) {
    window.find(str, false, false, true, false, false, false);

    window.getSelection().baseNode?.parentNode?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    return;
  }

  if (parseInt(navigator.appVersion) < 4) return;
  let strFound;
  if (window.find) {
    // CODE FOR BROWSERS THAT SUPPORT window.find

    strFound = self.find(str);
    if (!strFound) {
      strFound = self.find(str, 0, 1);
      while (self.find(str, 0, 1)) continue;
    }
  } else if (navigator.appName.indexOf("Microsoft") != -1) {
    // EXPLORER-SPECIFIC CODE

    if (TRange != null) {
      TRange.collapse(false);
      strFound = TRange.findText(str);
      if (strFound) TRange.select();
    }
    if (TRange == null || strFound == 0) {
      TRange = self.document.body.createTextRange();
      strFound = TRange.findText(str);
      if (strFound) TRange.select();
    }
  } else if (navigator.appName == "Opera") {
    alert("Opera browsers not supported, sorry...");
    return;
  }
}

export default findString;
