import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Failed to upload file.');
      }
  
      const data = await response.json();
      setMessage(data.message);
      setError('');
    } catch (error) {
      setError('Error uploading file.');
      setMessage('');
    }
  
    setFile(null);
  };
  

  return (
    <div className="container">
      <h1>File Upload App</h1>
      <div className="file-input-container">
        <input type="file" onChange={handleFileChange} />
        <button className="upload-btn" onClick={handleUpload}>
          Upload File
        </button>
      </div>
      {error && <div className="error-text">{error}</div>}
      {message && (
        <div className="result-container">
          <div className="result-text">{message}</div>
          <button className="clear-btn" onClick={() => setMessage('')}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
