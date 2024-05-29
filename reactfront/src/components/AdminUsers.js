import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Components.css'
import { Link, useNavigate } from 'react-router-dom'
import NavBar from './NavBar';
import DeleteAccount from './DeleteAccount';

const endpoint = 'https://demolaravel.ddns.net/api'

const AdminUsers = ({ accessToken, setAccessToken, userID, setUserID, userName, setUserName, userRole, setUserRole } ) => {
    const [users, setUsers] = useState([])
    const navigate = useNavigate();
    const isAdmin = userRole === 'admin';

    useEffect(() => {
        if (!isAdmin) {
            navigate('/'); // Redirige a HomePage si no es administrador
        } else {
            getAllUsers();
        }
    }, [isAdmin, navigate]);

    const getAllUsers = async () => {
      const response = await axios.get(`${endpoint}/allUsers`);
      setUsers(response.data)
    }

  //Filtra la lista de todos los usuarios, menos del que ha hecho login
  const otherUsers = users.filter(user => user.id !== userID);

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

    <div className='mgl-divBellowNav'>
    <h3 style={{ color: '#2a5285' }}>Usuarios:</h3>
        {!users.length ? (
          <div className='mgl-divBellowNav'>Cargando...</div>
        ) : (
          <>
            {otherUsers.map(user => (
              <article key={user.id} className='mgl-grid-admin-users-container'>
                <Link to={`/id/${user.id}`} className='mgl-link-profile'>{user.name}</Link>
                <DeleteAccount
                    accessToken={accessToken}
                    userID={user.id}
                    userName={user.name}/>
                <br/>
              </article>
            ))}
          </>
         )}
    <Link to={`/admin`} className='mgl-button'>Volver</Link>
    </div>
    </>
  )
}

export default AdminUsers
