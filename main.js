//TODO: ORGANIZE THIS HOW CLAUDE SUGGESTED PLEASE
import baffle from 'baffle';

//text handling
document.addEventListener('DOMContentLoaded', function() {
  
  let nametag = baffle('.nametag', {

    characters: '▒██ ▒▒>>█ >▒<█< ▓▒▒ ▓▒█$▒▓ ▒░/█ ▓▒#▒ ░▓▒▒ >/░▒',
    speed: 70,
  });

  nametag.start();
  //small delay to allow the baffle to happen so you dont see "kizovani" flash before it is baffled
  setTimeout(() => {
    const welcomeText = document.querySelector('.nametag');
    welcomeText.style.display = 'inline-block';
  }, 50);

  //reveal text when model is loaded
  window.addEventListener('modelLoaded', function() {
    
  nametag.reveal(4000, 1700);
  });

  // TODO:
  // maybe add a text where if they spin him around very rapidly he says something like "im getting dizzy"
  // and then the second time something like please stop im going to throw up
  // and then maybe a throw up effect? But like idk if I can make it cooler/different from the konami code?!?!?!?
  // ideas for how to do above:
  // log camera coords, if the change in camera coords is too drastic too fast, trigger
  // or I could detect mouse movement and if when the user is holding and dragging left click too fast it triggers that way, I feel like that could be easier/more reliable, but idk if there
  //even is a way to detect mouse "velocity"
  // konami code can just be the baffle effect everywhere and then atr the end its the ultron quote "youve wounded me, full marks for that" (or some fuck shit like that)
  //maybe incorporate a quote of the day thing, after all the intro messages he says like "Todays quote of the day is:", just worried its going to be too much text for some of the larger quotes

const messages = [
  { content: "Welcome", duration: 4000 },
  { content: "move me using your mouse", duration: 3000 },
  { content: "drag with left and right click for rotation and position", duration: 5000 },
  { content: "zoom using the scroll wheel", duration: 4000 },
  { content: "you can also play with my lighting effects..", duration: 5000 },
  { content: "using the scroll bar for light rotation", duration: 5000 },
  { content: "and the switch for ambient light", duration: 5000 },
  { content: "check out the menu for more", duration: 4000 }
];


let currentIndex = 0;
  let baffleEffect = baffle('.welcome-text', {

    characters: '▒██ ▒▒>>█ >▒<█< ▓▒▒ ▓▒█$▒▓ ▒░/█ ▓▒#▒ ░▓▒▒ >/░▒',
    speed: 70,
  })

  window.addEventListener('modelLoaded', function() {
    const initialDelay = 4700; //4.7 second delay before anything else happens after model is loaded
    setTimeout(function(){
      const welcomeText = document.querySelector('.welcome-text');
      welcomeText.style.display = 'inline-block';
      displayNextMessage();
    }, initialDelay);
  });

    function displayNextMessage() {
      if (currentIndex >= messages.length) {
        handleEndOfMessages();
        return;
      }

      const currentMessage = messages[currentIndex];
      baffleEffect.start();
      baffleEffect.text(() => currentMessage.content).reveal(1500);

      currentIndex++;

      //schedule the next message or end of messages

      setTimeout(() => {
        if (currentIndex < messages.length) {
          displayNextMessage();
        } else {
          handleEndOfMessages();
        }
      }, currentMessage.duration);
    }
    
    //get rid of current message, wait some time, then display joke
      function handleEndOfMessages() {
        console.log("all messages displayed")

        const welcomeText = document.querySelector('.welcome-text');
        const timeToTextDissapear = 4000;
        const timeToBaffleBeforeDissapear = 3500;
        setTimeout(() => {
          baffleEffect.start();
        }, timeToBaffleBeforeDissapear);
        setTimeout(() => {
          welcomeText.style.display = 'none';
        }, timeToTextDissapear);

        const jokeTimeout = 120000; //2 minute delay before joke
        setTimeout(() => {
          baffleEffect.start();
          welcomeText.style.display = 'inline-block';
          baffleEffect.text(() => "why are you still here?").reveal(1000);
        }, jokeTimeout);
      }

});



//menu bar:
//idea basically copied from codegrid "brutalist menu bar" so I have basically no idea how anything below this line works
const tl = gsap.timeline({ paused: true });

function revealMenu() {
  revealMenuItems();
  const toggleBtn = document.getElementById("menu-toggle");
  const closeBtn = document.getElementById("close-menu");
  toggleBtn.onclick = function (e) {
    tl.reversed(!tl.reversed());
  };
  closeBtn.onclick = function (e) {
    tl.reversed(!tl.reversed());
  };
}

function revealMenuItems() {
  tl.to(".menu-container", 0.01, {
    //INCREASE THIS IF ITS CUTOFF AT THE BOTTOM OF THE LIST!!
    height: "205px",
  });

  tl.to(".col-1", 1, {
    left: "-200px",
    ease: "power4.inOut",
  });

  tl.to(
    ".col-2",
    0.025,
    {
      left: "0px",
      ease: "power4.inOut",
    },
    "<"
  );

  tl.to(
    ".col-2 > .menu-item",
    1,
    {
      left: 0,
      ease: "power4.inOut",
      stagger: {
        //change this for more or less delay between each item
        amount: 0.35,
      },
    },
    "<"
  ).reverse();
}

gsap.to(".marquee", {
  x: "-25%",
  duration: 10,
  ease: "none",
  repeat: -1,
  yoyo: true,
});

document.addEventListener("DOMContentLoaded", function () {
  revealMenu();

  let menuContainer = document.querySelector(".menu-container");
  let marqueeContainer = document.querySelector(".marquee-container");
  let marqueeText = document.querySelector(".marquee");
  let isInsideMenuContainer = false;

  menuContainer.addEventListener("mouseenter", function () {
    isInsideMenuContainer = true;
    marqueeContainer.style.display = "block";
  });

  menuContainer.addEventListener("mousemove", function (event) {
    if (isInsideMenuContainer) {
      marqueeContainer.style.display = "block";
      let pageXOffset = window.pageXOffset || document.documentElement.scrollLeft;
      let pageYOffset = window.pageYOffset || document.documentElement.scrollTop;

      let cursorX = event.clientX + pageXOffset;
      let cursorY = event.clientY + pageYOffset;
      let containerX = cursorX - marqueeContainer.offsetWidth / 2;
      let containerY = cursorY - marqueeContainer.offsetHeight / 2;

      gsap.to(marqueeContainer, {
        scale: 1,
        left: containerX + 25,
        top: containerY,
        //this is the duration of the "enlarging" animation into the marquee
        duration: 0.2,
        ease: "power3.out",
      });

      let hoveredMenuItem = event.target.closest(".menu-item");
      if (hoveredMenuItem) {
        let hoveredText = hoveredMenuItem.textContent.trim();
        //increase this and the one below it if the scrolling text ends or reverses to quickly
        let marqueeContent = (hoveredText + " ").repeat(24);
        marqueeText.innerHTML = marqueeContent.replace(/\s/g, "&nbsp;");
      }
    }
  });

  menuContainer.addEventListener("mouseleave", function () {
    isInsideMenuContainer = false;
    gsap.to(marqueeContainer, {
      scale: 0,
      //this is the duration of the "shrinking" animation out of the marquee"
      duration: 0.2,
      ease: "power3.out",
      onComplete: function () {
        marqueeContainer.style.display = "none";
      },
    });

    let marqueeContent = ("home" + " ").repeat(24);
    marqueeText.innerHTML = marqueeContent.replace(/\s/g, "&nbsp;");
  });
});