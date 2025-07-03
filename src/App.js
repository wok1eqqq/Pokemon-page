import logo from './logo.svg';
import './App.css';
import PokemonCard from './component/pokemon-card/PokemonCard';
import Header from "./component/header/Header"
import PokemonList from './component/pokemon-list/PokemonList';
import LeftSidePokemon from './component/left-side-pokemon/LeftSidePokemon';
import ColorPage from './component/color-page/ColorPage'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState } from 'react';
function App() {
  const [displayShow, setDisplayShow] = useState(false);
  const onListSwitch = () => {
    setDisplayShow(true);
    localStorage.setItem("viewMode", "list");
  };

  const onBlockSwitch = () => {
    setDisplayShow(false);
    localStorage.setItem("viewMode", "block");
  };
  return (
    <BrowserRouter>
      <div className="header">
        <LeftSidePokemon />
        <div className="main-info">
          <Header changeList={onListSwitch} changeBlocks={onBlockSwitch} displayShow={displayShow} />
          <Routes>
            <Route path="/" element={<PokemonList displayShow={displayShow}/>} />
            <Route path="/pokemon-card/:id" element={<PokemonCard />} />
            <Route path="/color-page" element={<ColorPage/>} />
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}
//work
export default App;
