// ==UserScript==
// @name        v2ex回复排序
// @namespace   cljnnn@gmail.com
// @include     http*://*v2ex.com/t/*
// @description:en sort v2ex reply by star❤️
// @description:zh-CN v2ex回复按照❤️排序
// @version     1.0.0.3
// @description sort v2ex reply by star❤️
// ==/UserScript==
let content = $("div.box[style] + div + div.box");
let hasPages = content.find("a.page_current").size()!==0;
let lastPageRow = hasPages ? content.find("div.cell:last") : null;
content.find("div.cell[id^='r_']").sort(
    function(x, y){
        let vx = parseInt($(x).find("span.small").text().replace(/♥/g, ""));
        if (isNaN(vx)) vx = 0;
        let vy = parseInt($(y).find("span.small").text().replace(/♥/g, ""));
        if (isNaN(vy)) vy = 0;
        return vx <= vy;
    }
).appendTo(content);


// move the lastPageRow to the end of content
if(lastPageRow){
    lastPageRow.appendTo(content);
}

//green author
$("strong a.dark:contains('"+$("small.gray a").text()+"')").css('color', 'green');

//blue link
//$("div.cell[id^='r_'] a[rel='nofollow']").css('color', 'blue');
$("a[rel='nofollow']").css('color', 'blue');
