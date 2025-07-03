import "./Header.css"
import React, { useEffect, useState } from "react"
import search from "../../images/icons/search.svg"
import menu from "../../images/icons/menu.svg"
import blocks from "../../images/icons/blocks.svg"
import { NavLink } from "react-router-dom"

function Header({ changeList, changeBlocks, displayShow }) {
    const [pokemonCount, setPokemonCount] = useState(0)
    const [pokemons, setPokemons] = useState([])
    const [showPokemonSearchList, setShowPokemonSearchList] = useState(false)
    const [pokemonSearchList, setPokemonSearchList] = useState([])


    useEffect(() => {
        async function getAllPokemons() {
            const limit = 10000

            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=0`);
            if (response.ok == true) {
                const jsonData = await response.json();
                console.log(jsonData.results)
                const count = jsonData.count
                setPokemonCount(count)
                setPokemons(jsonData.results)
            }

        }
        getAllPokemons();
    }, [])

    const firstCapitalLetter = (pokemon) => {
        const firstLetter = pokemon[0].toUpperCase()
        const secondPart = pokemon.slice(1, pokemon.length)
        return firstLetter + secondPart
    }
    const [inputValue, setInputValue] = useState("")
    const onSearchInputChange = (event) => {
        const value = event.target.value
        setInputValue(value)
    }
    const onClickInputSearch = () => {
        if (inputValue.length > 0) {
            const filtered = pokemons.filter((pokemon) =>
                pokemon.name.includes(inputValue.toLowerCase())
            )
            setPokemonSearchList(filtered)
            setShowPokemonSearchList(true)
        } else {
            setPokemonSearchList([])
            setShowPokemonSearchList(false)
        }
    }
    const pokemonSearchOff = () =>{
        setShowPokemonSearchList(false)
    }
    return (
        <div id="main-wrapper-header">
            <div className="main-wrapper">
                <div className="title">
                    <h1>Pokemons {pokemonCount}</h1>
                </div>
                <div className="search-pokemons">
                    <input onChange={onSearchInputChange} />

                    <button className="search-button" onClick={onClickInputSearch}><img src={search} className="search-button-image" /></button>
                    {showPokemonSearchList == true ?  
                        <div className="pokemon-search-wrapper">
                            {pokemonSearchList.length > 0 ? (
                                pokemonSearchList.map((pokemon) => (
                                    <div className="auto-pokemon-searcher" >
                                        <NavLink to={`/pokemon-card/${pokemon.name}`} onClick={pokemonSearchOff}>
                                            <h1>{firstCapitalLetter(pokemon.name)}</h1>
                                        </NavLink>
                                    </div>
                                ))
                            ) : (
                                <h2>No results</h2>
                            )}
                        </div>
                         :
                         null
                    }
                </div>
                <div className="filters-pokemons">
                    <div className="lists" onClick={changeList}> <button className={`list ${displayShow ? "select-switch" : ""}`}><img src={menu} className="blocks-image" /> <p>List</p></button></div>
                    <div onClick={changeBlocks} ><button className={`blocks list ${!displayShow ? "select-switch" : ""}`}><img src={blocks} className="blocks-image" /><p>Blocks</p></button></div>
                </div>
            </div>

        </div>


    )
}
export default Header