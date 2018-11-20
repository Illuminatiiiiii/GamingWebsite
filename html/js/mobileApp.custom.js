$(function () {
    /* 
     Custom js file for assan
     */
//preloader
    $(window).preloader({
        delay: 500
    });
//back to top
    if ($('#back-to-top').length) {
        var scrollTrigger = 100, // px
                backToTop = function () {
                    var scrollTop = $(window).scrollTop();
                    if (scrollTop > scrollTrigger) {
                        $('#back-to-top').addClass('show');
                    } else {
                        $('#back-to-top').removeClass('show');
                    }
                };
        backToTop();
        $(window).on('scroll', function () {
            backToTop();
        });
        $('#back-to-top').on('click', function (e) {
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
//knob circle progress bar
    $(".progress-circle").knob();
    wow = new WOW(
            {
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 0,
                mobile: true,
                live: true
            }
    );
    wow.init();

    //tooltip
    $('[data-toggle="tooltip"]').tooltip();
    //popover
    $('[data-toggle="popover"]').popover();
    //smooth scroll
    smoothScroll.init({
        selector: '[data-scroll]', // Selector for links (must be a class, ID, data attribute, or element tag)
        speed: 800, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        offset: 80, // Integer. How far to offset the scrolling anchor location in pixels
        callback: function (anchor, toggle) {} // Function to run after scrolling
    });
    /**youtube video popup**/
    $('.modal-video').magnificPopup({
        type: 'iframe'
    });
    $('.owl-phone').owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        autoplay: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeInUp',
        smartSpeed: 250,
        mouseDrag: true,
        autoWidth: false,
        autoplayTimeout: 3500,
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    $('.carousel-shots').owlCarousel({
        loop: true,
        margin: 15,
        nav: true,
        dots: false,
        autoplay: true,
        smartSpeed: 250,
        mouseDrag: true,
        center: true,
        autoWidth: true,
        navText: ['<i class="icon-chevron-left-circle"></i>', '<i class="icon-chevron-right-circle"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
    $('.carousel-review').owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        dots: true,
        autoplay: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeInUp',
        smartSpeed: 550,
        autoplayTimeout: 3500,
        mouseDrag: false,
        navText: ['<i class="icon-chevron-left-circle"></i>', '<i class="icon-chevron-right-circle"></i>'],
        responsive: {
            0: {
                items: 1
            },
            600: {
                items: 1
            },
            1000: {
                items: 1
            }
        }
    });
    //auto close navbar-collapse on click a
    $('.navbar a.nav-link').on('click', function () {
        $('.navbar-toggler:visible').click();
    });
    //shrink header
    $(window).on("scroll", function () {
        var scroll = $(window).scrollTop();
        if (scroll >= 100) {
            $(".navbar-sticky").addClass("fixed-top");
        } else {
            $(".navbar-sticky").removeClass("fixed-top");
        }
    });
    $('.tweets-container').twittie({
        apiPath: './tweetie/tweet.php',
        dateFormat: '%b. %d, %Y',
        template: '{{tweet}} <div class="date">{{date}}</div> <a href="{{url}}"{{screen_name}}',
        count: 2
    });

});
