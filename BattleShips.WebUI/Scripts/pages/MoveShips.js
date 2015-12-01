var onShipClick = function () {
    console.log(this);
    var ship = $(this);
    var srcCord = {
        top: ship.offset().top,
        left: ship.offset().left
    }
    console.log(srcCord.top + ' ' + srcCord.left);
    ship.offset({
        top: $('#00').offset().top,
        left: $('#00').offset().left
    });
    var left = 37, up = 38, right = 39, down = 40, exit = 27, enter = 13, rotation = 87;

    onkeydown = function (e) {
        switch(e.keyCode)
        {
            case left:
                ship.offset({
                    left: (ship.offset().left - 31)
                });
                break;
            case right:
                ship.offset({
                    left: (ship.offset().left + 31) 
                });
                break;
            case up:
                ship.offset({
                    top: (ship.offset().top - 31)
                });
                break;
            case down:
                ship.offset({
                    top: (ship.offset().top + 31)
                });              
                break;
            case exit:
                ship.offset({
                    top: srcCord.top,
                    left: srcCord.left
                });
                onkeydown = null;
                break;
            case rotation:
                rotate(ship);
                break;
            default:
                console.log(e.keyCode);
                break;
        }
    }
}
var rotate = function (ship) {
    var srcCord = {
        top: ship.offset().top,
        left: ship.offset().left
    }
    var currentDeg = parseInt(ship[0].style.transform.replace(/rotate\(/g,''));
    currentDeg = (currentDeg == 90 ? 0 : 90);
    console.log(currentDeg);
    ship[0].style.transform = 'rotate(' + currentDeg + 'deg)';
    ship.offset({
        top: srcCord.top,
        left: srcCord.left
    });
}
var init = function () {
    $('.ship').on('click', onShipClick);
}

$(function () {
    init();
})