import './App.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, {useState, useEffect} from "react"; 


export default  function Search(){

    let [currentPost, setCurrentPost] = useState([5]); 

    const [numOfComments, setNumOfComments] = useState(0);
    const [commenttorsName, setCommentorsName] = useState([]);
    const [commenttorsJolly, setCommentorsJolly] = useState([]);
    const [commenttorscomment, setCommentorscomment] = useState([]);

    

    const getActorsPost = async () => {
        try {
          const response = await axios.post('http://localhost:3003/getActorsPosts');
          const data = response.data;
      
          if (data.success) {
            setCurrentPost(data.postIDs);
            // Now data.postIDs contains the array of post IDs
            console.log('Post IDs:', data.postIDs);
          } else {
            console.error('Error: Unable to fetch post IDs');
          }
        } catch (error) {
          console.error('Error fetching post IDs:', error);
        }
      };
      
      
      // Call the function
      getActorsPost();
      



    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.post('http://localhost:3003/currentPostComment', { currentPost });
          const data = response.data;
  
          if (data && data.comments) {
            const fetchedComments = data.comments;
            setNumOfComments(fetchedComments.length);
            console.log("array of hope: " + currentPost);
  
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

        

    return(

        <div>
            <h1 className="title">Notifications</h1>  





            <div class="container minicontainer">
        

        <div className="scrollable-container">

            {/* loop */}

           {displayAllNotifications()}

            {/* end of loop */}
            
         

        </div>


        </div>


 




            <Link to="/"><img src={require('./crossButton.png')} alt="CrossButton" className="crossButton"  /> </Link>
            
            <img src={require('./treasurePaper.png')} alt="sunButton" className="bgMenu"/>
         </div>


    )
}