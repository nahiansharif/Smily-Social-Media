import './App.css';
import { Link } from 'react-router-dom';
import {isLoggedIn, setLoggedIn}  from './app.jsx';

export default function Menu() {

  return (
    <div>
        
        <h1 className="title">Menu</h1>   
          
          <div className='menuItems'> 
               

            {isLoggedIn() ? (
            <>
            <div>
              <Link to="/search">
                <button className="login-button">
                  <i className="fa-solid fa-magnifying-glass fa-5x eachButton" />
                </button>
              </Link>
              <Link to="/profile">
                <button className="login-button">
                  <i className="fa-solid fa-address-card fa-5x eachButton" />
                </button>
              </Link>
            </div>
            <div>
              <Link to="/notifications">
                <button className="login-button">
                  <i className="fa-solid fa-bell fa-5x eachButton" />
                </button>
              </Link>
              <Link to="/settings">
                <button className="login-button">
                  <i className="fa-solid fa-screwdriver-wrench fa-5x eachButton" />
                </button>
              </Link>
            </div>
            <Link to="/login">
                <button className="login-button" onClick={() => { setLoggedIn(false)} }>
                  <i className="fa-solid fa-power-off fa-5x eachButton" />
                </button>
              </Link>
           
            </>
          ) : (
            <>
              <Link to="/search">
                <button className="login-button">
                  <i className="fa-solid fa-magnifying-glass fa-5x eachButton" />
                </button>
              </Link>
              <Link to="/login">
                <button className="login-button">
                  <i className="fa-solid fa-circle-user fa-5x eachButton" />
                </button>
              </Link>
            </>
          )}



        </div>
        <img src={require('./treasurePaper.png')} alt="sunButton" className="bgMenu"/>
      
      



    </div>
  )
  
}
