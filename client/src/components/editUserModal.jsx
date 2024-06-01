import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const EditUserModal = ({ show, handleClose, fetchUsers, userData }) => {
  const [formData, setFormData] = useState({
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (userData) {
      setFormData({
        email: userData.email,
        phone: userData.phone
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  //Petición para la edición de un usuario en especifico al host.
  const handleSubmit = async () => {
    try {
      const token = Cookies.get('token');
      await axios.put(
        `https://ds2-backend-project.onrender.com/user/${userData.id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchUsers();
      handleClose();
      Swal.fire({
        icon: 'success',
        title: 'Usuario actualizado',
        text: 'El usuario ha sido actualizado correctamente',
      });
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al actualizar el usuario. Por favor, intenta de nuevo más tarde.',
      });
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Editar Usuario</h2>
        <hr className="separator" />
        <div className="modal-body">
          <div className="input-group">
            <label htmlFor="name"><b>Nombres</b></label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={userData.name}
              disabled
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName"><b>Apellidos</b></label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName"
              value={userData.last_name}
              disabled
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="email"><b>Correo</b></label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone"><b>Teléfono</b></label>
            <input 
              type="tel" 
              id="phone" 
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="document"><b>Documento</b></label>
            <input 
              type="text" 
              id="document" 
              name="document"
              value={userData.document}
              disabled
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="groups"><b>Grupos</b></label>
            <input 
              type="text" 
              id="groups" 
              name="groups"
              value={userData.groups}
              disabled
              className="input-field" 
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn cancel-btn" onClick={handleClose}>Cancelar</button>
          <button className="btn edit-btn" onClick={handleSubmit}>Actualizar</button>
        </div>
      </div>
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 5px;
          width: 400px;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .modal-title {
          text-align: left;
          margin-bottom: 20px;
        }

        .separator {
          margin: 20px 0;
          border: none;
          border-top: 1px solid #ccc;
        }

        .modal-body .input-group {
          margin-bottom: 15px;
        }

        .input-group label {
          display: block;
          margin-bottom: 5px;
        }

        .input-field {
          width: 100%;
          border: none;
          border-bottom: 1px solid #000;
          padding: 5px 0;
          outline: none;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }

        .btn {
          padding: 10px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 10px;
        }

        .cancel-btn {
          background: red;
          color: white;
        }

        .edit-btn {
          background: #1877F2;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default EditUserModal;
