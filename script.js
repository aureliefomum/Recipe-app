//grab search form
const searchForm= document.querySelector('form');

//grab search-result div where the searches will appear
const searchResult = document.querySelector('.search-result');

//grab search button
const searchIcon = document.getElementById('search-icon')

//grab container of all search divs
const container = document.querySelector('.container');

//grab search value typed by user
let searchValue = '';

const APP_ID = '81953d04';
const APP_key = 'cdd7c5ad18ab2d20abbbae0c49627f8d';

// let ingredientBtn = document.querySelector('.view-ingredients')
// let ingredientText= document.querySelector('p.ingredients')

// ingredientBtn.addEventListener('click', (e) =>{
//     ingredientText.classList.toggle('show-ingredients')
// })


//add required parameters to baseURL(`https://api.edamam.com/search + ?q=searchTerm +  &app_id=${APP_ID} + &app_key=${APP_key}`)
//you can add &to=20 to get more than the default 10 results(`https://api.edamam.com/search + ?q=searchTerm +  &app_id=${APP_ID} + &app_key=${APP_key}&to=20 `)
// baseURL
//add '?q=' which is the search query
//add APP_ID
// const baseURL = `https://api.edamam.com/search?q=pizza&app_id=${APP_ID}&app_key=${APP_key}`;

//define function to determine that will determine what happens when the form is submitted
//e.preventDefault will prevent form from submitting by default
searchIcon.addEventListener('click', (e) =>{
    e.preventDefault();
    //e= event object, in this case the 'submit' event 
    const input = document.querySelector('#search-input');
    searchValue = input.value
    //grab and store search input entered by user in the searchValue variable below
     console.log("you clicked me, I'm the search icon")
     console.log(input.value)
    // searchValue = e.target.querySelector('input').value
    fetchAPI();
})

searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    //e= event object, in this case the 'submit' event 

    //grab and store search input entered by user in the searchValue variable below

    searchValue = e.target.querySelector('input').value
    fetchAPI();

    // if(searchValue){
    //     searchIcon.onclick =() =>{
    //         console.log("you clicked me, I'm the search icon")
    //         console.log(e)
    //     }
    // }
})


    




//create fetch API function

async function fetchAPI (){
    //add the base url
    const baseURL = `https://api.edamam.com/search?q=${searchValue}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;

    // grab the response from the fetch and store it in a variable. DONT FORGET 'await' keyword since you're using an async function
    const response = await fetch(baseURL);
    //console.log(response)
    //convert the response to JSON
    const data = await response.json();
    //call a generate HTML function where we will pass in the array of recipes(data.hits) we get back from the fetch API, 
    generateHTML(data.hits);
    console.log(data.hits);


}
//define the generateHTML function
function generateHTML(results){
    //remove styles initial class after user searches for a recipe
    container.classList.remove('initial')





    let generatedHTML = ''
    //copy the html for one card item and pass it into the map function. The map function will loop through each element in the Recipes Array and create a card for it, producing the generated HTML, at the end we will have 20 items, for the 20 recipes in our Recipe Array. 
    results.map(result =>{
        //console.log(result.recipe.ingredients[0].text)
        generatedHTML += `<div class="item">
        <img src="${result.recipe.image}" alt="${result.recipe.label}">
        <div class="flex-container">
           <h1 class="title">${result.recipe.label}</h1>
           <!-- add a button -->
           <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
        </div>
        <p class="item-data ingredients">Ingredients: ${(result.recipe.ingredients).map(el=>el.text)}</p>

        <h4 class="small-item-data">Diet Label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels: 'No Data Found'}</h4>
        <h4 class="small-item-data">Health Label: ${result.recipe.healthLabels}
        </h4>
        <h6 class="small-item-data">Calories: ${result.recipe.calories.toFixed(2)}Kcal</h6>
           
             
        
        
    </div>`
    })
//  <button class="view-ingredients">Show Ingredients</button>
    //now I need to append my 20 newly created cards to the parent div (' which I had already selected  and saved in const searchResult in line 5 above') in my HTML
    searchResult.innerHTML = generatedHTML;
}