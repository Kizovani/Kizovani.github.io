import { gsap } from "gsap";

const tl = gsap.timeline({ paused: true });

function revealMenu() {
    revealMenuItems();

    const toggleBtn = document.getElementById("menu-toggle");
    const closeBtn = document.getElementById("close-menu");

    toggleBtn.onclick = function(e) {
        tl.reversed(!tl.reversed());
    };

    closeBtn.onclick = function(e) {
        tl.reversed(!tl.reversed());
    };
}

revealMenu();

function revealMenuItems() {
    tl.to(".menu-container", {
        duration: 0.01,
        height: "210px",
    });
    tl.to(".col-1", {
        duration: 1,
        left: "-200px",
        ease: "power4.inOut",
    });
    tl.to(".col-2", {
        duration: 0.025,
        left: "0px",
        ease: "power4.inOut",
    }, "<");
    tl.to(".col-2 > .menu-item", {
        duration: 1,
        left: 0,
        ease: "power4.inOut",
        stagger: {
            amount: 0.25
        },
    }, "<").reverse();
}

