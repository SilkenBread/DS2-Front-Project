import React from "react";
import { BsFilePdf } from "react-icons/bs";
import jsPDF from "jspdf";
import "jspdf-autotable";

const BtnPDF = ({ columsName, datos, archivoName, titleDocument }) => {
  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text(titleDocument, 20, 10);
    doc.autoTable({
      theme: "striped",
      columns: columsName,
      body: datos,
    });
    doc.save(archivoName);
  };

  return (
    <div>
      <button className="pdf-btn" onClick={() => downloadPdf()}>
        <BsFilePdf className="pdf-icon" size={24} /> {/* Aumenta el tamaño del icono */}
        <span>PDF</span>
      </button>
      <style jsx>{`
        .pdf-btn {
          background-color: red; /* Cambia el color del botón a un rojo más claro */
          color: white;
          border: none;
          border-radius: 5px;
          padding: 7px 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
        }

        .pdf-btn:hover {
          background-color: #b22d21; /* Cambia el color del botón al pasar el cursor sobre él */
        }

        .pdf-icon {
          margin-right: 5px;
        }

        .pdf-btn span {
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default BtnPDF;
