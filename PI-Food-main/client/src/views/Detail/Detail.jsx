import axios from 'axios'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';



const Detail =()=>{
    const {id}=useParams()
    const [recipe,setRecipe]= useState ([])

    useEffect(() => {
        axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=16e32c6bda9442048aefad32a34fbd3b`)
        .then(response => response.data)
        
        .then((data) => {
           if (data.title) {
              setRecipe(data);
           } else {
              window.alert('No hay recetas con ese ID');
           }
        });
        return setRecipe([]);
    }, [id]);

   
 


    return(
        <div>
            <h2>{recipe?.title}</h2>
            <img src={recipe.image} alt={recipe?.title} />
            <h3>Id: {recipe?.id}</h3>
            <h3>Summary: {recipe?.summary}</h3>
            <h3>Health Score:{recipe?.healthScore}</h3>
            <h3>Steps: {recipe?.instructions}</h3>
            <h3>Diets: {recipe?.diets}</h3>
           

        </div>
    )
}

export default Detail;