import React, { useEffect, useState } from 'react';
import pointsImage from '../assets/pointsImage.jpg';
import bg from '../assets/bg.jpg';
import imageLogin from '../assets/imageLogin.png';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRememberPasswordChange = (e) => {
    setRememberPassword(e.target.checked);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //Petición de inicio de sesión al host.
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ds2-backend-project.onrender.com/login/', {
        username,
        password
      });

      if (response.status === 200) {
        const { token } = response.data;
        //Se recibe el token, se almacena en una cookies.
        if (token) {
          Cookies.set('token', token);
          console.log('Login successful:', token);
          navigate('/menu/users');
        } else {
          throw new Error('No token found in response');
        }
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      //Mostrar alerta de error.
      Swal.fire({
        icon: 'error',
        title: 'Acceso denegado...',
        text: 'Credenciales incorrectas',
      });
    }
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
        <img src={imageLogin} alt="Logo" style={{ width: '80%', marginLeft: '40px', marginTop: '90px'}} />
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
          <h3 style={{ marginBottom: '20px', fontSize: '40px', fontWeight: 'bold', marginTop: '-30px'}}>¡Bienvenidos!</h3>
          <form onSubmit={handleLogin} style={{ width: '100%', marginTop: '110px'}}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <FaUser style={{ marginRight: '10px', fontSize: '24px', color: '#ccc' }} />
              <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Usuario"
                style={{
                  width: '100%',
                  border: 'none',
                  borderBottom: '1px solid #ccc',
                  padding: '8px',
                  fontSize: '18px', 
                }}
              />
            </div>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <FaLock style={{ marginRight: '10px', fontSize: '24px', color: '#ccc' }} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Contraseña"
                style={{
                  width: 'calc(100% - 30px)',
                  border: 'none',
                  borderBottom: '1px solid #ccc',
                  padding: '8px',
                  fontSize: '18px', 
                }}
              />
              <span style={{ cursor: 'pointer' }} onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash style={{ fontSize: '24px' }} /> : <FaEye style={{ fontSize: '24px' }} />}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
              <input
                type="checkbox"
                id="rememberPassword"
                checked={rememberPassword}
                onChange={handleRememberPasswordChange}
              />
              <label htmlFor="rememberPassword" style={{ marginLeft: '5px', fontSize: '18px' }}>
                Recordar contraseña
              </label>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: '#9564FE',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginBottom: '20px',
                width: '100%',
                fontSize: '20px', 
                transition: 'background-color 0.3s', //Transición de color del botón
              }}
              // Estilo hover para cambiar el color al pasar el mouse
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#7445FF')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#9564FE')}
              >
              Iniciar Sesión
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
          <Link to="/ResetPassword" style={{ textDecoration: 'none' }}>
            <p style={{ color: '#1877F2', marginTop: '-11px', fontSize: '18px' }}>¿Olvidaste tu contraseña?</p>
          </Link>
        </div>
      </div>
    </div>
  );
};
