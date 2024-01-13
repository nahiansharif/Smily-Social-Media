import './App.css';
import {isNightModeOn, setNightMode} from "./bgComponent";
import axios from 'axios';

// import { Link } from 'react-router-dom';  
import React, {useState} from "react"; 
import {CrossButton, Wave} from "./profile"; 

var username, password='', retypePassword='', pName = '', pAbout = '', pHobby = ''; 

var jollyRoger = 1, ship=3; 

var nightMode = isNightModeOn(); 

export function Factory() {
    return (
      <div className='factoryBG'>
      </div>
  
    );
  }

  function Customize({ setOpenCustomize, jrNum, shipNum}) {


    const openCustomization = () => {
        setOpenCustomize(false);
      };

    const [sliderValue, setSliderValue] = useState(jrNum);

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
      };

      const [shipVal, setShipVal] = useState(shipNum);

      const handleShipValChange = (event) => {
        setShipVal(event.target.value);
        };
    const [darkMode, setDarkMode] = useState(nightMode);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
      };

    const savingChanges = async () => {
        jollyRoger = sliderValue;
        ship = shipVal; 
        nightMode = darkMode;
        setNightMode(nightMode); 

        const resetValuesAfterDelay = (usernameValue) => {
            setTimeout(() => {
              // Reset the values after 3 seconds
              jollyRoger = 1;
              ship = 3;

            }, 3000);
          };
        
          try {
            await axios.post('http://localhost:3003/updatingIconShip', { jollyRoger, ship });
        
            resetValuesAfterDelay(jollyRoger);
            openCustomization();

        
            console.log('API success when updating customization' + pName);
          } catch (error) {
            console.error('Error API send public info:', error);
          }

        
    }
      

  
    return (
      <>
        <h1 className="title">Customize</h1>  

        <div className='container minicontainer'>
            <div className="scrollable-container">
                <div className="scrollable-content">
                    <h2 className='inputTitle'>Night Mode:</h2>
                    <button className="login-button overlay-paragraph" onClick={toggleDarkMode} style={{ backgroundColor: darkMode ? '#15f701' : '#f70101' }}>{darkMode ? 'ON' : 'OFF'}</button>
                    <hr />
                </div>

                <div className="scrollable-content">
                    <>
                    <h2 className='inputTitle'>Change Jolly Roger</h2>
                        <div>

                            <div className="jolly">                
                                <img src={require(`./assets/customization/jolly${sliderValue}.png`)} alt="jolly roger pictures" />
                            </div>
                            
                            <div className='customizePaddingLeft'>
                            <input
                            type="range"
                            id="slider"
                            name="slider"
                            min="1"
                            max="5"
                            value={sliderValue}
                            onChange={handleSliderChange}
                            className="slider "
                            />
                            </div>

                            
                        </div>
                        </>
                        <br />
                    <hr />
                </div>

                <div className='scrollable-content'>
                    <>
                    <h2 className='inputTitle'>Change ship</h2>
                        <div>

                            <div className="jolly">                
                                <img src={require(`./assets/customization/ship${shipVal}.png`)} alt="jolly roger pictures" style={{ width: '300px', height: '290px' }}/>
                            </div>

                            <div className='customizePaddingLeft'>
                                <input
                                type="range"
                                id="slider"
                                name="slider"
                                min="1"
                                max="5"
                                value={shipVal}
                                onChange={handleShipValChange}
                                className="slider "
                                />
                            </div>


                        </div>
                    </>
                   
                </div>
            </div> 
            <button className="login-button containerButton" > <i class="fa-solid fa-check fa-3x" onClick={savingChanges}/></button> 
        </div>




        <img src={require('./crossButton.png')} alt="CrossButton" className="crossButton" onClick={openCustomization} /> 
        <img src={require('./treasurePaper.png')} alt="sunButton" className="bgMenu" />
      </>
    );
  }
  

  function ChangingPasswordPage({ setOpenChangePass }) {
    const handleSettingButtonClick = () => {
      setOpenChangePass(false);
    };

    
    const [passwordColor, setpasswordColor] = useState("black");
    const [retypePasswordColor, setretypePasswordColor] = useState('black');
    const [success, setSuccess] = useState(false); 

    const [passHeader, setpassHeader] = useState('Password'); 
    const [rpassHeader, setrpassHeader] = useState('Retype Password'); 

    let strongpass = false;
     

    function CreateAccountIV()
    {
        let fUsernamee = '';
        
        const updatingPass = async () => {
            const resetValuesAfterDelay = (usernameValue) => {
              setTimeout(() => {
                // Reset the values after 3 seconds
                password = '';
                retypePassword = '';

              }, 3000);
            };
          
            try {
              await axios.post('http://localhost:3003/updatingPassword', { fUsernamee, password });
          
              // Pass the current username value to the resetValuesAfterDelay function
              resetValuesAfterDelay(fUsernamee);
              // this is where I open confirm message setPageIndex(4); 
              setSuccess(true); 
          
              console.log('API success when updating password ' + fUsernamee);
            } catch (error) {
              console.error('Error API:', error);
            }
          };

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
            

            // update the  password 
            updatingPass(); 


        }
        else {

            setretypePasswordColor("red");
            setrpassHeader("Retype Password DON'T MATCH"); 

        }

    }

    

    return (
      <>
        {success ? (
                      <>
                      <br /><br />
                      <h1 className="title" style={{top: "47%"}}> Password Changed Successfully</h1>
                    </>
        ) : (
            <>
            <h1 className="title">Change Password</h1>  
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
        )}
            <img src={require('./crossButton.png')} alt="CrossButton" className="crossButton" onClick={handleSettingButtonClick} />
            <img src={require('./treasurePaper.png')} alt="sunButton" className="bgMenu" />
      </>
    );
    
  }
  
  function ChangingPublicInfo({ setOpenUpdateInfo, publicName, publicAbout, publicHobby }){

    pName = publicName;
    pAbout = publicAbout;
    pHobby = publicHobby; 

    const closePublicInfo = () => {

        setOpenUpdateInfo(false);

    }

    const openPublicInfo = async () => {

        const resetValuesAfterDelay = (usernameValue) => {
            setTimeout(() => {
              // Reset the values after 3 seconds
              pName = '';
              pAbout = '';
              pHobby = ''; 

            }, 3000);
          };
        
          try {
            await axios.post('http://localhost:3003/updatingPublicInfo', { pName, pAbout, pHobby });
        
            resetValuesAfterDelay(pName);
            setOpenUpdateInfo(false);

        
            console.log('API success when updating public info ' + pName);
          } catch (error) {
            console.error('Error API send public info:', error);
          }


        
      };

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
           openPublicInfo();
        }

    }
    return (
        <>
        <h1 className="title">Public Information</h1>  
        <div class="container minicontainer">
        
        <h2 className='left inputTitle' style={{ color: pNameColor }}>Name</h2>
        <input type="text" className="left input" placeholder="Name" defaultValue={publicName} onChange={(event) => { pName = event.target.value;  }}/>   

        <h2 className='left inputTitle' style={{ color: pAboutColor }}>About </h2>
        <input type="text" className="left input" placeholder="About" defaultValue={publicAbout} onChange={(event) => { pAbout = event.target.value;  }}/>   

        <h2 className='left inputTitle' style={{ color: pHobbyColor }}>Hobby</h2>
        <input type="text" className="left input" placeholder="Hobby" defaultValue={publicHobby} onChange={(event) => { pHobby = event.target.value;  }}/>   

            <div>
                <button className="login-button containerButton" onClick={() => publicInfoIV()}> <i class="fa-solid fa-check fa-3x"></i></button>
            </div>
        </div>

        <img src={require('./crossButton.png')} alt="CrossButton" className="crossButton" onClick={closePublicInfo} />
        <img src={require('./treasurePaper.png')} alt="sunButton" className="bgMenu" />
        </>
    )
}



export default  function Search(){

    const [openChangePass, setOpenChangePass] = useState(false); 
    const [openUpdateInfo, setOpenUpdateInfo] = useState(false); 
    const [openCustomize, setOpenCustomize] = useState(false); 

    const handleSettingButtonClick = () => {
        setOpenChangePass(true);
      };
      const openPublicInfo = () => {
        setOpenUpdateInfo(true);
      };
      const openCustomization = () => {
        setOpenCustomize(true);
      };

      const [jrNum, setJrNum] = useState(3); 
      const [shipNum, setShipNum] = useState(5); 
      const [publicName, setPublicName] = useState("Smily User"); 
      const [publicAbout, setPublicAbout] = useState("About About About About About About About About About About About About About About About About About About About About About About About About About About About About About About"); 
      const [publicHobby, setPublicHobby] = useState(" Hobby Hobby Hobby Hobby Hobby Hobby Hobby Hobby"); 

          // set those variables in showProfile api

    const checkSignInInfo = async () => {
        try {
          const response = await axios.post('http://localhost:3003/setProfile');
      
          const { userProfile } = response.data;
          setPublicName(userProfile.pName);
          setPublicAbout(userProfile.pAbout);
          setPublicHobby(userProfile.pHobby); 
          setJrNum(userProfile.jollyRoger); 
          setShipNum(userProfile.ship); 

      
          console.log('API success! profile info received');
        } catch (error) {
          console.error('Error API! no profile info :', error);
        }
      }


    
        checkSignInInfo(); 

        

    
    return(

        <div>

            <Factory />

            <CrossButton />

        <div>
        <div className="shipNotMoving profileShipSection">
                
                <img src={require(`./assets/customization/jolly${jrNum}.png`)} alt="ship" className="postUserProfilePic profileJolly" style={{    width: '65px', height: '65px', paddingTop: '155px' }}/>
                <h2 className="postUserName profileUN" style={{  paddingTop: '330px' }}>{publicName}</h2>
                <p className="postText profileAbout" style={{  paddingTop: '370px' }}> <strong style={{  fontSize: '25px' }}>About:</strong> <br /> {publicAbout}</p>
            
                <p className="postText profileHobby" style={{  paddingTop: '570px' }}> <strong style={{  fontSize: '25px' }}>Hobby:</strong> <br />  {publicHobby}</p>
    
                    <img src={require(`./assets/customization/ship${shipNum}.png`)} alt="ship" className="ship profileShip" />
                </div>
    

        </div>      

        <Wave />
        {openChangePass && <ChangingPasswordPage  setOpenChangePass = {setOpenChangePass}/>}
        {openUpdateInfo && <ChangingPublicInfo
            setOpenUpdateInfo={setOpenUpdateInfo}
            publicName={publicName}
            publicAbout={publicAbout}
            publicHobby={publicHobby}
        />}
        {openCustomize && <Customize  setOpenCustomize = {setOpenCustomize} jrNum = {jrNum} shipNum={shipNum} />}

        

        <div className="settingButtonsLoc">

            <div className='settingButtonContainer' onClick={openCustomization}>
            <img src={require(`./assets/setting/settingButton.png`)} alt="ship" />
            <h2>Customize</h2>
            </div>
            
            <div className='settingButtonContainer' onClick={openPublicInfo}>
            <img src={require(`./assets/setting/settingButton.png`)} alt="ship" />
            <h2>Account Info</h2>
            </div>
            
            <div className='settingButtonContainer'  onClick={handleSettingButtonClick}>
            <img src={require(`./assets/setting/settingButton.png`)} alt="ship" />
            <h2>Change Password</h2>
            </div>


        </div>

    </div>



    )
}