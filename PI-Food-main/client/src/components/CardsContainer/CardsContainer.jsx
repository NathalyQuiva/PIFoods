//Este componente debe tomar un array de usuarios y por cada usuario  renderizar un componente Card
import Card from "../Card/Card"
import style from "./CardsContainer.module.css"
import {useSelector} from "react-redux"



const CardsContainer = ({onClose})=>{
 // ir a buscar la propiedad recipes del objeto que esta en el estado global 

 const recipes=useSelector(state=>state.recipes)

    return(
        <div className={style.container}>
            {recipes.map(recipe=>{
                return <Card
                key={recipe.id}
                id={recipe.id}
                image={recipe.image}
                summary={recipe.summary}
                steps={recipe.steps}
                healthScore={recipe.healthScore}
                title={recipe.title}
                diets={recipe.diets}
                onClose={onClose}
                />
            })}


        </div>
    )

}

export default CardsContainer;