/**
 * Created by Iaroslav Zhbankov on 12.02.2017.
 */

var currentIndex = null;


$('.closeImagePrevBtn').click(function () {
    $('.imagePreviewer').attr('style', 'display: none');
    currentIndex = null;
});

function getElementBySelector(selector, index) {
    if (index) {
        var element = $(selector)[index];
        return element;
    } else {
        return $(selector);
    }
}

function imageAppend(selector, index) {
    var elementUrl = $(getElementBySelector(selector, index)).attr("href");
    $(".imagePreviewerImage").find('img').remove();
    $('<img>').attr('src', 'http://localhost:3000/' + elementUrl).appendTo($(".imagePreviewerImage"))
}

getElementBySelector('a[rel]').each(function (index, element) {
    $(element).click(function (event) {
        event.preventDefault();
        $('.imagePreviewer').attr('style', 'display: block');
        imageAppend('a[rel]', index);
        currentIndex = index;
    })
});

$('.prevImage').click(function () {
    if (currentIndex && currentIndex > 0) {
        currentIndex -= 1;
        imageAppend('a[rel]', currentIndex);
    }
});

$('.nextImage').click(function () {
    if (typeof currentIndex == 'number' && currentIndex < $('a[rel]').length) {
        currentIndex += 1;
        imageAppend('a[rel]', currentIndex);
    }
});