require('dotenv').config();
const {
    DB_USER, DB_PASSWORD, DB_HOST,YOUR_API_KEY
  } = process.env;

const { Recipe, Diet} =  require("../db");
const { createRecipe, getRecipeById} = require("../controllers/recipeControllers");

const axios=require ("axios");
const { INTEGER, UUID } = require('sequelize');


const cleanArray= (array)=>
array.map((elemento)=>{
        return {
            id: elemento.ID,
            title: elemento.title,
            image:elemento.image,
            summary:elemento.summary,
            healthScore:elemento.healthScore,
            steps:elemento.analyzedInstructions,
            diets: elemento.diets,
            created: false,



        };
    });


const searchRecipeByName=async(title)=>{
    const databaseRecipes= await Recipe.findAll({where:{title:title}});

    const apiresultadosRaw= (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)).data.results


    const  apiresultados=cleanArray(apiresultadosRaw);

    const filteredApi=apiresultados.filter((recipe)=> recipe.title===title);

    return [...filteredApi,...databaseRecipes];

};

const getAllRecipes= async (req,res)=>{
    const databaseRecipes= await Recipe.findAll();

    const apiresultadosRaw= (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`)).data.results


    const  apiresultados=cleanArray(apiresultadosRaw);
    return [...databaseRecipes,...apiresultados];
}





const getRecipeByName =async (req,res)=>{
    const {title}= req.query;
    
    const resultsOfTittle= title ? await searchRecipeByName (title): await getAllRecipes ();
    
    res.status(200).json(resultsOfTittle);
};

const getDetailRecipeById =async (req,res)=>{
    const {id}=req.params;
    const source=isNaN(id) ?"bdd":"api";
    try {
        const recipe= await getRecipeById(id,source);
        res.status(200).json(recipe)
    } catch (error) {
        res.status(400).json({error:error.message});
        res.send(error.message);
    }
};

const postRecipe = async (req,res)=>{
   
   try {
    const {id,title,image,summary,healthScore,steps,diets}=req.body;
    const newRecipe= await Recipe.create({
        id: id,
        title: title,
        image: image,
        summary: summary,
        healthScore: healthScore,
        steps: steps,
        diets:diets});
    res.status(201).json("Receta creada exitosamente");
   } catch (error) {
    res.status(400).json({error:error.message});
   } 
};//cuando creo el usuario le envio la info por body






const getAllDiets = async (req,res)=>{
    try {
      const apiData= (await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=16e32c6bda9442048aefad32a34fbd3b&addRecipeInformation=true&number=100`)).data.results
      
    if (!apiData){
        throw new Error ("No se encontro informacion en la base api");
    }

    const arrayDiets= apiData.map((recipe)=>recipe.diets).flat();
    
    const apiDiets= [... new Set(arrayDiets)];


//Con el siguiente for llene la base de datos, pero la tuve que comentar por que cada vez que el servidor llamaba al endpoint diets se ejecutaba y lanzaba un error de que ya los ids existian.

  //  for (let i=0; i<apiDiets.length; i ++){
   // const diet= Diet.create({
   // id:i,
   // name: apiDiets[i],
//})}

   
const allDiets= await Diet.findAll();
//console.log(allDiets)
res.status(201).json(allDiets)

//return (allDiets);
} catch (error) {
        res.status(400).json({error:error.message});
    }
    
};


module.exports={
    getRecipeByName,
    getDetailRecipeById,
    postRecipe,
    getAllDiets,
};

   //res.status(201).json(apiDiets)
//apiDiets.forEach(async diets=>{
   // await Diet.create({
     //   name: diets
    //})
//})
  // await Promise.all(
    //apiDiets.map(async (diet)=> {
       // await Diet.create({id: diet., name:diet})
       // })
   //)