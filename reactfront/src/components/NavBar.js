import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ accessToken, handleLogout, userID }) => {
  console.log('NavBar userID:', userID);
  return (
    <nav className="mgl-navBar">
      <div className="mgl-navContainer">
        <Link to="/">
          <img className="mgl-logo" src="https://demolaravel.ddns.net/images/myGameList-white.png" alt="Logo" />
        </Link>
        <div className="mgl-navRight">
            {/* Si hay un accessToken : sino tenemos accessToken*/}
            {accessToken ? (
            <>
              <button onClick={handleLogout} className='mgl-loginLogoutButton'>Cerrar sesión</button>
              <Link to={`/id/${userID}`}>
                <img className="mgl-icons" src="https://demolaravel.ddns.net/images/profile.png" alt="Perfil" />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className='mgl-loginLogoutButton'>Iniciar sesión</Link>
              <Link to="/register" className='mgl-loginLogoutButton'>Crear cuenta</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
