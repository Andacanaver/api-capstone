 'use strict'

 const searchURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

 function radioSelect() {
     $('input[name="check-term"]').on('click', function () {
         if ($(this).val() == 'opt1') {
             $('#terms-boxes').show();
             $('#ingredientInput').show();
             $('#cocktailNameInput').hide();
             $('#beginingLetterInput').hide();
             $('#idInput').hide();
             $('#random-submit').hide();
         } else if ($(this).val() == 'opt2') {
             $('#terms-boxes').show();
             $('#cocktailNameInput').show();
             $('#ingredientInput').hide();
             $('#beginingLetterInput').hide();
             $('#idInput').hide();
             $('#random-submit').hide();
         } else if ($(this).val() == 'opt3') {
             $('#terms-boxes').show();
             $('#beginingLetterInput').show();
             $('#ingredientInput').hide();
             $('#cocktailNameInput').hide();
             $('#idInput').hide();
             $('#random-submit').hide();
         } else if ($(this).val() == 'opt4') {
             $('#terms-boxes').show();
             $('#idInput').show();
             $('#ingredientInput').hide();
             $('#cocktailNameInput').hide();
             $('#beginingLetterInput').hide();
             $('#random-submit').hide();
         } else if ($(this).val() == 'opt5') {
             $('#terms-boxes').hide();
             $('#ingredientInput').hide();
             $('#cocktailNameInput').hide();
             $('#beginingLetterInput').hide();
             $('#idInput').hide();
             $('#random-submit').show();
         }
     })
 }

 function formatDrinkSearch() {
     let ingredientInput = document.getElementById('check-ingredient');
     let cocktailNameInput = document.getElementById('check-cocktail-name');
     let beginingLetterInput = document.getElementById('check-begining-letter');
     let idInput = document.getElementById('check-id');
     let opt5 = document.getElementById('check-random');
     let search;
     let query;
     let param;
     if (ingredientInput.checked) {
         search = "filter.php?i=";
         query = $('#search-ingredient').val();
         param = search + query;
     } else if (cocktailNameInput.checked) {
         search = "search.php?s=";
         query = $('#search-cocktail-name').val();
         param = search + query;
     } else if (beginingLetterInput.checked) {
         search = "search.php?f=";
         query = $('#search-begining-letter').val();
         param = search + query;
     } else if (idInput.checked) {
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
         //change to more user friendly errors
         
             $('#js-error-message').text(`Something went wrong please try again.`);
         });
 }

 function displayResults(responseJson) {
     $('#results-list').empty();
     let ingredientInput = document.getElementById('check-ingredient');
     let cocktailNameInput = document.getElementById('check-cocktail-name');
     let beginingLetterInput = document.getElementById('check-begining-letter');
     let idInput = document.getElementById('check-id');
     let opt5 = document.getElementById('check-random');
     //maxResult is 15 because that is how many ingredients and measures the Json comes back with
     const maxResult = 15;
     let drink = responseJson.drinks;
     
     if (ingredientInput.checked) {
         for (let i = 0; i < drink.length; i++) {
             $('#results-list').append(
                 `<li><h3>${drink[i].strDrink}</h3><p><span>Drink ID: </span>${drink[i].idDrink}</p><p><img src="${drink[i].strDrinkThumb}" alt="${drink[i].strDrink}"></p>`)
         }
         $('#results').removeClass('hidden');
     } else if (cocktailNameInput.checked || beginingLetterInput.checked || idInput.checked || opt5.checked) {
         for (let i = 0; i < drink.length; i++) {
             $('#results-list').append(
                 `<li><div class="drink-list"><div class="info"><p><span>Drink Name: </span>${drink[i].strDrink}</p><p><span>Drink ID: </span>${drink[i].idDrink}</p><p><span>Category: </span>${drink[i].strCategory}</p><p><span>Non\/Alcoholic: </span>${drink[i].strAlcoholic}</p><p><span>Glass Type: </span>${drink[i].strGlass}</p></div><div class="drinkInstructions"><div class="image half-width"><p><img src="${drink[i].strDrinkThumb}" alt="The Cocktail is  ${drink[i].strDrink}"></p></div><div class="drink-mix half-width"><ul id="measurements-${i}"><h4>Measurements</h4></ul><ul id="ingredients-${i}"><h4>Ingredients</h4></ul></div><div class="instructions"><p><span>Instructions: </span>${drink[i].strInstructions}</p></div></div></div></li>`)
             for (let j = 1; j <= maxResult; j++) {
                 
                 const ingredientName = 'strIngredient' + j;
                 const measureName = 'strMeasure' + j;
                 if (drink[i][ingredientName]) {
                     $('#ingredients-' + [i]).append(`<li>${drink[i][ingredientName]}</li>`);
                 }
                 if (drink[i][measureName]) {
                     $('#measurements-' + [i]).append(`<li>${drink[i][measureName]}</li>`);
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
         $('#js-error-message').text("");
         const search = formatDrinkSearch();
         getDrinks(search);
     });
 }
 $(watchForm());
