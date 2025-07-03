import "./PokemonList.css"
import React, { useEffect, useState } from "react"

import arrowForward from "../../images/icons/arrowForward.svg"
import arrowBack from "../../images/icons/arrowBack.svg"
import { NavLink } from "react-router-dom"

function PokemonList({displayShow}) {
    const [page, setPage] = useState(1);
    const [viewMode, setViewMode] = useState("list");
      
    useEffect(() => {
    //   console.log(displayShow)
    }, [displayShow]);

    const handlePrev = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const handleNext = () => {
        setPage(page + 1);
    };

    const [pokemons, setPokemons] = useState([])
    useEffect(() => {
        async function getAllPokemons() {
            const limit = 15;
            const offset = (page - 1) * limit;

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`);
            if (response.ok == true) {
                const jsonData = await response.json();
                // console.log(jsonData)
                const pokemonListData = await Promise.all(
                    jsonData.results.map(async (pokemonItem) => {
                        const pokemonResponse = await fetch(pokemonItem.url);

                        if (pokemonResponse.ok == true) {
                            const pokemonJsonData = await pokemonResponse.json()

                            return pokemonJsonData
                        }
                    })
                )
                setPokemons(pokemonListData)
                // console.log(pokemonListData)
            }
        }
        getAllPokemons();
    }, [page])

    const firstCapitalLetter = (pokemon) => {
        const firstLetter = pokemon[0].toUpperCase()
        const secondPart = pokemon.slice(1, pokemon.length)
        return firstLetter + secondPart
    }
    const addZero = (id) => {
        if (id < 10) {
            return `00${id}`
        } else if (id >= 10 && id < 100) {
            return `0${id}`
        } else {
            return id
        }
    }
    


    return (
        <>
        {displayShow === false ?
                        <div className={`block-style`}>
                    
                        {pokemons.map((pokemon) => (
                              <NavLink to={`/pokemon-card/${pokemon.id}`} className="links">
                            <div className={`pokemon-card `}>
                                <div className="pokemon-id-wrapper">
                                    <h3># {addZero(pokemon.id)}</h3>
                                </div>
                               
                            <img
                                    className="pokemon-image"
                                    src={pokemon.sprites.other["official-artwork"].front_default}
                                    alt={pokemon.name}
                                />
                                <h2 className="pokemon-called">{firstCapitalLetter(pokemon.name)}</h2>
                                <div className="second-part"></div>
                            </div>
                            </NavLink>
                        ))}
                        <div className="pagination-container">
                            <button onClick={handlePrev} className="pagination-button"><img src={arrowBack} /></button>
                            <span className="pagination-page">{page}</span>
                            <button onClick={handleNext} className="pagination-button"><img src={arrowForward} /></button>
                        </div>
                    </div>
                    :
                    <div className={`list-style `}>
                    
                    {pokemons.map((pokemon) => (
                        <NavLink to={`/pokemon-card/${pokemon.id}`} className="links">
                        <div className={`pokemon-card-list `}>
                            <div className="pokemon-id-wrapper-list">
                                <h3># {addZero(pokemon.id)}</h3>
                                <h2 className="pokemon-called">{firstCapitalLetter(pokemon.name)}</h2>
                            </div>
                            
                         
                            
                            <div className="second-part-list"><img
                                className="pokemon-image"
                                src={pokemon.sprites.other["official-artwork"].front_default}
                                alt={pokemon.name}
                            /></div>
                        </div>
                        </NavLink>
                    ))}
                    <div className="pagination-container">
                        <button onClick={handlePrev} className="pagination-button"><img src={arrowBack} /></button>
                        <span className="pagination-page">{page}</span>
                        <button onClick={handleNext} className="pagination-button"><img src={arrowForward} /></button>
                    </div>
                </div>
        }
        </>


    )






}
export default PokemonList