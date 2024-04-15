import React, { useEffect, useState } from 'react';
import pointsImage from '../assets/pointsImage.jpg';
import bg from '../assets/bg.jpg';
import imageLogin from '../assets/imageLogin.png';
import { FaEnvelope } from 'react-icons/fa';
import Swal from 'sweetalert2'; 
import { Link } from 'react-router-dom';

export const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    document.title = 'Reset Password';
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = () => {
    // Mostrar animación de validación  al hacer clic en el botón
    setLoading(true);

    // Simula un tiempo de espera para mostrar el proceso de "verificando correo"
    setTimeout(() => {
      // Oculta la animación de carga después de simular la verificación del correo
      setLoading(false);

      Swal.fire({
        icon: 'success',
        title: 'Correo enviado',
        text: 'Se ha enviado un correo con las instrucciones para el cambio de tu contraseña. Por favor, verifica la información enviada.',
      });
    }, 2000); // Tiempo simulado de verificación (2 segundos)
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <div style={{ flex: 1 }}>
        <h1 style={{ color: '#6C6262', position: 'absolute', left: '20px', top: '20px', display: 'flex', alignItems: 'center' }}>
          <img src={pointsImage} alt="Points" style={{ width: '60px', height: '40px', marginLeft: '10px' }} />
          INICIAR SESIÓN
        </h1>
        <img src={imageLogin} alt="Logo" style={{ width: '80%', marginLeft: '40px', marginTop: '90px' }} />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
        <div
          style={{
            borderRadius: '30px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
            padding: '20px',
            textAlign: 'center',
            width: '80%',
            paddingTop: '100px',
          }}
        >
          <h3 style={{ marginBottom: '20px', fontSize: '40px', fontWeight: 'bold', marginTop: '-30px' }}>¡Recupera tu cuenta!</h3>
          <form style={{ width: '100%', marginTop: '110px' }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <FaEnvelope style={{ marginRight: '10px', fontSize: '24px', color: '#ccc' }} />
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Ingrese su correo electrónico"
                style={{
                  width: '100%',
                  border: 'none',
                  borderBottom: '1px solid #ccc',
                  padding: '8px',
                  fontSize: '18px',
                }}
              />
            </div>
            <button
              type="button"
              style={{
                backgroundColor: '#9564FE',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px', 
                marginBottom: '20px',
                width: '100%',
                fontSize: '20px',
                transition: 'background-color 0.3s',
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#7445FF')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#9564FE')}
              onClick={handleResetPassword} // Agrega el manejador de clic
            >
              {loading ? 'Verificando correo...' : 'Restaurar contraseña'}
            </button>
          </form>
          <Link to="/Login" style={{ textDecoration: 'none' }}>
          <p style={{ color: '#1877F2', marginTop: '-11px', fontSize: '18px' }}>Regresar al inicio de sesión</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
