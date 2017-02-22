/**
 * Created by Iaroslav Zhbankov on 12.02.2017.
 */

/*var newArr = [];
function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                var allText = rawFile.responseText;
                var result = allText.match(/\((\d{3}|\d{4}),(.*?)0\)/g);
                newArr = result.map(function (item) {
                    var id = item.match(/(\d{3}|\d{4}), /g);
                    var htmlText = item.match(/<(.*?)\\n/g);
                    var link = item.match(/http:\/\/gdzpop.com(.*?)html/g);

                    return {
                        "id": id,
                        "htmlText": htmlText,
                        "link":link
                    }
                });
            }
        }
    };
    rawFile.send(null);
}


readTextFile("/data");

var newArr2 = newArr.filter(function(item){
    return ((item['htmlText']!=null)&(item['link']!=null))
});

var handledArr = newArr2.map(function (item) {
    if ((item['htmlText'] != null) && (item['htmlText'].length > 1)) {
        var arr = item["htmlText"].join();
        item["htmlText"] = arr;
    }
    return item;
});

/!*var box = document.querySelector('.block');
for (var i = 0; i < 10; i++) {
    var btn = document.createElement("div");
    var h1 = document.createElement("h1");
    var h2 = document.createElement("h1");
    h1.innerText = handledArr[i]['id'][0];
    h2.innerText = handledArr[i]['link'][0];
    btn.innerHTML = handledArr[i]['htmlText'];
    box.appendChild(h1);
    box.appendChild(h2);
    box.appendChild(btn);
}*!/

function getUrlObject(path){
    var match = path.split('/');

    function unique(url){
        var newUrl = url.split('-');
        if (newUrl.length < 3){
        } else if (newUrl.length < 4){
            var a = newUrl[1];
            newUrl[1] = newUrl[0];
            newUrl[0] = a;
        } else  {
            var a = newUrl[1];
            newUrl[1] = newUrl[0];
            newUrl[0] = a;
            var b = newUrl[3];
            newUrl[3] = newUrl[2];
            newUrl[2] = b;
        }
        return newUrl.join('-');
    }

    function urlObject(match){

        return {
            class: match[3],
            bookTitle: match[4],
            titleUrl: unique(match[match.length - 1])
        }
    };
    return urlObject(match);
}

handledArr = handledArr.map(function(item){
    item.urlObject = getUrlObject(item["link"][0]);
    return item;
});*/


$('').each(function(){
    var same = this;
    $(this).click(function(e) {
        e.preventDefault();
        var hr = $(same).attr("href");
        $( ".imageContainer" ).find('img').remove();
        $('<img>').attr('src', 'http://localhost:3000/' + hr).appendTo($(".imageContainer"))
    })
});