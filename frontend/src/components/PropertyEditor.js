import React from 'react';
import { Trash2 } from 'lucide-react';

const PropertyEditor = ({ selectedComponent, onUpdateComponent, onDeleteComponent }) => {
  if (!selectedComponent) {
    return (
      <aside className="editor-panel property-panel">
        <h3>Property Inspector</h3>
        <p className="empty-selection">Select an element on the canvas to customize its properties.</p>
      </aside>
    );
  }

  const handleChange = (field, value) => {
    onUpdateComponent(selectedComponent.id, { [field]: value });
  };

  return (
    <aside className="editor-panel property-panel">
      <div className="panel-header">
        <h3>Edit Component</h3>
        <button className="delete-btn" onClick={() => onDeleteComponent(selectedComponent.id)} title="Delete component">
          <Trash2 size={18} />
        </button>
      </div>

      <div className="properties-form">
        <div className="form-group">
          <label>Type</label>
          <input type="text" value={selectedComponent.type} disabled className="disabled-input" />
        </div>

        {('text' in selectedComponent || ['heading', 'paragraph', 'button', 'checkbox', 'card', 'navbar'].includes(selectedComponent.type)) && (
          <div className="form-group">
            <label>Text Content</label>
            <input
              type="text"
              value={selectedComponent.text || ''}
              onChange={(e) => handleChange('text', e.target.value)}
            />
          </div>
        )}

        {selectedComponent.type === 'input' && (
          <div className="form-group">
            <label>Placeholder</label>
            <input
              type="text"
              value={selectedComponent.placeholder || ''}
              onChange={(e) => handleChange('placeholder', e.target.value)}
            />
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>Width (px)</label>
            <input
              type="number"
              value={selectedComponent.width}
              onChange={(e) => handleChange('width', parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="form-group">
            <label>Height (px)</label>
            <input
              type="number"
              value={selectedComponent.height}
              onChange={(e) => handleChange('height', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>X Position</label>
            <input
              type="number"
              value={selectedComponent.x}
              onChange={(e) => handleChange('x', parseInt(e.target.value) || 0)}
            />
          </div>
          <div className="form-group">
            <label>Y Position</label>
            <input
              type="number"
              value={selectedComponent.y}
              onChange={(e) => handleChange('y', parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="form-group">
          <label>Font Size (px)</label>
          <input
            type="number"
            value={selectedComponent.fontSize || 16}
            onChange={(e) => handleChange('fontSize', parseInt(e.target.value) || 12)}
          />
        </div>

        <div className="form-group">
          <label>Background Color</label>
          <input
            type="color"
            value={selectedComponent.bgColor || '#ffffff'}
            onChange={(e) => handleChange('bgColor', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Text Color</label>
          <input
            type="color"
            value={selectedComponent.textColor || '#000000'}
            onChange={(e) => handleChange('textColor', e.target.value)}
          />
        </div>
      </div>
    </aside>
  );
};

export default PropertyEditor;