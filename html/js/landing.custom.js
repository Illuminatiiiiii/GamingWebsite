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
        offset: 68, // Integer. How far to offset the scrolling anchor location in pixels
        callback: function (anchor, toggle) {} // Function to run after scrolling
    });
    /**youtube video popup**/
    $('.modal-video').magnificPopup({
        type: 'iframe'
    });
    $('.owl-clients').owlCarousel({
        loop: true,
        margin: 5,
        nav: false,
        dots: false,
        autoplay: true,
        responsive: {
            0: {
                items: 2
            },
            600: {
                items: 3
            },
            1000: {
                items: 5
            }
        }
    });
    //auto close navbar-collapse on click a
    $('.navbar a.nav-link').on('click', function () {
        $('.navbar-toggler:visible').click();
    });
    //shrink header
    $(document).on("scroll", function () {
        if
                ($(document).scrollTop() > 150) {
            $(".navbar-sticky").addClass("fixed-top");
        } else
        {
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
