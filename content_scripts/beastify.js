(function() {
  let tag = ""

  let insertBeast = async(beastURL) => {
    window.localStorage.setItem("tag", beastURL);
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "beastify") {
      insertBeast(message.beastURL);
      window.localStorage.setItem("acc-clipboard", message.accumulative)
    } 
  });

})();
