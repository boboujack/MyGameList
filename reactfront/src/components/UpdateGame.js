import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import './Components.css'

const endpoint = 'https://demolaravel.ddns.net/api';

const UpdateGame = ({ accessToken, setAccessToken, userID, setUserID, setUserName, userRole, setUserRole }) => {
    const [title, setTitle] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [synopsis, setSynopsis] = useState('');
    const [image_url, setImage_url] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const isAdmin = userRole === 'admin';

    const update = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${endpoint}/games/${id}`, {
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

    useEffect(() => {
        if (!isAdmin) {
            navigate('/'); // Redirige a HomePage si no es administrador
        }
    }, [isAdmin, navigate]);

    useEffect(() => {
        const getGameById = async () => {
            try {
                const response = await axios.get(`${endpoint}/games/${id}`);
                const game = response.data.game;
                setTitle(game.title);
                setReleaseDate(game.releaseDate);
                setSynopsis(game.synopsis);
                setImage_url(game.image_url);
            } catch (error) {
                console.error('Error fetching game:', error);
            }
        };
        getGameById();
    }, [id]);

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
            <h3>Actualizando {title}</h3>
            <img className= "mgl-covers" src={image_url} alt="Imagen del juego"/>
            <form onSubmit={update}>
                <div>
                    <label>Titulo</label><br/>
                    <input style={{ minWidth: '600px' }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        className='form-control' />
                </div>
                <div>
                    <label>Fecha de lanzamiento</label><br/>
                    <input style={{ minWidth: '600px' }}
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        type='text'
                        className='form-control' />
                </div>
                <div>
                    <label>Acerca de</label><br/>
                    <textarea style={{ minHeight: '200px', minWidth: '600px' }}
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)}
                        type='text'
                        className='form-control' />
                </div>
                <div>
                    <label>Image URL</label><br/>
                    <input style={{ minWidth: '600px' }}
                        value={image_url}
                        onChange={(e) => setImage_url(e.target.value)}
                        type='text'
                        className='form-control' />
                    <br/>
                </div>
                <button type='submit' className='mgl-button'>Actualizar</button>
            </form>
        </div>
        </>
    );
};

export default UpdateGame;
