// src/components/LoadingScreen.js
import React from 'react';
import { Loader2 } from 'lucide-react';
import './LoadingScreen.css';

const LoadingScreen = ({ message }) => {
  return (
    <div className="loading-overlay">
      <div className="loading-card">
        <Loader2 className="spinner" size={48} />
        <h3>Compiling Wireframe...</h3>
        <p>{message || 'Processing vision analysis and UI component generation.'}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;