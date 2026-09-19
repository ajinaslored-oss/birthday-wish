/* =========================================
   BIRTHDAY NAME
   Change this one line any time — it drives
   both the unicorn greeting bubble and the
   firefly name formation on the night screen.
========================================= */

const BIRTHDAY_NAME = "Anuey";


/* =========================================
   ELEMENTS
========================================= */

const surpriseButton = document.getElementById("surpriseButton");
const birthdayScreen = document.getElementById("birthdayScreen");
const body = document.body;
const welcomeScreen = document.getElementById("welcomeScreen");
const confettiContainer = document.getElementById("confetti-container");
const photoFrame = document.getElementById("photoFrame");
const carouselImage = document.getElementById("carouselImage");
const prevArrow = document.getElementById("prevArrow");
const nextArrow = document.getElementById("nextArrow");

const unicornScreen = document.getElementById("unicornScreen");
const seeSurpriseButton = document.getElementById("seeSurpriseButton");
const batContainer = document.getElementById("bat-container");
const unicornSharedBubble = document.getElementById("unicornSharedBubble");

if (unicornSharedBubble) {
    unicornSharedBubble.innerHTML =
        `Hello ${BIRTHDAY_NAME}! <span class="wave-emoji">👋</span>`;
}

const flowerScreen = document.getElementById("flowerScreen");
const flowerField = document.getElementById("flowerField");
const seeWhatsNextButton = document.getElementById("seeWhatsNextButton");

const nightToggle = document.getElementById("nightToggle");
const nightOverlay = document.getElementById("nightOverlay");
const starsLayer = document.getElementById("starsLayer");
const firefliesLayer = document.getElementById("firefliesLayer");


/* =========================================
   PHOTO CAROUSEL DATA
========================================= */

const photos = [
    "her-photo1.jpg",
    "her-photo2.jpg",
    "her-photo3.jpg",
    "her-photo4.jpg"
];

let currentPhotoIndex = 0;


/* =========================================
   SCREEN 1 → SCREEN 2 (UNICORNS)
========================================= */

surpriseButton.addEventListener("click", function () {

    welcomeScreen.style.opacity = "0";
    welcomeScreen.style.transform = "scale(1.05)";
    welcomeScreen.style.pointerEvents = "none";

    setTimeout(function () {
        unicornScreen.classList.add("active");
    }, 350);

});


/* =========================================
   SCREEN 2 → SCREEN 2.5 (FLOWER GARDEN)
   Clouds roll in, cover the screen, and clear
   to reveal the garden. No bats here.
========================================= */

seeSurpriseButton.addEventListener("click", function () {

    unicornScreen.classList.add("running");

    createClouds();

    /* Swap the scene while the clouds fully cover the screen */
    setTimeout(function () {
        flowerScreen.classList.add("active");
    }, 800);

    setTimeout(function () {
        unicornScreen.classList.remove("active");
    }, 1000);

    /* Start growing the flower as the clouds begin to clear,
       so the growth is actually visible */
    setTimeout(function () {
        createFlowerBouquet();
    }, 1100);

});


/* =========================================
   CLOUD COVER TRANSITION
========================================= */

function createClouds() {

    const cloudContainer = document.getElementById("cloud-transition");
    cloudContainer.innerHTML = "";

    const cols = 4;
    const rows = 4;
    const cellWidth = 100 / cols;
    const cellHeight = 100 / rows;

    for (let row = 0; row < rows; row++) {

        for (let col = 0; col < cols; col++) {

            const cloud = document.createElement("div");
            cloud.classList.add("cloud-piece");

            const jitterX = (Math.random() - 0.5) * cellWidth * 0.6;
            const jitterY = (Math.random() - 0.5) * cellHeight * 0.6;

            cloud.style.left = (col * cellWidth + cellWidth / 2 - 21 + jitterX) + "%";
            cloud.style.top = (row * cellHeight + cellHeight / 2 - 21 + jitterY) + "%";

            const angle = Math.random() * Math.PI * 2;
            const enterDistance = 60;
            const exitDistance = 90;

            cloud.style.setProperty("--sx", Math.cos(angle) * enterDistance + "vw");
            cloud.style.setProperty("--sy", Math.sin(angle) * enterDistance + "vh");
            cloud.style.setProperty("--ex", Math.cos(angle) * exitDistance + "vw");
            cloud.style.setProperty("--ey", Math.sin(angle) * exitDistance + "vh");

            cloud.style.animationDuration = (2.1 + Math.random() * 0.4) + "s";
            cloud.style.animationDelay = (Math.random() * 0.25) + "s";

            cloudContainer.appendChild(cloud);

        }

    }

    setTimeout(function () {
        cloudContainer.innerHTML = "";
    }, 3200);

}


/* =========================================
   THE FLOWER
========================================= */

function createFlowerBouquet() {

    flowerField.innerHTML = `
        <div class="flower-anchor">
            <div class="flower-sway">
                ${buildBouquetSVG()}
            </div>
        </div>
    `;

}


/*
   A group that starts at scale 0 and grows to full
   size from its own local origin (0,0).
   NOTE: keySplines values must stay within 0–1,
   otherwise browsers discard the animation and the
   shape stays invisible.
*/
function growGroup(innerMarkup, delay, duration) {

    return `
        <g class="grow-group" style="opacity:1" transform="scale(0)">
            <animateTransform
                attributeName="transform"
                type="scale"
                from="0"
                to="1"
                begin="${delay}s"
                dur="${duration}s"
                fill="freeze"
                calcMode="spline"
                keyTimes="0;1"
                keySplines="0.22 1 0.36 1"
            />
            ${innerMarkup}
        </g>
    `;

}


/*
   A gentle back-and-forth rotation around the local
   origin (0,0) — gives each part its own breeze on top
   of the whole-bouquet sway.
*/
function breeze(innerMarkup, angle, dur, begin) {

    return `
        <g>
            <animateTransform
                attributeName="transform"
                type="rotate"
                values="${-angle} 0 0; ${angle} 0 0; ${-angle} 0 0"
                keyTimes="0; 0.5; 1"
                dur="${dur}s"
                begin="${begin}s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.45 0 0.55 1; 0.45 0 0.55 1"
            />
            ${innerMarkup}
        </g>
    `;

}


function buildBouquetSVG() {

    /* Big poppy-style bloom */
    let poppyPetals = "";

    for (let i = 0; i < 6; i++) {

        poppyPetals += `
            <g transform="rotate(${i * 60})">
                <ellipse cx="0" cy="-52" rx="40" ry="66" fill="#e8712c"/>
                <ellipse cx="0" cy="-58" rx="26" ry="46" fill="#d8531f" opacity="0.55"/>
            </g>
        `;

    }

    const poppyHead = growGroup(`
        <g>
            ${poppyPetals}
            <circle r="20" fill="#7a2e18"/>
            <circle cx="0" cy="-6" r="9" fill="#4a190d"/>
        </g>
    `, 1.9, 0.9);


    function daisy(scale) {

        let petals = "";

        for (let i = 0; i < 7; i++) {

            petals += `<ellipse cx="0" cy="-16" rx="6" ry="14" fill="#fffdf6" stroke="#f0e6cf" stroke-width="0.6" transform="rotate(${i * (360 / 7)})"/>`;

        }

        return `
            <g transform="scale(${scale})">
                ${petals}
                <circle r="7" fill="#ffcf4d" stroke="#e8b73f" stroke-width="1"/>
            </g>
        `;

    }


    /* Leaf blades: base sits at (0,0) so they grow up from the ground */
    const leafA = '<path d="M0,0 C-24,-140 -34,-280 -14,-430 C-6,-490 4,-550 12,-600 C22,-550 34,-490 40,-430 C56,-280 44,-140 0,0 Z" fill="#4f8c3d"/>';
    const leafB = '<path d="M0,0 C-20,-150 -28,-300 -10,-460 C-2,-530 4,-590 8,-640 C16,-590 26,-530 32,-460 C48,-300 36,-150 0,0 Z" fill="#356b2c"/>';
    const leafC = '<path d="M0,0 C-22,-130 -30,-270 -12,-410 C-4,-470 4,-530 10,-580 C20,-530 30,-470 36,-410 C52,-270 42,-130 0,0 Z" fill="#5f9e46"/>';


    return `
        <svg class="flower-svg" viewBox="0 0 320 700" preserveAspectRatio="xMidYMax meet" xmlns="http://www.w3.org/2000/svg">

            <!-- blade leaves -->
            <g transform="translate(112,700) rotate(-9) scale(0.92)">
                ${breeze(growGroup(leafA, 0.15, 1.1), 2.2, 3.4, 1.4)}
            </g>

            <g transform="translate(160,700) scale(1.02)">
                ${breeze(growGroup(leafB, 0.3, 1.1), 1.8, 3.9, 1.5)}
            </g>

            <g transform="translate(206,700) rotate(10) scale(0.86)">
                ${breeze(growGroup(leafC, 0.45, 1.1), 2.6, 3.1, 1.6)}
            </g>

            <!-- main stem -->
            <path class="stem-line" stroke="#3c7a34" stroke-width="6" pathLength="1"
                d="M162,680 C150,540 168,420 156,300 C150,225 162,150 158,80"
                style="animation-duration:1.7s; animation-delay:0.2s;"/>

            <!-- bud branch -->
            <path class="stem-line" stroke="#3c7a34" stroke-width="4" pathLength="1"
                d="M159,540 C188,528 210,508 222,480"
                style="animation-duration:0.6s; animation-delay:0.55s;"/>

            <g transform="translate(226,470) rotate(28)">
                ${breeze(growGroup('<ellipse cx="0" cy="0" rx="10" ry="18" fill="#e8899e"/><path d="M0,-18 C6,-10 6,10 0,18 C-6,10 -6,-10 0,-18 Z" fill="#3c7a34" opacity="0.5"/>', 1.15, 0.6), 4, 2.8, 2)}
            </g>

            <!-- daisy A -->
            <path class="stem-line" stroke="#3c7a34" stroke-width="4" pathLength="1"
                d="M158,430 C118,412 86,384 64,344"
                style="animation-duration:0.8s; animation-delay:0.9s;"/>

            <g transform="translate(60,336)">
                ${breeze(growGroup(daisy(1), 1.65, 0.6), 5, 2.6, 2.3)}
            </g>

            <!-- daisy B -->
            <path class="stem-line" stroke="#3c7a34" stroke-width="4" pathLength="1"
                d="M156,300 C192,282 218,252 234,214"
                style="animation-duration:0.75s; animation-delay:1.25s;"/>

            <g transform="translate(238,206)">
                ${breeze(growGroup(daisy(1.1), 1.95, 0.6), 5, 3, 2.6)}
            </g>

            <!-- daisy C -->
            <path class="stem-line" stroke="#3c7a34" stroke-width="4" pathLength="1"
                d="M158,180 C128,164 104,142 90,116"
                style="animation-duration:0.65s; animation-delay:1.55s;"/>

            <g transform="translate(86,108)">
                ${breeze(growGroup(daisy(0.85), 2.15, 0.55), 6, 2.4, 2.8)}
            </g>

            <!-- big bloom -->
            <g transform="translate(158,78)">
                ${breeze(poppyHead, 3, 3.6, 3)}
            </g>

        </svg>
    `;

}


/* =========================================
   SCREEN 2.5 → SCREEN 3 (BIRTHDAY)
   Bats fly across, the garden fades out, the
   curtains open, and the birthday screen appears.
========================================= */

seeWhatsNextButton.addEventListener("click", function () {

    seeWhatsNextButton.disabled = true;

    createBats();

    /* Fade the garden out while the bats are crossing */
    setTimeout(function () {
        flowerScreen.classList.remove("active");
    }, 1500);

    /* Open the curtains and reveal the message */
    setTimeout(function () {

        body.classList.add("curtains-open");
        birthdayScreen.classList.add("revealed");

        createConfetti();
        createBalloons();

    }, 2200);

});


/* =========================================
   CUTE BAT GENERATOR
   (only used for the flower → birthday transition)
========================================= */

function createBats() {

    batContainer.innerHTML = "";
    batContainer.classList.add("active");

    const batCount = 32;
    const specialIndex = Math.floor(Math.random() * batCount);

    for (let i = 0; i < batCount; i++) {

        const bat = document.createElement("div");
        bat.classList.add("bat");

        if (i === specialIndex) {
            bat.classList.add("bat-special");
        }

        bat.textContent = "🦇";

        bat.style.setProperty("--top", (5 + Math.random() * 85) + "%");
        bat.style.setProperty("--size", (22 + Math.random() * 28) + "px");
        bat.style.setProperty("--duration", (5 + Math.random() * 3) + "s");
        bat.style.setProperty("--delay", (Math.random() * 0.6) + "s");

        batContainer.appendChild(bat);

    }

    setTimeout(function () {
        batContainer.classList.remove("active");
        batContainer.innerHTML = "";
    }, 9000);

}


/* =========================================
   CONFETTI
========================================= */

function createConfetti() {

    const pieces = 90;
    const colors = ["#e85d75", "#ffb26b", "#ffe66d", "#8ce99a", "#66d9e8", "#a78bfa", "#ff9ecb"];

    for (let i = 0; i < pieces; i++) {

        const confetti = document.createElement("div");
        confetti.classList.add("confetti");

        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.animationDelay = Math.random() * 1.5 + "s";
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

        confettiContainer.appendChild(confetti);

        setTimeout(function () {
            confetti.remove();
        }, 4500);

    }

}


/* =========================================
   BALLOONS
========================================= */

function createBalloons() {

    const count = 10;
    const balloonContainer = document.getElementById("balloon-container");

    for (let i = 0; i < count; i++) {

        const balloon = document.createElement("div");
        balloon.classList.add("balloon");
        balloon.textContent = "🎈";

        balloon.style.left = Math.random() * 90 + "%";
        balloon.style.animationDelay = Math.random() * 1.5 + "s";
        balloon.style.fontSize = (40 + Math.random() * 30) + "px";

        const hue = Math.floor(Math.random() * 360);
        balloon.style.filter = `hue-rotate(${hue}deg) saturate(1.3)`;

        balloonContainer.appendChild(balloon);

        setTimeout(function () {
            balloon.remove();
        }, 11000);

    }

}


/* =========================================
   PHOTO FRAME HEART BURST
========================================= */

photoFrame.addEventListener("mouseenter", function () {

    const hearts = ["💕", "💖", "💗", "💓"];
    const burstCount = 8;

    for (let i = 0; i < burstCount; i++) {

        const heart = document.createElement("span");
        heart.classList.add("love-burst");
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const angle = (i / burstCount) * 2 * Math.PI;
        const distance = 45 + Math.random() * 15;

        heart.style.setProperty("--tx", Math.cos(angle) * distance + "px");
        heart.style.setProperty("--ty", Math.sin(angle) * distance + "px");

        photoFrame.appendChild(heart);

        setTimeout(function () {
            heart.remove();
        }, 1000);

    }

});


/* =========================================
   PHOTO CAROUSEL
========================================= */

function showPhoto(newIndex, direction) {

    const outClass = direction === "left" ? "swipe-out-left" : "swipe-out-right";
    const inClass = direction === "left" ? "swipe-in-left" : "swipe-in-right";

    carouselImage.classList.remove("swipe-in-left", "swipe-in-right");
    carouselImage.classList.add(outClass);

    setTimeout(function () {

        carouselImage.src = photos[newIndex];
        carouselImage.classList.remove(outClass);
        carouselImage.classList.add(inClass);

    }, 480);

}

nextArrow.addEventListener("click", function () {

    currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
    showPhoto(currentPhotoIndex, "left");

});

prevArrow.addEventListener("click", function () {

    currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
    showPhoto(currentPhotoIndex, "right");

});


/* =========================================
   LIGHTS TOGGLE — NIGHT SKY
========================================= */

let isNightOn = false;
let fireflyTimeout = null;

(function createStars() {

    const starCount = 70;
    const starSymbols = ["✦", "✧", "★", "·"];

    for (let i = 0; i < starCount; i++) {

        const star = document.createElement("span");
        star.classList.add("star");

        star.textContent = starSymbols[Math.floor(Math.random() * starSymbols.length)];
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 70 + "%";
        star.style.fontSize = (8 + Math.random() * 14) + "px";
        star.style.animationDelay = (Math.random() * 2.6) + "s";
        star.style.setProperty("--star-opacity", (0.5 + Math.random() * 0.5).toFixed(2));

        starsLayer.appendChild(star);

    }

})();


/*
   Sample points that spell out the name, using an
   even grid so letter density stays uniform.
*/
function getNamePoints(name, areaWidth, areaHeight, targetCount) {

    const scale = 6;

    const canvas = document.createElement("canvas");
    canvas.width = areaWidth * scale;
    canvas.height = areaHeight * scale;

    const ctx = canvas.getContext("2d");
    ctx.scale(scale, scale);

    let fontSize = Math.floor(areaHeight * 0.86);
    const fontStack = '"Arial Black", "Arial Bold", Arial, sans-serif';

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#ffffff";

    if ("letterSpacing" in ctx) {
        ctx.letterSpacing = Math.max(2, Math.round(fontSize * 0.03)) + "px";
    }

    ctx.font = `900 ${fontSize}px ${fontStack}`;

    const maxTextWidth = areaWidth * 0.9;
    const measuredWidth = ctx.measureText(name).width;

    if (measuredWidth > maxTextWidth) {

        fontSize = Math.floor(fontSize * (maxTextWidth / measuredWidth));
        ctx.font = `900 ${fontSize}px ${fontStack}`;

        if ("letterSpacing" in ctx) {
            ctx.letterSpacing = Math.max(2, Math.round(fontSize * 0.03)) + "px";
        }

    }

    ctx.fillText(name, areaWidth / 2, areaHeight / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

    const estimatedFillRatio = 0.18;

    const displaySpacing = Math.max(
        2,
        Math.sqrt((areaWidth * areaHeight * estimatedFillRatio) / Math.max(targetCount, 20))
    );

    const step = Math.max(2, Math.round(displaySpacing * scale));
    const alphaThreshold = 120;
    const points = [];

    for (let y = 0; y < canvas.height; y += step) {

        for (let x = 0; x < canvas.width; x += step) {

            const alpha = imageData[(y * canvas.width + x) * 4 + 3];

            if (alpha > alphaThreshold) {
                points.push({ x: x / scale, y: y / scale });
            }

        }

    }

    if (points.length > targetCount * 1.6) {

        const keepEvery = Math.ceil(points.length / (targetCount * 1.4));

        return points.filter(function (_, index) {
            return index % keepEvery === 0;
        });

    }

    return points;

}


/*
   Fireflies fly in from the four corners and settle
   into the shape of the name.
*/
function spawnFireflies(name) {

    firefliesLayer.innerHTML = "";

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const areaWidth = Math.min(viewportWidth * 0.88, 760);
    const areaHeight = Math.max(110, Math.min(viewportHeight * 0.26, 190));

    const offsetX = (viewportWidth - areaWidth) / 2;
    const offsetY = viewportHeight * 0.52;

    const points = getNamePoints(
        name,
        Math.floor(areaWidth),
        Math.floor(areaHeight),
        340
    );

    const corners = [
        { x: -40, y: -40 },
        { x: viewportWidth + 40, y: -40 },
        { x: -40, y: viewportHeight + 40 },
        { x: viewportWidth + 40, y: viewportHeight + 40 }
    ];

    points.forEach(function (point, index) {

        const firefly = document.createElement("span");
        firefly.classList.add("firefly");

        const startCorner = corners[index % corners.length];

        firefly.style.transform =
            `translate3d(${startCorner.x}px, ${startCorner.y}px, 0)`;

        firefly.style.transitionDelay = (Math.random() * 0.6) + "s";

        firefliesLayer.appendChild(firefly);

        requestAnimationFrame(function () {

            requestAnimationFrame(function () {

                firefly.style.opacity = "1";
                firefly.style.transform =
                    `translate3d(${offsetX + point.x}px, ${offsetY + point.y}px, 0)`;

            });

        });

    });

}


nightToggle.addEventListener("click", function () {

    isNightOn = !isNightOn;

    nightOverlay.classList.toggle("active", isNightOn);
    nightToggle.classList.toggle("night-active", isNightOn);

    const toggleText = nightToggle.querySelector(".night-toggle-text");
    const toggleIcon = nightToggle.querySelector(".night-toggle-icon");

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


/* =========================================
   WELCOME SCREEN — DOODLES + CURSOR MAGIC
========================================= */

(function initWelcomeMagic() {

    const screenEl = document.getElementById("welcomeScreen");
    const decorLayer = document.getElementById("welcomeDecor");
    const giftWrap = document.getElementById("giftWrap");
    const giftTilt = document.getElementById("giftTilt");
    const glow = document.getElementById("cursorGlow");

    if (!decorLayer) return;


    /* ---------- hand-drawn doodle shapes ---------- */

    const DOODLES = {

        star: (c) => `<svg viewBox="0 0 64 64"><path d="M32 5 L40 24 L60 26 L45 40 L49 60 L32 49 L15 60 L19 40 L4 26 L24 24 Z" fill="${c}"/></svg>`,

        heart: (c) => `<svg viewBox="0 0 64 64"><path d="M32 56 C10 40 6 26 14 16 C22 8 30 14 32 22 C34 14 42 8 50 16 C58 26 54 40 32 56 Z" fill="${c}"/></svg>`,

        sparkle: (c) => `<svg viewBox="0 0 64 64"><path d="M32 4 C34 22 42 30 60 32 C42 34 34 42 32 60 C30 42 22 34 4 32 C22 30 30 22 32 4 Z" fill="${c}"/></svg>`,

        flower: (c) => `<svg viewBox="0 0 64 64"><g fill="${c}"><circle cx="32" cy="14" r="11"/><circle cx="50" cy="27" r="11"/><circle cx="43" cy="48" r="11"/><circle cx="21" cy="48" r="11"/><circle cx="14" cy="27" r="11"/></g><circle cx="32" cy="32" r="9" fill="#ffd25e"/></svg>`,

        cloud: (c) => `<svg viewBox="0 0 64 48"><path d="M16 44 C3 44 3 28 16 28 C16 14 34 10 40 22 C52 18 62 32 50 42 C48 44 46 44 44 44 Z" fill="${c}"/></svg>`,

        butterfly: (c) => `<svg viewBox="0 0 64 64"><path d="M32 30 C20 6 2 10 8 30 C10 40 24 40 32 34 Z" fill="${c}"/><path d="M32 30 C44 6 62 10 56 30 C54 40 40 40 32 34 Z" fill="${c}"/><path d="M32 34 C22 40 10 46 16 56 C22 62 30 48 32 40 Z" fill="#fff3f8"/><path d="M32 34 C42 40 54 46 48 56 C42 62 34 48 32 40 Z" fill="#fff3f8"/><path d="M32 22 L32 46" style="stroke-width:4"/><path d="M32 22 C28 12 24 10 22 8 M32 22 C36 12 40 10 42 8" fill="none"/></svg>`,

        balloon: (c) => `<svg viewBox="0 0 64 96"><path d="M32 4 C10 4 6 30 16 44 C22 52 28 56 32 58 C36 56 42 52 48 44 C58 30 54 4 32 4 Z" fill="${c}"/><path d="M28 60 L32 66 L36 60 Z" fill="${c}"/><path d="M32 66 C26 76 38 84 30 94" fill="none"/><path d="M20 22 C20 15 24 12 27 12" fill="none" style="stroke:#fff;stroke-width:3.5"/></svg>`,

        squiggle: (c) => `<svg viewBox="0 0 100 40"><path d="M4 22 C14 2 24 42 34 22 S54 2 64 22 S84 42 96 20" fill="none" style="stroke:${c};stroke-width:5"/></svg>`

    };


    /* ---------- where everything goes ----------
       [kind, left%, top%, size(px), parallax depth,
        animation, duration(s), delay(s), rotation(deg), extra, extra2]
    */

    const ITEMS = [

        /* left side */
        ["star",      5,  9, 58, .04, "spin",    20, 0,   -10, "#ffe28a"],
        ["emoji",    12, 13, 44, .06, "float",    5, .2,  -10, "🎀"],
        ["heart",    16, 24, 46, .06, "pulse",  2.6, .3,  -12, "#ff8fab"],
        ["sparkle",  22,  7, 40, .07, "twinkle",  3, .5,    0, "#fff3b0"],
        ["emoji",    27, 19, 34, .07, "twinkle",  3, 0,     0, "✨"],
        ["balloon",   2, 24, 62, .06, "float",    6, 1,    -8, "#8fd3ff"],
        ["emoji",     7, 37, 40, .06, "sway",     5, .2,  -10, "🌸"],
        ["flower",    3, 44, 88, .03, "sway",     5, 0,     0, "#ffd1e3"],
        ["polaroid", 18, 52, 96, .05, "float",    7, .3,   -7, "🌸", "us ♡"],
        ["emoji",     4, 60, 46, .05, "sway",     6, .5,   -8, "🍓"],
        ["cloud",    10, 72,120, .02, "drift",    9, 0,     0, "#dff1ff"],
        ["emoji",    17, 79, 46, .05, "float",  5.5, 1,    -6, "🍰"],
        ["butterfly", 7, 88, 72, .08, "flutter",  7, 1,   -10, "#c9b6ff"],
        ["squiggle", 24, 86, 90, .05, "float",    6, .8,   12, "#ff8fab"],
        ["emoji",     3, 91, 38, .05, "float",    5, .6,    8, "🍒"],

        /* top + bottom middle */
        ["heart",    38,  3, 34, .05, "float",    5, 1.2,  10, "#ffb3c7"],
        ["star",     33, 93, 30, .06, "twinkle",3.4, .2,    0, "#ffd1e3"],
        ["star",     62,  4, 30, .05, "spin",    16, 0,     0, "#c9b6ff"],
        ["sparkle",  60, 92, 34, .06, "twinkle",  3, 1,     0, "#fff3b0"],
        ["heart",    70, 91, 38, .05, "pulse",  2.4, .5,   -8, "#ff8fab"],

        /* right side */
        ["squiggle", 70,  9, 96, .05, "float",    7, .4,   -8, "#ff8fab"],
        ["emoji",    70, 19, 38, .06, "float",    6, .7,   10, "🦋"],
        ["sparkle",  79,  5, 44, .07, "twinkle",3.2, 0,     0, "#fff3b0"],
        ["star",     94,  4, 52, .04, "spin",    22, 0,    12, "#ffb3c7"],
        ["emoji",    89, 13, 38, .07, "twinkle",  3, .3,    0, "🌸"],
        ["heart",    83, 24, 44, .06, "pulse",  2.8, .9,   12, "#c9b6ff"],
        ["emoji",    90, 33, 42, .06, "float",    5, .5,   10, "💌"],
        ["flower",   92, 42, 80, .03, "sway",   5.5, .6,    0, "#fff0a8"],
        ["polaroid", 77, 50, 92, .05, "float",  7.5, 1,     6, "🍓", "forever ✿"],
        ["emoji",    89, 58, 52, .05, "float",    6, .9,    8, "🧸"],
        ["butterfly",68, 68, 64, .08, "flutter",  8, .3,   10, "#ffb3c7"],
        ["cloud",    86, 72,130, .02, "drift",   10, 1,     0, "#f1e8ff"],
        ["emoji",    76, 80, 36, .06, "twinkle",3.4, 1.1,   0, "💖"],
        ["balloon",  90, 80, 70, .06, "float",    5, .2,    8, "#ff8fab"],
        ["emoji",    90, 90, 42, .05, "float",    5, .4,    8, "🧁"]

    ];


    /* ---------- build the doodles ---------- */

    const parallaxNodes = [];

    ITEMS.forEach(function (item, index) {

        const kind = item[0];
        const x = item[1];
        const y = item[2];
        const size = item[3];
        const depth = item[4];
        const anim = item[5];
        const dur = item[6];
        const delay = item[7];
        const rot = item[8];
        const a = item[9];
        const b = item[10];

        const el = document.createElement("div");
        el.className = "decor";

        if (kind === "emoji") el.classList.add("sticker");
        if (index % 3 === 2 || kind === "polaroid") el.classList.add("hide-sm");

        el.style.left = x + "%";
        el.style.top = y + "%";
        el.style.setProperty("--size", size + "px");

        const inner = document.createElement("div");
        inner.className = "decor-inner a-" + anim;
        inner.style.setProperty("--rot", rot + "deg");
        inner.style.animationDuration = dur + "s";
        inner.style.animationDelay = delay + "s";

        if (kind === "emoji") {

            inner.textContent = a;

        } else if (kind === "polaroid") {

            inner.innerHTML =
                `<div class="polaroid"><div class="pol-pic">${a}</div><span>${b}</span></div>`;

        } else {

            inner.innerHTML =
                `<div class="doodle">${DOODLES[kind](a)}</div>`;

        }

        el.appendChild(inner);
        decorLayer.appendChild(el);

        parallaxNodes.push({ el: el, depth: depth });

    });


    /* tiny floating bubbles */

    const dotColors = ["#ffb3c7", "#c9b6ff", "#ffe28a", "#8fd3ff", "#ff8fab"];

    for (let i = 0; i < 18; i++) {

        const dot = document.createElement("span");
        dot.className = "dot";

        const s = 4 + Math.random() * 7;

        dot.style.width = s + "px";
        dot.style.height = s + "px";
        dot.style.left = Math.random() * 100 + "%";
        dot.style.top = Math.random() * 100 + "%";
        dot.style.background = dotColors[i % dotColors.length];
        dot.style.setProperty("--dur", (3 + Math.random() * 4) + "s");
        dot.style.setProperty("--delay", (Math.random() * 3) + "s");

        decorLayer.appendChild(dot);

    }


    /* ---------- cursor interaction ---------- */

    let mx = 0, my = 0;      // target, -0.5 .. 0.5
    let cx = 0, cy = 0;      // smoothed
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let gx = tx, gy = ty;    // glow position
    let lastTrail = 0;

    const trailChars = ["✦", "♥", "✧", "♡", "✿"];
    const trailColors = ["#ff8fab", "#c9b6ff", "#ffb347", "#ffb3c7", "#8fd3ff"];

    function isGone() {
        return screenEl.style.opacity === "0";
    }

    function spawnTrail(x, y) {

        const s = document.createElement("span");
        s.className = "trail";
        s.textContent = trailChars[Math.floor(Math.random() * trailChars.length)];
        s.style.left = x + "px";
        s.style.top = y + "px";
        s.style.color = trailColors[Math.floor(Math.random() * trailColors.length)];
        s.style.fontSize = (10 + Math.random() * 12) + "px";
        s.style.setProperty("--dx", ((Math.random() - 0.5) * 40) + "px");

        decorLayer.appendChild(s);

        setTimeout(function () { s.remove(); }, 1000);

    }

    function onMove(x, y) {

        if (isGone()) return;

        tx = x;
        ty = y;

        mx = x / window.innerWidth - 0.5;
        my = y / window.innerHeight - 0.5;

        glow.style.opacity = "1";

        const now = performance.now();

        if (now - lastTrail > 45) {
            lastTrail = now;
            spawnTrail(x, y);
        }

    }

    window.addEventListener("mousemove", function (e) {
        onMove(e.clientX, e.clientY);
    });

    window.addEventListener("touchmove", function (e) {
        const t = e.touches[0];
        onMove(t.clientX, t.clientY);
    }, { passive: true });

    /* little burst wherever you click / tap */
    window.addEventListener("pointerdown", function (e) {

        if (isGone()) return;

        for (let i = 0; i < 9; i++) {

            const s = document.createElement("span");
            s.className = "trail";
            s.textContent = i % 2 ? "♥" : "✦";
            s.style.left = e.clientX + "px";
            s.style.top = e.clientY + "px";
            s.style.color = trailColors[i % trailColors.length];
            s.style.fontSize = (14 + Math.random() * 10) + "px";

            const angle = (i / 9) * Math.PI * 2;
            const dist = 50 + Math.random() * 30;

            s.style.setProperty("--dx", Math.cos(angle) * dist + "px");
            s.style.setProperty("--dy", Math.sin(angle) * dist + "px");

            decorLayer.appendChild(s);

            setTimeout(function () { s.remove(); }, 1000);

        }

    });

    /* clicking the gift = pressing the button */
    giftWrap.addEventListener("click", function () {
        document.getElementById("surpriseButton").click();
    });


    /* ---------- smooth animation loop ---------- */

    function tick() {

        if (isGone()) return;

        cx += (mx - cx) * 0.08;
        cy += (my - cy) * 0.08;

        gx += (tx - gx) * 0.12;
        gy += (ty - gy) * 0.12;

        parallaxNodes.forEach(function (node) {
            node.el.style.transform =
                `translate3d(${-cx * node.depth * 600}px, ${-cy * node.depth * 600}px, 0)`;
        });

        giftTilt.style.transform =
            `rotateY(${cx * 22}deg) rotateX(${-cy * 22}deg)`;

        glow.style.transform =
            `translate3d(${gx - 160}px, ${gy - 160}px, 0)`;

        requestAnimationFrame(tick);

    }

    requestAnimationFrame(tick);

})();