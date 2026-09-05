// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, Layers, Eye, Code, Zap } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="badge">
          <Sparkles size={16} /> Powered by Vision AI
        </div>
        <h1>AI Wireframe to UI Mockup Compiler</h1>
        <p>
          Transform hand-drawn sketches and rough wireframes into fully editable, modern UI components in seconds using AI visual analysis.
        </p>
        <button className="cta-button" onClick={() => navigate('/upload')}>
          Get Started <ArrowRight size={20} />
        </button>
      </header>

      <section className="features-section">
        <h2>Key Capabilities</h2>
        <div className="features-grid">
          <div className="feature-card">
            <Eye className="feature-icon" />
            <h3>Vision AI Detection</h3>
            <p>Automatically scans wireframe elements like buttons, inputs, labels, and layouts.</p>
          </div>
          <div className="feature-card">
            <Layers className="feature-icon" />
            <h3>Structured JSON Conversion</h3>
            <p>Converts visual components into strict structured JSON layout hierarchies.</p>
          </div>
          <div className="feature-card">
            <Zap className="feature-icon" />
            <h3>3-Panel Drag & Edit Studio</h3>
            <p>Customize components, update colors, fonts, positioning, and append extra widgets easily.</p>
          </div>
          <div className="feature-card">
            <Code className="feature-icon" />
            <h3>Code & Asset Export</h3>
            <p>Export your finalized interface design directly as PNG, structured JSON, or clean HTML/CSS.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;