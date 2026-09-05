import React, { useState } from 'react';
import { Download, Code, FileCode, Image } from 'lucide-react';
import { exportToJson, exportToHtmlCss, exportToPng } from '../utils/exportUtils';

const ExportButton = ({ mockupData, canvasRef }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="export-dropdown-container">
      <button className="export-main-btn" onClick={() => setIsOpen(!isOpen)}>
        <Download size={18} /> Export <span className="caret">▼</span>
      </button>

      {isOpen && (
        <div className="export-menu">
          <button onClick={() => { exportToPng(canvasRef); setIsOpen(false); }}>
            <Image size={16} /> Export PNG
          </button>
          <button onClick={() => { exportToHtmlCss(mockupData); setIsOpen(false); }}>
            <Code size={16} /> Export HTML / CSS
          </button>
          <button onClick={() => { exportToJson(mockupData); setIsOpen(false); }}>
            <FileCode size={16} /> Export JSON Schema
          </button>
        </div>
      )}
    </div>
  );
};

export default ExportButton;