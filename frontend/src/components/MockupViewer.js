import React from 'react';

const MockupViewer = ({
  mockupData,
  selectedId,
  onSelectComponent,
  canvasRef,
  onUpdatePosition
}) => {
  const { page, components } = mockupData;

  const handleMouseDown = (e, comp) => {
    e.stopPropagation();

    // Select component
    onSelectComponent(comp.id);

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = comp.x || 0;
    const initialY = comp.y || 0;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      onUpdatePosition(
        comp.id,
        Math.max(0, initialX + dx),
        Math.max(0, initialY + dy)
      );
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

    const baseStyle = {
      position: 'absolute',
      left: `${comp.x || 0}px`,
      top: `${comp.y || 0}px`,
      width: `${comp.width || 150}px`,
      height: `${comp.height || 40}px`,
      color: comp.textColor || '#111827',
      fontSize: `${comp.fontSize || 16}px`,
      borderRadius: '8px',
      cursor: 'move',
      boxSizing: 'border-box',
      userSelect: 'none',
      padding: '6px 10px'
    };

    const selectionStyle = isSelected
      ? {
          outline: '2px solid #6366f1',
          outlineOffset: '2px'
        }
      : {};

    switch (comp.type) {

      case 'text':
        return (
          <div
            style={{
              ...baseStyle,
              ...selectionStyle,
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              fontWeight: '500'
            }}
          >
            {comp.text || 'Text'}
          </div>
        );

      case 'heading':
        return (
          <h2
            style={{
              ...baseStyle,
              ...selectionStyle,
              margin: 0,
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              fontWeight: '700'
            }}
          >
            {comp.text || 'Heading'}
          </h2>
        );

      case 'paragraph':
        return (
          <p
            style={{
              ...baseStyle,
              ...selectionStyle,
              margin: 0,
              backgroundColor: 'transparent',
              lineHeight: '1.5'
            }}
          >
            {comp.text || 'Paragraph text'}
          </p>
        );

      case 'input':
        return (
          <input
            type="text"
            readOnly
            value={comp.text || ''}
            placeholder={comp.placeholder || 'Enter text...'}
            style={{
              ...baseStyle,
              ...selectionStyle,
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              outline: 'none',
              color: comp.textColor || '#111827',
              boxShadow: isSelected
                ? '0 0 0 2px rgba(99,102,241,0.15)'
                : '0 1px 3px rgba(0,0,0,0.05)'
            }}
          />
        );

      case 'button':
        return (
          <button
            type="button"
            style={{
              ...baseStyle,
              ...selectionStyle,
              backgroundColor: comp.bgColor || '#4f46e5',
              color: comp.textColor || '#ffffff',
              border: 'none',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(79,70,229,0.25)'
            }}
          >
            {comp.text || 'Button'}
          </button>
        );

      case 'dropdown':
      case 'select':
        return (
          <select
            defaultValue=""
            style={{
              ...baseStyle,
              ...selectionStyle,
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              color: '#374151',
              outline: 'none'
            }}
          >
            <option value="">
              {comp.placeholder || comp.text || 'Select an option'}
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
        );

      case 'textarea':
        return (
          <textarea
            readOnly
            placeholder={
              comp.placeholder ||
              comp.text ||
              'Enter your text...'
            }
            style={{
              ...baseStyle,
              ...selectionStyle,
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              color: '#374151',
              lineHeight: '1.5'
            }}
          />
        );

      case 'checkbox':
        return (
          <label
            style={{
              ...baseStyle,
              ...selectionStyle,
              backgroundColor: 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: '8px'
            }}
          >
            <input
              type="checkbox"
              readOnly
              style={{
                width: '16px',
                height: '16px',
                accentColor: '#4f46e5'
              }}
            />
            <span>{comp.text || 'Checkbox'}</span>
          </label>
        );

      case 'image':
        return (
          <div
            style={{
              ...baseStyle,
              ...selectionStyle,
              backgroundColor: '#f8fafc',
              border: '1px dashed #94a3b8',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '5px'
            }}
          >
            <span style={{ fontSize: '26px' }}>🖼️</span>
            <span>{comp.text || 'Image'}</span>
          </div>
        );

      case 'card':
        return (
          <div
            style={{
              ...baseStyle,
              ...selectionStyle,
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {comp.text || 'Card'}
          </div>
        );

      case 'navbar':
        return (
          <div
            style={{
              ...baseStyle,
              ...selectionStyle,
              backgroundColor: comp.bgColor || '#1e293b',
              color: comp.textColor || '#ffffff',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 18px',
              fontWeight: '500'
            }}
          >
            <strong>Logo</strong>
            <span>{comp.text || 'Navigation Menu'}</span>
          </div>
        );

      default:
        return (
          <div
            style={{
              ...baseStyle,
              ...selectionStyle,
              backgroundColor: comp.bgColor || '#ffffff',
              border: '1px dashed #cbd5e1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b'
            }}
          >
            {comp.text || comp.type || 'Component'}
          </div>
        );
    }
  };

  return (
    <div
      className="canvas-wrapper"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: '#f1f5f9',
        padding: '24px'
      }}
    >
      <div
        ref={canvasRef}
        className="mockup-canvas"
        style={{
          position: 'relative',
          width: `${page?.width || 1000}px`,
          minHeight: `${page?.height || 700}px`,
          backgroundColor: '#ffffff',
          margin: '0 auto',
          borderRadius: '12px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
          overflow: 'visible'
        }}
        onClick={() => onSelectComponent(null)}
      >
        {components?.map((comp) => (
          <div
            key={comp.id}
            onMouseDown={(e) => handleMouseDown(e, comp)}
            onClick={(e) => e.stopPropagation()}
          >
            {renderElement(comp)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockupViewer;