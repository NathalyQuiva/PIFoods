const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {
  getRecipeByName,
  getDetailRecipeById,
  postRecipe,
  getAllDiets,
}=require ("../handlers/RecipesHandlers")



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//router.use('/', routes);






router.get('/recipes/name',getRecipeByName);


router.get('/recipes/:id',getDetailRecipeById);


router.post("/recipes",postRecipe);

router.get("/diets",getAllDiets);

module.exports = router;
