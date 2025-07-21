// src/components/form/DynamicForm.jsx
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateField } from '../../app/slices/formSlice';
import FileUploader from './FileUploader';

export default function DynamicForm({ schema, onSubmit }) {
  const dispatch = useDispatch();
  const savedData = useSelector((state) => state.form.data);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema.validation),
    defaultValues: savedData,
  });

 const handleFieldChange = (name, value) => {
  // Convert Date objects to string for Redux
  let formattedValue = value;
  if (value instanceof Date) {
    formattedValue = value.toISOString().split('T')[0]; // "YYYY-MM-DD"
  }

  dispatch(updateField({ field: name, value: formattedValue }));
  setValue(name, formattedValue);
};


  const submitHandler = (data) => {
    Object.entries(data).forEach(([field, value]) => {
      dispatch(updateField({ field, value }));
    });
    if (onSubmit) onSubmit(data);
  };

  // Watch a field to conditionally render others
  const yearsOfExperience = watch('experienceYears', savedData.experienceYears || 0);

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
      {schema.fields.map((field) => {
        // Conditional rendering: skip employerName unless experienceYears > 0
        if (field.name === 'employerName' && yearsOfExperience <= 0) {
          return null;
        }

        return (
          <div key={field.name} className="flex flex-col">
            <label className="mb-1 font-medium">{field.label}</label>

            {field.type === 'file' ? (
              <FileUploader
                onFileSelect={(file) => handleFieldChange(field.name, file.name)}
              />
            ) : (
              <input
                type={field.type}
                {...register(field.name)}
                className="border rounded p-2"
                onChange={(e) => handleFieldChange(field.name, e.target.value)}
              />
            )}

            {errors[field.name] && (
              <p className="text-red-500 text-sm">{errors[field.name].message}</p>
            )}
          </div>
        );
      })}

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Save & Continue
      </button>
    </form>
  );
}

