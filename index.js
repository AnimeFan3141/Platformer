let gameState = "start";
let field = document.querySelector(".field");
let player = document.querySelector(".player");
let ground = document.querySelector(".ground");
let platforms = document.querySelectorAll(".platform");

let isAirbound = false;
let isWallRight = false, isWallLeft = false;
let keyPressed = {};
let g = .2;
let speed;
let interval;
let count = 0;

onkeydown = onkeyup = function(e){
    e = e || Event
    keyPressed[e.key] = e.type == 'keydown';
}

function gameLoop(){
    if(keyPressed['Enter'] && gameState == "start"){
        gameState = "play";
        interval = setInterval(function() {
            let newPlatform = document.createElement("div");
            newPlatform.classList.add("platform");
            newPlatform.style.top = ground.offsetTop % 2 + "px";
            newPlatform.style.left = field.offsetWidth / 10 * Math.trunc(Math.random() * 10) + "px";
            field.appendChild(newPlatform);
            platforms = document.querySelectorAll(".platform");
        }, 1000);
    }
    if(gameState == "play"){
        if(checkLoss()){
            gameState = 'start';
            clearInterval(interval);
            for(let i = platforms.length - 1; i >= 0; i--){
                field.removeChild(platforms[i]);
            }
            platforms = document.querySelectorAll(".platform");
            count = 0;
        }
        if(keyPressed['a'] && !keyPressed['d'] && isWallLeft == false){
            if(player.offsetLeft > 0){
                player.style.left = player.offsetLeft - 1 + "px";
            }
        }
        if(keyPressed['d'] && !keyPressed['a'] && isWallRight == false){
            if(player.offsetLeft + player.offsetWidth < field.offsetWidth){
                player.style.left = player.offsetLeft + 1 + "px";
            }
        }
        if(keyPressed[' '] || keyPressed['w']){
            if(isAirbound == false){
                isAirbound = true;
                speed = 6
                player.style.top = player.offsetTop - speed + "px";
            }
        }
        gravity();
        colliding();
        movePlatform();
    }

    setTimeout(gameLoop, 10);
}

function gravity(){
    if(!touchingGround()){
        isAirbound = true;
        speed = speed - g;
        player.style.top = player.offsetTop - speed + "px";
    } else {
        isAirbound = false;
        speed = 0;
    }
}

function movePlatform(){
    for(let i = count; i < platforms.length; i++){
        if(platforms[i].offsetTop + platforms[i].offsetHeight == ground.offsetTop || touchingPlatform(platforms[i])){
            if(i == count){
                count++;
            }
            continue;
        }
        platforms[i].style.top = platforms[i].offsetTop + 2 + "px";
    }
}

function touchingPlatform(platform){
    for(let i = 0; i < platforms.length; i++){
        if(platform.offsetTop + platform.offsetHeight == platforms[i].offsetTop &&
        platform.offsetLeft == platforms[i].offsetLeft){
            return true;
        }
    }
    return false;
}

function touchingGround(){
    if(player.offsetTop + player.offsetHeight >= ground.offsetTop){
        player.style.top = ground.offsetTop - player.offsetHeight + "px";
        return true;
    }
    for(let i = 0; i < platforms.length; i++){
        if(player.offsetTop + player.offsetHeight >= platforms[i].offsetTop &&
        player.offsetTop + player.offsetHeight <= platforms[i].offsetTop + platforms[i].offsetHeight / 2 &&
        player.offsetLeft < platforms[i].offsetLeft + platforms[i].offsetWidth &&
        player.offsetLeft + player.offsetWidth > platforms[i].offsetLeft){
            player.style.top = platforms[i].offsetTop - player.offsetHeight + "px";
            return true;
        }
    }
    return false;
}

function checkLoss(){
    for(let i = 0; i < platforms.length; i++){
        if(player.offsetTop == platforms[i].offsetTop + platforms[i].offsetHeight &&
        touchingGround() && player.offsetLeft < platforms[i].offsetLeft + platforms[i].offsetWidth &&
        player.offsetLeft + player.offsetWidth > platforms[i].offsetLeft){
            return true;
        }
    }
    return false;
}

function colliding(){
    for(let i = 0; i < platforms.length; i++){
        if(player.offsetTop <= platforms[i].offsetTop + platforms[i].offsetHeight &&
        player.offsetTop >= platforms[i].offsetTop + platforms[i].offsetHeight / 2 &&
        player.offsetLeft < platforms[i].offsetLeft + platforms[i].offsetWidth &&
        player.offsetLeft + player.offsetWidth > platforms[i].offsetLeft){
            speed = speed * -1;
        }
        if(player.offsetLeft == platforms[i].offsetLeft + platforms[i].offsetWidth &&
        player.offsetTop <= platforms[i].offsetTop + platforms[i].offsetHeight &&
        player.offsetTop + player.offsetHeight > platforms[i].offsetTop){
            isWallLeft = true;
            break;
        } else {
            isWallLeft = false;
        }
        if(player.offsetLeft + player.offsetWidth == platforms[i].offsetLeft &&
        player.offsetTop <= platforms[i].offsetTop + platforms[i].offsetHeight &&
        player.offsetTop + player.offsetHeight > platforms[i].offsetTop){
            isWallRight = true;
            break;
        } else {
            isWallRight = false;
        }
    }
}

gameLoop();