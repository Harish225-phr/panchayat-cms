// src/components/BigLoader.jsx
import React from 'react';
import './Loading.css'; // Isme loader ke liye styling hogi
const Loading = () => {
  return (
    <div className="big-loader-container">
      <div className="big-spinner"></div>
      <p>Loading, please wait...</p>
    </div>
  );
};

export default Loading;
