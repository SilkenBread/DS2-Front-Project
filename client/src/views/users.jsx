import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/navbar';
import { Title } from '../components/title';
import { DataTable } from '../components/datatable';
import { FaUserPlus } from 'react-icons/fa';

export const Users = () => {
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    document.title = 'Menu - Users';
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
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
          <DataTable />
        </div>
      </div>
    </div>
  );
};
