// este componente debe mostrar la info de cada usuario mapeado pero ademas darnos un link para ir al dealle del usuario en cuestion 
import {Link} from 'react-router-dom'
import style from "./Card.module.css"
import {useSelector} from "react-redux"

const Card =({id,title,image,summary,healthScore,steps,diets,onClose})=>{

   
    return (
        <div className={style.card}>
             <Link to={`/detail/${id}`}>
            <h2>{title}</h2>
         </Link>

            <img src={image} alt='' />
            <p>Diets: {diets}</p>
        </div>
    )
};

export default Card