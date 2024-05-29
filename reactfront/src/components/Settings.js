import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Components.css';
import NavBar from './NavBar';
import DeleteAccount from './DeleteAccount';

const endpoint = 'https://demolaravel.ddns.net/api';

const Settings = ({ accessToken, setAccessToken, userID, setUserID, userName, setUserName, userRole, setUserRole }) => {
  const { id } = useParams(); // Obtener el ID de la URL
  const navigate = useNavigate();
  const isOwner = parseInt(id) === userID;

  const [name, setName] = useState('');
  const [mail, setMail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOwner) {
      navigate('/');
    } else {
      // Fetch user data to pre-fill the form
      axios.get(`${endpoint}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        console.log('Datos del usuario:', response.data);
        const userData = response.data[0]; // Extraer el primer objeto de la lista
        setName(userData.name);
        setMail(userData.email);
        setUserRole(null);
        setLoading(false); // Data has been loaded
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        navigate('/');
      });
    }
  }, [id, isOwner, accessToken, navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`${endpoint}/users/${id}`, {
        name,
        mail
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      // Actualiza el nombre de usuario en el estado global si el nombre fue cambiado
      if (response.data.name !== userName) {
        setUserName(response.data.name);
      }

      alert('Perfil actualizado con éxito.');
      navigate(`/id/${userID}`); // Redirigir al perfil del usuario
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Se ha producido un error al actualizar el perfil. Por favor, intenta nuevamente más tarde.');
    }
  };

  /* Enviaremos esta función para restablecer a null los props,
  cuando borremos una cuenta */
  const handleAccountDeleted = () => {
    setAccessToken(null);
    setUserID(null);
    setUserName(null);
  };

  return (
    <>
      <div>
        <NavBar 
              accessToken={accessToken} 
              setAccessToken={setAccessToken} 
              setUserID={setUserID} 
              setUserName={setUserName} 
              setUserRole={setUserRole} 
              userID={userID} 
              userRole={userRole} 
        />
      </div>
      {loading ? (
        <div className='mgl-divBellowNav'>Cargando...</div>
      ) : (
      <>
        {isOwner && (
          <div className='mgl-divBellowNav'>
            <h2 style={{ color: '#2a5285' }}>Configuración</h2>
            <form onSubmit={handleUpdateProfile}>
              <div>
                <label htmlFor="name">Nombre:</label><br/>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <br/>
              </div>
              <div>
                <label htmlFor="email">Email:</label><br/>
                <input
                  type="email"
                  id="email"
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                />
                <br/>
              </div>
              <br/>
              <button type="submit" className='mgl-button-updateBlue'>Actualizar perfil</button>
            </form>
            <div className='mgl-divBellowNav'>
              <DeleteAccount
                accessToken={accessToken}
                userID={userID}
                userName={userName}
                navigate={navigate}
                onAccountDeleted={handleAccountDeleted}
              />
            </div>
          </div>
        )}
      </>
      )}
    </>
  );
};

export default Settings;
