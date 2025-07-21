import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';

export default function FileUploader({ onFileSelect }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);
    onFileSelect(file);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 200);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <motion.div
      {...getRootProps()}
      className={`p-6 border-2 border-dashed rounded-xl cursor-pointer text-center transition ${
        isDragActive ? 'bg-blue-100 border-blue-400' : 'bg-white/70 border-gray-300 backdrop-blur'
      } shadow-sm`}
      whileHover={{ scale: 1.03 }}
    >
      <input {...getInputProps()} />
      <Upload className="mx-auto mb-2 text-blue-500" size={28} />
      <p className="text-gray-700">
        {fileName ? `Selected: ${fileName}` : 'Drag & drop your resume, or click to select'}
      </p>

      {uploadProgress > 0 && (
        <motion.div
          className="mt-4 w-full bg-gray-200 rounded-full h-2.5 overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${uploadProgress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
