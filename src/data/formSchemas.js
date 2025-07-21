// src/data/formSchemas.js
import * as yup from 'yup';

export const personalDetailsSchema = {
  fields: [
    { name: 'firstName', label: 'First Name', type: 'text', required: true },
    { name: 'lastName', label: 'Last Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'password', label: 'Password', type: 'password', required: true },
    { name: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
    { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
  ],
  validation: yup.object().shape({
    firstName: yup
    .string()
    .matches(/^(?!\d+$)[a-zA-Z\s'-]+$/, 'First name must contain letters and not only numbers')
    .required('First name is required'),

    lastName: yup
    .string()
    .matches(/^(?!\d+$)[a-zA-Z\s'-]+$/, 'Last name must contain letters and not only numbers')
    .required('Last name is required'),

    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 chars').required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required(),
    dob: yup
      .date()
      .required('Date of birth is required')
      .max(new Date(), 'Date cannot be in the future'),
  }),
};

export const experienceSchema = {
  fields: [
    { name: 'experienceYears', label: 'Years of Experience', type: 'number', required: true },
    { name: 'employerName', label: 'Last Employer', type: 'text', required: false }, // Conditional field
    { name: 'portfolioLink', label: 'Portfolio Link', type: 'url', required: false },
    { name: 'resume', label: 'Resume Upload', type: 'file', required: true },
  ],
  validation: yup.object().shape({
    experienceYears: yup
      .number()
      .min(0, 'Must be positive')
      .max(50, 'Unrealistic!')
      .required('Experience is required'),
    employerName: yup
      .string()
      .when('experienceYears', {
        is: (val) => val > 0,
        then: (schema) => schema.required('Employer name is required'),
        otherwise: (schema) => schema.notRequired(),
      }),
    portfolioLink: yup.string().url('Must be a valid URL').nullable(),
    resume: yup.string().required('Resume is required'),
  }),
};

