'use strict'
// this loads page main element with a url and try to browse like a normal page
async function loadPage(newUrl) {
    const content = document.getElementById('main-content');
    const response = await fetch(newUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'text/html'
        }
    });
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    if (doc.querySelector('#main-content') === null){
        let target = "_self";
        //TODO: check the link clicked and open in new tab if it is external
        window.open(newUrl, target);
        content.innerHTML = "Loading...";
    } else {
        content.innerHTML = doc.querySelector('#main-content').innerHTML;
        document.title = doc.title;
        history.pushState(null, doc.title, newUrl); // write browser history
    }
}

// reinit scripts needed with specific element that is newly loaded,like aplayer.
function reinitScript() {
    const loadCommentButton = document.getElementById("load-comment");
    if (loadCommentButton) {
        const script = document.createElement("script");  // create a script DOM node
        script.src = "/js/comments.js";  // set its src to the provided URL
        const comment = document.getElementById("comments")
        comment.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    }

    const guestbookElement = document.getElementById("Comments")
    if (guestbookElement) {
        const script = document.createElement("script");  // create a script DOM node
        script.src = "https://gb-comments.zeabur.app/dist/Artalk.js";  // set its src to the provided URL
        const comment = document.getElementsByTagName("section")[1]
        comment.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
    }
}

window.onload = function() {
    // Make links load asynchronously
    document.querySelector("body").addEventListener("click", async function (event) {
        // History API needed to make sure back and forward still work
        if (history === null)
            return;

        // External links should instead open in a new tab
        // for these elements don't like to use <a> standard
        const newUrl = event.target.getAttribute("href") || (event.target.parentElement && event.target.parentElement.getAttribute("href"));
        if (!newUrl) return;
        const domain = window.location.origin;
        // relative URLs seems to be more common for in-site link, so should be processed
        const isRelativeUrl = newUrl.startsWith('/') || newUrl.startsWith('.');
        // skip with title anchor, they shouldn't use these
        if (newUrl.startsWith('#'))
            return;
        if (!isRelativeUrl && (typeof domain !== "string" || newUrl.search(domain) !== 0)) {
            event.preventDefault();
            window.open(newUrl, "_blank");
        } else {
            event.preventDefault()
            const content = document.getElementById('main-content');
            // animations, load while getting content
            content.classList.add('fade-out');
            await new Promise(resolve => {
                content.addEventListener('transitionend', resolve, {once: true});
            });
            await loadPage(newUrl);
            content.classList.remove('fade-out');
            content.classList.add('fade-in');

            content.addEventListener('transitionend', function() {
                content.classList.remove('fade-in');
            }, {once: true});

            reinitScript();
        }
    });
}

window.addEventListener('popstate', async function() {
    await loadPage(location.pathname);
});