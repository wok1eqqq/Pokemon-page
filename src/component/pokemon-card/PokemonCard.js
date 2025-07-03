import "./PokemonCard.css"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import arrowBack from "../../images/icons/arrow_back.png"
import weight from "../../images/icons/weight.png"
import height from "../../images/icons/Vector.png"
import { NavLink } from "react-router-dom"
function PokemonCard() {
    
    const arr = [0, 0, 0, 0, 0, 0]

    const [pokemonData, setPokemonData] = useState(null)
     const { id } = useParams() //Это хук из библиотеки react-router-dom, который позволяет получить параметры из URL.
    useEffect(() => {
        async function fetchPokemonById() {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)

            if (response.ok == true) {
                const data = await response.json()
                setPokemonData(data)
                console.log(data)
            } else {
                console.error("Failed to fetch pokemons")
            }
        }
        fetchPokemonById()
    }, [id])
    function hectogramToKg(weight) {
        return weight / 10
    }
    const selectPokemonTypeColor = (type) => {
        switch (type.toLowerCase()) {
            case "bug":
                return "#A7B723";
                break;
            case "dark":
                return "#75574C";
                break;
            case "dragon":
                return "#7037FF";
                break;
            case "electric":
                return "#F9CF30";
                break;
            case "fairy":
                return "#E69EAC";
                break;
            case "fighting":
                return "#C12239";
                break;
            case "fire":
                return "#F57D31";
                break;
            case "flying":
                return "#A891EC";
                break;
            case "ghost":
                return "#70559B";
                break;
            case "normal":
                return "#AAA67F";
                break;
            case "grass":
                return "#74CB48";
                break;
            case "ground":
                return "#DEC16B";
                break;
            case "ice":
                return "#9AD6DF";
                break;
            case "poison":
                return "#A43E9E";
                break;
            case "psychic":
                return "#FB5584";
                break;
            case "rock":
                return "#B69E31";
                break;
            case "steel":
                return "#B7B9D0";
                break;
            case "water":
                return "#6493EB";
                break;
            default:
                return ""
        }
    }
    const addZero = (id) =>{
        if(id <10){
            return `00${id}`
        }else if(id>=10 && id<100){
            return `0${id}`
        }else{
            return id
        }
    }
    const firstCapitalLetter = (pokemon) =>{
        const  firstLetter = pokemon[0].toUpperCase()
        const secondPart = pokemon.slice(1, pokemon.length)
        return firstLetter + secondPart
    }
    const hexToRgba = (hex, alpha) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };
    const StatsBar = (value) => {
        const filledWidth = `${(value / 250) * 100}%`
        return filledWidth
    }
    return (

        (pokemonData ?
            <section id="pokemon-card-container">
                <div className="pokemon-card-wrapper" style={{ backgroundColor: `${selectPokemonTypeColor(pokemonData.types[0].type.name)}` }}>
                    <div className="pokemon-card-top-bar">
                        <div className="pokemon-called-wrapper">
                            <NavLink to="/"><img src={arrowBack} alt="pokemon" /></NavLink>
                            
                            <h2>{firstCapitalLetter(pokemonData.name)}</h2>
                        </div>
                        <h3># {addZero(pokemonData.id)}</h3>
                    </div>
                    <div className="pokemon-card-content">
                        <img className="pokemon-card-image" src={pokemonData.sprites.other["official-artwork"].front_default} alt="Pikachus" />
                        <div className="pokemons-abilities">
                            {pokemonData.types.length > 0 ?
                                pokemonData.types.map((item) => (
                                    <p style={{ backgroundColor: `${selectPokemonTypeColor(item.type.name)}` }}>{item.type.name}</p>
                                ))
                                :
                                <h1>loading</h1>
                            }
                        </div>

                        <div className="pokemon-description">
                            <h3 className="about-wrapper" style={{ color: `${selectPokemonTypeColor(pokemonData.types[0].type.name)}` }}>About</h3>
                            <div className="main-descr">
                                <div className="height-weight-name-wrapper">
                                    <div className="main-info-wrapper">
                                        <img src={weight} className="weight-img" />
                                        <p>{hectogramToKg(pokemonData.weight)} kg</p>
                                    </div>
                                    <p>Weight</p>
                                </div>
                                <div class="create-line"></div>
                                <div className="height-weight-name-wrapper">
                                    <div className="main-info-wrapper">
                                        <img src={height} className="height-img" />
                                        <p>{pokemonData.height} m</p>
                                    </div>
                                    <p>Height</p>
                                </div>
                                <div class="create-line"></div>
                                <div className="height-weight-name-wrapper">
                                    <div className="main-info-weight-wrapper">
                                        {pokemonData.moves.length > 0 ? (
                                            pokemonData.moves.slice(0, 2).map((item) => (
                                                <p>{item.move.name}</p>
                                            ))
                                        ) : (
                                            <h1>Loading...</h1>
                                        )}
                                    </div>
                                    <p>Moves</p>
                                </div>
                            </div>

                        </div>
                        <div className="pokemon-info-description-wrapper">
                            <p>There is a plant seed on its back right from the day this<br />
                                Pokémon is born. The seed slowly grows larger.</p>
                        </div>
                        <div className="pokemon-statistics">
                            <h3 style={{ color: `${selectPokemonTypeColor(pokemonData.types[0].type.name)}` }}>Base Stats</h3>
                            <div className="overall-skills">
                                <div className="skills" style={{ color: `${selectPokemonTypeColor(pokemonData.types[0].type.name)}` }}>
                                    <p>HP</p>
                                    <p>ATK</p>
                                    <p>DEF</p>
                                    <p>SATK</p>
                                    <p>SDEF</p>
                                    <p>SPD</p>
                                </div>
                                <div class="create-line2"></div>
                                <div className="skills-exp">
                                    {pokemonData.stats.map((item) => (
                                        <div className="skills-info">
                                            <p >{addZero(item.base_stat)} </p>
                                            <div className="skills-progress-bar-bg" style={{ backgroundColor: hexToRgba(`${selectPokemonTypeColor(pokemonData.types[0].type.name)}`, 0.2) }}>
                                                <div className="skills-progress-fill" style={{

                                                    width: StatsBar(item.base_stat),
                                                    backgroundColor: hexToRgba(`${selectPokemonTypeColor(pokemonData.types[0].type.name)}`, 1)
                                                }}></div>
                                            </div>
                                        </div>
                                    ))}
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            :
            <h1>loading</h1>
        )


    )
}
export default PokemonCard