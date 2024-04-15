import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-buttons/js/dataTables.buttons.min';
import 'datatables.net-buttons/js/buttons.html5.min';
import 'datatables.net-buttons/js/buttons.print.min';
import 'datatables.net-buttons/js/buttons.colVis.min';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

export const DataTable = () => {
  const tableRef = useRef(null);

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
    });

    const searchInput = $(`#${dataTable.table().node().id}`);
    searchInput.addClass('custom-search-input');

    return () => {
      dataTable.destroy();
    };
  }, []);

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

          .action-icons button {
            background: none;
            border: none;
            cursor: pointer;
            margin-right: 5px;
            font-size: 18px;
          }
        `}
      </style>
      <div className="datatable-container">
        <table id="align" className="display nowrap" style={{ width: '100%' }} ref={tableRef}>
          <thead>
            <tr>
              <th>Identificación</th>
              <th>Foto</th>
              <th>Nombres</th>
              <th>XXX</th>
              <th>XXX</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tiger Nixon</td>
              <td>System Architect</td>
              <td>Edinburgh</td>
              <td>61</td>
              <td>2011/04/25</td>
              <td className="action-icons">
                <button><FaEdit /></button>
                <button><FaTrash /></button>
              </td>
            </tr>
            <tr>
              <td>Garrett Winters</td>
              <td>Accountant</td>
              <td>Tokyo</td>
              <td>63</td>
              <td>2011/07/25</td>
              <td className="action-icons">
                <button><FaEdit /></button>
                <button><FaTrash /></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
