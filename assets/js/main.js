$(document).ready(function () {
    if ($('.submenu')) {
        $('.submenu').parent().addClass('active');
    }

    if ($('.header .submenu > li > ul')) {
        $('.header .submenu > li > ul').parent().addClass('active');
    }

    $('.header__search').click(function () {
        $('.header__form').toggleClass('active');
    });

    $('.menu-buger').click(() => {
        $('.menu-mb').addClass('active');
    });

    $('.menu-mb__close').click(() => {
        $('.menu-mb').removeClass('active');
    });

    $('.menu-mb__wrap > .dropdown').on('click', function () {
        $(this).toggleClass('active');

        $(this).parent().next('.menu-mb__submenu').slideToggle();
    });

    if ($('.menu-mb__submenu > li > ul')) {
        $('.menu-mb__submenu > li > ul')
            .parent()
            .append("<div class='dropdown'></div>");
    }

    $('.menu-mb__item > .menu-mb__submenu > li > .dropdown').on(
        'click',
        function () {
            $(this).toggleClass('active');
            $(this).parent().find('.menu-mb__submenu').slideToggle();
        }
    );

    $('.menu-mb__submenu').parent().addClass('active');

    $('.header__form--close').click(() => {
        $('.header__form').removeClass('active');
    });
});
