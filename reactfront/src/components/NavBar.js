import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const endpoint = 'https://demolaravel.ddns.net/api';

const NavBar = ({ accessToken, setAccessToken, setUserID, setUserName, setUserRole, userID, userRole }) => {

  const handleLogout = async () => {
    if (!accessToken) {
      alert('No se encontró el token de acceso.');
      return;
    }
  
    try {
      const response = await axios.get(`${endpoint}/logout`, {
          headers: {
              Authorization: `Bearer ${accessToken}`
          }
      });
        console.log('Logout response:', response.data);
        // Limpiar el token de acceso en el estado global o local
        setAccessToken(null);
        setUserID(null); 
        setUserName(null); 
        setUserRole(null);
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        alert('Se ha producido un error al cerrar sesión. Por favor, intenta nuevamente más tarde.');
    }
  };

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
              {userRole !== "admin" && (
                <Link to={`/id/${userID}`}>
                  <img className="mgl-icons" src="https://demolaravel.ddns.net/images/profile.png" alt="Perfil" />
                </Link>
              )}
              {/* Si el user el admin, podemos ir al panel */}
              {userRole === "admin" && 
                <>
                <Link to={`/admin`}>
                  <img className="mgl-icons" src="https://demolaravel.ddns.net/images/settings.png" alt="Admin" />
                </Link>
                <Link to={`/id/${userID}`}>
                    <img className="mgl-icons" src="https://demolaravel.ddns.net/images/profile.png" alt="Perfil" />
                </Link>
                </>
              }
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
