import CardsContainer from "../../components/CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {getRecipes } from "../../redux/actions";

const Home = (onClose)=>{
//cuando se monta que haga el dispatch
//useEffect() maneja ciclo de vida, para decirle que hacer cuando se monta u useDispatch despacha la accion 
const dispatch= useDispatch();
useEffect(()=>{
    dispatch(getRecipes())
},[])



    return (
        <>

            <h1> HEALTHY RECIPES </h1>
            <CardsContainer/>
        </>
    )
};

export default Home;