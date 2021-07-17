
const searchForm= document.querySelector('form');
const searchResult = document.querySelector('.search-result');
const searchIcon =document.getElementById('search-icon')
const container = document.querySelector('.container');
let searchValue = '';

const APP_ID = '81953d04';
const APP_key = 'cdd7c5ad18ab2d20abbbae0c49627f8d';


searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    searchValue = e.target.querySelector('input').value
    fetchAPI();
})

async function fetchAPI (){
    
    const baseURL = `https://api.edamam.com/search?q=${searchValue}&app_id=${APP_ID}&app_key=${APP_key}&to=20`;    
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data.hits);
}

function generateHTML(results){
       container.classList.remove('initial')
    let generatedHTML = ''
    
    results.map(result =>{
        
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

    searchResult.innerHTML = generatedHTML;
}
