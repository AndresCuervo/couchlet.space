// Blah
let scrolly = document.querySelector("#scrollytelling")

var last_known_scroll_position = 0;
var ticking = false;

function doSomething(scroll_pos) {
    scrolly.style.transform = `rotateZ(${scroll_pos * 0.2}deg)`
    console.log("boop", scroll_pos, scrolly.style.transform)
}

window.addEventListener('scroll', function(e) {

    last_known_scroll_position = window.scrollY;

    if (!ticking) {

        window.requestAnimationFrame(function() {
            doSomething(last_known_scroll_position);
            ticking = false;
        });

        ticking = true;

    }

});
