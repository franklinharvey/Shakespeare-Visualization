function leftArrowPressed() {
   console.log("left");
}

function rightArrowPressed() {
   console.log("right");
}

document.onkeydown = function(evt) {
    evt = evt || window.event;
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
    }
};