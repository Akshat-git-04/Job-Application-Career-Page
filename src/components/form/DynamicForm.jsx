import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { updateField } from '../../app/slices/formSlice';
import FileUploader from './FileUploader';

export default function DynamicForm({ schema, onSubmit }) {
  const dispatch = useDispatch();
  const savedData = useSelector((state) => state.form.data);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema.validation),
    defaultValues: savedData,
  });

  const [showPassword, setShowPassword] = useState({});

  const handleFieldChange = (name, value) => {
    let formattedValue =
      value instanceof Date ? value.toISOString().split('T')[0] : value;

    dispatch(updateField({ field: name, value: formattedValue }));
    setValue(name, formattedValue);
  };

  const togglePassword = (name) => {
    setShowPassword((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const submitHandler = (data) => {
    Object.entries(data).forEach(([field, value]) => {
      dispatch(updateField({ field, value }));
    });
    if (onSubmit) onSubmit(data);
  };

  const yearsOfExperience = watch('experienceYears', savedData.experienceYears || 0);

  return (
    <motion.form
      onSubmit={handleSubmit(submitHandler)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {schema.fields.map((field) => {
        if (field.name === 'employerName' && yearsOfExperience <= 0) return null;

        const isPassword = field.type === 'password';

        return (
          <motion.div
            key={field.name}
            className="flex flex-col relative"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <label className="mb-2 font-semibold text-gray-700">{field.label}</label>

            {field.type === 'file' ? (
              <FileUploader
                onFileSelect={(file) => handleFieldChange(field.name, file.name)}
              />
            ) : (
              <div className="relative">
                <input
                  type={isPassword && showPassword[field.name] ? 'text' : field.type}
                  {...register(field.name)}
                  className="w-full border rounded-lg px-4 py-2 pr-10 bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                />
                {isPassword && (
                  <button
                    type="button"
                    onClick={() => togglePassword(field.name)}
                    className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword[field.name] ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                )}
              </div>
            )}

            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name].message}</p>
            )}
          </motion.div>
        );
      })}

      <motion.button
        type="submit"
        className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
      >
        Save & Continue
      </motion.button>
    </motion.form>
  );
}
