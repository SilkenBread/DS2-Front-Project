import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';

const RegisterUserModal = ({ show, handleClose, fetchUsers }) => {
  const [userData, setUserData] = useState({
    name: '',
    last_name: '',
    email: '',
    phone: '',
    document: '',
    group: '',
    password: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  //Petición al host para crear el usuario.
  const handleSubmit = async () => {
    try {
      const token = Cookies.get('token');
      const { password, ...userDataWithoutPassword } = userData;
      await axios.post('https://ds2-backend-project.onrender.com/user/', userDataWithoutPassword, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      handleClose();
      fetchUsers();
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Usuario registrado exitosamente.',
      });
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al registrar el usuario. Por favor, intenta de nuevo.',
      });
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Añadir Usuario</h2>
        <hr className="separator" />
        <div className="modal-body">
          <div className="input-group">
            <label htmlFor="name"><b>Nombres</b></label>
            <input 
              type="text" 
              id="name" 
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Ingrese su nombre" 
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName"><b>Apellidos</b></label>
            <input 
              type="text" 
              id="lastName" 
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              placeholder="Ingrese su apellido" 
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="email"><b>Correo</b></label>
            <input 
              type="email" 
              id="email" 
              name="email"
              value={userData.email}
              onChange={handleChange}
              placeholder="Ingrese su correo electrónico" 
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone"><b>Teléfono</b></label>
            <input 
              type="tel" 
              id="phone" 
              name="phone"
              value={userData.phone}
              onChange={handleChange}
              placeholder="Ingrese su número de teléfono" 
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
              onChange={handleChange}
              placeholder="Ingrese su número de documento" 
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="role"><b>Rol</b></label>
            <input 
              type="text" 
              id="role" 
              name="role"
              value={userData.role}
              onChange={handleChange}
              placeholder="Ingrese el rol del usuario" 
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="password"><b>Contraseña</b></label>
            <input 
              type="password" 
              id="password" 
              name="password"
              value={userData.password}
              onChange={handleChange}
              placeholder="Ingrese su contraseña" 
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="confirmPassword"><b>Confirmar Contraseña</b></label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword"
              value={userData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirme su contraseña" 
              className="input-field" 
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn cancel-btn" onClick={handleClose}>Cancelar</button>
          <button className="btn register-btn" onClick={handleSubmit}>Añadir</button>
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

        .register-btn {
          background: #1877F2;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default RegisterUserModal;
