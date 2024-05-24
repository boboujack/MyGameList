import React, { useEffect, useState } from 'react'
/*Axios se utiliza para solicitudes HTTP*/
import axios from 'axios'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const endpoint = 'https://demolaravel.ddns.net/api'

const IndexGames = () => {
    //useState almacena el index
    const [games, setGames] = useState([])

    // Se ejecuta al montar el componente para obtener el index
    useEffect(() => {
        getAllGames()
    }, [])

    // Función para obtener todos los juegos desde la API
    const getAllGames = async () => {
        const response = await axios.get(`${endpoint}/allgames`)
        // Actualiza el estado local con la lista de juegos obtenida
        setGames(response.data)
        console.log(response.data)
    }

    const deleteGame = async (id) => {
        await axios.delete(`${endpoint}/allgames/${id}`)
        getAllGames() // Llama a getAllGames nuevamente después de eliminar el juego
    }

    return (
        <div>
            <div className='d-grid gap-2'>
                <Link to="/store" className='btn btn-success btn-lg mt-2 mb-2 text-white'>Create</Link>
            </div>
            <table className='table table-stripped'>
                <thead className='bg-primary text-white'>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Release Date</th>
                        <th scope="col">Synopsis</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {games.map((game) => (
                        <tr key={game.id}>
                            <td>{game.title}</td>
                            <td>{game.releaseDate}</td>
                            <td>{game.synopsis}</td>
                            <td>
                                <Link to={`/update/${game.id}`} className='btn btn-warning'>Edit</Link>
                                <button onClick={() => deleteGame(game.id)} className='btn btn-danger'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default IndexGames
