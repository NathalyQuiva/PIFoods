import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {getRecipes } from "../../redux/actions";
import {useSelector} from "react-redux"
import style from "./Home.module.css"
import {Link} from 'react-router-dom'


const Home = (props,onClose)=>{
//cuando se monta que haga el dispatch
//useEffect() maneja ciclo de vida, para decirle que hacer cuando se monta u useDispatch despacha la accion 

const dispatch= useDispatch();
useEffect(()=>{
    dispatch(getRecipes())
},[])

const RECIPES_PER_PAGE= 10;

const recipes=useSelector(state=>state.recipes)

const recipesPage= recipes.map((recipe, index)=>{
    return <div className={style.card}
    key={recipe.id}>
   <Link to={`/detail/${recipe.id}`}>
            <h2>{recipe.title}</h2>
         </Link>
    <img src={recipe.image} alt={recipe?.title} />
    <h3>Diets: {recipe?.diets}</h3></div>
})
const [recipesFromServer,setRecipesFromServer]=useState(recipesPage)

const[recipesPerPage,setRecipesPerPage]=useState([...recipesPage].splice(0,RECIPES_PER_PAGE))

const [currentPage, setCurrentPage]=useState(0)



const nextHandler=()=>{
    const totalElements=recipesPage.length;
    const nextPage= currentPage+1;
    const firtsIndex= nextPage* RECIPES_PER_PAGE;
    if(firtsIndex===totalElements) return;

    setRecipesPerPage([...recipesFromServer].splice(firtsIndex,RECIPES_PER_PAGE));

    setCurrentPage(nextPage)

}  


const prevHandler=()=>{
    const prevPage= currentPage-1;
    if (prevPage<0) return;
    const firtsIndex= prevPage*RECIPES_PER_PAGE;
    setRecipesPerPage([...recipesFromServer].splice(firtsIndex,RECIPES_PER_PAGE));

    setCurrentPage(prevPage)
}
//const currentPage={0};

return (
        <>

            

           
<h1>¡THE MOST HEALTHY RECIPES ARE HERE NOW!</h1>
<h2>PAGE {currentPage} OF 9 PAGES</h2>
            <button onClick={prevHandler}>Prev</button>

            <button onClick={nextHandler}>Next</button>

            

            <ul>
                {recipesPerPage}
            </ul>
        </>
    )
};

export default Home;