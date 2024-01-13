import React, {useState, useEffect} from "react"; 
import './App.css';
import {isLoggedIn}  from './app.jsx';
import axios from 'axios';

let createPostText = ''; 
let createCommentText = '';
let postingIMG = ''; 

function InsideShip(props) {
  let { postIndex,  setCMUN, setCMJR, setCMText, setCMIMG, setCurrentPost} = props;

  let [changingPost, setChangingPost] = useState(0); 


  const [flagIcon, setFlagIcon] = useState(2);
  const [usersShip, setUsersShip] = useState(4);
  const [usersName, setUsersName] = useState("Smily User");
  let [postedText, setPostedText] = useState("N/A");

let [postedIMG, setPostedIMG] = useState("pic2.png");

setCMUN(usersName); 
setCMJR(flagIcon); 
setCMText(postedText); 
setCMIMG(postedIMG);


  let posts= [];
  


const savingAllPost = async () => {
  try {
    const response = await axios.post('http://localhost:3003/getAllposts');
    posts = response.data.posts;
    setChangingPost(postIndex); 

   setPostedText(posts[changingPost].postText); 
   setPostedIMG(posts[changingPost].postIMG);
   setCurrentPost(posts[changingPost].postID); 
    let currentID = posts[changingPost].userID;

   
      
    try {
      const response = await axios.post('http://localhost:3003/getAllUsername', { currentID });
    
      const { success, username, jollyRoger, ship } = response.data;
    
      if (success) {
        // The data is available in the response
        setFlagIcon(jollyRoger);
        setUsersShip(ship);
        setUsersName(username);
      } else {
        // Handle the case where the request was not successful
        console.error('Error: ', response.data.message);
      }
    } catch (error) {
      console.error('Error API when getting username:', error);
    }
    

    









    // Now 'posts' contains the array of posts with user profiles
    // You can use this array as needed in your frontend

  } catch (error) {
    console.error('Error API when getting last post:', error);
  }
};

savingAllPost();

setTimeout(() => {
  // Reset the values after 3 seconds

}, 100);


  
  
  // Now you can use the 'posts' array outside the function

  


      
     
  
    




  



  

  return (
    
    <div>
      <div className="overlay">

        <img src={require(`./assets/customization/jolly${flagIcon}.png`)} alt="ship" className="jollyRoger" />
        
          <h2 className="overlay-title">{usersName}</h2>
          <p className="overlay-paragraph">{postedText}</p>
          
          <img src={require(`./assets/game store/` + postedIMG)} alt="jolly roger pictures" className='overlay-img' />        

      </div>
      <img src={require(`./assets/customization/ship${usersShip}.png`)} alt="ship" className="ship" />


    
    </div>
  );
}

function CommentSection({ setOpenCommentSection, cmUN, cmJR, cmText, cmIMG, currentPost }){

  const handleCommentSection = () => {
    setOpenCommentSection(false);
    };

    const addingComment = async () => {

      console.log("addingComment bro" + createCommentText);

      await axios.post('http://localhost:3003/creatingComment', { createCommentText, currentPost });

      displayAllNotifications(); 


    }; 

    const [numOfComments, setNumOfComments] = useState(0);
    const [commenttorsName, setCommentorsName] = useState([]);
    const [commenttorsJolly, setCommentorsJolly] = useState([]);
    const [commenttorscomment, setCommentorscomment] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost:3003/currentPostComment', { currentPost });
          const data = response.data;
  
          if (data && data.comments) {
            const fetchedComments = data.comments;
            setNumOfComments(fetchedComments.length);
  
            const username = fetchedComments.map(comment => comment.username);
            const jollyRoger = fetchedComments.map(comment => comment.jollyRoger);
            const cText = fetchedComments.map(comment => comment.cText);
  
            setCommentorsName(username);
            setCommentorsJolly(jollyRoger);
            setCommentorscomment(cText);
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


    function displayAllNotifications(){
      const notifications = Array.from({ length: numOfComments }, (_, index) => (

          <div key={index}>

                  <div className='notificationDiv'>
                  <img src={require(`./assets/customization/jolly${commenttorsJolly[index]}.png`)} alt="ship" className="" />
                  <h2>{commenttorsName[index]}</h2>
                  <p>Commented: </p> 
                  </div>
                  <p className='notificationComment'><i> {commenttorscomment[index]} </i></p>

                  <hr />
                            
          </div>

      ));
      return <div>{notifications}</div>; 
  }

return (
<>

    <div class="container minicontainer homeScroll">
        


        <div className="scrollable-container homeScrollItems">

            <div className="scrollable-content">
              <img src={require(`./assets/customization/jolly${cmJR}.png`)} alt="ship" className="homeUserProfilePic homeScrollItems" />
              <h2 className='inputTitle homeScrollItems'>{cmUN} </h2>
              <p className='homeScrollItems homeScrollP'>{cmText} </p>
              <img src={require(`./assets/game store/` + cmIMG)} alt="post pic" className='homeScrollItems homeScrollImage ' style={{    width: '400px', height: '300px' }}/>
              <br />
              <hr />
              <h1 className="">Comments</h1> <br />
              {displayAllNotifications()}
            </div>
        </div>
        <br />

        <div style={{ display: 'flex', alignItems: 'center', width: '165%' }}>
            <textarea
              className="left input commentBox"
              placeholder="Add Comment"
              onChange={(event) => { createCommentText = event.target.value; }}
              rows={2}
              style={{ resize: "none" }}
            />
            <button className="login-button searchButton" onClick={addingComment}>
              <i className="fa-solid fa-check fa-2x" />
            </button>
        </div>



    </div>


    

    <img src={require('./crossButton.png')} alt="CrossButton" className="crossButton createPostCB" onClick={handleCommentSection} /> 
    <img src={require('./treasurePaper.png')} alt="sunButton" className="bgMenu createPostBG" />
    </>
);


}

function CreatePost({ setOpenCreatePost }) {

  const handleCreatePostButton = () => {
    setOpenCreatePost(false);
    };

    const handleIMG = async (event) => {
      postingIMG =  event.target.files[0].name; // Assuming you only allow a single file
  
      
  

    };

    const creatingPost = async () => {
        console.log("creating post"); 
        handleCreatePostButton(); 

        const resetValuesAfterDelay = () => {
          setTimeout(() => {
              // Reset the values after 3 second
              createPostText='';
              postingIMG=''; 

          }, 5000); 
          
      };

      try { 
        console.log(createPostText + " | " + postingIMG); 
          await axios.post('http://localhost:3003/creatingNewPost', { createPostText, postingIMG });
          console.log(createPostText + " | " + postingIMG); 
          resetValuesAfterDelay();
          console.log('API successfully end data to create post');
        } catch (error) {
          console.error('Error API:', error);
        }

      };
  

    

  
  return (
    <>
    <h1 className="title">Create Post</h1>  
    <div className="container minicontainer createPost_PlaceHolder">
      <h2  className='left inputTitle' >Write something...</h2>
      <textarea
        className="left input"
        placeholder="Write something..."
        onChange={(event) => { createPostText = event.target.value; }}
        rows={2}  
        style={{ resize: "none" }} 
      />

      <h2  className='left inputTitle' >Add an Image</h2>
<input
  type="file"
  accept=".jpg, .jpeg, .png"  
  onChange={handleIMG}
  
/>

<button className="login-button containerButton" onClick={creatingPost}> <i class="fa-solid fa-check fa-3x"></i></button>
    </div>

    

    <img src={require('./crossButton.png')} alt="CrossButton" className="crossButton createPostCB" onClick={handleCreatePostButton} /> 
    <img src={require('./treasurePaper.png')} alt="sunButton" className="bgMenu createPostBG" />
    </>
  );
}




export default function Ship() {
  const [movingDirection, setMovingDirection] = useState(0); 

  const [cmUN, setCMUN] = useState(''); 
  const[  cmJR, setCMJR ] = useState(1);
  const[ cmText, setCMText] = useState('');
  const[ cmIMG, setCMIMG] = useState('');
  const[ currentPost, setCurrentPost] = useState(1);
  
  let [rn, setRn] = useState(0); 
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const openingCreatePost = () => {
    setOpenCreatePost(true);
  };

  const [openCommentSection, setOpenCommentSection] = useState(false); 
  const handleCommentSection = () => {
    setOpenCommentSection(true);
    };



  function movingRight(){

    setMovingDirection(1); 


    setTimeout(() => {
      
    setRn(rn + 1); 
    }, 500);


    setTimeout(() => {
      setMovingDirection(0);
    }, 1000);
  }

  function movingLeft(){

    setMovingDirection(-1); 

    setTimeout(() => {
      
      setRn(rn - 1); 
      }, 500);   
    
    setTimeout(() => {
      setMovingDirection(0);
    }, 1000);
  }

  





  return (
<div>
<div className={`image-container ${movingDirection === 1 ? 'shipMovingRL' : movingDirection === -1 ? 'shipMovingLR' : 'shipNotMoving'}`}>

   
<InsideShip postIndex={rn} setCMUN={setCMUN} setCMJR={setCMJR} setCMText={setCMText} setCMIMG={setCMIMG} setCurrentPost={setCurrentPost} />
{openCommentSection && <CommentSection setOpenCommentSection = {setOpenCommentSection} cmUN={cmUN} cmJR={cmJR} cmText={cmText} cmIMG={cmIMG} currentPost={currentPost} />}
   
{openCreatePost && < CreatePost setOpenCreatePost = {setOpenCreatePost} />}
{isLoggedIn() ? <div className="commentButtonPostion" onClick={handleCommentSection}></div> : null} 



    </div>
    

    <div>
        <img src={require('./barrelLeft.png')} alt="arrowLeft" className='arrowLeft' onClick={movingLeft}/>
        <img src={require('./barrelRight.png')} alt="arrowRight" className='arrowRight' onClick={movingRight}/>
        {isLoggedIn() ? <img src={require('./messageBottle.png')} alt="messageBottle" className='arrowRight messageBottle' onClick={openingCreatePost}/> : null}       
      </div>

=</div>
  )
  
}
