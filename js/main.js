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
         .then(responseJson => displayResults(responseJson))
         .catch(err => {
             $('#js-error-message').text(`Something went wrong: ${err.message}`);
         });
 }

 function displayResults(responseJson) {
     $('#results-list').empty();
     let opt1 = document.getElementById('check-ingredient');
     let opt2 = document.getElementById('check-cocktail-name');
     let opt3 = document.getElementById('check-begining-letter');
     let opt4 = document.getElementById('check-id');
     let opt5 = document.getElementById('check-random');
     let iArr = [];
     let mArr = [];
     if (opt1.checked) {
         for (let i = 0; i < responseJson.drinks.length; i++) {
             let drink = responseJson.drinks[i];
             $('#results-list').append(
                 `<li><h3>${drink.strDrink}</h3><p><span>Drink ID: </span>${drink.idDrink}</p><p><img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"></p>`)
         }
         $('#results').removeClass('hidden');
     } else if (opt2.checked || opt3.checked || opt4.checked || opt5.checked) {
         for (let i = 0; i < responseJson.drinks.length; i++) {
             let drink = responseJson.drinks[i];
             $('#results-list').append(
                 `<li><h3>${drink.strDrink}</h3><p><span>Drink ID: </span>${drink.idDrink}</p><p><img src="${drink.strDrinkThumb}" alt="${drink.strDrink}"></p><div class="drink-mix"><ul id="measurements-${i}"></ul><ul id="ingredients-${i}"></ul></div>`)
             
             for (let j = 1; j < 16; j++) {
                 const ingredientName = 'strIngredient' + j;
                 const measureName = 'strMeasure' + j;
                 if (drink[ingredientName]) {
                     $('#ingredients-' + [i]).append(`<li>${drink[ingredientName]}</li>`);
                     console.log(drink[ingredientName]);
                 } else {
                     console.log('somethings wrong');
                 }
                 if (drink[measureName]) {
                     $('#measurements-' + [i]).append(`<li>${drink[measureName]}</li>`);
                 }
                 
             }
             
         }
        $('#results').removeClass('hidden');
     }
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
