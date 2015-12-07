var onButtonCellClick = function () {
    var button = $(this);
    console.log(button, button.data('id'));
    button.remove();
    data = {
        id: button.data('id')
        }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/BattleField/ResponseOnFire',
        data: data
    }).done(function (data) {
        if (data.cellValue == '1') {
            console.log('ajax-fire-done');
            $('th[data-id = ' + button.data('id') + ']').append("<div class='shipCell'></div>");
        }
    }).fail(function () {
        console.log('ajax-fire-fail');
    })
};

var init = function () {
    $('button.cell').on('click', onButtonCellClick);
};

$(function () {
    init();
});