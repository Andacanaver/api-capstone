 'use strict'

const searchURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

function radioSelect() {
    $('input[name="check-term"]').on('click', function() {
        if ($(this).val() == 'opt1') {
            $('#terms-boxes').show();
            $('#opt1').show();
            $('#opt2').hide();
            $('#opt3').hide();
            $('#opt4').hide();
        } else if ($(this).val() == 'opt2') {
            $('#terms-boxes').show();
            $('#opt2').show();
            $('#opt1').hide();
            $('#opt3').hide();
            $('#opt4').hide();
        } else if ($(this).val() == 'opt3') {
            $('#terms-boxes').show();
            $('#opt3').show();
            $('#opt1').hide();
            $('#opt2').hide();
            $('#opt4').hide();
        } else if ($(this).val() == 'opt4') {
            $('#terms-boxes').show();
            $('#opt4').show();
            $('#opt1').hide();
            $('#opt2').hide();
            $('#opt3').hide();
        } else {
            $('#terms-boxes').hide();
        }
    })
}



$(radioSelect());