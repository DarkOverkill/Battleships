var firstTurn = false;
var pageLoad = function () {
    var hubConnection = $.connection.gameHub;

    $.connection.hub.start().done(function () {
        newConnection(hubConnection);
    });

    registerClientsMethod(hubConnection);

    registerEvents(hubConnection);
};

var registerEvents = function (hubConnection) {
    
    $('#sendShipsCord').on('click', function () {
        var positions = $('#shipsPosition').val();
        console.log('func from HUB: ' + positions);
        $('#sendShipsCord').remove();
        if (firstTurn == true) {
            $('button.cell').attr('disabled', false);
            $('#turn').html('Your');
        } else {
            $('#turn').html('Enemy');
        }
        hubConnection.server.getShipsPosition(positions);
    });

    $('button.cell').on('click', function () {
        var cell = $(this);
        var cellId = cell.data('id');
        console.log(cellId, typeof (cellId));
        cell.remove();
        $('button.cell').attr('disabled', true);
        hubConnection.server.makeFire(cellId);
    })   
};

var registerClientsMethod = function (clientHub) {

    clientHub.client.makeFire = function (cellValue, cellId) {
        console.log('makeFire ', cellId, cellValue);
        if (cellValue == '1') {
            $('#yourField th[data-id = ' + cellId + ']').children().remove();
            $('#yourField th[data-id = ' + cellId + ']').append("<div class='hit'></div>");
        }
        else {
            $('#yourField th[data-id = ' + cellId + ']').append("<div class='miss'></div>");
            $('button.cell').attr('disabled', false);
            $('#turn').html('Your');
        }
    }
    clientHub.client.resultOfFire = function (cellValue, cellId) {
        console.log('reusltOfFire ', cellValue, cellId);
        if (cellValue == '1') {
            $('#enemyField th[data-id = ' + cellId + ']').append("<div class='hit'>X</div>");
            $('button.cell').attr('disabled', false);
            $('#turn').html('Your');
        }
        else {
            $('button.cell').attr('disabled', true);
            $('#turn').html('Enemy');
        }
    }

    clientHub.client.onConnected = function (id, userName, allUsers) {
        $('#hdId').val(id);
        for (var i = 0 ; i < allUsers.length; ++i) {
            addUser(clientHub, allUsers[i].Id, allUsers[i].UserName)
        }
    }

    clientHub.client.onNewUserConnected = function (id, userName) {
        addUser(clientHub, id, userName);
    }

    clientHub.client.onUserDisconnected = function (id) {
        $('#' + id).remove();
    }

    clientHub.client.requestOnGame = function (fromUserId, fromUserName) {
        var answer = confirm(fromUserName + ' want to play.');
        console.log(answer, typeof (answer));
        if (answer == true)
        {
            firstTurn = true;
            //$('button.cell').attr('disabled', false);
        }
        clientHub.server.answerOnRequest(fromUserId, answer);
    }
    clientHub.client.answerOnRequest = function (toUserId, fromUserName, message) {
        alert(message);
    }
};

var newConnection = function (hubConnection) {
    var name = prompt("Enter your name: ", '');
    hubConnection.server.connect(name);
};

var addUser = function (hubConnection, id, userName) {
    var connectedUserId = $('#hdId').val();
    var code = "";
    if (connectedUserId == id) {
        code = $('<div class="loginUser" id="' + id + '" >' + userName + '</div>');
    }
    else {
        code = $('<div class="user" id="' + id + '" >' + userName + '</div>');

        $(code).dblclick(function () {
            var clickedId = $(this).attr('id');
            if (connectedUserId != id) {
                hubConnection.server.requestOnGame(clickedId);
            }
        });
    }
    $('.userList').append(code);
};

var init = function () {
    pageLoad();
};

$(function () {
    init();
});