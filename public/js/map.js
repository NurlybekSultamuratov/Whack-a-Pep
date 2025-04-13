//CREATE CANVAS
var canvas = document.createElement("canvas");
//DEFINE TYPE OF CANVAS
var ctx = canvas.getContext('2d');
var timer = 0;
var caught = false;
var fps = 10;
document.body.appendChild(canvas);
canvas.width = 800;
canvas.height = 544;

//SET BACKGROUND IMAGE 
var bgReady = false;
var bgImage = new Image();

bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// SET MEEPO IMAGE
var mpReady = false;
var mpImage = new Image();
mpImage.onload = function () {
    mpReady = true;
};
mpImage.src = "images/2.png";

var mp = {};
var mpCaught = 0;
var reset = function () {
    mp.x = 40 + (Math.random() * (canvas.width - 70));
    do {
        mp.y = 40 + (Math.random() * (canvas.height - 70));
    }
    while (mp.y < 100)
};

//MOUSEDOWN EVENT
window.addEventListener("mousedown", onMouseDown, false);
function onMouseDown(e) {

    if (e.button != 0) return;

    mouseXinCanvas = e.clientX;
    mouseYinCanvas = e.clientY;

    if (mpBody(mp, mouseXinCanvas, mouseYinCanvas)) {
        caught = true;
        clearInterval(timer);
        timer = setInterval(reset, 15000 / fps);
        reset();
    }
    if (ResetSpeed(mouseXinCanvas, mouseYinCanvas)) {
        clearInterval(timer);
        timer = setInterval(reset, 15000 / fps);
        reset();
        render();
    }
    if (ResetScore(mouseXinCanvas, mouseYinCanvas)) {
        location.reload();
    }
};

//DEFINE BODY OF IMAGE MEEPO
function mpBody(mp, x, y) {

    if (x <= (mp.x + 130)
        && mp.x <= (x + 130)
        && y <= (mp.y + 130)
        && mp.y <= (y + 130)
    ) {
        fps = fps + 5;
        mpCaught++;
        return true;
    }
    return false;
};
//RESET SCORE BUTTON COORDINATES
function ResetScore(x, y) {

    if (x > (305)
        && x < (545)
        && y > (15)
        && y < (85)
    ) {
        return true;
    }
    return false;
};
//RESET SPEED BUTTON COORDINATES
function ResetSpeed(x, y) {
    if (x > (605)
        && x < (945)
        && y > (17)
        && y < (74)
    ) {
        fps = 9;
        return true;
    }
    return false;
};

// DRAW
var render = function () {

    //CLEAR DISPLAY
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (bgReady) {
        ctx.drawImage(bgImage, 0, 100);
    }
    if (mpReady) {
        ctx.drawImage(mpImage, mp.x, mp.y);
    }
    if (caught == true) {
        if (bgReady) {
            ctx.drawImage(bgImage, 0, 100);
        }
        caught = false;
    }
 
    //SCORE TEXT STYLE AND ITS COORDINATES
    ctx.fillStyle = "rgb(15, 27, 31)";
    ctx.font = "25px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.font = "20px Helvetica";
    ctx.fillText("Score: " + mpCaught, 6, 109);
    //RESET SQUARE BUTTON BACKGROUND STYLE
    ctx.fillStyle = "rgb(23, 114, 70)";
    ctx.fillRect(0, 10, 250, 80);
    ctx.fillRect(220, 10, 250, 80);
    ctx.fillRect(330, 10, 250, 80);
    ctx.fillRect(550, 10, 250, 80);
    //SPEED SQUARE BUTTON BACKGROUND STYLE
    ctx.fillStyle = "rgb(23, 114, 70)";
    ctx.fillRect(5, 15, 240, 70);
    ctx.fillRect(225, 15, 240, 70);
    ctx.fillRect(335, 15, 240, 70);
    ctx.fillRect(555, 15, 240, 70);
    ctx.fillStyle = "rgb(15, 27, 31)";
    //FONT OF BUTTONS RESET AND SCORE
    ctx.font = "34px Arial";
    ctx.fillText("Reset Score", 275, 30);
    ctx.fillText("Reset Speed", 545, 30);
};
//LOOP
var main = function () {
    render();
    requestAnimationFrame(main);
};
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
reset();
main();