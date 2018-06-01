//Author Ryan Clark

// GLOBAL VARIABLES
var deckImg;
var backImg;
var canvas;
var ctx;
var canvasWidth;
var canvasHeight;
var count = 0;
var millisPerDeal = 200 * Math.pow(20, 5/10);
var running = false;
var interval;
var runBtn;
var countBtn;
var showingCount = false;
var slider;

/**
 * Called when large pictures load.
 */
function initCanvas(){
    deckImg = document.getElementById("deckImg");
    backImg = document.getElementById("backImg");
    canvas = document.getElementById("cardDisplay");
    runBtn = document.getElementById("runBtn");
    countBtn = document.getElementById("countBtn");
    slider = document.getElementById("speedInput");
    ctx = canvas.getContext("2d");
    canvasWidth = canvas.width;
    canvasHeight = canvas.height;
    reset();
}

/**
 * Called when runBtn is clicked. Starts or clears interval, updates runBtn.
 */
function runClicked(){
    if(running){
        clearInterval(interval);
        runBtn.innerHTML = "Run";
        running = false;
    }
    else {
        dealCard();
        interval = setInterval(function(){
            dealCard();
        }, millisPerDeal);
        runBtn.innerHTML = "Stop";
        running = true;
    }
}

/**
 * Called when slider changed.
 */
function changeSpeed(){
    var speedIndex = 20 - 2 * slider.value;
    millisPerDeal = 200 * Math.pow(20, speedIndex/20);
    if (running){
        // reset interval with new speed
        clearInterval(interval);
        interval = setInterval(function(){
            dealCard();
        }, millisPerDeal);
    }
}

/**
 * Draw a card, render it, update count.
 */
function dealCard(){
    var card = Math.floor(Math.random() * 52);
    renderCard(card);
    if (card % 13 == 0 || card % 13 >= 9){  // ace or 10+
        count--;
    }
    else if (card % 13 < 6 && card % 13 > 0){
        count++;
    }
    if(showingCount)
        showCount();
}

/**
 * Called when mouse enters viewing area. Fills text area with nonbreaking spaces around the count.
 * Also called when card dealt.
 */
function showCount(){
    var countLen = ("" + count).length;
    var padding = (18-countLen);
    var outputStr = "&nbsp".repeat(padding) + count + "&nbsp".repeat(padding);
    countBtn.innerHTML = outputStr;
    showingCount = true;
}

/**
 * Called when mouse exits viewing area. Resets original text.
 */

function showText(){
    countBtn.innerHTML = "Hover to View Count";
    showingCount = false;
}

/**
 * Draw back of card, reset count.
 */
function reset(){
    count = 0;
    // clear canvas
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // draw card-back to start at position 0,0
    ctx.drawImage(backImg, 0, 0, 360, 540, 0, 0, canvasWidth, canvasHeight);
    // reset the rest
    clearInterval(interval);
    runBtn.innerHTML = "Run";
    running = false;
}

/**
 * Render a card based on its ID. First clear the canvas.
 * @param {CardID} card 
 */
function renderCard(card){
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    var suit = Math.floor(card / 13);
    var rank = card % 13;
    ctx.drawImage(deckImg, 30 + 390*rank, 30 + 570*suit, 360, 540, 0, 0, canvasWidth, canvasHeight);
}