import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const endpoint = 'https://demolaravel.ddns.net/api';

const Register = ({ setAccessToken, setUserID, setUserName }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente

    try {
      const response = await axios.post(`${endpoint}/register`, {
        name,
        email,
        password
      });

      //Si los campos son correctos
      if (response.status === 200) {
        const { access_token, data } = response.data;

        /*Almacenamos los props/variables de estado globales*/
        setUserID(data.id);
        setUserName(data.name);
        setAccessToken(access_token);
        
        // alert('¡Registro exitoso!');
        navigate('/'); // Redirigir al usuario a HomePage
      } else {
        alert('Error al registrar. Por favor, verifica los campos.');
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
        <h2>Crear cuenta</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Nombre:</label><br />
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required />
            <br/>
          <label htmlFor="email">Email:</label><br />
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required />
            <br />
          <label htmlFor="password">Contraseña:</label><br />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required /><br/>
          <button type="submit">Registrarse</button>
        </form>
      </div>
      </>
  );
}

export default Register;
