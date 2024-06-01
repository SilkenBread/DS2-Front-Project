import React from 'react';

const RegisterUserModal = ({ show, handleClose }) => {
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
            <label htmlFor="firstName"><b>Nombre</b></label>
            <input 
              type="text" 
              id="firstName" 
              placeholder="Ingrese su nombre" 
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="lastName"><b>Apellido</b></label>
            <input 
              type="text" 
              id="lastName" 
              placeholder="Ingrese su apellido" 
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="email"><b>Correo</b></label>
            <input 
              type="email" 
              id="email" 
              placeholder="Ingrese su correo electrónico" 
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="phone"><b>Teléfono</b></label>
            <input 
              type="tel" 
              id="phone" 
              placeholder="Ingrese su número de teléfono" 
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="document"><b>Documento</b></label>
            <input 
              type="text" 
              id="document" 
              placeholder="Ingrese su número de documento" 
              className="input-field" 
            />
          </div>
          <div className="input-group">
            <label htmlFor="role"><b>Rol</b></label>
            <input 
              type="text" 
              id="role" 
              placeholder="Ingrese el rol del usuario" 
              className="input-field" 
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn cancel-btn" onClick={handleClose}>Cancelar</button>
          <button className="btn register-btn">Añadir</button>
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
