import './App.css';
import { Link } from 'react-router-dom';
import React, {useState} from "react"; 
import {setLoggedIn, setIconNum}  from './app.jsx';
import axios from 'axios';

var username='', password='', foundUserNamee='', foundPasswordd=''; 

export default  function Login(){

    const [mainMessage, setmainMessage] = useState("Sign In")
    const [mainMessageColor, setmainMessageColor] = useState("black")

    function loginIVandCheck()
    {

        const checkSignInInfo = async () => {


            try {
                
                const response = await axios.post('http://localhost:3003/getSignUpInfo', {
                    username,
                    password,
                  });
               
                  const { foundUsername, foundPassword, foundIconNum } = response.data;
                  foundUserNamee = foundUsername;
                  foundPasswordd = foundPassword;
                  setIconNum(foundIconNum);  

                  console.log('API success');
              } catch (error) {
                console.error('Error API:', error);
              }
        
        
        }
        
        
        
        function errorMessage(color, message){    setmainMessageColor(color);   setmainMessage(message);   }

        if((username ==="") && (password === ""))
        {
            errorMessage("red", "USERNAME and PASSWORD is empty");
        }
        else if(username ==="")
        {
            errorMessage("red", "USERNAME is empty");
        }
        else if(password ==="")
        {
            errorMessage("red", "PASSWORD is empty");
        } 
        else
        {
            //no more input validations, final check 

            checkSignInInfo(); 

            setTimeout(() => {

                if (username === foundUserNamee && password === foundPasswordd) {
                    errorMessage("black", "Signed in successfully");
                    setLoggedIn(true);
                } else if (username !== foundUserNamee && password !== foundPasswordd) {
                    errorMessage("red", "Both USERNAME and PASSWORD are incorrect");
                } else if (username !== foundUserNamee) {
                    errorMessage("red", "USERNAME is incorrect");
                } else {
                    errorMessage("red", "PASSWORD is incorrect");
                }
 
            }, 200); 


            
            
        }
  

    }


    return(
        <div>
       <div className="login-container">
            <img src={require('./logo.png')} alt="Logo" className="logo" />
            <h2 className="sign-in-text"  style={{ color: mainMessageColor }}>{mainMessage}</h2>
            <input type="text" className="input" placeholder="Username" onChange={(event) => { username = event.target.value;  }}/>
            <input type="password" className="input" placeholder="Password"  onChange={(event) => { password = event.target.value;  }}/>

            <Link to="/createAccount"> <p className="link">Create Account</p> </Link>
            <Link to="/forgotPassword"> <p className="link">Forgot Password?</p> </Link>

            <button className="login-button"  onClick={() => loginIVandCheck()}>Login</button>
        </div>

        <Link to="/"><img src={require('./crossButton.png')} alt="CrossButton" className="crossButton"  /></Link>
        
        <img src={require('./treasurePaper.png')} alt="sunButton" className="bgMenu"/>
        </div>
    )
}