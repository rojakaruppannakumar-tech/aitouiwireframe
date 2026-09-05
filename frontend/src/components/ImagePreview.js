import React from 'react';
import { X, FileImage } from 'lucide-react';

const ImagePreview = ({ previewUrl, fileName, onClear }) => {
  return (
    <div className="image-preview-card">
      <div className="preview-header">
        <span className="file-info"><FileImage size={18} /> {fileName}</span>
        <button className="remove-btn" onClick={onClear} title="Remove image">
          <X size={18} />
        </button>
      </div>
      <div className="img-wrapper">
        <img src={previewUrl} alt="Wireframe Preview" />
      </div>
    </div>
  );
};

export default ImagePreview;