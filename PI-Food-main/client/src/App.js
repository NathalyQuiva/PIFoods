
import {Landing, Home, Detail, Form} from './views'//desestructuracion de un solo lugar
import NavBar from './components/NavBar/NavBar';
import {Routes,Route, useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react'
import {useSelector} from "react-redux"
import { useParams } from 'react-router-dom';



function App() {
  const location=useLocation
  const [recipe,setRecipe]= useState ([])
//const searchRecipeByName=(name)=>{
 // axios(`http://localhost:3003/recipes/name?=${name}`)
//}


const navigate = useNavigate();


const onSearch = (id) => {
  console.log(axios(`https://api.spoonacular.com/recipes/${id}/information?apiKey=56926b30da644d699d13c4a29e81df1a`))
.then(res=>res.data)
        .then((data) => {
           if (data.title) {
              setRecipe([data]);
           } else {
              window.alert('No hay recetas con ese ID');
           }
        });
    }

    const recipes=useSelector(state=>state.recipes)

    const onClose = (id) => {
      const recipesFiltered = recipes.filter(recipe => recipe.id !== id)
      setRecipe(recipesFiltered)
   }

  return (
    <div className="App">
     {
     location.pathname !=="/" && <NavBar onSearch={onSearch}/>} 
     <Routes>
      <Route exact path ="/" element ={<Landing/>}/>
      <Route path ="/detail/:id"  element={<Detail/>}/>
      <Route path ="/create" element={<Form/>}/>
      <Route path = "/home" element = {<Home/>} onClose={onClose}/>
    </Routes>
    </div>
  );
}
//{()=><Home />} />
export default App;
