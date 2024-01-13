import './App.css';
import { Link } from 'react-router-dom';
import React, {useState} from "react"; 
import axios from 'axios';

var username='', password='', retypePassword='', sdob = '', sFavorite = '', sBestFriend = ''; 
let fUsernamee = '', fDobb = '', fFavoriteShoww = '', fBestFriendd ='';

function Success(){
    return(
    <> <br /><br />
    <h1 className="title" style={{top: "47%"}}> Password Changed Successfully</h1>
    </>
    )
 }

function ForgotPassword({ setPageIndex }){

    const [usernameColor, setusernameColor] = useState("black");  
    const [usernameHeader, setusernameHeader] = useState('Username'); 


     

    function CreateAccountIV()
    {
        const searchDB = async () => {
            // false = no duplicates found
          console.log("searchDB from clean is running"); 

            try {
                
                const response = await axios.post('http://localhost:3003/searchUsernameForgetPassword', {username});
               
                  const { fUsername, fDob, fFavoriteShow, fBestFriend} = response.data;
                 fUsernamee = fUsername;
                 fDobb = fDob; 
                 fFavoriteShoww = fFavoriteShow;
                 fBestFriendd = fBestFriend; 

                 console.log("imported data: " + fUsernamee + fDobb + fFavoriteShoww)


                  console.log('API success');
              } catch (error) {
                console.error('Error API:', error);
              }

              if(fUsernamee.length != 0)
                return true
             else
              return false;

             



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
                  setPageIndex(2)
                  
                } else {

                  setusernameColor("red");
                  setusernameHeader("Username Not Found, Try Again");
                  
                }
              };
              
              searchUsername();

        }




    }

    return(
        <>
        <h1 className="title">Forgot Password?</h1>  
        <div className="container minicontainer">
        <h2 className='left inputTitle' style={{ color: usernameColor }}> {usernameHeader} </h2>    
        <input type="text" className="left input" placeholder="Search Your Username" onChange={(event) => { username = event.target.value;  }} />   

        <button className="login-button containerButton" onClick={() => CreateAccountIV()}> <i className="fa-solid fa-magnifying-glass fa-3x"></i></button>
        </div>
        </>
    )

}



export function ResetPassword({ setPageIndex }){

    const updatingPass = async () => {
        const resetValuesAfterDelay = (usernameValue) => {
          setTimeout(() => {
            // Reset the values after 3 seconds
            username = '';
            password = '';
            retypePassword = '';
            sdob = '';
            sFavorite = '';
            sBestFriend = '';
            fUsernamee = '';
            fDobb = '';
            fFavoriteShoww = '';
            fBestFriendd = '';
          }, 3000);
        };
      
        try {
          await axios.post('http://localhost:3003/updatingPassword', { fUsernamee, password });
      
          // Pass the current username value to the resetValuesAfterDelay function
          resetValuesAfterDelay(fUsernamee);
          setPageIndex(4); 
      
          console.log('API success when updating password ' + fUsernamee);
        } catch (error) {
          console.error('Error API:', error);
        }
      };
      



    const [passwordColor, setpasswordColor] = useState("black");
    const [retypePasswordColor, setretypePasswordColor] = useState('black');

    const [passHeader, setpassHeader] = useState('Password'); 
    const [rpassHeader, setrpassHeader] = useState('Retype Password'); 

    let strongpass = false;
     

    function CreateAccountIV()
    {

        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<> ]/;

        //password check
        if(password === '') {
            setpasswordColor("red");
        } 
        else if (password.length < 8 )
        {
            setpasswordColor("red");
            setpassHeader("Password 8 CHARACTERS MINIMUM"); 
        }
        else if (!specialCharacterRegex.test(password))
        {
            setpasswordColor("red");
            setpassHeader("Password SPECIAL CHARACTER REQUIRED"); 
        }
        else {
            setpasswordColor("black");
            setpassHeader("Password"); 
            strongpass = true; 
        }

         //retyped password check
        if ((retypePassword === password) && (strongpass === true))
        {

            setretypePasswordColor("black");
            setrpassHeader("Retype Password"); 
            

            updatingPass(); 


        }
        else {

            setretypePasswordColor("red");
            setrpassHeader("Retype Password DON'T MATCH"); 

        }

    }



    return (
        <>
        <h1 className="title">New Password</h1>  
        <div className="container minicontainer">
        
        <h2 className='left inputTitle' style={{ color: passwordColor }}>{passHeader}</h2>
        <input type="password" className="left input" placeholder="Password" defaultValue={password} onChange={(event) => { password = event.target.value;  }}/>   

        <h2 className='left inputTitle' style={{ color: retypePasswordColor }}>{rpassHeader}</h2>
        <input type="password" className="left input" placeholder="Retype Password" defaultValue={retypePassword} onChange={(event) => { retypePassword = event.target.value;  }}/> 

            <div>
                <button className="login-button containerButton" onClick={() => CreateAccountIV()}> <i className="fa-solid fa-check fa-3x"></i></button>
            </div>
        </div>
        </>
    )
}


function SecuritySection({ setPageIndex }){

    const [sdobColor, setsdobColor] = useState("black"); 
    const [sFavoriteColor, setsFavoriteColor] = useState("black"); 
    const [sBestFriendColor, setsBestFriendColor] = useState("black"); 

    const [dobHeader, setdobHeader] = useState("Date of Birth (month/day/year)"); 
    const [showHeader, setshowHeader] = useState("What is your favorite book/movie/TV show?"); 
    const [bff, setBff] = useState("What is the name of your childhood best friend?"); 

    let dobCheck = false; let showCheck = false; let bffCheck = false; 

    function isValidDateFormat(dateString) {
        
        const dateFormatRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
    
        // Test the input string against the regex
        return dateFormatRegex.test(dateString);
    }

    function securityQuestionIV(){

        if (sdob === '' || !isValidDateFormat(sdob))
        {
            setsdobColor("red"); 
        }
        else
        {
            if(fDobb != sdob)
            {
                setdobHeader("Date of Birth Don't Match"); 
                setsdobColor("red");
            }
            else{
                setdobHeader("Date of Birth (month/day/year)"); 
                setsdobColor("black");
                dobCheck = true; 
            }
            
        }
        if (sFavorite === '')
        {
            setsFavoriteColor("red"); 
        }
        else
        {
            if(fFavoriteShoww != sFavorite)
            {
                setshowHeader("Book/Movie/TV show don't match"); 
                setsFavoriteColor("red"); 
                 
            }
            else{
                setshowHeader("What is your favorite book/movie/TV show?"); 
                setsFavoriteColor("black");
                showCheck = true; 
            }
             
        }
        if (sBestFriend === '')
        {
            setsBestFriendColor("red"); 
        }
        else
        {
            if(fBestFriendd != sBestFriend)
            {
                setBff("Friend's name don't match"); 
                setsBestFriendColor("red");  
            }
            else{
                setBff("What is the name of your childhood best friend?"); 
                setsBestFriendColor("black"); 
                bffCheck = true; 
            }
            
        }

        if ((bffCheck == true) && (showCheck = true) && (dobCheck == true) )
        {
            setPageIndex(3);
        }
    }
 

    return (
        <>
        <h1 className="title">Security Questions</h1>  
        <div className="container minicontainer">
        
        <h2 className='left inputTitle' style={{ color: sdobColor }}> {dobHeader} </h2>
        <input type="text" className="left input" placeholder="Ex: 12/31/2001" defaultValue={sdob} onChange={(event) => { sdob = event.target.value;  }}/>   

        <h2 className='left inputTitle' style={{ color: sFavoriteColor }}>{showHeader} </h2>
        <input type="text" className="left input" placeholder="book/movie/TV show?" defaultValue={sFavorite} onChange={(event) => { sFavorite = event.target.value;  }}/>   

        <h2 className='left inputTitle' style={{ color: sBestFriendColor }}>{bff}</h2>
        <input type="text" className="left input" placeholder="Friend's name" defaultValue={sBestFriend} onChange={(event) => { sBestFriend = event.target.value;  }}/>   

            <div>
                <button className="login-button containerButton" onClick={() => securityQuestionIV()}> <i className="fa-solid fa-check fa-3x"></i></button>
            </div>
        </div>
        </>
    )
}



export function ForgotPass(){

    const [pageIndex, setPageIndex] = useState(1); 


    return(
        <div>
            {pageIndex === 1 ? <ForgotPassword setPageIndex={setPageIndex} /> :
             pageIndex === 2 ? <SecuritySection setPageIndex={setPageIndex} /> :
             pageIndex === 3 ? <ResetPassword setPageIndex={setPageIndex}/> :
             pageIndex === 4 ? <Success /> :
             <h1 className="title">error</h1>}       


        <Link to="/login"><img src={require('./crossButton.png')} alt="CrossButton" className="crossButton"  /> </Link>
        
        <img src={require('./treasurePaper.png')} alt="sunButton" className="bgMenu"/>
        </div>
    )
}