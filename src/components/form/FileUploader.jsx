// src/components/form/FileUploader.jsx
import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function FileUploader({ onFileSelect }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    onFileSelect(file);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 200);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`p-6 border-2 border-dashed rounded-lg cursor-pointer text-center ${
        isDragActive ? 'bg-blue-100 border-blue-400' : 'bg-gray-50 border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-700">
        {fileName ? `Selected: ${fileName}` : 'Drag & drop your resume here, or click to select'}
      </p>

      {uploadProgress > 0 && (
        <div className="mt-3 w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-500 h-2.5 rounded-full transition-all"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}
