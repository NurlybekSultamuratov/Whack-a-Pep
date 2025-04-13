// CREATE CANVAS
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 544;

// BACKGROUND IMAGE
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// PEPE IMAGE
var mpReady = false;
var mpImage = new Image();
mpImage.onload = function () {
    mpReady = true;
};
mpImage.src = "images/pep.png";

// GAME VARIABLES
var mp = {};
var mpCaught = 0;
var timer = 0;
var caught = false;
var fps = 10;
var missedClicks = 0;
var maxMisses = 10;
var gameOver = false;

// RESET PEPE POSITION
var reset = function () {
    mp.x = 40 + Math.random() * (canvas.width - 100);
    do {
        mp.y = 40 + Math.random() * (canvas.height - 100);
    } while (mp.y < 100);
};

// MOUSE EVENT
window.addEventListener("mousedown", onMouseDown, false);
function onMouseDown(e) {
    if (e.button != 0 || gameOver) return;

    var mouseX = e.clientX;
    var mouseY = e.clientY;

    if (mpBody(mp, mouseX, mouseY)) {
        caught = true;
        mpCaught++;
        fps += 5;
        clearInterval(timer);
        timer = setInterval(reset, 15000 / fps);
        reset();
    } else {
        missedClicks++;
        if (missedClicks >= maxMisses) {
            gameOver = true;
            alert("Game Over! You missed 10 times.");
        }
    }
}

// CHECK CLICK ON IMAGE
function mpBody(mp, x, y) {
    const size = 80;
    return (
        x <= mp.x + size &&
        x >= mp.x &&
        y <= mp.y + size &&
        y >= mp.y
    );
}

// DRAW EVERYTHING
var render = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (bgReady) {
        ctx.drawImage(bgImage, 0, 100);
    }

    if (mpReady && !gameOver) {
        ctx.drawImage(mpImage, mp.x, mp.y, 80, 80); // resized image
    }

    // Draw top bar background
    ctx.fillStyle = "rgb(23, 114, 70)";
    ctx.fillRect(0, 0, canvas.width, 100);

    // Score and Misses in top bar
    ctx.fillStyle = "rgb(15, 27, 31)";
    ctx.font = "20px Helvetica";
    ctx.fillText("Score: " + mpCaught, 20, 35);
    ctx.fillText("Misses: " + missedClicks + "/" + maxMisses, 600, 35);
};

// GAME LOOP
var main = function () {
    render();
    if (!gameOver) {
        requestAnimationFrame(main);
    }
};

reset();
var w = window;
requestAnimationFrame =
    w.requestAnimationFrame ||
    w.webkitRequestAnimationFrame ||
    w.msRequestAnimationFrame ||
    w.mozRequestAnimationFrame;
main();
