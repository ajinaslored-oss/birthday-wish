/* =========================================
   EXISTING ELEMENTS
========================================= */

const surpriseButton =
    document.getElementById("surpriseButton");

const birthdayScreen =
    document.getElementById("birthdayScreen");

const body =
    document.body;

const welcomeScreen =
    document.getElementById("welcomeScreen");

const confettiContainer =
    document.getElementById("confetti-container");

const photoFrame =
    document.getElementById("photoFrame");

const carouselImage =
    document.getElementById("carouselImage");

const prevArrow =
    document.getElementById("prevArrow");

const nextArrow =
    document.getElementById("nextArrow");


/* =========================================
   NEW UNICORN SCREEN ELEMENTS
========================================= */

const unicornScreen =
    document.getElementById("unicornScreen");

const seeSurpriseButton =
    document.getElementById("seeSurpriseButton");

const batContainer =
    document.getElementById("bat-container");


/* =========================================
   MEMORY LANE ELEMENTS
========================================= */

const memoryLaneScreen =
    document.getElementById("memoryLaneScreen");

const continueBirthdayButton =
    document.getElementById("continueBirthdayButton");

const memoryCards =
    document.querySelectorAll(".memory-card");


/* =========================================
   LIGHTS TOGGLE ELEMENTS
========================================= */

/*
   Change this one line any time you want the
   fireflies to spell out a different name.
*/
const BIRTHDAY_NAME = "Happy Birthday";

const nightToggle =
    document.getElementById("nightToggle");

const nightOverlay =
    document.getElementById("nightOverlay");

const starsLayer =
    document.getElementById("starsLayer");

const firefliesLayer =
    document.getElementById("firefliesLayer");


/* =========================================
   PHOTO CAROUSEL
========================================= */

const photos = [
    "her-photo1.jpg",
    "her-photo2.jpg",
    "her-photo3.jpg",
    "her-photo4.jpg"
];

let currentPhotoIndex = 0;


/* =========================================
   SCREEN 1 → SCREEN 2
========================================= */

surpriseButton.addEventListener("click", function () {

    /*
       Instead of opening the curtains immediately,
       the first button now takes us to the unicorn
       surprise screen.
    */

    welcomeScreen.style.opacity = "0";

    welcomeScreen.style.transform =
        "scale(1.05)";

    welcomeScreen.style.pointerEvents =
        "none";


    /*
       Show unicorn screen.
    */

    setTimeout(function () {

        unicornScreen.classList.add("active");

    }, 350);

});


/* =========================================
   SCREEN 2 → SCREEN 2.5 (MEMORY LANE)
   UNICORNS RUN INTO THE BACKGROUND
========================================= */

seeSurpriseButton.addEventListener("click", function () {

    /*
       Start unicorn depth-running animation.
    */

    unicornScreen.classList.add("running");


    /*
       Start bats immediately.

       They will fly across the screen while
       the unicorns disappear into the distance.
    */

    createBats();


    /*
       At EXACTLY 0.9 seconds:
       reveal the memory lane screen (gives the
       unicorns a moment to turn around and start
       running first).
    */

    setTimeout(function () {

        memoryLaneScreen.classList.add("active");

    }, 900);


    /*
       After the unicorns have fully run off
       (1.8s transition + buffer), hide the
       unicorn screen completely.
    */

    setTimeout(function () {

        unicornScreen.classList.remove("active");

    }, 2200);

});


/* =========================================
   MEMORY LANE — SCROLL-TRIGGERED CARDS
========================================= */

const memoryObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("in-view");

            memoryObserver.unobserve(entry.target);

        }

    });

}, {
    root: memoryLaneScreen,
    threshold: 0.25
});

memoryCards.forEach(function (card) {

    memoryObserver.observe(card);

});


/* =========================================
   SCREEN 2.5 → SCREEN 3
   MEMORY LANE INTO THE BIRTHDAY REVEAL
========================================= */

continueBirthdayButton.addEventListener("click", function () {

    /*
       Fade out the memory lane screen.
    */

    memoryLaneScreen.classList.remove("active");


    /*
       A second wave of bats for the big reveal.
    */

    createBats();


    /*
       Open the existing curtains and reveal
       the birthday content, same timing as before.
    */

    setTimeout(function () {

        body.classList.add("curtains-open");

        birthdayScreen.classList.add("revealed");

        createBalloons();


        setTimeout(function () {

            createConfetti();

        }, 300);


    }, 900);

});


/* =========================================
   CUTE BAT GENERATOR
========================================= */

function createBats() {

    /*
       Clear any previous bats.
    */

    batContainer.innerHTML = "";


    /*
       Show bat layer.
    */

    batContainer.classList.add("active");


    /*
       Lots of bats.
    */

    const batCount = 32;

    /*
       One random bat in the swarm will break off,
       swoop toward the viewer, then rejoin the group.
    */
    const specialIndex = Math.floor(Math.random() * batCount);


    for (let i = 0; i < batCount; i++) {

        const bat =
            document.createElement("div");


        bat.classList.add("bat");

        if (i === specialIndex) {
            bat.classList.add("bat-special");
        }


        /*
           Cute bat emoji.
        */

        bat.textContent = "🦇";


        /*
           Random vertical position.
        */

        const top =
            5 + Math.random() * 85;


        /*
           Random size.
        */

        const size =
            22 + Math.random() * 28;


        /*
           Random speed — slowed down so they feel
           like they're actually flying, not darting.
        */

        const duration =
            5 + Math.random() * 3;


        /*
           Slightly different starting delays
           create a natural swarm.
        */

        const delay =
            Math.random() * 0.6;


        bat.style.setProperty(
            "--top",
            top + "%"
        );


        bat.style.setProperty(
            "--size",
            size + "px"
        );


        bat.style.setProperty(
            "--duration",
            duration + "s"
        );


        bat.style.setProperty(
            "--delay",
            delay + "s"
        );


        batContainer.appendChild(bat);

    }


    /*
       Remove the bats after the transition
       (matches the new slower flight duration).
    */

    setTimeout(function () {

        batContainer.classList.remove("active");

        batContainer.innerHTML = "";

    }, 9000);

}


/* =========================================
   EXISTING CONFETTI
========================================= */

function createConfetti() {

    const pieces = 90;


    for (let i = 0; i < pieces; i++) {

        const confetti =
            document.createElement("div");


        confetti.classList.add("confetti");


        confetti.style.left =
            Math.random() * 100 + "%";


        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";


        confetti.style.transform =
            `rotate(${Math.random() * 360}deg)`;


        confettiContainer.appendChild(
            confetti
        );


        /*
           Remove after animation.
        */

        setTimeout(function () {

            confetti.remove();

        }, 4500);

    }

}


/* =========================================
   EXISTING BALLOONS
========================================= */

function createBalloons() {

    const balloonEmojis = [
        "🎈",
        "🎈",
        "🎈",
        "🎈"
    ];

    const count = 10;


    const balloonContainer =
        document.getElementById(
            "balloon-container"
        );


    for (let i = 0; i < count; i++) {

        const balloon =
            document.createElement("div");


        balloon.classList.add("balloon");


        balloon.textContent =
            balloonEmojis[
                Math.floor(
                    Math.random() *
                    balloonEmojis.length
                )
            ];


        balloon.style.left =
            Math.random() * 90 + "%";


        balloon.style.animationDelay =
            Math.random() * 1.5 + "s";


        balloon.style.fontSize =
            (40 + Math.random() * 30) + "px";


        /*
           Random color tint for variety.
        */

        const hue =
            Math.floor(
                Math.random() * 360
            );


        balloon.style.filter =
            `hue-rotate(${hue}deg) saturate(1.3)`;


        balloonContainer.appendChild(
            balloon
        );


        /*
           Remove after animation finishes.
        */

        setTimeout(function () {

            balloon.remove();

        }, 11000);

    }

}


/* =========================================
   PHOTO FRAME HEART BURST
========================================= */

photoFrame.addEventListener(
    "mouseenter",
    function () {

        const hearts = [
            "💕",
            "💖",
            "💗",
            "💓"
        ];

        const burstCount = 8;


        for (
            let i = 0;
            i < burstCount;
            i++
        ) {

            const heart =
                document.createElement("span");


            heart.classList.add(
                "love-burst"
            );


            heart.textContent =
                hearts[
                    Math.floor(
                        Math.random() *
                        hearts.length
                    )
                ];


            const angle =
                (i / burstCount) *
                2 *
                Math.PI;


            const distance =
                45 +
                Math.random() * 15;


            const tx =
                Math.cos(angle) *
                distance;


            const ty =
                Math.sin(angle) *
                distance;


            heart.style.setProperty(
                "--tx",
                tx + "px"
            );


            heart.style.setProperty(
                "--ty",
                ty + "px"
            );


            photoFrame.appendChild(
                heart
            );


            setTimeout(function () {

                heart.remove();

            }, 1000);

        }

    }
);


/* =========================================
   PHOTO CAROUSEL
========================================= */

function showPhoto(
    newIndex,
    direction
) {

    const outClass =
        direction === "left"
            ? "swipe-out-left"
            : "swipe-out-right";


    const inClass =
        direction === "left"
            ? "swipe-in-left"
            : "swipe-in-right";


    carouselImage.classList.remove(
        "swipe-in-left",
        "swipe-in-right"
    );


    carouselImage.classList.add(
        outClass
    );


    setTimeout(function () {

        carouselImage.src =
            photos[newIndex];


        carouselImage.classList.remove(
            outClass
        );


        carouselImage.classList.add(
            inClass
        );

    }, 480);

}


nextArrow.addEventListener(
    "click",
    function () {

        currentPhotoIndex =
            (currentPhotoIndex + 1) %
            photos.length;


        showPhoto(
            currentPhotoIndex,
            "left"
        );

    }
);


prevArrow.addEventListener(
    "click",
    function () {

        currentPhotoIndex =
            (
                currentPhotoIndex -
                1 +
                photos.length
            ) %
            photos.length;


        showPhoto(
            currentPhotoIndex,
            "right"
        );

    }
);


/* =========================================
   LIGHTS TOGGLE — NIGHT SKY
========================================= */

let isNightOn = false;
let fireflyTimeout = null;


/*
   Scatter a fixed field of stars once. They stay
   in the DOM and just fade in/out with the overlay.
*/
(function createStars() {

    const starCount = 70;

    const starSymbols = [
        "✦",
        "✧",
        "★",
        "·"
    ];


    for (let i = 0; i < starCount; i++) {

        const star =
            document.createElement("span");


        star.classList.add("star");


        star.textContent =
            starSymbols[
                Math.floor(
                    Math.random() *
                    starSymbols.length
                )
            ];


        star.style.left =
            Math.random() * 100 + "%";


        star.style.top =
            Math.random() * 70 + "%";


        star.style.fontSize =
            (8 + Math.random() * 14) + "px";


        star.style.animationDelay =
            (Math.random() * 2.6) + "s";


        star.style.setProperty(
            "--star-opacity",
            (0.5 + Math.random() * 0.5).toFixed(2)
        );


        starsLayer.appendChild(star);

    }

})();


/*
   Figure out which points on an invisible canvas
   spell out a given name, so we know where each
   firefly needs to land.
*/
function getNamePoints(name, areaWidth, areaHeight) {

    const canvas =
        document.createElement("canvas");

    canvas.width = areaWidth;
    canvas.height = areaHeight;

    const ctx = canvas.getContext("2d");

    const fontSize =
        Math.floor(areaHeight * 0.7);

    ctx.font =
        `700 ${fontSize}px "Comic Sans MS", "Comic Sans", cursive, sans-serif`;

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";

    ctx.fillText(
        name,
        areaWidth / 2,
        areaHeight / 2
    );

    const imageData =
        ctx.getImageData(0, 0, areaWidth, areaHeight).data;

    const points = [];

    /*
       Sampling density — smaller step means
       more fireflies and a crisper shape.
    */
    const step = 5;


    for (let y = 0; y < areaHeight; y += step) {

        for (let x = 0; x < areaWidth; x += step) {

            const alpha =
                imageData[
                    (y * areaWidth + x) * 4 + 3
                ];


            if (alpha > 128) {

                points.push({ x: x, y: y });

            }

        }

    }


    return points;

}


/*
   Fly fireflies in from all four corners of the
   viewport, then settle each one into place so
   together they spell out the name.
*/
function spawnFireflies(name) {

    firefliesLayer.innerHTML = "";

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const areaWidth =
        Math.min(viewportWidth * 0.85, 640);

    const areaHeight =
        Math.max(90, Math.min(viewportHeight * 0.22, 160));

    const offsetX =
        (viewportWidth - areaWidth) / 2;

    const offsetY =
        viewportHeight * 0.55;


    let points =
        getNamePoints(
            name,
            Math.floor(areaWidth),
            Math.floor(areaHeight)
        );


    /*
       Keep the firefly count reasonable so it
       stays smooth on phones.
    */
    const maxFireflies = 160;

    if (points.length > maxFireflies) {

        const skip =
            Math.ceil(points.length / maxFireflies);

        points =
            points.filter(function (point, index) {

                return index % skip === 0;

            });

    }


    const corners = [
        { x: -40, y: -40 },
        { x: viewportWidth + 40, y: -40 },
        { x: -40, y: viewportHeight + 40 },
        { x: viewportWidth + 40, y: viewportHeight + 40 }
    ];


    points.forEach(function (point, index) {

        const firefly =
            document.createElement("span");

        firefly.classList.add("firefly");


        const startCorner =
            corners[index % corners.length];

        firefly.style.left = startCorner.x + "px";
        firefly.style.top = startCorner.y + "px";


        const delay =
            Math.random() * 0.6;

        firefly.style.transitionDelay =
            delay + "s";


        firefliesLayer.appendChild(firefly);


        /*
           Force the browser to register the
           starting position before animating
           to the final one.
        */

        requestAnimationFrame(function () {

            requestAnimationFrame(function () {

                firefly.style.opacity = "1";

                firefly.style.left =
                    (offsetX + point.x) + "px";

                firefly.style.top =
                    (offsetY + point.y) + "px";

            });

        });

    });

}


nightToggle.addEventListener("click", function () {

    isNightOn = !isNightOn;

    nightOverlay.classList.toggle("active", isNightOn);
    nightToggle.classList.toggle("night-active", isNightOn);

    const toggleText =
        nightToggle.querySelector(".night-toggle-text");

    const toggleIcon =
        nightToggle.querySelector(".night-toggle-icon");


    if (isNightOn) {

        toggleText.textContent = "Turn on the lights";
        toggleIcon.textContent = "☀️";


        fireflyTimeout = setTimeout(function () {

            spawnFireflies(BIRTHDAY_NAME);

        }, 1000);

    } else {

        toggleText.textContent = "Turn off the lights";
        toggleIcon.textContent = "🌙";


        if (fireflyTimeout) {

            clearTimeout(fireflyTimeout);

        }


        firefliesLayer.innerHTML = "";

    }

});