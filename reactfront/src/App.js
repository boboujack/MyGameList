import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin';
import AdminUsers from './components/AdminUsers';
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
  /*Props, a diferencia de localStorage, estos no se mantienen
  cuando se recarga la página*/
  const [accessToken, setAccessToken] = useState(null);
  const [userID, setUserID] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userRole, setUserRole] = useState(null);

  /*Los items que almacenamos, en Login.js, los configuramos
  aquí para que al refrescar la web no perdamos la sesión*/
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const id = localStorage.getItem('userID');
    const name = localStorage.getItem('userName');
    const role = localStorage.getItem('userRole');

    if (token) {
      setAccessToken(token);
      setUserID(id);
      setUserName(name);
      setUserRole(role);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path='/admin' element={ <Admin 
              accessToken={accessToken} setAccessToken={setAccessToken} 
              userID={userID} setUserID={setUserID}
              userName={userName} setUserName={setUserName}
              userRole={userRole} setUserRole={setUserRole} /> } />

        <Route path='/admin/users' element={ <AdminUsers 
              accessToken={accessToken} setAccessToken={setAccessToken} 
              userID={userID} setUserID={setUserID}
              userName={userName} setUserName={setUserName}
              userRole={userRole} setUserRole={setUserRole} /> } />

          <Route path='/' element={ <HomePage 
              accessToken={accessToken} setAccessToken={setAccessToken} 
              userID={userID} setUserID={setUserID}
              setUserName={setUserName}
              userRole={userRole} setUserRole={setUserRole} /> } />

          <Route path="/login" element={ <Login
              setAccessToken={setAccessToken}
              setUserID={setUserID}
              setUserName={setUserName}
              setUserRole={setUserRole} /> } />

          <Route path="/register" element={ <Register
              setAccessToken={setAccessToken}
              setUserID={setUserID}
              setUserName={setUserName} /> } />

          <Route path="/id/:id" element={ <UserProfile 
              accessToken={accessToken} setAccessToken={setAccessToken} 
              userID={userID} setUserID={setUserID}
              setUserName={setUserName}
              userRole={userRole} setUserRole={setUserRole} /> } />

          <Route path="/id/:id/settings" element={ <Settings
              accessToken={accessToken} setAccessToken={setAccessToken} 
              userID={userID} setUserID={setUserID}
              userName={userName} setUserName={setUserName}
              userRole={userRole} setUserRole={setUserRole} /> } />

          <Route path="/game/:id" element={ <GamePage 
              accessToken={accessToken} setAccessToken={setAccessToken} 
              userID={userID} setUserID={setUserID}
              userName={userName} setUserName={setUserName}
              userRole={userRole} setUserRole={setUserRole} /> } />

          <Route path='/index' element={ <IndexGames/> }/>
          <Route path='/store' element={ <StoreGame 
              accessToken={accessToken} setAccessToken={setAccessToken} 
              userID={userID} setUserID={setUserID}
              setUserName={setUserName}
              userRole={userRole} setUserRole={setUserRole} /> } />

          <Route path='/update/:id' element={ <UpdateGame 
              accessToken={accessToken} setAccessToken={setAccessToken} 
              userID={userID} setUserID={setUserID}
              setUserName={setUserName}
              userRole={userRole} setUserRole={setUserRole} /> } />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
