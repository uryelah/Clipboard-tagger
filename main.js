let accSelection = "";
let stateChange = [false, false];
console.log(document.getElementById("accumulative"))

document.addEventListener('copy', (event) => {
    const selection = document.getSelection();
    let tag = window.localStorage.getItem("tag");
    let acc = window.localStorage.getItem("acc-clipboard");
    let before = "";
    let after  = "";

    switch (tag) {
        case "<p>":
            before = "<p>"
            after = "</p>"
        break;
        case "<div>":
            before = "<div>"
            after = "</div>"
        break;
        case "<span>":
            before = "<span>"
            after = "</span>"
        break;
        case "<a>":
            before = "<a href='#'>"
            after = "</a>"
        break;
        case "<li>":
            before = "<li>"
            after = "</li>"
        break;
        case "<h1>":
            before = "<h1>"
            after = "</h1>"
        break;
        default:
            before = ""
            after = ""
            if (tag.includes("\\uwu/")) {
                before = tag.match(/(.*)\\uwu\/(.*)/)[1];
                after = tag.match(/(.*)\\uwu\/(.*)/)[2];
            }
    }

    if (acc === "false") {
        stateChange[1] = stateChange[0]
        stateChange[0] = false
    } else if (acc === "true") {
        stateChange[1] = stateChange[0]
        stateChange[0] = true
        accSelection += before + selection.toString() + after + "\n";
    }

    let accum = window.localStorage.getItem('copyboard');
    if (stateChange[0] && stateChange[1]) {
        window.localStorage.setItem('copyboard', accum + before + selection.toString() + after + "\n");
    } else if (stateChange[0] && !stateChange[1]) {
        window.localStorage.setItem('copyboard', accum + before + selection.toString() + after + "\n");
    } else if (!stateChange[0]) {
        window.localStorage.setItem('copyboard', "");
    }
    accum = window.localStorage.getItem('copyboard');

    if (acc === "false") {
        event.clipboardData.setData('text/plain', before + selection.toString() + after + "\n");
    } else if (acc === "true") {
        event.clipboardData.setData('text/plain', accum);
    }

    event.preventDefault();
});
