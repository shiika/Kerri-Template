// Header typing animation
import Typed from './typedjs/typed.js';

// Owl carousel slider
$(document).ready(function () {
    $(".owl-carousel").owlCarousel({
        items: 1
    });

    var options = {
        strings: ["i'm islam abdelkarim.", "i'm a web developer.", "i'm a handballer."],
        typeSpeed: 60,
        backSpeed: 20,
        backDelay: 3000,
        smartBackspace: true,
        fadeout: true,
        loop: true
    }

    var typed = new Typed(".element", options);

    // navbar scroll animation
    const navbar = document.querySelector(".navbar");
    const logo = document.querySelector(".navbar-brand picture source:nth-child(2)");

    document.addEventListener("scroll", function (e) {
        let pageTop = document.documentElement.scrollTop;
        if (pageTop > 30) {
            navbar.classList.add("nav-scroll-bottom");
            navbar.classList.remove("nav-scroll-top");
            logo.srcset = "img/logo-dark.png";
        } else {
            navbar.classList.add("nav-scroll-top");
            navbar.classList.remove("nav-scroll-bottom");
            logo.srcset = "img/logo.png";
        }
    });

    // sub-nav Active configuration
    // Isotope filtering
    const $grid = $(".works .grid");

    $(".sub-nav a").click(function () {
        $(this).siblings(".active").removeClass("active");
        $(this).addClass("active");

        let item = $(this).data("target");
        $grid.isotope({
            filter: item
        })

    });

    // Bootstrap Scrollspy

    $("body").scrollspy({
        target: ".navbar",
        offset: 50
    });

    $("#navbar-example .navbar-nav a").click(function(e) {
        let hash = this.hash;
        
        e.preventDefault();

        $("html, body").animate({
            scrollTop: $(hash).offset().top
        }, 1500, 'easeInOutExpo', function() {
            window.location.hash = hash;
        });
    });

    // jQuery magnific popup 
    $(".img-zoom").magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        }
    })
});