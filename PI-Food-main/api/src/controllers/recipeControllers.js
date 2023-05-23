const {Recipe}=require ("../db");
require('dotenv').config();
const {
    DB_USER, DB_PASSWORD, DB_HOST,YOUR_API_KEY
  } = process.env;
const axios =require("axios");//interactua con el modelo 

const createRecipe= async (title,image,summary,healthScore,steps)=>{const newRecipe=await Recipe.create({title,image,summary,healthScore,steps});

return newRecipe//me devuelve una promesa por eso le pongo el await
}


const cleanArray=(array)=>
array.map((elemento)=>{
     return {
    id: elemento.id,
    title: elemento.title,
    image:elemento.image,
    summary:elemento.summary,
    healthScore:elemento.healthScore,
    steps:elemento.analyzedInstructions,
    diets: elemento.diets,
    created: false,

};
}); 
const getRecipeById=async (id, source)=>{
    const recipeRaw= source ==="api"?
    (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)).data.results

    : await Recipe.findAll({where:{id:id}});

    const  recipeFound=cleanArray(recipeRaw)

    const recipeFoundById=recipeFound.filter(recipe=> recipe.id==id)
    //const  apiresultados=cleanArray(recipeRaw);

    //const filteredApi=apiresultados.filter((recipe)=> recipe.id===id);
//console.log(recipeFoundById)
    return (recipeFoundById)
};








module.exports={
    createRecipe,
getRecipeById, 
createRecipe,
};