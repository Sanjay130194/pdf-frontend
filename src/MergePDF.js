import React, { useState } from 'react';
import axios from 'axios';

function MergePDF() {
  const [files, setFiles] = useState(null);
  const handleUpload = async () => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }
    try {
      const response = await axios.post('https://pdf-backend-cp42.onrender.com/merge', formData);
      alert('Merged PDF ready: ' + response.data.filename);
    } catch (error) {
      console.error('Error merging PDFs', error);
    }
  };

  return (
    <div>
      <h2>Merge PDFs</h2>
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
      <button onClick={handleUpload}>Merge</button>
    </div>
  );
}

export default MergePDF;
