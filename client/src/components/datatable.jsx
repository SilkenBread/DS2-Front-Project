import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.min';
import 'datatables.net-buttons/js/buttons.html5.min';
import 'datatables.net-buttons/js/buttons.print.min';
import 'datatables.net-buttons/js/buttons.colVis.min';
import EditUserModal from '../components/editUserModal';
import Swal from 'sweetalert2';
import axios from 'axios';
import Cookies from 'js-cookie';

export const DataTable = ({ users, fetchUsers }) => {
  const tableRef = useRef(null);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const dataTable = $(tableRef.current).DataTable({
      dom: 'Bfrtip',
      buttons: [
        {
          extend: 'excelHtml5',
          text: '<i class="fas fa-file-excel"></i> <strong>Excel</strong>',
          titleAttr: 'Exportar a Excel',
          className: 'btn-excel',
        },
        {
          extend: 'pdfHtml5',
          text: '<i class="fas fa-file-pdf"></i> <strong>PDF</strong>',
          titleAttr: 'Exportar a PDF',
          className: 'btn-pdf',
        },
        {
          extend: 'print',
          text: '<i class="fas fa-print"></i> <strong>Print</strong>',
          titleAttr: 'Imprimir tabla',
          className: 'btn-print',
        },
      ],
      data: users.map(user => [
        user.id,
        user.name,
        user.last_name,
        user.email,
        user.phone,
        user.document,
        user.groups,
        null // Para la columna de acciones
      ]),
      columns: [
        { title: "Id" },
        { title: "Nombres" },
        { title: "Apellidos" },
        { title: "Correo" },
        { title: "Teléfono" },
        { title: "Documento" },
        { title: "Grupos" },
        {
          title: "Acciones",
          data: null,
          render: function (data, type, row) {
            return `
              <div class="action-icons">
                <button class="edit-button" data-id="${row[0]}"><i class="fa fa-edit"></i></button>
                <button class="delete-button" data-id="${row[0]}"><i class="fa fa-trash"></i></button>
              </div>
            `;
          }
        }
      ]
    });

    $(tableRef.current).on('click', '.edit-button', function() {
      const userId = $(this).data('id');
      const user = users.find(u => u.id === userId);
      setSelectedUser(user);
    });

    $(tableRef.current).on('click', '.delete-button', function() {
      const userId = $(this).data('id');
      handleDelete(userId);
    });

    return () => {
      dataTable.destroy();
    };
  }, [users]);

  //ALERTA DE CONFIRMACIÓN - ELIMINACIÓN DE USUARIO.
  const handleDelete = (userId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteUser(userId);
      }
    });
  };

  //PETICIÓN AL HOST DE ELIMINAR EL USUARIO.
  const deleteUser = async (userId) => {
    try {
      const token = Cookies.get('token');
      await axios.delete(`https://ds2-backend-project.onrender.com/user/${userId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchUsers();
      Swal.fire(
        '¡Eliminado!',
        'El usuario ha sido eliminado.',
        'success'
      );
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      Swal.fire(
        'Error',
        'Hubo un error al eliminar el usuario. Por favor, intenta de nuevo más tarde.',
        'error'
      );
    }
  };

  const handleClose = () => {
    setSelectedUser(null);
  };

  return (
    <div className="container">
      <style>
        {`
          .datatable-container {
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            padding: 20px;
            margin-top: 40px;
            position: relative;
          }

          .dataTables_filter {
            position: absolute;
            top: 20px;
            right: 20px;
          }

          .btn-excel {
            background-color: green !important;
            color: white !important;
            font-size: 12px !important;
            border: 1px solid #4CAF50;
            border-radius: 5px;
          }

          .btn-pdf {
            background-color: red !important;
            color: white !important;
            font-size: 12px !important;
            border: 1px solid #F44336;
            border-radius: 5px;
          }

          .btn-print {
            background-color: red !important;
            color: white !important;
            font-size: 12px !important;
            border: 1px solid #F44336;
            border-radius: 5px;
          }

          .btn-excel strong,
          .btn-pdf strong,
          .btn-print strong {
            font-weight: bold;
          }

          .btn-excel i,
          .btn-pdf i,
          .btn-print i {
            font-size: 15px;
          }

          .custom-search-input {
            margin-left: 100px;
          }

          #example th,
          #align td {
            text-align: center;
          }

          .action-icons {
            display: flex;
            justify-content: center;
          }

          .action-icons span {
            margin: 0 5px;
            cursor: pointer;
          }

          .edit-button {
            background-color: blue;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
            margin-right: 5px;
          }
          
          .delete-button {
            background-color: red;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 5px 10px;
          }
          
          .edit-button i, .delete-button i {
            color: white;
          }
        `}
      </style>
      <div className="datatable-container">
        <table id="align" className="display nowrap" style={{ width: '100%' }} ref={tableRef}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Documento</th>
              <th>Grupos</th>
              <th>Acciones</th>
            </tr>
          </thead>
        </table>
      </div>
      {selectedUser && (
        <EditUserModal
          show={true}
          handleClose={handleClose}
          fetchUsers={fetchUsers}
          userData={selectedUser}
        />
      )}
    </div>
  );
};
