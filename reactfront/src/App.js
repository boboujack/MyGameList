import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';
import GamePage from './components/GamePage';
import IndexGames from './components/IndexGames';
import StoreGame from './components/StoreGame';
import UpdateGame from './components/UpdateGame';

function App() {
  /*Props*/
  const [accessToken, setAccessToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(null);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/admin' element={ <Admin 
              accessToken={accessToken} setAccessToken={setAccessToken} 
              userID={userID} setUserID={setUserID}
              userName={userName} setUserName={setUserName}/> }/>

          <Route path='/' element={ <HomePage 
              accessToken={accessToken} setAccessToken={setAccessToken} 
              userID={userID} setUserID={setUserID}
              userName={userName} setUserName={setUserName}/> }/>

          <Route path="/login" element={ <Login
              setAccessToken={setAccessToken}
              setUserID={setUserID}
              setUserName={setUserName} /> } />
          <Route path="/register" element={ <Register
              setAccessToken={setAccessToken}
              setUserID={setUserID}
              setUserName={setUserName} /> } />

          <Route path="/id/:id" element={ <UserProfile
              accessToken={accessToken} setAccessToken={setAccessToken} 
              userID={userID} setUserID={setUserID}
              userName={userName} setUserName={setUserName}/> }/>

          <Route path="/id/:id/settings" element={ <Settings
              accessToken={accessToken} setAccessToken={setAccessToken} 
              userID={userID} setUserID={setUserID}
              userName={userName} setUserName={setUserName}/> }/>

          <Route path="/game/:id" element={ <GamePage 
              accessToken={accessToken} setAccessToken={setAccessToken} 
              userID={userID} setUserID={setUserID}
              userName={userName} setUserName={setUserName}/> }/>
          <Route path='/index' element={ <IndexGames/> }/>
          <Route path='/store' element={ <StoreGame/> }/>
          <Route path='/update/:id' element={ <UpdateGame/> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
