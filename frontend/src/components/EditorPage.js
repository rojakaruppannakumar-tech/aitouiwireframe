// src/components/EditorPage.js
import React, { useState, useRef } from 'react';
import ComponentPalette from './ComponentPalette';
import MockupViewer from './MockupViewer';
import PropertyEditor from './PropertyEditor';
import ExportButton from './ExportButton';
import './EditorPage.css';

const EditorPage = ({ mockupData, setMockupData }) => {
  const [selectedId, setSelectedId] = useState(null);
  const canvasRef = useRef(null);

  const selectedComponent = mockupData?.components?.find((c) => c.id === selectedId);

  const handleAddComponent = (type) => {
    const newId = `${type}-${Date.now()}`;
    const newComponent = {
      id: newId,
      type,
      text: type.charAt(0).toUpperCase() + type.slice(1),
      x: 50,
      y: 50,
      width: type === 'button' ? 140 : type === 'input' ? 220 : type === 'navbar' ? 800 : 200,
      height: type === 'navbar' ? 60 : 50,
      bgColor: type === 'button' ? '#4f46e5' : type === 'navbar' ? '#1e293b' : '#ffffff',
      textColor: type === 'button' || type === 'navbar' ? '#ffffff' : '#000000',
      fontSize: 16
    };

    setMockupData((prev) => ({
      ...prev,
      components: [...prev.components, newComponent]
    }));
    setSelectedId(newId);
  };

  const handleUpdateComponent = (id, updatedProps) => {
    setMockupData((prev) => ({
      ...prev,
      components: prev.components.map((comp) =>
        comp.id === id ? { ...comp, ...updatedProps } : comp
      )
    }));
  };

  const handleUpdatePosition = (id, newX, newY) => {
    handleUpdateComponent(id, { x: newX, y: newY });
  };

  const handleDeleteComponent = (id) => {
    setMockupData((prev) => ({
      ...prev,
      components: prev.components.filter((comp) => comp.id !== id)
    }));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="editor-page-container">
      <header className="editor-toolbar">
        <div className="page-title">
          <h2>{mockupData?.page?.name || 'UI Mockup Studio'}</h2>
        </div>
        <ExportButton mockupData={mockupData} canvasRef={canvasRef} />
      </header>

      <div className="three-panel-layout">
        <ComponentPalette onAddComponent={handleAddComponent} />

        <main className="center-workspace">
          <MockupViewer
            mockupData={mockupData}
            selectedId={selectedId}
            onSelectComponent={setSelectedId}
            canvasRef={canvasRef}
            onUpdatePosition={handleUpdatePosition}
          />
        </main>

        <PropertyEditor
          selectedComponent={selectedComponent}
          onUpdateComponent={handleUpdateComponent}
          onDeleteComponent={handleDeleteComponent}
        />
      </div>
    </div>
  );
};

export default EditorPage;