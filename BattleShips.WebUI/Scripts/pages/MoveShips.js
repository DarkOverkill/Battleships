var shipsArray = []; // array for storage ships wich was select
var onShipClick = function () {   
    console.log(this);
    var ship = $(this);
    ship.rotate = 0;//ship[0].style.transform;
    ship[0].style.transform = 'rotate(' + ship.rotate + 'deg)';
    ship._width = ship.width();
    ship._height = ship.height();
    ship.cellCount = ship.children().length;
    ship.cellsPosition = ['00']; // start position, cords of first cell of field
    SetCellsPosition(ship);
    var hasInArray = false;
    for (var i = 0; i < shipsArray.length; ++i) {
        if (shipsArray[i].attr('id') === ship.attr('id')) {
            hasInArray = true;
            //console.log('Error');
            break;
        }
    }
    //console.log(shipsArray[0]);
    if (!hasInArray) {
        shipsArray.push(ship);
    }
    
    
    var srcCord = {
        top: ship.offset().top,
        left: ship.offset().left
    } // cord of the source destenation

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
                    ship.cellsPosition[0] = ship.cellsPosition[0][0] + (parseInt(ship.cellsPosition[0][1]) - 1);
                }
                break;
            case right:
                if (ship.offset().left + ship._width < fieldData.right) {
                    ship.offset({
                        left: (ship.offset().left + 31)
                    });
                    ship.cellsPosition[0] = ship.cellsPosition[0][0] + (parseInt(ship.cellsPosition[0][1]) + 1);
                }
                break;
            case up:
                if (ship.offset().top > fieldData.top) {
                    ship.offset({
                        top: (ship.offset().top - 31)
                    });
                    ship.cellsPosition[0] = (parseInt(ship.cellsPosition[0][0]) - 1) + ship.cellsPosition[0][1];
                }
                break;
            case down:
                if (ship.offset().top + ship._height < fieldData.bottom) {
                    ship.offset({
                        top: (ship.offset().top + 31)
                    });
                    ship.cellsPosition[0] = (parseInt(ship.cellsPosition[0][0]) + 1) + ship.cellsPosition[0][1];
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
                //console.log(shipsArray.length);
                for (var i = 0; i < ship.cellsPosition.length; ++i) {
                    console.log(ship.cellsPosition[i]);
                }
                break;
            default:
                console.log(e.keyCode);
                break;
        }
        SetCellsPosition(ship);
    }
}

function SetCellsPosition(ship) {
    for (var i = 1; i < ship.cellCount; ++i) {
        var cord;
        cord = ship.rotate == 0 ? (ship.cellsPosition[i - 1][0] + (parseInt(ship.cellsPosition[i - 1][1]) + 1)) :
                            ((parseInt(ship.cellsPosition[i - 1][0]) + 1) + ship.cellsPosition[i - 1][1])
        ship.cellsPosition[i] = cord;
    }
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