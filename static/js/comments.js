function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function emojify(input, emojis) {
    let output = input;

    emojis.forEach(emoji => {
        let picture = document.createElement("picture");

        let source = document.createElement("source");
        source.setAttribute("srcset", escapeHtml(emoji.url));
        source.setAttribute("media", "(prefers-reduced-motion: no-preference)");

        let img = document.createElement("img");
        img.className = "emoji";
        img.setAttribute("src", escapeHtml(emoji.static_url));
        img.setAttribute("alt", `:${emoji.shortcode}:`);
        img.setAttribute("title", `:${emoji.shortcode}:`);
        img.setAttribute("width", "20");
        img.setAttribute("height", "20");

        picture.appendChild(source);
        picture.appendChild(img);

        output = output.replace(`:${emoji.shortcode}:`, picture.outerHTML);
    });

    return output;
}

function loadComments() {
    // trim url
    // input:
    // https://example.com/foo/bar#baz
    // https://example.com/foo/bar?baz=qux
    // output:
    // https://example.com/foo/bar
    const {origin, pathname} = new URL(window.location.href)
    const url = new URL(pathname, origin).href
    const host = "https://hatsu-nightly-debug.hyp3r.link"
    // get id (base64url encode)
    // aHR0cHM6Ly9leGFtcGxlLmNvbS9mb28vYmFy
    const id = btoa(url).replaceAll('+', '-').replaceAll('/', '_')
    let commentsWrapper = document.getElementById("comments-wrapper");
    document.getElementById("load-comment").innerHTML = "Loading";
    fetch(new URL(`/api/v1/statuses/${id}/context`, host))
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
                let descendants = data['descendants'];
                if (
                    descendants &&
                    Array.isArray(descendants) &&
                    descendants.length > 0
                ) {
                    commentsWrapper.innerHTML = "";


                    descendants.forEach(function (status) {
                        console.log(descendants)
                        if (status.account.display_name.length > 0) {
                            status.account.display_name = escapeHtml(status.account.display_name);
                            status.account.display_name = emojify(status.account.display_name, status.account.emojis);
                        } else {
                            status.account.display_name = status.account.username;
                        }
                        ;

                        let instance = "";
                        if (!status.account.id.includes("o3o.ca")) {
                            instance = status.account.id.split("/")[2];
                        } else {
                            instance = "o3o.ca";
                        }

                        const isReply = status.in_reply_to_id !== id;

                        let op = false;
                        if (status.account.username == "grassblock") {
                            op = true;
                        }

                        status.content = emojify(status.content, status.emojis);

                        let avatarSource = document.createElement("source");
                        avatarSource.setAttribute("srcset", escapeHtml(status.account.avatar));
                        avatarSource.setAttribute("media", "(prefers-reduced-motion: no-preference)");

                        let avatarImg = document.createElement("img");
                        avatarImg.className = "avatar";
                        avatarImg.setAttribute("src", escapeHtml(status.account.avatar_static));
                        avatarImg.setAttribute("alt", `@${status.account.username}@${instance} avatar`);

                        let avatarPicture = document.createElement("picture");
                        avatarPicture.appendChild(avatarSource);
                        avatarPicture.appendChild(avatarImg);

                        let avatar = document.createElement("a");
                        avatar.className = "avatar-link";
                        avatar.setAttribute("href", status.account.url);
                        avatar.setAttribute("rel", "external nofollow");
                        avatar.setAttribute("title", `View profile at @${status.account.username}@${instance}`);
                        avatar.appendChild(avatarPicture);

                        let instanceBadge = document.createElement("a");
                        instanceBadge.className = "instance";
                        instanceBadge.setAttribute("href", status.account.url);
                        instanceBadge.setAttribute("title", `@${status.account.username}@${instance}`);
                        instanceBadge.setAttribute("rel", "external nofollow");
                        instanceBadge.textContent = instance;

                        let display = document.createElement("span");
                        display.className = "display";
                        display.setAttribute("itemprop", "author");
                        display.setAttribute("itemtype", "http://schema.org/Person");
                        display.innerHTML = status.account.display_name;

                        let header = document.createElement("header");
                        header.className = "author";
                        header.appendChild(display);
                        header.appendChild(instanceBadge);

                        let permalink = document.createElement("a");
                        permalink.setAttribute("href", status.url);
                        permalink.setAttribute("itemprop", "url");
                        permalink.setAttribute("title", `View comment at ${instance}`);
                        permalink.setAttribute("rel", "external nofollow");
                        permalink.textContent = new Date(status.created_at).toLocaleString('en-US', {
                            dateStyle: "long",
                            timeStyle: "short",
                        });

                        let timestamp = document.createElement("time");
                        timestamp.setAttribute("datetime", status.created_at);
                        timestamp.appendChild(permalink);

                        let main = document.createElement("main");
                        main.setAttribute("itemprop", "text");
                        main.innerHTML = status.content;

                        let interactions = document.createElement("footer");
                        if (status.favourites_count > 0) {
                            let faves = document.createElement("a");
                            faves.className = "faves";
                            faves.setAttribute("href", `${status.url}/favourites`);
                            faves.setAttribute("title", `Favorites from ${instance}`);
                            faves.textContent = status.favourites_count;

                            interactions.appendChild(faves);
                        }

                        let comment = document.createElement("article");
                        //comment.id = `comment-${ status.id }`;
                        comment.className = isReply ? "comment comment-reply" : "comment";
                        comment.setAttribute("itemprop", "comment");
                        comment.setAttribute("itemtype", "http://schema.org/Comment");
                        comment.appendChild(avatar);
                        comment.appendChild(header);
                        comment.appendChild(timestamp);
                        comment.appendChild(main);
                        comment.appendChild(interactions);

                        if (op === true) {
                            comment.classList.add("op");

                            avatar.classList.add("op");
                            avatar.setAttribute(
                                "title",
                                "Blog post author; " + avatar.getAttribute("title")
                            );

                            instanceBadge.classList.add("op");
                            instanceBadge.setAttribute(
                                "title",
                                "Blog post author: " + instanceBadge.getAttribute("title")
                            );
                        }

                        commentsWrapper.innerHTML += DOMPurify.sanitize(comment.outerHTML);
                    });
                } else {
                    commentsWrapper.innerHTML = '<p>无评论</p>'
                }
                document.getElementById('load-comment').outerHTML = ``
                document.getElementById('comments-wrapper').innerHTML += `<br><p><button class="!rounded-md bg-primary-600 px-4 py-2 !text-neutral !no-underline hover:!bg-primary-500 dark:bg-primary-800 dark:hover:!bg-primary-700 addComment">进行评论</button></p>`
                document.getElementById('comments-wrapper').innerHTML += `
                <dialog id="comment-dialog" class="lg:w-auto bg-neutral-300 m-5 px-2 py-2 text-neutral">
                   <div class="dialog-title">
                    <b class="">进行评论</b>
                    <button title="Cancel" id="close" class="">&times;</button>
                   </div>
              <p>
                  评论由 Hatsu 提供，可通过一个联邦宇宙帐号回复这个帖子进行评论。在下面填入自己的网站地址来跳转到自己网站中进行互动：
              <p>
              <p class="input-row">
                  <input type="text" inputmode="url" autocapitalize="none" autocomplete="off"
                      value="${localStorage.getItem("url") ?? ''}" id="instanceName"
                      placeholder="例如：mastodon.social">
                  <button class="button" id="go">前往</button>
              </p>
              <p>或是复制帖文的地址并通过自己网站的搜索框抓取这篇帖子进行互动：</p>
              <p class="input-row">
                  <input type="text" readonly id="copyInput" value="${url}">
                  <button class="button" id="copy">复制</button>
              </p>
                </dialog>`
                const dialog = document.getElementById('comment-dialog');

                // open dialog on button click
                Array.from(document.getElementsByClassName("addComment")).forEach(button => button.addEventListener('click', () => {
                    dialog.showModal();
                    // this is a very very crude way of not focusing the field on a mobile device.
                    // the reason we don't want to do this, is because that will push the modal out of view
                    if (dialog.getBoundingClientRect().y > 100) {
                        document.getElementById("instanceName").focus();
                    }
                }));

                // when click on 'Go' button: go to the instance specified by the user
                document.getElementById('go').addEventListener('click', () => {
                    let instanceURL = document.getElementById('instanceName').value.trim();
                    if (instanceURL === '') {
                        // bail out - window.alert is not very elegant, but it works
                        window.alert("请填入你的实例地址！");
                        return;
                    }

                    // store the url in the local storage for next time
                    localStorage.setItem('mastodonUrl', instanceURL);

                    if (!instanceURL.startsWith('https://')) {
                        instanceURL = `https://${instanceURL}`;
                    }

                    window.open(`${instanceURL}/authorize_interaction?uri=${url}`, '_blank');
                });

                // also when pressing enter in the input field
                document.getElementById('instanceName').addEventListener('keydown', e => {
                    if (e.key === 'Enter') {
                        document.getElementById('go').dispatchEvent(new Event('click'));
                    }
                });

                // copy tye post's url when pressing copy
                document.getElementById('copy').addEventListener('click', () => {
                    // select the input field, both for visual feedback, and so that the user can use CTRL/CMD+C for manual copying, if they don't trust you
                    document.getElementById('copyInput').select();
                    navigator.clipboard.writeText(url);
                    // Confirm this by changing the button text
                    document.getElementById('copy').innerHTML = '已复制！';
                    // restore button text after a second.
                    window.setTimeout(() => {
                        document.getElementById('copy').innerHTML = '复制';
                    }, 1000);
                });

                // close dialog on button click, or escape button
                document.getElementById('close').addEventListener('click', () => {
                    dialog.close();
                });
                dialog.addEventListener('keydown', e => {
                    if (e.key === 'Escape') dialog.close();
                });

                // Close dialog, if clicked on backdrop
                dialog.addEventListener('click', event => {
                    var rect = dialog.getBoundingClientRect();
                    var isInDialog =
                        rect.top <= event.clientY
                        && event.clientY <= rect.top + rect.height
                        && rect.left <= event.clientX
                        && event.clientX <= rect.left + rect.width;
                    if (!isInDialog) {
                        dialog.close();
                    }
                })
            }
        )
}

document.getElementById("load-comment").addEventListener("click", loadComments);