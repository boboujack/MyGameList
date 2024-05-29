import React, { useState, useEffect } from 'react';
/*Axios se utiliza para solicitudes HTTP*/
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar';
import './Components.css'

const endpoint = 'https://demolaravel.ddns.net/api'

const StoreGame = ({ accessToken, setAccessToken, userID, setUserID, setUserName, userRole, setUserRole }) => {
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [image_url, setImage_url] = useState('');
    const navigate = useNavigate();
    const isAdmin = userRole === 'admin';

    useEffect(() => {
        if (!isAdmin) {
            navigate('/'); // Redirige a HomePage si no es administrador
        }
    }, [isAdmin, navigate]);

    const store = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${endpoint}/games`, {
                title: title,
                releaseDate: releaseDate,
                synopsis: synopsis,
                image_url: image_url
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            navigate('/admin');
        } catch (error) {
            console.error('Error updating game:', error);
        }
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
    
    <div className='mgl-divBellowNav'>
        <h3>Añadir juego</h3>
        <form onSubmit={store}>
            <div>
                <label className='form-label'>Title</label><br/>
                <input style={{ minWidth: '600px' }}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type='text'
                    className='form-control' />
            </div>
            <div>
                <label className='form-label'>releaseDate</label><br/>
                <input style={{ minWidth: '600px' }}
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    type='text'
                    className='form-control' />
            </div>
            <div>
                <label className='form-label'>Acerca de</label><br/>
                <textarea style={{ minHeight: '200px', minWidth: '600px' }}
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    type='text'
                    className='form-control' />
            </div>
            <div>
                <label className='form-label'>image_url</label><br />
                <input style={{ minWidth: '600px' }}
                    value={image_url}
                    onChange={(e) => setImage_url(e.target.value)}
                    type='text'
                    className='form-control' />
            </div>
            <button type='submit' className='mgl-button'>Añadir juego</button>
        </form>
    </div>
    </>
    )
}

export default StoreGame