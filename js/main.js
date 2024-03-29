 'use strict'

 const searchURL = 'https://www.thecocktaildb.com/api/json/v1/1/';

//function for showing the correct input boxes depending on which radio button is selected
 function radioSelect() {
     $('input[name="check-term"]').on('click', function () {
         if ($(this).val() == 'opt1') {
             $('#terms-boxes').removeClass('hidden');
             $('#ingredientInput').removeClass('hidden');
             $('#cocktailNameInput').addClass('hidden');
             $('#beginingLetterInput').addClass('hidden');
             $('#idInput').addClass('hidden');
             $('#random-submit').addClass('hidden');
         } else if ($(this).val() == 'opt2') {
             $('#terms-boxes').removeClass('hidden');
             $('#ingredientInput').addClass('hidden');
             $('#cocktailNameInput').removeClass('hidden');
             $('#beginingLetterInput').addClass('hidden');
             $('#idInput').addClass('hidden');
             $('#random-submit').addClass('hidden');
         } else if ($(this).val() == 'opt3') {
             $('#terms-boxes').removeClass('hidden');
             $('#ingredientInput').addClass('hidden');
             $('#cocktailNameInput').addClass('hidden');
             $('#beginingLetterInput').removeClass('hidden');
             $('#idInput').addClass('hidden');
             $('#random-submit').addClass('hidden');
         } else if ($(this).val() == 'opt4') {
             $('#terms-boxes').removeClass('hidden');
             $('#ingredientInput').addClass('hidden');
             $('#cocktailNameInput').addClass('hidden');
             $('#beginingLetterInput').addClass('hidden');
             $('#idInput').removeClass('hidden');
             $('#random-submit').addClass('hidden');
         } else if ($(this).val() == 'opt5') {
             $('#terms-boxes').addClass('hidden');
             $('#ingredientInput').addClass('hidden');
             $('#cocktailNameInput').addClass('hidden');
             $('#beginingLetterInput').addClass('hidden');
             $('#idInput').addClass('hidden');
             $('#random-submit').removeClass('hidden');
             
         }
     })
 }


//Function for formating the api url depending on what radio button is selected
 function formatDrinkSearch() {
     let ingredientInput = document.getElementById('check-ingredient');
     let cocktailNameInput = document.getElementById('check-cocktail-name');
     let beginingLetterInput = document.getElementById('check-begining-letter');
     let idInput = document.getElementById('check-id');
     let checkRandom = document.getElementById('check-random');
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
     } else if (checkRandom.checked) {
         param = "random.php?";
     }

     
     return param;
 }

//function for puttong the url together and sending the fetch request
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

//function for displaying the results, depending on which radio button was selected
 function displayResults(responseJson) {
     $('#results-list').empty();
     let ingredientInput = document.getElementById('check-ingredient');
     let cocktailNameInput = document.getElementById('check-cocktail-name');
     let beginingLetterInput = document.getElementById('check-begining-letter');
     let idInput = document.getElementById('check-id');
     let checkRandom = document.getElementById('check-random');
     //maxResult is 15 because that is how many ingredients and measures the Json comes back with
     const maxResult = 15;
     let drink = responseJson.drinks;
     
     if (ingredientInput.checked) {
         //this is for the ingredient selection which has different information than the others
         for (let i = 0; i < drink.length; i++) {
             $('#results-list').append(
                 `<li><h3>${drink[i].strDrink}</h3><p><span>Drink ID: </span>${drink[i].idDrink}</p><p><img src="${drink[i].strDrinkThumb}" alt="${drink[i].strDrink}"></p>`)
         }
         $('#results').removeClass('hidden');
     } else if (cocktailNameInput.checked || beginingLetterInput.checked || idInput.checked || checkRandom.checked) {
         for (let i = 0; i < drink.length; i++) {
             $('#results-list').append(
                 `<li>
                    <div class="drink-list">
                        <div class="info">
                            <p><span>Drink Name: </span>${drink[i].strDrink}</p>
                            <p><span>Drink ID: </span>${drink[i].idDrink}</p>
                            <p><span>Category: </span>${drink[i].strCategory}</p>
                            <p><span>Non\/Alcoholic: </span>${drink[i].strAlcoholic}</p>
                            <p><span>Glass Type: </span>${drink[i].strGlass}</p>
                        </div>
                        <div class="drinkInstructions">
                            <p class="image half-width"><img src="${drink[i].strDrinkThumb}" alt="The Cocktail is  ${drink[i].strDrink}"></p>
                            <div class="drink-mix half-width">
                                <ul id="measurements-${i}"><b>Measurements</b></ul>
                                <ul id="ingredients-${i}"><b>Ingredients</b></ul>
                            </div>
                            <p class="instructions"><span>Instructions: </span>${drink[i].strInstructions}</p>
                        </div>
                    </div>
                </li>`)
             for (let j = 1; j <= maxResult; j++) {
                 //loops through and creates the list for the ingredients and measurements in the Json data. There are 15 for each.
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
 $(watchForm);
