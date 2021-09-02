$(document).ready(function () {
    $('.my-slick-slide').slick({
        slidesToShow: 4,
        slideToScroll: 1,
        focusOnSelect: true,
        prevArrow: '<i class="fas fa-chevron-left arrow-left"></i>',
        nextArrow: '<i class="fas fa-chevron-right arrow-right"></i>'
    });

    $('.handbook-slide').slick({
        slidesToShow: 2,
        slideToScroll: 1,
        focusOnSelect: true,
        prevArrow: '<i class="fas fa-chevron-left arrow-left"></i>',
        nextArrow: '<i class="fas fa-chevron-right arrow-right"></i>'
    });
});