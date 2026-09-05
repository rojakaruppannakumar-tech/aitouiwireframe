import React from 'react';

const MockupViewer = ({ mockupData, selectedId, onSelectComponent, canvasRef, onUpdatePosition }) => {
  const { page, components } = mockupData;

  const handleMouseDown = (e, comp) => {
    e.stopPropagation();
    onSelectComponent(comp.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = comp.x;
    const initialY = comp.y;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      onUpdatePosition(comp.id, Math.max(0, initialX + dx), Math.max(0, initialY + dy));
    };

    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const renderElement = (comp) => {
    const isSelected = comp.id === selectedId;
    const style = {
      position: 'absolute',
      left: `${comp.x}px`,
      top: `${comp.y}px`,
      width: `${comp.width}px`,
      height: `${comp.height}px`,
      backgroundColor: comp.bgColor || 'transparent',
      color: comp.textColor || '#000000',
      fontSize: `${comp.fontSize || 16}px`,
      border: isSelected ? '2px solid #4f46e5' : '1px solid transparent',
      borderRadius: '6px',
      cursor: 'move',
      boxSizing: 'border-box',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      padding: '4px'
    };

    switch (comp.type) {
      case 'heading':
        return <h2 style={style}>{comp.text || 'Heading'}</h2>;
      case 'paragraph':
        return <p style={{ ...style, alignItems: 'flex-start' }}>{comp.text || 'Paragraph text'}</p>;
      case 'button':
        return (
          <button style={{ ...style, backgroundColor: comp.bgColor || '#4f46e5', color: comp.textColor || '#ffffff', border: 'none', fontWeight: 'bold' }}>
            {comp.text || 'Button'}
          </button>
        );
      case 'input':
        return (
          <input
            type="text"
            readOnly
            placeholder={comp.placeholder || 'Enter text...'}
            value={comp.text || ''}
            style={{ ...style, border: '1px solid #cbd5e1', backgroundColor: comp.bgColor || '#ffffff' }}
          />
        );
      case 'card':
        return (
          <div style={{ ...style, backgroundColor: comp.bgColor || '#ffffff', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            {comp.text}
          </div>
        );
      case 'image':
        return (
          <div style={{ ...style, backgroundColor: comp.bgColor || '#f1f5f9', border: '2px dashed #94a3b8', color: '#64748b' }}>
            📷 Image
          </div>
        );
      case 'checkbox':
        return (
          <label style={{ ...style, justifyContent: 'flex-start', gap: '8px' }}>
            <input type="checkbox" readOnly /> <span>{comp.text || 'Checkbox'}</span>
          </label>
        );
      case 'navbar':
        return (
          <div style={{ ...style, backgroundColor: comp.bgColor || '#1e293b', color: comp.textColor || '#ffffff', justifyContent: 'space-between', padding: '0 16px' }}>
            <strong>Logo</strong>
            <span>{comp.text || 'Navigation Menu'}</span>
          </div>
        );
      default:
        return <div style={{ ...style, border: '1px dashed #666' }}>{comp.text || comp.type}</div>;
    }
  };

  return (
    <div className="canvas-wrapper">
      <div
        ref={canvasRef}
        className="mockup-canvas"
        style={{
          width: `${page?.width || 1000}px`,
          height: `${page?.height || 700}px`,
        }}
        onClick={() => onSelectComponent(null)}
      >
        {components.map((comp) => (
          <div key={comp.id} onMouseDown={(e) => handleMouseDown(e, comp)}>
            {renderElement(comp)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockupViewer;