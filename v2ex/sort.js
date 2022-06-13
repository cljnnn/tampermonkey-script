// ==UserScript==
// @name        v2ex回复排序
// @namespace   cljnnn@gmail.com
// @include     http*://*v2ex.com/t/*
// @description:en sort v2ex replies by star❤️
// @description:zh-CN v2ex回复按照❤️排序，如果你不想花太多时间在v2ex上，但又不想错过重要信息，你可能需要这个。兼容 V2EX Pro
// @version     1.1.2
// @description sort v2ex replies by star❤️, compatible with V2EX Pro
// ==/UserScript==

// green poster
let posterName = document.querySelector("small.gray a").textContent;
for (let author of document.querySelectorAll("strong a.dark")) {
    if (author.textContent.includes(posterName)) {
        author.style.color = "green";
    }
}

// blue link
for (let link of document.querySelectorAll("a[rel~='nofollow']")) {
    link.style.color = "blue";
}

// handle pictures loaded by V2EX Pro
for (let img of document.querySelectorAll("div.topic_content img:not([width],[class]), div.cell[id] div.reply_content img:not([width],[class])")) {
    img.classList.add("embedded_image");
}

// sort likes, compatible with V2EX Pro
let thread = document.querySelector("#Main > div.box:nth-child(4)");
let replies = thread.querySelectorAll(":scope > div.cell[id]");

let replyArray = [];
for (let reply of replies) {
    // remove avatar in child thead of V2EX Pro
    let avatars = reply.querySelectorAll("div.reply_content img.avatar")
    for (let avatar of avatars) {
        avatar.parentElement.remove();
    }
    // remove right padding of child thead of V2EX Pro
    let children = reply.querySelectorAll("div.cell");
    for (let child of children) {
        child.style.paddingRight = "0px";
    }
    replyArray.push(reply);
}

let countLike = function (reply) {
    let count = 0;
    let likes = reply.querySelectorAll("span.small")
    for (let like of likes) {
        count += parseInt(like.textContent);
    }
    return count;
}
replyArray.sort(function (x, y) {
    return countLike(y) - countLike(x);
})
for (let reply of replyArray) {
    thread.appendChild(reply);
}

// handle page rows
let pageRows = thread.querySelectorAll("div.cell[style]:not([id])");
if (pageRows.length > 0) {
    thread.appendChild(pageRows[pageRows.length - 1]);
}
