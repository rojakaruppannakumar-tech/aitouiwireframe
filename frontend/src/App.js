import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import UploadPage from './components/UploadPage';
import EditorPage from './components/EditorPage';
import LoadingScreen from './components/LoadingScreen';

import { analyzeWireframe } from './services/api';

import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    'Analyzing wireframe layout...'
  );
  const [mockupData, setMockupData] = useState(null);
  const [error, setError] = useState(null);

  // Select image
  const handleFileSelect = (file) => {
    setError(null);
    setSelectedFile(file);

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  // Clear selected image
  const handleClearFile = () => {
    setSelectedFile(null);

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl('');
    setError(null);
  };

  // Generate UI from wireframe
  const handleGenerateUI = async (navigate) => {
    if (!selectedFile) {
      setError('Please select a wireframe image first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setLoadingMessage('Analyzing wireframe layout...');

    try {
      // Send image to backend
      const response = await analyzeWireframe(selectedFile);

      console.log('AI Response:', response);

      if (response && Array.isArray(response.components)) {
        // Convert AI components into editor-friendly components
        const components = response.components.map((comp, index) => ({
          id:
            comp.id ||
            `${comp.type || 'component'}-${Date.now()}-${index}`,

          type: comp.type || 'paragraph',

          text: comp.text || '',

          x: comp.x ?? 50,

          y: comp.y ?? 50 + index * 80,

          width:
            comp.width ??
            (
              comp.type === 'button'
                ? 140
                : comp.type === 'input'
                ? 220
                : comp.type === 'navbar'
                ? 800
                : 250
            ),

          height:
            comp.height ??
            (
              comp.type === 'navbar'
                ? 60
                : 50
            ),

          bgColor:
            comp.bgColor ||
            (
              comp.type === 'button'
                ? '#4f46e5'
                : comp.type === 'navbar'
                ? '#1e293b'
                : '#ffffff'
            ),

          textColor:
            comp.textColor ||
            (
              comp.type === 'button' ||
              comp.type === 'navbar'
                ? '#ffffff'
                : '#000000'
            ),

          fontSize: comp.fontSize ?? 16,

          placeholder: comp.placeholder || ''
        }));

        // Create final mockup data
        const normalizedData = {
          page: response.page || {
            name: 'Generated UI Mockup',
            width: 1000,
            height: 700
          },

          components: components
        };

        console.log('Normalized Mockup Data:', normalizedData);

        // Save generated data
        setMockupData(normalizedData);

        setIsLoading(false);

        // Go to editor
        navigate('/editor');
      } else {
        throw new Error(
          'Invalid component data returned from server.'
        );
      }
    } catch (err) {
      console.error('Generation Error:', err);

      setError(
        err.response?.data?.error ||
        err.message ||
        'Failed to compile wireframe.'
      );

      setIsLoading(false);
    }
  };

  return (
    <Router>

      <Navbar />

      {isLoading && (
        <LoadingScreen message={loadingMessage} />
      )}

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* Upload */}
        <Route
          path="/upload"
          element={
            <UploadPage
              selectedFile={selectedFile}
              previewUrl={previewUrl}
              error={error}
              onFileSelect={handleFileSelect}
              onClearFile={handleClearFile}
              onGenerate={handleGenerateUI}
            />
          }
        />

        {/* Editor */}
        <Route
          path="/editor"
          element={
            mockupData ? (
              <EditorPage
                mockupData={mockupData}
                setMockupData={setMockupData}
              />
            ) : (
              <Navigate
                to="/upload"
                replace
              />
            )
          }
        />

        {/* Unknown URL */}
        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />

      </Routes>

    </Router>
  );
}

export default App;