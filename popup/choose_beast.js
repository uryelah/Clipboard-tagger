function listenForClicks() {
  document.addEventListener("click", (e) => {
    function beastNameToURL(beastName) {
      switch (beastName) {
        case "p":
          return "<p>"
        case "span":
          return "<span>"
        case "div":
          return "<div>"
        case "a":
          return "<a>"
        case "h1":
          return "<h1>"
        case "li":
          return "<li>"
        case "custom":
          return "-?"
        default:
          return ""
      }
    }

    const beastify = (tabs) => {
        let url = beastNameToURL(e.target.textContent);
        let acc = false;
        if (url === "-?") {
          url = document.getElementById("before").value + "\\uwu/" + document.getElementById("after").value
        }
        if (document.getElementById("accumulative").checked) {
          acc = true
        }
          browser.tabs.sendMessage(tabs[0].id, {
          command: "beastify",
          beastURL: url,
          accumulative: acc
          }).then(response => {
            console.log(response.response);
          }).catch(error => console.error(`Error: ${error}`));

          browser.tabs.update(tab.id, {highlighted: true}).then(response => {
            console.log(response.response);
          }).catch(error => console.error(`Error: ${error}`));
    }

    function reportError(error) {
      console.error(`Error: ${error}`);
    }

    if (true) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(beastify)
        .catch(reportError);
    }
  });
}

function reportExecuteScriptError(error) {
  document.querySelector("#popup-content").classList.add("hidden");
  document.querySelector("#error-content").classList.remove("hidden");
  console.error(`Failed to execute beastify content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/beastify.js"})
.then(listenForClicks)
.then(console.log("???"))
.catch(reportExecuteScriptError);
