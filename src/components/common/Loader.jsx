import React from 'react';
import './Loader.css';

/**
 * Loader
 * A terminal-style loading indicator ("_" blinking cursor look).
 * Usage: <Loader label="Loading" /> or <Loader fullScreen />
 */
const Loader = ({ label = 'Loading', fullScreen = false }) => {
  return (
    <div className={`loader ${fullScreen ? 'loader--fullscreen' : ''}`}>
      <span className="loader__label">{label}</span>
      <span className="loader__cursor">_</span>
    </div>
  );
};

export default Loader;
