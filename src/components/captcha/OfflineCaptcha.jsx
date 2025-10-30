import React, { useState, useEffect, useRef } from 'react';
import './OfflineCaptcha.css';

const OfflineCaptcha = ({ onVerify, isReset, showError }) => {
  const [captchaText, setCaptchaText] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const canvasRef = useRef(null);

  // Generate random captcha text
  const generateCaptcha = () => {
    const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Draw captcha on canvas
  const drawCaptcha = (text) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw lines
    for (let i = 0; i < 5; i++) {
      ctx.strokeStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`;
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }

    // Draw captcha characters
    ctx.font = 'bold 24px Arial';
    for (let i = 0; i < text.length; i++) {
      ctx.fillStyle = `rgb(${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)}, ${Math.floor(Math.random() * 100)})`;
      ctx.save();
      ctx.translate(20 + i * 25, 35);
      ctx.rotate((Math.random() - 0.5) * 0.4);
      ctx.fillText(text[i], 0, 0);
      ctx.restore();
    }

    // Add noise dots
    for (let i = 0; i < 20; i++) {
      ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.4)`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 2, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  // Initialize new captcha
  const initializeCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptchaText(newCaptcha);
    setUserInput('');
    setIsVerified(false);
    onVerify(false); // Reset verification state
    setTimeout(() => drawCaptcha(newCaptcha), 0);
  };

  // Verify user input
  const verifyCaptcha = (input) => {
    const isValid = input.toLowerCase() === captchaText.toLowerCase();
    setIsVerified(isValid);
    onVerify(isValid); // Inform parent only
    return isValid;
  };

  // Handle input typing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    if (value.length === captchaText.length) {
      verifyCaptcha(value); // Only verify when full input entered
    } else {
      setIsVerified(false);
      onVerify(false);
    }
  };

  // Handle external reset
  useEffect(() => {
    if (isReset) {
      initializeCaptcha();
    }
  }, [isReset]);

  // On mount
  useEffect(() => {
    initializeCaptcha();
  }, []);

  return (
    <div className="offline-captcha">
      <div className="captcha-container">
        <canvas
          ref={canvasRef}
          width="180"
          height="60"
          className="captcha-canvas"
        />
        <button
          type="button"
          className="refresh-captcha"
          onClick={initializeCaptcha}
          title="Refresh Captcha"
        >
          ↻
        </button>
      </div>

      <input
        type="text"
        placeholder="Enter captcha"
        value={userInput}
        onChange={handleInputChange}
        className={`captcha-input ${isVerified ? 'verified' : showError && userInput ? 'invalid' : ''}`}
        maxLength={6}
      />

      {showError && !isVerified && userInput.length === 6 && (
        <div className="captcha-status error">✗ Invalid captcha</div>
      )}
    </div>
  );
};

export default OfflineCaptcha;
