import React, { useState } from 'react';
import './App.css';
import Menu from "./menu"; 
import {isLoggedIn, getIconNum}  from './app.jsx';
import {isNightModeOn} from "./bgComponent";



export default function Sun() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  var nightMode = isNightModeOn(); 

  const openMenu = () => {
    setIsMenuOpen(true);
  }

  const clossMenu = () => {
    setIsMenuOpen(false);
  }

  function CrossButton(){
    return (
      <img src={require('./crossButton.png')} alt="CrossButton" className="crossButton" onClick={clossMenu} />
    );
  }
  return (
    <div>
      
      <img
        src={nightMode ? require('./moonButton.png') : require('./sunButton.png')}
        alt="sunButton"
        className="sunButton"
        onClick={openMenu}
      />
      {isLoggedIn() && <img src={require(`./assets/customization/jolly${getIconNum()}.png`)} alt="ship" className="jollyRogerIcon" /> }; 
      {isMenuOpen && (
        <div>
          <Menu />
          <CrossButton />
        </div>
      )}
    </div>
  )
  }
