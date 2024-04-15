import React, { useEffect, useState } from 'react';
import { FaRegUser } from 'react-icons/fa'; 
import { FaChevronRight } from 'react-icons/fa'; 
import { MdOutlineInventory } from 'react-icons/md'; 
import iconSB from '../assets/iconSB.png';
import { Link } from 'react-router-dom'; 

const Sidebar = () => {
  const [selectedModule, setSelectedModule] = useState(null);

  useEffect(() => {
    document.title = 'Menu';
  }, []);

  const handleModuleClick = (moduleName) => {
    setSelectedModule(moduleName);
  };

  const isActive = (moduleName) => {
    return selectedModule === moduleName ? 'active' : '';
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '250px',
        backgroundColor: '#FAFAFA',
        color: '#000',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '2px 0px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', borderBottom: '1px solid #ccc', margin: '0 10px' }}>
        <img src={iconSB} alt="Logo" style={{ width: '50px', marginRight: '10px' }} />
        <div>
          <div style={{ fontSize: '1.6em', fontWeight: 'bold' }}>COMMER</div>
          <div style={{ fontSize: '1.0em', fontWeight: 'bold', marginTop: '-3px' }}>TECH</div>
        </div>
      </div>

      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li className={`sidebar-item ${isActive('users')}`} onClick={() => handleModuleClick('users')}>
          <Link to="/menu/users" className="menu-link">
            <FaRegUser className={selectedModule === 'users' ? 'icon-active' : ''} />
            <span className={selectedModule === 'users' ? 'text-active' : ''}>Usuarios</span>
            <FaChevronRight className={`chevron-icon ${selectedModule === 'users' ? 'icon-active' : ''}`} />
          </Link>
        </li>
        <li className={`sidebar-item ${isActive('inventory')}`} onClick={() => handleModuleClick('inventory')}>
          <Link to="/menu/inventory" className="menu-link">
            <MdOutlineInventory className={selectedModule === 'inventory' ? 'icon-active' : ''} />
            <span className={selectedModule === 'inventory' ? 'text-active' : ''}>Inventarios</span>
            <FaChevronRight className={`chevron-icon ${selectedModule === 'inventory' ? 'icon-active' : ''}`} />
          </Link>
        </li>
      </ul>

      <style>{`
        .menu-link {
          display: flex;
          align-items: center;
          padding: 10px;
          border-radius: 5px;
          transition: background-color 0.3s, color 0.3s;
          color: #000;
          text-decoration: none;
        }

        .active .menu-link {
          background-color: #9564FE;
          color: #fff;
          font-weight: italic;
          border: 1px solid #9564FE;
        }

        .icon-active,
        .text-active {
          color: #fff;
        }

        .menu-link > * {
          margin-right: 10px; /* Espacio entre icono y texto */
        }

        .chevron-icon {
          margin-left: auto; /* Desplazar el icono de flecha hacia la derecha */
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
