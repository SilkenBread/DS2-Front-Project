import React from 'react';
import Sidebar from "../../views/sidebar";

//Para rutas autenticadas del menu
function AuthenticatedLayout ({ children }){
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ flexGrow: 1, padding: '20px' }}>{children}</div>
    </div>
  );
};

export default AuthenticatedLayout;
