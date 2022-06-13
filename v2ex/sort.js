// ==UserScript==
// @name        v2ex回复排序
// @namespace   cljnnn@gmail.com
// @include     http*://*v2ex.com/t/*
// @description:en sort v2ex replies by star❤️
// @description:zh-CN v2ex回复按照❤️排序，如果你不想花太多时间在v2ex上，但又不想错过重要信息，你可能需要这个。兼容 V2EX Pro
// @version     1.1.0
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

// sort likes, compatible with V2EX Pro
let thread = document.querySelector("#Main > div.box:nth-child(4)");
let replies = thread.querySelectorAll(":scope > div.cell[id]");

let replyArray = [];
for (let reply of replies) {
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
let pageRows = thread.querySelectorAll("div.cell[style]");
if (pageRows.length > 0) {
    thread.appendChild(pageRows[pageRows.length - 1]);
}
