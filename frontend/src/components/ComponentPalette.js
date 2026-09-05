import React from 'react';
import { Type, Square, CreditCard, Image as ImageIcon, CheckSquare, Navigation } from 'lucide-react';

const ComponentPalette = ({ onAddComponent }) => {
  const paletteItems = [
    { type: 'heading', label: 'Heading', icon: <Type size={18} /> },
    { type: 'paragraph', label: 'Paragraph', icon: <Type size={18} /> },
    { type: 'button', label: 'Button', icon: <Square size={18} /> },
    { type: 'input', label: 'Input Field', icon: <Square size={18} /> },
    { type: 'card', label: 'Container Card', icon: <CreditCard size={18} /> },
    { type: 'image', label: 'Image Box', icon: <ImageIcon size={18} /> },
    { type: 'checkbox', label: 'Checkbox', icon: <CheckSquare size={18} /> },
    { type: 'navbar', label: 'Navbar Banner', icon: <Navigation size={18} /> }
  ];

  return (
    <aside className="editor-panel palette-panel">
      <h3>UI Library</h3>
      <p className="panel-desc">Click to add an element</p>
      <div className="palette-grid">
        {paletteItems.map((item) => (
          <button
            key={item.type}
            className="palette-item"
            onClick={() => onAddComponent(item.type)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default ComponentPalette;