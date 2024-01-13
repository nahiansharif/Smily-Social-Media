import { useState, useEffect } from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function CrossButton(){
    return(
        <>

    <Link to="/"><img
        src={require('./crossButton.png')}
        alt="CrossButton"
        className="crossButton"
        style={{
            
            right: 0,
            top: 0,
            margin: "30px"
        }}
        />
    </Link>

        </>
    )
}

export function  Wave(){
    return(

        <section   style={{    position: 'absolute'  }}>
        <div className="wave wave1" />

    </section>  

    )
}

export default  function Search(){

    //variables imported from database 

        //variables imported from database 
        const following = Math.floor(Math.random() * (15 - 1 + 1)) + 1;
        const follower = Math.floor(Math.random() * (15 - 1 + 1)) + 1;

    const [jrNum, setJrNum] = useState(3); 
    const [shipNum, setShipNum] = useState(5); 
    const [publicName, setPublicName] = useState("Smily User"); 
    const [publicAbout, setPublicAbout] = useState("About About About About About About About About About About About About About About About About About About About About About About About About About About About About About About"); 
    const [publicHobby, setPublicHobby] = useState(" Hobby Hobby Hobby Hobby Hobby Hobby Hobby Hobby"); 

    const [numOfPost, setNumOfPost] = useState(0);
    const [usersPostedText, setusersPostedText] = useState([]);
    const [usersPostedIMG, setusersPostedIMG] = useState([]);

    // set those variables in showProfile api

    const checkSignInInfo = async () => {
        try {
          const response = await axios.post('http://localhost:3003/displaySearchedProfile');
      
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
 


        useEffect(() => {
            const fetchData = async () => {
              try {
                const response = await axios.post('http://localhost:3003/showOtherUsersAllPost');
                const data = response.data;
        
                if (data && data.posts) {
                  const fetchedPosts = data.posts;
                  setNumOfPost(fetchedPosts.length);
        
                  const texts = fetchedPosts.map(post => post.postText);
                  const images = fetchedPosts.map(post => post.postIMG);
        
                  setusersPostedText(texts);
                  setusersPostedIMG(images);
                } else {
                  console.error('Invalid response format from the server');
                }
        
                console.log('API success! profile post info received');
              } catch (error) {
                console.error('Error API! no profile post info:', error);
              }
            };
        
            fetchData(); // Call the fetchData function when the component mounts
          }, []); // The empty dependency array ensures that this effect runs only once
        
          // ... (other JSX code)
        
          function postItems() {
            const postContainers = Array.from({ length: numOfPost }, (_, index) => (
              <div key={index} className='postContainer'>
                <img src={require('./treasurePaper.png')} alt="treassure paper background" className="postTreassurePic" />
                <img src={require(`./assets/customization/jolly${jrNum}.png`)} alt="ship" className="postUserProfilePic" />
                <h2 className='postUserName'>{publicName}</h2>
                <p className='postText'>{usersPostedText[index]}</p>
                <img src={require(`./assets/game store/` + usersPostedIMG[index])} alt="post pic" className='picPost' />
              </div>
            ));
        
            return <>{postContainers}</>;
          }
        

    return(

        <div>

            <CrossButton />



        <div>
            <div className="shipNotMoving profileShipSection">
                
            <img src={require(`./assets/customization/jolly${jrNum}.png`)} alt="ship" className="postUserProfilePic profileJolly" style={{    width: '65px', height: '65px', paddingTop: '155px' }}/>
            <h2 className="postUserName profileUN" style={{  paddingTop: '330px' }}>{publicName}</h2>
            <p className="postText profileAbout" style={{  paddingTop: '370px' }}> <strong style={{  fontSize: '25px' }}>About:</strong> <br /> {publicAbout}</p>
        
            <p className="postText profileHobby" style={{  paddingTop: '570px' }}> <strong style={{  fontSize: '25px' }}>Hobby:</strong> <br />  {publicHobby}</p>

                <img src={require(`./assets/customization/ship${shipNum}.png`)} alt="ship" className="ship profileShip" />
            </div>



                <div className="arrowLeft raft ">
                        <div className="follower">
                            <h1>Followers</h1>
                            <h2>{follower}</h2>
                        </div>
                            
                        
                    <img src={require('./assets/profile/raft.png')} alt="arrow left" className='raft'/>
                </div>


                <div className="arrowRight raft">

                    <div className="follower">
                                <h1>Following</h1>
                                <h2>{following}</h2>
                            </div>
                            
                        <img src={require('./assets/profile/raft.png')} alt="arrow right" className='raft' />

                </div>
        </div>      

         
         <Wave />

   


            {postItems()} 
       
      

    </div>


    )
}