 'use strict'

 const searchURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

 function radioSelect() {
     $('input[name="check-term"]').on('click', function () {
         if ($(this).val() == 'opt1') {
             $('#terms-boxes').show();
             $('#opt1').show();
             $('#opt2').hide();
             $('#opt3').hide();
             $('#opt4').hide();
             $('#random-submit').hide();
         } else if ($(this).val() == 'opt2') {
             $('#terms-boxes').show();
             $('#opt2').show();
             $('#opt1').hide();
             $('#opt3').hide();
             $('#opt4').hide();
             $('#random-submit').hide();
         } else if ($(this).val() == 'opt3') {
             $('#terms-boxes').show();
             $('#opt3').show();
             $('#opt1').hide();
             $('#opt2').hide();
             $('#opt4').hide();
             $('#random-submit').hide();
         } else if ($(this).val() == 'opt4') {
             $('#terms-boxes').show();
             $('#opt4').show();
             $('#opt1').hide();
             $('#opt2').hide();
             $('#opt3').hide();
             $('#random-submit').hide();
         } else if ($(this).val() == 'opt5') {
             $('#terms-boxes').hide();
             $('#opt4').show();
             $('#opt1').hide();
             $('#opt2').hide();
             $('#opt3').hide();
             $('#opt4').hide();
             $('#random-submit').show();
         }
     })
 }

 function formatDrinkSearch() {
     let opt1 = document.getElementById('check-ingredient');
     let opt2 = document.getElementById('check-cocktail-name');
     let opt3 = document.getElementById('check-begining-letter');
     let opt4 = document.getElementById('check-id');
     let opt5 = document.getElementById('check-random');
     let search;
     let query;
     let param;
     if (opt1.checked) {
         search = "filter.php?i=";
         query = $('#search-ingredient').val();
         param = search + query;
     } else if (opt2.checked) {
         search = "search.php?s=";
         query = $('#search-cocktail-name').val();
         param = search + query;
     } else if (opt3.checked) {
         search = "search.php?f=";
         query = $('#search-begining-letter').val();
         param = search + query;
     } else if (opt4.checked) {
         search = "lookup.php?i=";
         query = $('#search-id').val();
         param = search + query;
     } else if (opt5.checked) {
         param = "random.php?";
         $('#terms-boxes').show();
     }

     console.log(search);
     console.log(query);
     console.log(param);
     return param;
 }

 function getDrinks(query) {
     const url = searchURL + query;

     fetch(url)
         .then(response => {
             if (response.ok) {
                 return response.json();
             }
             throw new Error(response.statusText);
         })
         .then(responseJson => console.log(responseJson))
         .catch(err => {
             $('#js-error-message').text(`Something went wrong: ${err.message}`);
         })
 }

 function watchForm() {
     radioSelect();
     $('form').submit(event => {
         event.preventDefault();
         const search = formatDrinkSearch();
         getDrinks(search);
     });
 }
 $(watchForm());
