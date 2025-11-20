import axios from "axios"
// دراین ای-پی -آی مدل های مختلفی برای سرچ و فیلتر غدا هست 
//در این سرویس این یو ار ال ها رو مدیریت میکنیم 
const BASE_URL= 'https://www.themealdb.com/api/json/v1/1'

export const searchMealByName=async(query)=>{
    const response= await axios.get(`${BASE_URL}/search.php?s=${query}`);
    return response.data.meals || []
};
 export const listAllMealsByFirstLetter=async(letter)=>{
    const response= await axios.get(`${BASE_URL}/search.php?f=${letter}`)
    return response.data.meals||[]
 };
  export const lookupFullMealDetailsById=async(id)=>{
    const response= await axios.get(`${BASE_URL}/lookup.php?i=${id}`)
    return response.data.meals||[]
 };
 export const lookUpAsingleRandomMeal=async()=>{
    const response= await axios.get(`${BASE_URL}/random.php`)
    return response.data.meals||[]
 };
   export const listAllMealCategories=async()=>{
    const response= await axios.get(`${BASE_URL}/categories.php`)
    return response.data.categories||[]
 };
 export const filterByMultiIngredient=async(ingredient)=>{
    const response=await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`)
    return response.data.meals||[]
 }