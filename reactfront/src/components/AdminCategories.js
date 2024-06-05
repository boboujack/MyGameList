import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Components.css'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar';

const endpoint = 'https://demolaravel.ddns.net/api'

const AdminUsers = ({ accessToken, setAccessToken, userID, setUserID, setUserName, userRole, setUserRole } ) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    if (!isAdmin) {
        navigate('/'); // Redirige a HomePage si no es administrador
    }else{
        getAllCategories();
    }
  }, [isAdmin, navigate]);

  const getAllCategories = async () => {
    const response = await axios.get(`${endpoint}/categories`);
    setCategories(response.data)
  }

  const store = async (e) => {
    e.preventDefault();
    try {
        await axios.post(`${endpoint}/categories`, {
            category: category
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
    //Refrescamos las categorías
    await getAllCategories();
    // Limpia el campo de entrada después de añadir
    setCategory('');

    } catch (error) {
        console.error('Error updating category:', error);
    }
};

const handleDeleteCategory = async (categoryId) => {
  setLoading(true);
  const confirmed = window.confirm("¿Está seguro de que desea eliminar esta categoría?");
  if (confirmed) {
    try {
      const response = await axios.delete(`https://demolaravel.ddns.net/api/categories/${categoryId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      //Refrescamos las categorías
      setCategories(categories.filter(category => category.id !== categoryId));
      console.log('Delete category response:', response.data);
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
      alert('Se ha producido un error al eliminar la cuenta. Por favor, intenta nuevamente más tarde.');
    }
  }
    setLoading(false);
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
      <form onSubmit={store}>
              <div>
                  <label className='form-label'></label>
                  <input style={{ minWidth: '600px' }}
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      type='text'
                      placeholder="Nueva categoría"
                      className='form-control' />
              </div>
              <button type='submit' className='mgl-button'>Añadir categoría</button>
          </form>
      <div className='mgl-divBellowNav'>
      <h3 style={{ color: '#2a5285' }}>Categorías</h3>
      {categories.map(category => (
          <article key={category.id} className='mgl-categoryCard-admin'>
            <p>{category.category} </p>
            <button onClick={() => handleDeleteCategory(category.id)} disabled={loading} className='mgl-button-delete'>Eliminar</button>
          </article>
      ))}
      </div>
    </div>
    </>
  )
}

export default AdminUsers
