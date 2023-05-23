import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
export const POST_RECIPE= "POST_RECIPE"
//import {createRecipe } from "../../redux/actions"
const Form =()=>{
    const dispatch= useDispatch();
    //useEffect(()=>{
        //dispatch(createRecipe(form))
//},[form])

    const [form, setForm] =useState({
        id:"",
        title:"",
        image:"",
        summary:"",
        healthScore:"",
        steps:"",
        diets:""
    })


const [errors, setErrors]=useState({});

const handleChange = (event) => {
     setErrors(validation({
        ...form,
        [event.target.name]: event.target.value
    }))
    
    setForm({
        ...form,
        [event.target.name]: event.target.value
    })


   
}

const validation =(form) =>{
    const errors = {};

    if(!/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/.test(form.id)){
        errors.id= 'El formato no corresponde a UUID'
    }



    if(form.title.length < 5 || form.title.length > 300){
        errors.title = 'El nombre debe tener un tamaño entre 5 y 300 caracteres'
    }



    if(!/.(gif|jpeg|jpg|png)$/i.test(form.image)){
        errors.image = 'El formato del link imagen no es válido';
    }
    if(!form.image){ 
        errors.image= 'Debe ingresar un link de imagen'}


    if(form.summary.length > 500 ){
        errors.summary = 'El resumen no debe exceder los 500 caracteres'}



    if(form.healthScore <0 || form.healthScore >5000){
        errors.healthScore = 'El nivel de comida saludable debe estar entre 0 y 5000'}

    if(form.steps.length > 2000 ){
        errors.steps = 'Los pasos no deben exceder los 2000 caracteres'}
            
    return errors;
};

const handleSubmit = (event) => {
    event.preventDefault()
    
    axios.post("http://localhost:3003/recipes",form)
    .then(res=>alert(res))
    //login(form);
}

 
    return (
        <form >
            
        <label htmlFor="text">Id: </label>
        <input type = "text" name="id" value ={form.id} onChange={handleChange}/>
        {errors.id && <p>{errors.id}</p>} 
        <hr/>

        <label htmlFor="text">Title: </label>
        <input type = "text" name="title" value ={form.title} onChange={handleChange}/>
        {errors.title && <p>{errors.title}</p>} 
        <hr/>

        <label htmlFor="text">Image: </label>
        <input type = "text"  name="image" value={form.image}  onChange={handleChange}/> 
        {errors.image && <p>{errors.image}</p>} 
        <hr/>

        <label htmlFor="text">Summary: </label>
        <input type = "text"  name="summary" value={form.summary}  onChange={handleChange}/> 
        {errors.summary && <p>{errors.summary}</p>} 
        <hr/>

        <label htmlFor="text">Health Score: </label>
        <input type = "text"  name="healthScore" value={form.healthScore}  onChange={handleChange}/> 
        {errors.healthScore && <p>{errors.healthScore}</p>} 
        <hr/>


        <label htmlFor="text">Steps: </label>
        <input type = "text"  name="steps" value={form.steps}  onChange={handleChange}/> 
        {errors.steps && <p>{errors.steps}</p>} 
        <hr/>

        
        <label htmlFor="text">Diets: </label>
        <input type = "text"  name="diets" value={form.diets}  onChange={handleChange}/> 
        {errors.diets && <p>{errors.diets}</p>} 
        <hr/>

        <button onSubmit={handleSubmit}  >Submit</button>

        </form>
    )





};

export default Form;