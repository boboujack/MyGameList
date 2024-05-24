import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';




const Login = ({ setAccessToken, setUserID, setUserName }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    try {
      const response = await axios.post('https://demolaravel.ddns.net/api/login', {
        email,
        password
      });

      //Si los credenciales son correctos
      if (response.status === 200) {
        const { accessToken, user } = response.data;

        /*Almacenamos los props/variables de estado globales*/
        setUserID(user.id);
        setUserName(user.name);
        setAccessToken(accessToken);
        
        // alert('¡Inicio de sesión exitoso!');
        navigate('/'); // Redirigir al usuario a HomePage
      } else {
        alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      alert('Se ha producido un error. Por favor, intenta nuevamente más tarde.');
    }
  };

  return (
    <>
    <nav className="mgl-navBar">
      <div className="mgl-navContainer">
        <Link to="/">
          <img className="mgl-logo" src="https://demolaravel.ddns.net/images/myGameList-white.png" alt="Logo" />
        </Link>
      </div>
    </nav>
    <div className='mgl-divBellowNav'>
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label><br />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required /><br />
          <label htmlFor="password">Contraseña:</label><br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required /><br /><br />
          <button type="submit">Iniciar sesión</button>
        </form>
      </div>
      </>
  );
}

export default Login;
