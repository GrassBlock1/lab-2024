// TODO: 'use strict'
function loadPage(newUrl) {
    sendRequest(newUrl)
}

function sendRequest(newUrl) {
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState !== XMLHttpRequest.DONE)
            return;

        // TODO: UI for this error
        const newDocument = httpRequest.responseXML;
        if (newDocument === null)
            return;

        // TODO: UI for this error
        const newContent = httpRequest.responseXML.getElementById("main-content");
        if (newContent === null)
            return;

        document.title = newDocument.title;

        const contentElement = document.getElementById("main-content");
        contentElement.replaceWith(newContent);
    }

    httpRequest.responseType = "document";
    httpRequest.open("GET", newUrl);
    httpRequest.send();


}

window.onload = function() {
    // Make links load asynchronously
    document.querySelector("body").addEventListener("click", function(event) {
        // History API needed to make sure back and forward still work
        if (history === null)
            return;

        // External links should instead open in a new tab
        const newUrl = event.target.getAttribute("href") || (event.target.parentElement && event.target.parentElement.getAttribute("href"));
        const domain = window.location.origin;
        const isRelativeUrl = newUrl.startsWith('/') || newUrl.startsWith('.');
        if (newUrl.startsWith('#'))
            return;
        if (!isRelativeUrl && (typeof domain !== "string" || newUrl.search(domain) !== 0)) {
            event.preventDefault();
            window.open(newUrl, "_blank");
        } else {
            event.preventDefault();
            const content = document.getElementById('main-content');
            content.classList.add('fade-out');
            content.addEventListener('transitionend', function() {
            loadPage(newUrl);
            history.pushState(null /*stateObj*/, "" /*title*/, newUrl);
            }, {once:true})
        }
    });
}

window.onpopstate = function(event) {
    loadPage(window.location);
    const content = document.getElementById('main-content');
    setTimeout(()=> {content.classList.remove('fade-out')}, 250)
    setTimeout(() => {content.classList.add('fade-in')}, 250)
}