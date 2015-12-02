var shipsArray = [];
var onShipClick = function () {   
    console.log(this);
    var ship = $(this);
    var hasInArray = false;
    for (var i = 0; i < shipsArray.length; ++i) {
        if (shipsArray[i].attr('id') === ship.attr('id')) {
            hasInArray = true;
            console.log('Error');
            break;
        }
    }
    console.log(shipsArray[0]);
    if (!hasInArray) {
        shipsArray.push(ship);
    }
    ship.rotate = 0;//ship[0].style.transform;
    ship[0].style.transform = 'rotate(' + ship.rotate + 'deg)';
    ship._width = ship.width();
    ship._height = ship.height();
    //console.log(ship.rotate);
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
        var field = $('#00').parent().parent();
        var fieldData = {
            top: field.offset().top,
            left: field.offset().left,
            right: field.offset().left + field.width(),
            bottom: field.offset().top + field.height()
        }
        //console.log("top - "+ fieldData.top);
        //console.log("bottom - "+ fieldData.bottom);
        //console.log("left - "+ fieldData.left);
        //console.log("right - "+ fieldData.right);
        //console.log('height - ', ship._height);
        //console.log('width - ', ship._width);
        switch(e.keyCode)
        {          
            case left:
                if (ship.offset().left > fieldData.left) {
                    ship.offset({
                        left: (ship.offset().left - 31)
                    });
                }
                break;
            case right:
                if (ship.offset().left + ship._width < fieldData.right) {
                    ship.offset({
                        left: (ship.offset().left + 31)
                    });
                }
                break;
            case up:
                if (ship.offset().top > fieldData.top) {
                    ship.offset({
                        top: (ship.offset().top - 31)
                    });
                }
                break;
            case down:
                if (ship.offset().top + ship._height < fieldData.bottom) {
                    ship.offset({
                        top: (ship.offset().top + 31)
                    });
                }
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
            case enter:
                console.log(shipsArray.length);
                for (var i = 0; i < shipsArray.length; ++i) {
                    console.log(shipsArray[i].attr('id'));
                }
                break;
            default:
                console.log(e.keyCode);
                break;
        }
    }
}
function BorderCheck(elem)
{
    var left = $('#00').parent().parent().offset().left;
    var top = $('#00').parent().parent().offset().top;
    var width = left + $('#00').parent().parent().width();
    var height = top + $('#00').parent().parent().height();
    
    if (elem.offset().left > left && elem.offset().top > top 
        && (elem.offset().left + elem.width()) < width
         && (elem.offset().top + elem.height()) < height) {
        return true;
    }
    return false;
}
var rotate = function (ship) {
    console.log(typeof (ship));
    var srcCord = {
        top: ship.offset().top,
        left: ship.offset().left
    }
    //var currentDeg = parseInt(ship[0].style.transform.replace(/rotate\(/g,''));
    ship.rotate = (ship.rotate == 90 ? 0 : 90);
    console.log(ship.rotate);
    ship[0].style.transform = 'rotate(' + ship.rotate + 'deg)';
    ship.offset({
        top: srcCord.top,
        left: srcCord.left
    });
    var temp = ship._height;
    ship._height = ship._width;
    ship._width = temp;
}
var init = function () {
    $('.ship').on('click', onShipClick);
}

$(function () {
    init();
})