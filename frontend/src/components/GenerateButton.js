import React from 'react';
import { Wand2 } from 'lucide-react';

const GenerateButton = ({ onClick, disabled }) => {
  return (
    <button className="generate-btn" onClick={onClick} disabled={disabled}>
      <Wand2 size={20} /> Generate UI Mockup
    </button>
  );
};

export default GenerateButton;