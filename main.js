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

// Shared functionality
import baffle from 'baffle';
import { gsap } from 'gsap';

// Menu functionality
function initMenu() {
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
          amount: 0.35,
        },
      },
      "<"
    ).reverse();
  }

  revealMenu();
}

// Marquee functionality
function initMarquee() {
  gsap.to(".marquee", {
    x: "-25%",
    duration: 10,
    ease: "none",
    repeat: -1,
    yoyo: true,
  });

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
        duration: 0.2,
        ease: "power3.out",
      });

      let hoveredMenuItem = event.target.closest(".menu-item");
      if (hoveredMenuItem) {
        let hoveredText = hoveredMenuItem.textContent.trim();
        let marqueeContent = (hoveredText + " ").repeat(24);
        marqueeText.innerHTML = marqueeContent.replace(/\s/g, "&nbsp;");
      }
    }
  });

  menuContainer.addEventListener("mouseleave", function () {
    isInsideMenuContainer = false;
    gsap.to(marqueeContainer, {
      scale: 0,
      duration: 0.2,
      ease: "power3.out",
      onComplete: function () {
        marqueeContainer.style.display = "none";
      },
    });

    let marqueeContent = ("home" + " ").repeat(24);
    marqueeText.innerHTML = marqueeContent.replace(/\s/g, "&nbsp;");
  });
}

// Page-specific functionality

// Home page
function initHomePage() {
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

    setTimeout(() => {
      if (currentIndex < messages.length) {
        displayNextMessage();
      } else {
        handleEndOfMessages();
      }
    }, currentMessage.duration);
  }

  function handleEndOfMessages() {
    console.log("all messages displayed");

    //make it so the text animates on the way out of existance
    const welcomeText = document.querySelector('.welcome-text');
    const timeToTextDissapear = 4000;
    const timeToBaffleBeforeDissapear = 3500;
    setTimeout(() => {
      baffleEffect.start();
    }, timeToBaffleBeforeDissapear);
    setTimeout(() => {
      welcomeText.style.display = 'none';
    }, timeToTextDissapear);

    const jokeTimeout = 120000; // 2 minute delay before joke
    setTimeout(() => {
      baffleEffect.start();
      welcomeText.style.display = 'inline-block';
      baffleEffect.text(() => "why are you still here?").reveal(1000);
    }, jokeTimeout);
  }

  window.addEventListener('modelLoaded', function() {
    const initialDelay = 4700; // 4.7 second delay before anything else happens after model is loaded
    setTimeout(function(){
      const welcomeText = document.querySelector('.welcome-text');
      welcomeText.style.display = 'inline-block';
      displayNextMessage();
    }, initialDelay);
  });

  let nametag = baffle('.nametag', {

    characters: '▒██ ▒▒>>█ >▒<█< ▓▒▒ ▓▒█$▒▓ ▒░/█ ▓▒#▒ ░▓▒▒ >/░▒',
    speed: 70,
  });

  nametag.start();
  setTimeout(() => {
    const welcomeText = document.querySelector('.nametag');
    welcomeText.style.display = 'inline-block';
  }, 60);

  window.addEventListener('modelLoaded', function() {
    nametag.reveal(5000, 2000);
  });
}

//new reveal
document.addEventListener('DOMContentLoaded', function() {
  const openCircle = document.getElementById('open-circle');
  const closeCircle = document.getElementById('close-circle');
  const controlsContainer = document.getElementById('controls-container');

  // Initial state: hide controls container
  gsap.set(controlsContainer, { y: '100%' });

  openCircle.addEventListener('click', () => {
    gsap.to(openCircle, { 
      y: 100, 
      opacity: 0, 
      duration: 0.5, 
      onComplete: () => {
        openCircle.style.display = 'none';
      }
    });
    gsap.to(controlsContainer, { 
      y: '0%', 
      duration: 0.5, 
      ease: 'power2.out'
    });
  });

  closeCircle.addEventListener('click', () => {
    gsap.to(controlsContainer, { 
      y: '100%', 
      duration: 0.5, 
      ease: 'power2.in',
      onComplete: () => {
        openCircle.style.display = 'block';
        gsap.to(openCircle, { y: 0, opacity: 1, duration: 0.5 });
      }
    });
  });

  // Hover effect for circles
  [openCircle, closeCircle].forEach(circle => {
    circle.addEventListener('mouseenter', () => {
      gsap.to(circle, { scale: 1.25, duration: 0.2 });
    });
    circle.addEventListener('mouseleave', () => {
      gsap.to(circle, { scale: 1, duration: 0.2 });
    });
  });

  // Debug: Log elements to ensure they're found
  console.log('Open Circle:', openCircle);
  console.log('Close Circle:', closeCircle);
  console.log('Controls Container:', controlsContainer);
});


// //im pretty sure this is reveal functionality:

// document.addEventListener('DOMContentLoaded', function() {
//   // Create a circle element
//   const circle = document.createElement('div');
//   circle.id = 'control-toggle';
//   circle.style.cssText = `
//     position: fixed;
//     bottom: 20px;
//     left: 20px;
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//     background-color: var(--accent);
//     cursor: pointer;
//     z-index: 2001;
//   `;
//   document.body.appendChild(circle);

//   // Get the controls container
//   const controlsContainer = document.querySelector('.controls-container');

//   // Initial animation to move controls out of view
//   gsap.to(controlsContainer, {
//     y: '155%',
//     duration: 0.5,
//     ease: 'power2.inOut'
//   });

//   // Variables to track hover state and animation
//   let isHovering = false;
//   let animation;

//   // Function to show controls
//   function showControls() {
//     if (animation) animation.kill();
//     animation = gsap.to(controlsContainer, {
//       y: '0%',
//       duration: 0.5,
//       ease: 'power2.out'
//     });
//   }

//   // Function to hide controls
//   function hideControls() {
//     if (animation) animation.kill();
//     animation = gsap.to(controlsContainer, {
//       y: '100%',
//       duration: 0.5,
//       ease: 'power2.in'
//     });
//   }

//   // Event listeners for circle
//   circle.addEventListener('mouseenter', () => {
//     isHovering = true;
//     showControls();
//   });

//   circle.addEventListener('mouseleave', () => {
//     isHovering = false;
//     setTimeout(() => {
//       if (!isHovering) hideControls();
//     }, 300); // Small delay to prevent immediate hiding
//   });

//   // Event listeners for controls container
//   controlsContainer.addEventListener('mouseenter', () => {
//     isHovering = true;
//   });

//   controlsContainer.addEventListener('mouseleave', () => {
//     isHovering = false;
//     setTimeout(() => {
//       if (!isHovering) hideControls();
//     }, 300);
//   });
// });


// Projects page
function initProjectsPage() {
  // Add any projects page specific functionality here
  console.log("Projects page initialized");
}

function initInfoPage() {
  //for some reason, baffle screwes up the text wall (links and stuff), so I have to store the original content and then restore it after the baffle effect
  const container = document.querySelector('.info-text-wall-container');
  let originalContent = '';

  function storeOriginalContent() {
    if (container) {
      originalContent = container.innerHTML;
    }
  }

  function applyBaffleAndRestore(duration = 2000, delay = 500) {
    if (!container) return;

    // Store original content
    storeOriginalContent();

    // Select elements for baffle effect
    const elements = container.querySelectorAll('h1, p, li');

    // Apply baffle effect
    const textWall = baffle(elements, {

      characters: '▒██ ▒▒>>█ >▒<█< ▓▒▒ ▓▒█$▒▓ ▒░/█ ▓▒#▒ ░▓▒▒ >/░▒',
      speed: 70,
    });

    textWall.start();
    textWall.reveal(duration, delay);

    // After the effect, restore the original content
    setTimeout(() => {
      container.innerHTML = originalContent;
    }, duration + delay + 250); // Add extra time to ensure effect is complete
  }

  // Run the effect
  applyBaffleAndRestore(2000, 500);

  console.log("Info page initialized");
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
  initMenu();
  initMarquee();
  //anything else you want to load regardless of what page you are on

  // Determine which page we're on and initialize accordingly ( I can probably do this a better way but this works for now lol)
  if (document.querySelector('.nametag')) {
    initHomePage();
  } else if (document.getElementById('projects-container')) {
    initProjectsPage();
  } else if (document.getElementById('info-text-wall-container')) {
    initInfoPage();
  } else {
    console.log("No specific page found");
  }
});