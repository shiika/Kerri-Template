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

    document.addEventListener("scroll", function (e) {
        let pageTop = document.documentElement.scrollTop;
        if (pageTop > 30) {
            $(".navbar").addClass("nav-scroll-bottom").removeClass("nav-scroll-top");
        } else {
            $(".navbar").addClass("nav-scroll-top").removeClass("nav-scroll-bottom");
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

const lazyLoad = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            io.unobserve(img);
            const src = img.getAttribute("data-lazy");
    
            img.setAttribute("src", src);

        }
    });
}

const imgs = document.querySelectorAll("img[data-lazy]")
const io = new IntersectionObserver(lazyLoad);

imgs.forEach(img => io.observe(img));

