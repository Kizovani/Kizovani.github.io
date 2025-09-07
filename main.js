// main.js - Vite-compatible approach
import './main.css';

// Import everything at the top level
import $ from 'jquery';
import 'jquery.terminal/css/jquery.terminal.min.css';
import { gsap } from 'gsap';

// Make jQuery globally available IMMEDIATELY
window.$ = window.jQuery = $;

// Direct script loading approach for jQuery Terminal
function loadJQueryTerminal() {
    return new Promise((resolve, reject) => {
        // Check if already loaded
        if (typeof $.fn.terminal !== 'undefined') {
            resolve();
            return;
        }

        // Create script element
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/jquery.terminal@2.x.x/js/jquery.terminal.min.js';
        script.onload = () => {
            console.log('jQuery Terminal loaded via CDN');
            resolve();
        };
        script.onerror = () => {
            reject(new Error('Failed to load jQuery Terminal'));
        };
        
        document.head.appendChild(script);
    });
}

// Initialize everything after terminal is loaded
async function initializeTerminal() {
    try {
        await loadJQueryTerminal();
        
        console.log('jQuery available:', typeof $ !== 'undefined');
        console.log('Terminal plugin available:', typeof $.fn.terminal !== 'undefined');
        
        if (typeof $.fn.terminal === 'undefined') {
            console.error('Terminal plugin still not available');
            return;
        }

        // Terminal commands
        const terminalCommands = {
            help: function() {
                this.echo('Available commands:\n' +
                         '[[;cyan;]help] - Show this help\n' +
                         '[[;cyan;]lighting] <0-360> - Set light rotation\n' +
                         '[[;cyan;]ambient] <on|off> - Toggle ambient light\n' +
                         '[[;cyan;]theme] <color1> <color2> - Set color theme\n' +
                         '[[;cyan;]clear] - Clear terminal\n' +
                         '[[;cyan;]exit] - Close terminal');
            },
            h: function() {
                this.exec('help');
            },
            lighting: function(value) {
                const slider = document.getElementById('light-rotation-slider');
                if (!slider) {
                    this.echo('[[;red;]Error: Light rotation slider not found]');
                    return;
                }
                
                if (value === undefined) {
                    this.echo('Current light rotation: [[;yellow;]' + slider.value + '°]');
                    return;
                }
                
                const val = parseInt(value);
                if (isNaN(val) || val < 0 || val > 360) {
                    this.echo('[[;red;]Error: Please provide a value between 0-360]');
                    return;
                }
                
                slider.value = val;
                slider.dispatchEvent(new Event('input'));
                this.echo('Light rotation set to [[;green;]' + val + '°]');
            },
            ambient: function(state) {
                const onButton = document.getElementById('ambient-light-on');
                const offButton = document.getElementById('ambient-light-off');
                
                if (!onButton || !offButton) {
                    this.echo('[[;red;]Error: Ambient light controls not found]');
                    return;
                }
                
                if (state === undefined) {
                    const isOn = onButton.checked;
                    this.echo('Ambient light is [[;yellow;]' + (isOn ? 'on' : 'off') + ']');
                    return;
                }
                
                if (state === 'on') {
                    onButton.checked = true;
                    onButton.dispatchEvent(new Event('change'));
                    this.echo('Ambient light [[;green;]turned on]');
                } else if (state === 'off') {
                    offButton.checked = true;
                    offButton.dispatchEvent(new Event('change'));
                    this.echo('Ambient light [[;yellow;]turned off]');
                } else {
                    this.echo('[[;red;]Error: Use "on" or "off"]');
                }
            },
            theme: function(color1, color2) {
                if (!color1 || !color2) {
                    this.echo('[[;red;]Error: Please provide two colors (e.g., theme #ff0000 #00ff00)]');
                    return;
                }
                
                const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
                if (!hexPattern.test(color1) || !hexPattern.test(color2)) {
                    this.echo('[[;red;]Error: Please use valid hex colors (e.g., #ff0000)]');
                    return;
                }
                
                document.documentElement.style.setProperty('--white', color1);
                document.documentElement.style.setProperty('--black', color2);
                this.echo('Theme updated with colors: [[;' + color1 + ';]' + color1 + '] and [[;' + color2 + ';]' + color2 + ']');
            },
            clear: function() {
                this.clear();
            },
            exit: function() {
                const terminalContainer = document.getElementById('terminal-container');
                const advancedModeOff = document.getElementById('advanced-mode-off');
                
                if (terminalContainer) {
                    terminalContainer.style.display = 'none';
                }
                if (advancedModeOff) {
                    advancedModeOff.checked = true;
                }
                
                this.echo('[[;green;]Terminal closed]');
            }
        };

        // Initialize the terminal
        const term = $('#terminal').terminal(terminalCommands, {
            greetings: `[[;#00ff00;]
 _  ___                             _ 
| |/ (_)                           (_)
| ' / _ ______ ___   ____ _ _ __  _ _ 
|  < | |_  / _ \\ \\ / / _\` | '_ \\| | |
| . \\| |/ / (_) \\ V / (_| | | | | | |
|_|\\_\\_/___\\___/ \\_/ \\__,_|_| |_|_|_|
]
[[;white;]Welcome to the Kizovani website dev console]
[[;gray;]Type "help" or "h" for available commands]`,
            prompt: '[[;#00ff00;]Kizovani@dev][[;white;]:~$ ]',
            height: '100%',
            width: '100%',
            checkArity: false,
            completion: Object.keys(terminalCommands),
            keymap: {
                'ESC': function() {
                    this.exec('exit');
                }
            }
        });

        // Terminal toggle functionality
        const advancedModeOn = document.getElementById('advanced-mode-on');
        const advancedModeOff = document.getElementById('advanced-mode-off');
        const terminalContainer = document.getElementById('terminal-container');

        if (advancedModeOn && terminalContainer) {
            advancedModeOn.addEventListener('change', function() {
                if (this.checked) {
                    terminalContainer.style.display = 'block';
                    term.focus();
                }
            });
        }

        if (advancedModeOff && terminalContainer) {
            advancedModeOff.addEventListener('change', function() {
                if (this.checked) {
                    terminalContainer.style.display = 'none';
                }
            });
        }

        console.log('Terminal initialized successfully');
        
    } catch (error) {
        console.error('Terminal initialization failed:', error);
    }
}

// Your existing functions
function initMenu() {
    const tl = gsap.timeline({ paused: true });

    function revealMenu() {
        revealMenuItems();
        const toggleBtn = document.getElementById("menu-toggle");
        const closeBtn = document.getElementById("close-menu");
        if (toggleBtn) {
            toggleBtn.onclick = function (e) {
                tl.reversed(!tl.reversed());
            };
        }
        if (closeBtn) {
            closeBtn.onclick = function (e) {
                tl.reversed(!tl.reversed());
            };
        }
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

    if (menuContainer && marqueeContainer && marqueeText) {
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
}

function initControlCircles() {
    const openCircle = document.getElementById('open-circle');
    const closeCircle = document.getElementById('close-circle');
    const controlsContainer = document.getElementById('controls-container');

    if (openCircle && closeCircle && controlsContainer) {
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

        [openCircle, closeCircle].forEach(circle => {
            circle.addEventListener('mouseenter', () => {
                gsap.to(circle, { scale: 1.25, duration: 0.2 });
            });
            circle.addEventListener('mouseleave', () => {
                gsap.to(circle, { scale: 1, duration: 0.2 });
            });
        });
    }
}

// Import baffle dynamically to avoid bundling issues
async function loadBaffle() {
    try {
        const baffleModule = await import('baffle');
        return baffleModule.default;
    } catch (error) {
        console.error('Failed to load baffle:', error);
        return null;
    }
}

async function initHomePage() {
    const baffle = await loadBaffle();
    if (!baffle) return;

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

        const welcomeText = document.querySelector('.welcome-text');
        const timeToTextDisappear = 4000;
        const timeToBaffleBeforeDisappear = 3500;
        setTimeout(() => {
            baffleEffect.start();
        }, timeToBaffleBeforeDisappear);
        setTimeout(() => {
            welcomeText.style.display = 'none';
        }, timeToTextDisappear);

        const jokeTimeout = 120000;
        setTimeout(() => {
            baffleEffect.start();
            welcomeText.style.display = 'inline-block';
            baffleEffect.text(() => "why are you still here?").reveal(1000);
        }, jokeTimeout);
    }

    window.addEventListener('modelLoaded', function() {
        const initialDelay = 4700;
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
        const nametagElement = document.querySelector('.nametag');
        nametagElement.style.display = 'inline-block';
    }, 60);

    window.addEventListener('modelLoaded', function() {
        nametag.reveal(5000, 2000);
    });
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...');
    
    // Initialize core functionality
    initMenu();
    initMarquee();
    initControlCircles();
    
    // Initialize terminal (async)
    initializeTerminal();
    
    // Page-specific initialization
    if (document.querySelector('.nametag')) {
        initHomePage();
    }
    
    console.log('Main initialization complete');
});