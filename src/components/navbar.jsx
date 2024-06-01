import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaSignOutAlt, FaEdit, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [arrowUp, setArrowUp] = useState(false);
  const [highlightedOption, setHighlightedOption] = useState(null);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
    setArrowUp(prevState => !prevState);
  };

  const handleLogout = async () => {
    try {
      const token = Cookies.get('token');
      // Realiza la solicitud de cierre de sesión al host
      await axios.post('https://ds2-backend-project.onrender.com/logout/', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Elimina el token de las cookies
      Cookies.remove('token');
      console.log('Token eliminado');
      // Redirige al usuario a la página de inicio de sesión
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <div className="navbar-container" style={{ position: 'fixed', top: 0, right: 0, zIndex: 1000 }}>
      <div className="navbar" style={{ backgroundColor: 'transparent', color: '#333', height: '60px', padding: '0 20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <div className="navbar-icon" onClick={toggleDropdown} style={{ cursor: 'pointer', fontSize: '40px', marginRight: '5px', color: '#f0f0f0' }}>
          <FaUserCircle />
        </div>
        <div className="arrow-icon" onClick={toggleDropdown} style={{ cursor: 'pointer', fontSize: '15px', color: '#888' }}>
          {arrowUp ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>
      {dropdownOpen && (
        <div
          className="sub-menu"
          style={{
            position: 'absolute',
            top: 'calc(60px - 10px)',
            right: '20px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '10px',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            minWidth: '160px',
            transform: 'translateY(0)',
            transition: 'transform 0.2s ease',
          }}
        >
          <div
            className="sub-menu-item"
            onClick={toggleDropdown}
            onMouseEnter={() => setHighlightedOption('edit')}
            onMouseLeave={() => setHighlightedOption(null)}
            style={{
              padding: '12px 16px',
              cursor: 'pointer',
              backgroundColor: highlightedOption === 'edit' ? '#9564FE' : 'transparent',
              color: highlightedOption === 'edit' ? '#fff' : '#333',
              fontWeight: highlightedOption === 'edit' ? 'bold' : 'normal',
            }}
          >
            <FaEdit style={{ marginRight: '10px' }} />
            <span>Editar perfil</span>
          </div>
          <div
            className="sub-menu-item"
            onClick={handleLogout}
            onMouseEnter={() => setHighlightedOption('logout')}
            onMouseLeave={() => setHighlightedOption(null)}
            style={{
              padding: '12px 16px',
              cursor: 'pointer',
              backgroundColor: highlightedOption === 'logout' ? '#9564FE' : 'transparent',
              color: highlightedOption === 'logout' ? '#fff' : '#333',
              fontWeight: highlightedOption === 'logout' ? 'bold' : 'normal',
            }}
          >
            <FaSignOutAlt style={{ marginRight: '10px' }} />
            <span>Cerrar sesión</span>
          </div>
        </div>
      )}
    </div>
  );
}
