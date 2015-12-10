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
        hubConnection.server.getShipsPosition(positions);
    }); 
   
};

var registerClientsMethod = function (clientHub) {

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