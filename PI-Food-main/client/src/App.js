
import {Landing, Home, Detail, Form} from './views'//desestructuracion de un solo lugar
import NavBar from './components/NavBar/NavBar';
import {Routes,Route, useLocation, useNavigate} from 'react-router-dom'
import axios from 'axios';
import './App.css';
import { useState, useEffect } from 'react'
import {useSelector} from "react-redux"



function App() {
  const [recipe,setRecipe]= useState ({})
//const searchRecipeByName=(name)=>{
 // axios(`http://localhost:3003/recipes/name?=${name}`)
//}


const location= useLocation();
const navigate = useNavigate();


const onSearch = (id) => {
  axios(`http://localhost:3003/recipes/${id}`)

        .then((res) => {
           if (res.title) {
              setRecipe(res);
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
     {location.pathname !=="/" && <NavBar/>} 
     <Routes>
      <Route exact path ="/" element ={<Landing/>}/>
      <Route path ="/detail/:id"  element={<Detail/>}/>
      <Route path ="/create" element={<Form/>}/>
      <Route path = "/home" element = {<Home/>} />
    </Routes>
    </div>
  );
}
//{()=><Home />} />
export default App;
