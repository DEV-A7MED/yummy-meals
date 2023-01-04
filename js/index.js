let rowData = document.getElementById("rowData");
let searchContainer = document.getElementById("searchContainer");
let submitBtn;
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})
function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)
    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 8) * 100)
    }
}
function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({
        top: 500
    }, 500)
}
closeSideNav();
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})

function displayMeals(arr) {
    let mealsCards = "";
    for (let i = 0; i < arr.length; i++) {
        mealsCards += `
                        <div class="col-md-3">
                            <div onclick="getMealDetails('${arr[i].idMeal}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                                <img class="w-100" src="${arr[i].strMealThumb}" alt="" srcset="">
                                <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                                    <h3>${arr[i].strMeal}</h3>
                                </div>
                            </div>
                        </div>
                    `
    }

    rowData.innerHTML = mealsCards;
}
async function searchByName(term) {
    closeSideNav()
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    $(".inner-loading-screen").fadeOut(300)

}


async function getCategories() {
    rowData.innerHTML = "";
    $(".inner-loading-screen").fadeIn(300);
    searchContainer.innerHTML = "";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    response = await response.json();

    displayCategories(response.categories);
    $(".inner-loading-screen").fadeOut(300);

}

function displayCategories(arr) {
    let categoriesCard = "";

    for (let i = 0; i < arr.length; i++) {
        categoriesCard += `
        <div class="col-md-3">
                <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${arr[i].strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>
                    </div>
                </div>
        </div>
        `
    }

    rowData.innerHTML = categoriesCard;
}
$('.categoryBtn').click(()=>{
    getCategories(); 
    closeSideNav()
})

async function getArea() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayArea(respone.meals)
    $(".inner-loading-screen").fadeOut(300)

}
function displayArea(arr) {
    let areaCard = "";

    for (let i = 0; i < arr.length; i++) {
        areaCard += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>
        `
    }

    rowData.innerHTML = areaCard;
}
$('.areaBtn').click(()=>{
    getArea(); 
    closeSideNav()
})

async function getIngredients() {
    rowData.innerHTML = ""
    $(".inner-loading-screen").fadeIn(300)

    searchContainer.innerHTML = "";

    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    respone = await respone.json()
    console.log(respone.meals);

    displayIngredients(respone.meals.slice(0, 20))
    $(".inner-loading-screen").fadeOut(300)

}


function displayIngredients(arr) {
    let ingredientsCard = "";

    for (let i = 0; i < arr.length; i++) {
        ingredientsCard += `
                        <div class="col-md-3">
                                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                                        <h3>${arr[i].strIngredient}</h3>
                                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                                </div>
                        </div>
                    `
    }

    rowData.innerHTML = ingredientsCard;
}
$('.ingrediantsBtn').click(()=>{
    getIngredients(); 
    closeSideNav()
})

