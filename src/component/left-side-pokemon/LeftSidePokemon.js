import "./LeftSidePokemon.css"
import React, { useEffect, useState } from "react"
import pokemonLogo from "../../images/logoPokemon.png"
import { NavLink } from "react-router-dom"

function LeftSidePokemon({ mainPage, colorPage }) {
   
    return (
        <div className="pokemon-logo-wrapper-name">
            <img  src={pokemonLogo} className="logo-pokemon"/>
            <h1>Pokemon Card Checker</h1>
            <div className="different-pages">
                <div className="main-page-cover" onClick={mainPage}>
                    <NavLink to="/"><h1>Main page</h1></NavLink>
                </div>
                <div className="color-page-cover" onClick={colorPage}>
                      <NavLink to="/color-page"><h1>Color page</h1></NavLink>
                </div>
            </div>
        </div>
        

    )



}
export default LeftSidePokemon