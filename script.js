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
   SCREEN 2 → SCREEN 3
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
       switch to the birthday scene (gives the unicorns
       a moment to turn around and start running first).
    */

    setTimeout(function () {

        /*
           Open the existing curtains.
        */

        body.classList.add("curtains-open");


        /*
           Reveal the existing birthday content.
        */

        birthdayScreen.classList.add("revealed");


        /*
           Release the existing balloons.
        */

        createBalloons();


        /*
           Launch the existing confetti.
        */

        setTimeout(function () {

            createConfetti();

        }, 300);


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