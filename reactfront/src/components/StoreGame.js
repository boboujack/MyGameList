import React, {useState} from 'react'
/*Axios se utiliza para solicitudes HTTP*/
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const endpoint = 'https://demolaravel.ddns.net/api/games'

const StoreGame = () => {

    const [title, setTitle] = useState ('')
    const [releaseDate, setReleaseDate] = useState ('')
    const [synopsis, setSynopsis] = useState ('')

    const navigate = useNavigate()

    const store = async (e) => {
        e.preventDefault()
        await axios.post(endpoint, {title: title, releaseDate: releaseDate, synopsis: synopsis})
        navigate('/')
    }

    return (
        <div>
            <h3>Create Game</h3>
            <form onSubmit={store}>
                <div className='mb-3'>
                    <label className='form-label' >Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label' >releaseDate</label>
                    <input
                        value={releaseDate}
                        onChange={ (e)=> setReleaseDate(e.target.value) }
                        type='text'
                        className='form-control'
                    />
                </div>
                <div className='mb-3'>
                    <label className='form-label' >synopsis</label>
                    <input
                        value={synopsis}
                        onChange={ (e)=> setSynopsis(e.target.value) }
                        type='text'
                        className='form-control'
                    />
                </div>
                <button type='submit' className='btn btn-primary'>Store</button>
            </form>
        </div>
    )
}

export default StoreGame