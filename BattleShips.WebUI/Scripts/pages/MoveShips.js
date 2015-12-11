(function () {
    var shipsArray = []; // array for storage ships wich was select

    Array.dim = function (dimension, initial) {
        var arr = [];
        for (var i = 0; i < dimension; ++i) {
            arr[i] = initial;
        }
        return arr;
    };

    var onShipClick = function () {
        if (shipsArray.length != 0) {
            if (shipsArray[shipsArray.length - 1].setted == false) {
                alert('Press enter, to set your ship, before choose another!');
                console.log(shipsArray[shipsArray.length - 1].setted, this);
                return;
            }
        }
        console.log(this);
        var ship = $(this);
        ship.rotate = 0;//ship[0].style.transform;
        ship[0].style.transform = 'rotate(' + ship.rotate + 'deg)';
        ship._width = ship.width();
        ship._height = ship.height();
        ship.cellCount = ship.children().length;
        ship.cellsPosition = ['00']; // start position, cords of first cell of field
        ship.setted = false;
        setCellsPosition(ship);
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
            console.log("top - " + fieldData.top);
            console.log("bottom - " + fieldData.bottom);
            console.log("left - " + fieldData.left);
            console.log("right - " + fieldData.right);
            console.log('height - ', ship._height, '  top - ', ship.offset().top);
            console.log('width - ', ship._width, '  left - ', ship.offset().left);
            switch (e.keyCode) {
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
                    if (!shipsCollisionCheck(ship)) {
                        ship.setted = true;
                        $(ship).remove();
                        redrawShip(shipsArray[shipsArray.length - 1]);
                        console.log('ship setted!');
                        //alert('The ship was setted, you can choose another!');
                        if (shipsArray.length == 10) {
                            sendShipsPosition();
                            $('#sendShipsCord').removeAttr('disabled');
                        }
                    }
                    //console.log(shipsArray.length);
                    //for (var i = 0; i < ship.cellsPosition.length; ++i) {
                    //    console.log(ship.cellsPosition[i]);
                    //}
                    break;
                default:
                    console.log(e.keyCode);
                    break;
            }
            setCellsPosition(ship);
        }
    };

    var redrawShip = function (ship) {
        for (var i = 0; i < ship.cellCount; ++i) {
            $('#yourField  tr #' + ship.cellsPosition[i]).append("<div class='shipCell'></div>");
        }
    };

    var sendShipsPosition = function () {
        var rowsNumber = Number($('#00').parent().parent().children().length);
        var colsNumber = Number($('#00').parent().parent().children().length);
        var cellsInfoArray = Array.dim(rowsNumber * colsNumber, 0);
        for (var i = 0; i < shipsArray.length; ++i) {
            for (var j = 0; j < shipsArray[i].cellCount; ++j) {
                cellsInfoArray[parseInt(shipsArray[i].cellsPosition[j])] = 1;
            }
        }
       
        var data = {
            positions : cellsInfoArray.toString().replace(/,/g,'')
        }
        console.log(data.positions);

        $('#shipsPosition').val(data.positions);

        $.ajax({
            type: "POST",
            url: "/BattleField/GetShipsPosition",
            dataType: "json",
            data: data
        }).done(function () {
            console.log('ajax-done');
        }).fail(function () {
            console.log('ajax-fail');
        });
    };

    var setCellsPosition = function (ship) {
        for (var i = 1; i < ship.cellCount; ++i) {
            var cord;
            cord = ship.rotate == 0 ? (ship.cellsPosition[i - 1][0] + (parseInt(ship.cellsPosition[i - 1][1]) + 1)) :
                                ((parseInt(ship.cellsPosition[i - 1][0]) + 1) + ship.cellsPosition[i - 1][1])
            ship.cellsPosition[i] = cord;
        }
    };

    var shipsCollisionCheck = function (ship) {
        for (var i = 0; i < shipsArray.length; ++i) {
            if (ship.attr('id') === shipsArray[i].attr('id')) {
                continue;
            }
            for (var j = 0; j < ship.cellCount; ++j) {
                for (var k = 0; k < shipsArray[i].cellCount; ++k) {
                    var cellCord = [];
                    cellCord[0] = shipsArray[i].cellsPosition[k].toString(); //center shipCell ZERO
                    //console.log(cellCord[0]);
                    cellCord.push((parseInt(cellCord[0][0]) - 1) + cellCord[0][1]); // up cell from ZERO
                    cellCord.push((parseInt(cellCord[0][0]) + 1) + cellCord[0][1]); // down cell from ZERO
                    cellCord.push((parseInt(cellCord[0][0]) - 1) + (parseInt(cellCord[0][1]) - 1).toString()); //up-left cell from ZERO
                    cellCord.push((parseInt(cellCord[0][0]) - 1) + (parseInt(cellCord[0][1]) + 1).toString()); //up-rigth cell from ZERO
                    cellCord.push((parseInt(cellCord[0][0]) + 1) + (parseInt(cellCord[0][1]) - 1).toString()); //down-left cell from ZERO
                    cellCord.push((parseInt(cellCord[0][0]) + 1) + (parseInt(cellCord[0][1]) + 1).toString()); //down-right cell from ZERO
                    cellCord.push((cellCord[0][0]) + (parseInt(cellCord[0][1]) - 1)); // left cell from ZERO
                    cellCord.push((cellCord[0][0]) + (parseInt(cellCord[0][1]) + 1)); // rigth cell from ZERO
                    for (var m = 0; m < cellCord.length; ++m) {
                        //console.log('point - ', cellCord[m]);
                        if (cellCord[m] == ship.cellsPosition[j]) {
                            alert("Thre is collision, please move ship to another direction!");
                            console.log("Collision!");
                            return true;
                        }
                    }
                }
            }
        }
        console.log('no collision');
        return false;
    };

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
    };

    var init = function () {
        $('.ship').on('click', onShipClick);
        $('#sendShipsCord').on('click', sendShipsPosition);
        $('button.cell').attr('disabled', true);
    };
    
    $(function () {
        init();
    });
})();