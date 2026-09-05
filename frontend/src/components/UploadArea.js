import React, { useRef } from 'react';
import { UploadCloud } from 'lucide-react';

const UploadArea = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndPass(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateAndPass(e.target.files[0]);
    }
  };

  const validateAndPass = (file) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a PNG, JPG, or JPEG wireframe image.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds maximum limit of 10MB.');
      return;
    }
    onFileSelect(file);
  };

  return (
    <div
      className="upload-dropzone"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current.click()}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        accept="image/png, image/jpeg, image/jpg"
        style={{ display: 'none' }}
      />
      <UploadCloud size={48} className="upload-icon" />
      <h3>Drag & Drop your wireframe here</h3>
      <p>Supports PNG, JPG, JPEG (Max 10MB)</p>
      <button className="browse-btn" type="button">Browse File</button>
    </div>
  );
};

export default UploadArea;