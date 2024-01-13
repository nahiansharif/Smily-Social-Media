import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; 

import {Clouds, Ocean} from "./bgComponent"; 
import Ship from "./ship"; 
import Sun from "./sun"; 

import Login from "./login";

import CreateAccount from "./createAccount"; 
import { ForgotPass } from './forgetPassword';

import Search from "./search"; 
import Profile from "./profile"; 
import SearchedProfile from "./searchedProfile"; 
import Notification from "./notification";
import Setting from "./settings"; 



let loggedIn = false;

export function isLoggedIn() {
  return loggedIn;
}

export function setLoggedIn(value) {
  loggedIn = value;
}

let iconNum = 1;

export function setIconNum(value)
{
  iconNum = value;  
  console.log("Value changed successfully bro: " + iconNum); 
}

export function getIconNum()
{
  return iconNum;  
}


export function App() {


 

  return (
    <Router>
      <Routes>

      <Route path="/" element={ 
          <div>
            <Clouds />
            <Ocean />
            <Ship />
            <Sun />
          </div>
        } />

        <Route path="/login" element={
          <div>
            <Clouds />
            <Ocean />
            <Login />

          </div>
        } />


        <Route path="/createAccount" element={
          <div>
            <Clouds />
            <Ocean />
            <CreateAccount />

          </div>
        } />  

        <Route path="/forgotPassword" element={
          <div>
            <Clouds />
            <Ocean />
            <ForgotPass />
            

          </div>
        } />  

        <Route path="/search" element={
          <div>
            <Clouds />
            <Ocean />
            <Search />

          </div>
        } />

              

        <Route path="/profile" element={
          <div>
          
          <Clouds />
            <Profile />
            

          </div>
        } />  

        <Route path="/searchedProfile" element={
          <div>
          
          <Clouds />
            <SearchedProfile />
            

          </div>
        } />  

          <Route path="/notifications" element={
          <div>
            
            <Clouds />
            <Ocean />
            <Notification />

          </div>
        } />  

        <Route path="/settings" element={
          <div>
            
            

            <Setting />
            

          </div>
        } />  

      </Routes>

 </Router>

    );
  }