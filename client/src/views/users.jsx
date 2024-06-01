import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/navbar';
import { Title } from '../components/title';
import { DataTable } from '../components/datatable';
import { FaUserPlus } from 'react-icons/fa';
import RegisterUserModal from '../components/registerUserModal';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export const Users = () => {
  const [hovered, setHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    document.title = 'Gestión de usuarios';
    fetchUsersFromBackend();
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  //Petición para mostrar los usuarios registrados en el datatable.
  const fetchUsersFromBackend = async () => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get('https://ds2-backend-project.onrender.com/user/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al obtener los usuarios. Por favor, intenta de nuevo más tarde.',
      });
    }
  };

  const handleAddUser = async () => {
    // Abre el modal para agregar usuario
    handleShowModal();
  };

  return (
    <div>
      <Navbar />
      <div style={{ marginTop: '30px', position: 'relative' }}>
        <Title text="Gestión de usuarios" />
        <div style={{ position: 'absolute', top: '50px', right: '10px' }}>
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleAddUser}
            style={{
              marginTop: '35px',
              marginLeft: '0px',
              backgroundColor: hovered ? '#9564FE' : 'white',
              color: hovered ? 'white' : '#000', 
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              transition: 'background-color 0.3s, color 0.3s', 
            }}
          >
            <span style={{ fontSize: '15px', marginRight: '5px' }}>Registrar</span>
            <FaUserPlus style={{ fontSize: '20px' }} />
          </button>
        </div>
        <div style={{ marginTop: '100px' }}>
          <DataTable users={users} />
        </div>
      </div>
      <RegisterUserModal show={showModal} handleClose={handleCloseModal} fetchUsers={fetchUsersFromBackend} />
    </div>
  );
};
