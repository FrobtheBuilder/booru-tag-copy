// ==UserScript==
// @name         Booru Tag Copy
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Copy tags from boorus!
// @author       FrobtheBuilder
// @match        https://gelbooru.com/*
// @match        https://danbooru.donmai.us/*
// @grant        none
// @run-at document-end
// ==/UserScript==

(function () {
  "use strict";

    function grabGelbooruTags() {
        let elms = [
            "tag-type-character",
            "tag-type-general",
            "tag-type-metadata",
            "tag-type-copyright",
            "tag-type-artist",
        ];

        let prompt = [];

        elms.forEach((tag) => {
            Array.from(document.getElementsByClassName(tag)).forEach((e) => {
                prompt.push(e.children[1].textContent.replace(" ", "_"));
            })
        })

        return prompt.join(", ");
    }

    function grabDanbooruTags() {
        let elms = [
            "tag-type-0",
            "tag-type-1",
            "tag-type-2",
            "tag-type-3",
            "tag-type-4"
        ]
        let prompt = [];
        elms.forEach(tag => {
            Array.from(document.getElementsByClassName(tag)).forEach(e => {
                prompt.push(e.children[1].textContent.replace(" ", "_"))
            })
        })
        return prompt.join(", ");
    }

    if (window.location.host.includes("gelbooru")) {
        const tagBar = document.querySelector("ul.tag-list");
        const tagsEnd = document.querySelector(
            "ul.tag-list > li > br"
        ).parentElement;
        const grabButton = document.createElement("li");
        grabButton.textContent = "Copy all tags";
        grabButton.style.cursor = "pointer";
        grabButton.style.color = "#337ab7";
        grabButton.addEventListener("click", () => {
            navigator.clipboard.writeText(grabGelbooruTags());
        });
        tagBar.insertBefore(grabButton, tagsEnd);
    }
    else if (window.location.host.includes("danbooru")) {
        const tagBar = document.querySelector("ul.general-tag-list");
        const grabButton = document.createElement("li");
        grabButton.textContent = "Copy all tags";
        grabButton.style.cursor = "pointer";
        grabButton.style.color = "#0075F8";
        grabButton.addEventListener("click", () => {
            navigator.clipboard.writeText(grabDanbooruTags());
        });
        tagBar.appendChild(grabButton);
    }

})();