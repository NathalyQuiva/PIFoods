import axios from "axios"
export const GET_RECIPES= "GET_RECIPES"
export const GET_RECIPE= "GET_RECIPE"
export const  FILTER_BY_SOURCE="FILTER_BY_SOURCE"
export const POST_RECIPE= "POST_RECIPE"

export const getRecipes=()=>{
    return async function (dispatch) {
        const apiData= await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=16e32c6bda9442048aefad32a34fbd3b&addRecipeInformation=true&number=100");

        const recipes =apiData.data.results;

        dispatch ({type: GET_RECIPES,payload: recipes});

    };
};


export const createRecipe = (form)=>{
  return async function (dispatch) {
    const database = await axios.post("http://localhost:3003/recipes",form)

    const post =database;
    console.log (post);

    dispatch ({type: POST_RECIPE,payload: post});

    //return post
  }
}
//para el recipe detail:

//export const getRecipe=(id)=>{
//return async function(dispatch){
 // const apiData= await axios.get(`http://localhost:3003/recipes/${id}`)
 // .then(()=>{
   // console.log("funciona")
  //})

  //dispatch({type: GET_RECIPE, payload: apiData});
  // };
//};



//PARA FILTRAR dietas POR ORIGEN

//export const filterDietsBySource=()=>{
//    dispatch({type: FILTER_BY_SOURCE})
//}



