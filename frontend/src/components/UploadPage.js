// src/components/UploadPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import UploadArea from './UploadArea';
import ImagePreview from './ImagePreview';
import GenerateButton from './GenerateButton';
import { AlertCircle } from 'lucide-react';
import './UploadPage.css';

const UploadPage = ({ selectedFile, previewUrl, error, onFileSelect, onClearFile, onGenerate }) => {
  const navigate = useNavigate();

  return (
    <div className="upload-page-container">
      <h2>Upload Wireframe</h2>
      <p className="subtitle">Upload your hand-drawn sketch or digital wireframe to compile into an editable UI.</p>

      {error && (
        <div className="alert-box alert-error">
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {!selectedFile ? (
        <UploadArea onFileSelect={onFileSelect} />
      ) : (
        <div className="preview-container">
          <ImagePreview
            previewUrl={previewUrl}
            fileName={selectedFile.name}
            onClear={onClearFile}
          />
          <div className="actions-bar">
            <GenerateButton onClick={() => onGenerate(navigate)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;