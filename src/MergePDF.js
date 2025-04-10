import React, { useState } from 'react';
import axios from 'axios';

function MergePDF() {
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      setLoading(true);
      const response = await axios.post(
        'https://pdf-backend-cp42.onrender.com/merge',
        formData,
        { responseType: 'blob' } // Important: get the file as a Blob
      );

      // Create a download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'merged.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error merging PDFs:', error);
      alert("Failed to merge PDFs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Merge PDFs</h2>
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? 'Merging...' : 'Merge and Download'}
      </button>
    </div>
  );
}

export default MergePDF;
