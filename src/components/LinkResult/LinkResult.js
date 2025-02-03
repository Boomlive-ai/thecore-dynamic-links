import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LinkResult = () => {
  const { state } = useLocation();
  const { link } = state || {};
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();

  const handleCopy = () => {
    if (link) {
      navigator.clipboard.writeText(link).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      }).catch(err => {
        console.error('Failed to copy text: ', err);
      });
    }
  };

  const handleBack = () => {
    // Confirmation popup
    const userConfirmed = window.confirm("Are you sure you want to go back to the input screen?");
    if (userConfirmed) {
      navigate(-1); // Navigate back to the previous page
    }
  };

  return (
    <div className="link-result">
      <h2>Your dynamic link:</h2>
      {link ? (
        <>
          <a href={link} target="_blank" rel="noopener noreferrer">
            {link}
          </a>
          <button className="copy-button" onClick={handleCopy}>
            {isCopied ? 'Copied!' : 'Copy Link'}
          </button>
        </>
      ) : (
        <p>Link generation failed. Try again later.</p>
      )}
      <button className="back-button" onClick={handleBack}>Back</button>
    </div>
  );
};

export default LinkResult;
