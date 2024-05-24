import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const endpoint = 'https://demolaravel.ddns.net/api/games/'

const UpdateGame = () => {
    const [title, setTitle] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [synopsis, setSynopsis] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const update = async (e) => {
        e.preventDefault()
        try {
            await axios.put(`${endpoint}${id}`, {
                title: title,
                releaseDate: releaseDate,
                synopsis: synopsis
            })
            navigate('/')
        } catch (error) {
            console.error('Error updating game:', error)
        }
    }

    useEffect(() => {
        const getGameById = async () => {
            try {
                const response = await axios.get(`${endpoint}${id}`)
                // Asignar los valores del juego al estado correspondiente
                setTitle(response.data.title)
                setReleaseDate(response.data.releaseDate)
                setSynopsis(response.data.synopsis)
            } catch (error) {
                console.error('Error fetching game:', error)
            }
        }
        getGameById()
    }, [id, title])
    

    return (
        <div>
            <h3>Update Game</h3>
            <form onSubmit={update}>
                <div className='mb-3'>
                    <label className='form-label'>Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Release Date</label>
                    <input
                        value={releaseDate}
                        onChange={(e) => setReleaseDate(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Synopsis</label>
                    <input
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Update</button>
            </form>
        </div>
    )
}

export default UpdateGame
