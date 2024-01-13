import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import React, {useState} from "react"; 
import axios from 'axios';

let username = '';

export default  function Search(){
 
    const navigate = useNavigate();

    
    const [usernameColor, setusernameColor] = useState("black");  
    const [usernameHeader, setusernameHeader] = useState('Username'); 


     

    function CreateAccountIV()
    {
        const searchDB = async () => {
            // false = no duplicates found
          console.log("searchDB from clean is running"); 

            try {
                const response = await axios.post('http://localhost:3003/searchUserAccount', {username});
                  console.log('API successfully is searching for the username bro');
                  const { accountFound } = response.data;

                  return accountFound;
                  
              } catch (error) {
                console.error('Error API:', error);
              }
          };
          

        //username check
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<> ]/;
        if (username === '') {
            setusernameColor("red");
        } 
        else if(specialCharacterRegex.test(username))
        {
            setusernameHeader("Username NO SPCIAL CHARACTERS OR SPACES"); 
            setusernameColor("red");
        }
        
        else {

            const searchUsername = async () => {
                const result = await searchDB();
              
                if (result) {
                  setusernameColor("black");
                  setusernameHeader("Username");
                  //window.open('/profile');
                  navigate('/searchedProfile');
                  
                } else {

                  setusernameColor("red");
                  setusernameHeader("Username Not Found, Try Again");
                  
                }
              };
              
              searchUsername();

        }




    }
    
    return(
         
        <div>
            <h1 className="title" style={{ color: usernameColor, top: "40%" }}>{usernameHeader}</h1>  

            <div className='search' >

            <input type="text" className="input" placeholder="Search for Users" onChange={(event) => { username = event.target.value;  }} />


            <button className="login-button searchButton" onClick={CreateAccountIV}> <i className="fa-solid fa-magnifying-glass fa-2x" /></button>

        </div>   




    <Link to="/"><img src={require('./crossButton.png')} alt="CrossButton" className="crossButton"  /> </Link>
    
    <img src={require('./treasurePaper.png')} alt="sunButton" className="bgMenu"/>
    </div>


    )
}