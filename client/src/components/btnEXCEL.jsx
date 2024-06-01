import React, { useState } from "react";
import * as XLSX from "xlsx";
import { RiFileExcel2Line, RiFileExcel2Fill} from "react-icons/ri";

const BtnExcel = ({ datos }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = () => {
    setLoading(true);

    const libro = XLSX.utils.book_new();

    const hoja = XLSX.utils.json_to_sheet(datos);

    XLSX.utils.book_append_sheet(libro, hoja, "Tabla");

    setTimeout(() => {
      XLSX.writeFile(libro, "ProductosDefault.xlsx");
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <button className={`excel-btn ${loading ? 'loading' : ''}`} onClick={handleDownload}>
        {loading ? <RiFileExcel2Fill className="excel-icon" size={20} /> : <RiFileExcel2Line className="excel-icon" size={20} />}
        <span>Excel</span>
      </button>
      <style jsx>{`
        .excel-btn {
          background-color: green;
          color: white;
          border: none; /* Elimina el borde del botón */
          border-radius: 5px;
          padding: 9px 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .excel-btn:hover {
          background-color: #388e3c;
        }

        .excel-icon {
          margin-right: 5px;
        }

        .excel-btn span {
          font-weight: bold;
        }

        .loading {
          background-color: #689f38;
          cursor: not-allowed;
        }

        .loading:hover {
          background-color: #689f38;
        }
      `}</style>
    </>
  );
};

export default BtnExcel;
