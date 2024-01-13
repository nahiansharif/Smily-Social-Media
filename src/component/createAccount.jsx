import './App.css';
import { Link } from 'react-router-dom';
import React, {useState} from "react"; 
import axios from 'axios';

var username = '', password = '', retypePassword = '', sdob = '', sFavorite = '', sBestFriend = '', pName = '', pAbout = '', pHobby = ''; 
var jollyRoger = 1, ship = 1; 
  const anotherresetValues = () => {
    username = ''; password = ''; retypePassword = ''; sdob = ''; sFavorite = ''; sBestFriend = ''; pName = ''; pAbout = ''; pHobby = ''; 
    jollyRoger = 1; ship = 1;
  }; 
const resetValues = async () => {

    const resetValuesAfterDelay = () => {
        setTimeout(() => {
            // Reset the values after 3 second
            username = ''; password = ''; retypePassword = ''; sdob = ''; sFavorite = ''; sBestFriend = ''; pName = ''; pAbout = ''; pHobby = ''; 
            jollyRoger = 1; ship = 1; 
        }, 100); 
    };
    
    console.log("saving info to db")

    
    
    

    try {
        await axios.post('http://localhost:3003/saveCreatedUserAccount', {
            username,
            password,
            sdob,
            sFavorite,
            sBestFriend,  
            pName,
            pAbout,
            pHobby,
            jollyRoger,
            ship
        });
        
        resetValuesAfterDelay();
        console.log('API success');
      } catch (error) {
        console.error('Error API:', error);
      }


}


function UsernamePassword({ setPageIndex }){

    const [usernameColor, setusernameColor] = useState("black");  
    const [passwordColor, setpasswordColor] = useState("black");
    const [retypePasswordColor, setretypePasswordColor] = useState('black');

    const [usernameHeader, setusernameHeader] = useState('Username'); 
    const [passHeader, setpassHeader] = useState('Password'); 
    const [rpassHeader, setrpassHeader] = useState('Retype Password'); 

    let strongpass = false;
    let strongusername = false; 
     

    function CreateAccountIV()
    {
        const checkDB = async () => {
            // false = no duplicates found
            let result = false;

            try {
                
                const response = await axios.post('http://localhost:3003/checkDuplicateUsername', {username});
               
                  const { duplicate } = response.data;
                  result = duplicate;

                  console.log('API success searched for username');
              } catch (error) {
                console.error('Error API:', error);
              }
             

              return result; 



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
            strongusername = true;

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
            
          if(strongusername === true){
            const checkUsername = async () => {
                const result = await checkDB();
              
                if (result) {
                  setusernameColor("red");
                  setusernameHeader("This Username exists, try again");
                } else {
                  setusernameColor("black");
                  setusernameHeader("Username");
                  setPageIndex(2);
                }
              };
              
              checkUsername();
            
          }
            


        }
        else {

            setretypePasswordColor("red");
            setrpassHeader("Retype Password DON'T MATCH"); 

        }



        }



    }

    return(
        <>
        <h1 className="title">Create Account</h1>  
        <div className="container minicontainer">
        <h2 className='left inputTitle' style={{ color: usernameColor }}> {usernameHeader} </h2>    
        <input type="text" className="left input" placeholder="Username" defaultValue={username}  onChange={(event) => { username = event.target.value;  }} />   

        <h2 className='left inputTitle' style={{ color: passwordColor }}>{passHeader}</h2>
        <input type="password" className="left input" placeholder="Password" defaultValue={password} onChange={(event) => { password = event.target.value;  }}/>   

        <h2 className='left inputTitle' style={{ color: retypePasswordColor }}>{rpassHeader}</h2>
        <input type="password" className="left input" placeholder="Retype Password" defaultValue={retypePassword} onChange={(event) => { retypePassword = event.target.value;  }}/> 

        <button className="login-button containerButton" onClick={() => CreateAccountIV()}> <i className="fa-solid fa-arrow-right fa-3x"></i></button>
        </div>
        </>
    )
}

function SecuritySection({ setPageIndex }){

    const [sdobColor, setsdobColor] = useState("black"); 
    const [sFavoriteColor, setsFavoriteColor] = useState("black"); 
    const [sBestFriendColor, setsBestFriendColor] = useState("black"); 

    function isValidDateFormat(dateString) {
        // Define a regex pattern for month/day/year format (MM/DD/YYYY)
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
            setsdobColor("black");
        }
        if (sFavorite === '')
        {
            setsFavoriteColor("red"); 
        }
        else
        {
            setsFavoriteColor("black"); 
        }
        if (sBestFriend === '')
        {
            setsBestFriendColor("red"); 
        }
        else
        {
            setsBestFriendColor("black"); 
        }

        if ((isValidDateFormat(sdob)) && (sFavorite !== '') && (sBestFriend !== '') )
        {
            setPageIndex(3);
        }
    }
 

    return (
        <>
        <h1 className="title">Security Questions</h1>  
        <div className="container minicontainer">
        
        <h2 className='left inputTitle' style={{ color: sdobColor }}>Date of Birth (month/day/year) </h2>
        <input type="text" className="left input" placeholder="Ex: 12/31/2001" defaultValue={sdob} onChange={(event) => { sdob = event.target.value;  }}/>   

        <h2 className='left inputTitle' style={{ color: sFavoriteColor }}>What is your favorite book/movie/TV show? </h2>
        <input type="text" className="left input" placeholder="book/movie/TV show?" defaultValue={sFavorite} onChange={(event) => { sFavorite = event.target.value;  }}/>   

        <h2 className='left inputTitle' style={{ color: sBestFriendColor }}>What is the name of your childhood best friend?</h2>
        <input type="text" className="left input" placeholder="Friend's name" defaultValue={sBestFriend} onChange={(event) => { sBestFriend = event.target.value;  }}/>   

            <div>
                <button className="login-button containerButton" onClick={() => setPageIndex(1)}> <i className="fa-solid fa-arrow-left fa-3x"></i></button>
                <button className="login-button containerButton" onClick={() => securityQuestionIV()}> <i className="fa-solid fa-arrow-right fa-3x"></i></button>
            </div>
        </div>
        </>
    )
}

function PublicInfo({ setPageIndex }){

    const [pNameColor, setpNameColor] = useState("black"); 
    const [pAboutColor, setpAboutColor] = useState("black"); 
    const [pHobbyColor, setpHobbyColor] = useState("black"); 

    function publicInfoIV(){

        if (pName === '')
        {
            setpNameColor("red"); 
        }
        else
        {
            setpNameColor("black"); 
        }
        if (pAbout === '')
        {
            setpAboutColor("red"); 
        }
        else
        {
            setpAboutColor("black"); 
        }
        if (pHobby === '')
        {
            setpHobbyColor("red"); 
        }
        else
        {
            setpHobbyColor("black"); 
        }
        if((pName !== '') && (pAbout !== '') && (pHobby !== ''))
        {
            setPageIndex(4)
        }

    }
    return (
        <>
        <h1 className="title">Public Information</h1>  
        <div className="container minicontainer">
        
        <h2 className='left inputTitle' style={{ color: pNameColor }}>Name</h2>
        <input type="text" className="left input" placeholder="Name" defaultValue={pName} onChange={(event) => { pName = event.target.value;  }}/>   

        <h2 className='left inputTitle' style={{ color: pAboutColor }}>About </h2>
        <input type="text" className="left input" placeholder="About" defaultValue={pAbout} onChange={(event) => { pAbout = event.target.value;  }}/>   

        <h2 className='left inputTitle' style={{ color: pHobbyColor }}>Hobby</h2>
        <input type="text" className="left input" placeholder="Hobby" defaultValue={pHobby} onChange={(event) => { pHobby = event.target.value;  }}/>   

            <div>
                <button className="login-button containerButton" onClick={() => setPageIndex(2)}> <i className="fa-solid fa-arrow-left fa-3x"></i></button>
                <button className="login-button containerButton" onClick={() => publicInfoIV()}> <i className="fa-solid fa-arrow-right fa-3x"></i></button>
            </div>
        </div>
        </>
    )
}

function SelectIcon({ setPageIndex }){

    const [sliderValue, setSliderValue] = useState(jollyRoger);

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
      };


    return (
        <>
        <h1 className="title">Select Jolly Roger</h1>  
        <div className="container minicontainer">

            <div className="jolly">                
            <img src={require(`./assets/customization/jolly${sliderValue}.png`)} alt="jolly roger pictures" />
            </div>

        <input
        type="range"
        id="slider"
        name="slider"
        min="1"
        max="5"
        value={sliderValue}
        onChange={handleSliderChange}
        className="slider"
      />
            
            <div>
                <button className="login-button containerButton" onClick={() =>  setPageIndex(3)}> <i className="fa-solid fa-arrow-left fa-3x"></i></button>
                <button className="login-button containerButton" onClick={() => {jollyRoger = sliderValue; setPageIndex(5);} }> <i className="fa-solid fa-arrow-right fa-3x"></i></button>
            </div>
        </div>
        </>
    )
}

function SelectShip({ setPageIndex }){


    const [sliderValue, setSliderValue] = useState(ship);

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
      };


    return (
        <>
        <h1 className="title">Select Your Ship</h1>  
        <div className="container minicontainer">

        <div className="jolly" style={{ background: 'linear-gradient(to bottom, #49c0f0, #b0e0e6)' }}>          
            <img src={require(`./assets/customization/ship${sliderValue}.png`)} alt="ship pictures" style={{ width: '300px', height: '290px' }}/>
            </div>

        <input
        type="range"
        id="slider"
        name="slider"
        min="1"
        max="5"
        value={sliderValue}
        onChange={handleSliderChange}
        className="slider"
      />
            
                <div>
                <button className="login-button containerButton" onClick={() => setPageIndex(4)}> <i className="fa-solid fa-arrow-left fa-3x"></i></button>
                <button className="login-button containerButton" onClick={() => {setPageIndex(6); ship = sliderValue; } }> <i className="fa-solid fa-arrow-right fa-3x"></i></button>
                </div>

        </div>
        </>
    )
}



function ReviewApplication({ setPageIndex }){



    return (
        <>
        <h1 className="title">Review</h1>  
        <div className="container minicontainer">
        

        <div className="scrollable-container">
            <div className="scrollable-content">
                <h2 className='inputTitle'><strong>Username:</strong> {username} </h2>
                <button className="login-button overlay-paragraph" onClick={() => setPageIndex(1)}> Edit Login Info</button>
                <hr />
            </div>

            <div className="scrollable-content">
            <h2 className='inputTitle'><strong> DOB:</strong> {sdob}</h2><br />
            <h2 className='inputTitle'><strong> Favorite book/movie/TV show</strong> : {sFavorite}</h2><br />
            <h2 className='inputTitle'><strong> Childhood best friend's name</strong>: {sBestFriend}</h2>   
            <button className="login-button overlay-paragraph" onClick={() => setPageIndex(2)}> Edit Security Answers</button>
            <hr />          
            </div>

            <div className="scrollable-content">
                <h2 className='inputTitle'><strong> Public Name</strong>: {pName}</h2><br />
                <h2 className='inputTitle'><strong> Public Intro</strong>: {pAbout}</h2><br />
                <h2 className='inputTitle'><strong> Public Hobby</strong>: {pHobby}</h2>
                <button className="login-button overlay-paragraph" onClick={() => setPageIndex(3)}> Edit Public Info</button>
                <hr />          
            </div>

                <h2><strong>Jolly Roger: </strong></h2> <br /> 

            <div className="scrollable-content jolly">
                
            
                <img src={require(`./assets/customization/jolly${jollyRoger}.png`)} alt="jolly pictures" style={{ width: '300px', height: '290px' }}/>
         
            
            </div><button className="login-button overlay-paragraph" onClick={() => setPageIndex(4)}> Edit Jolly Roger</button>
                <hr />
            <h2><strong>Ship: </strong></h2> <br /> 

            <div className="scrollable-content" style={{ background: 'linear-gradient(to bottom, #49c0f0, #b0e0e6)' }}>
                <img src={require(`./assets/customization/ship${ship}.png`)} alt="ship pictures" style={{ width: '300px', height: '290px' }}/>
             
            </div><br /> 
            <button className="login-button overlay-paragraph" onClick={() => setPageIndex(5)}> Edit Ship</button>

            

        </div>

  
                <div>
                    
                <Link to="/login"> <button className="login-button containerButton" onClick={resetValues} > <i className="fa-solid fa-check fa-3x"></i></button> </Link> 
                </div>

        </div>
        </>
    )
}



export default  function CreateAccount(){

    const [pageIndex, setPageIndex] = useState(1); 



    return(
        <div>
            {pageIndex === 1 ? <UsernamePassword setPageIndex={setPageIndex} /> :
             pageIndex === 2 ? <SecuritySection setPageIndex={setPageIndex} /> :
             pageIndex === 3 ? <PublicInfo setPageIndex={setPageIndex} /> :
             pageIndex === 4 ? <SelectIcon setPageIndex={setPageIndex} /> : 
             pageIndex === 5 ? <SelectShip setPageIndex={setPageIndex} /> : 
             pageIndex === 6 ? <ReviewApplication setPageIndex={setPageIndex} /> : 
             <h1 className="title">error</h1>}       


        <Link to="/login"><img src={require('./crossButton.png')} alt="CrossButton" className="crossButton"  onClick={() => {anotherresetValues()} }/> </Link>
        
        <img src={require('./treasurePaper.png')} alt="sunButton" className="bgMenu"/>
        </div>
    )
}