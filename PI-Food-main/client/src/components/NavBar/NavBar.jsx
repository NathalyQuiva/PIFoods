import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import SearchBar from "../SearchBar/Searchbar";
const NavBar =({onSearch})=>{
    return (
        <nav className={style.mainContainer}>
            <SearchBar onSearch={onSearch}/>
            <Link to ="/home">HOME</Link>
            <Link to ="/create">FORM</Link>
        </nav>
    )
};

export default NavBar;
