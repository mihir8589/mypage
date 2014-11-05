function getContent(fragmentId) {
    var partials = {
        index: "Home Page",
        about: "About Page",
        contact: "Contact Information"
    };
    return partials[fragmentId];
}

function navigate() {
    var contentDiv = document.getElementById("content");
    var fragmentId = location.hash.substr(1);
    contentDiv.innerHTML = getContent(fragmentId);
    contentDiv.setAttribute("style", "text-align: center;");
}
if (!location.hash) {
    location.hash = "#index";
}
navigate();
window.addEventListener("hashchange", navigate);