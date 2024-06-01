import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

export const Title = ({ text }) => {
  return (
    <div
      style={{
        backgroundColor: '#9564FE', // Color de fondo del contenedor
        padding: '8px 12px', // Espaciado interno reducido
        display: 'flex', // Flex para alinear elementos
        alignItems: 'center', // Alinear elementos verticalmente
        borderRadius: '10px', // Borde redondeado
        marginBottom: '8px', // Margen inferior reducido
      }}
    >
      <AiFillPlusCircle style={{ marginRight: '8px', fontSize: '20px', color: '#fff' }} />
      <h3 style={{ margin: 0, color: '#fff', fontSize: '16px' }}>{text}</h3>
    </div>
  );
};

