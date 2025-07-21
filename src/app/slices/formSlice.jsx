// src/app/slices/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = JSON.parse(localStorage.getItem('formData')) || {
  step: 0,
  data: {},
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.data[field] = value;
      localStorage.setItem('formData', JSON.stringify(state));
    },
    nextStep: (state) => {
      state.step += 1;
      localStorage.setItem('formData', JSON.stringify(state));
    },
    prevStep: (state) => {
      state.step -= 1;
      localStorage.setItem('formData', JSON.stringify(state));
    },
    resetForm: (state) => {
      state.step = 0;
      state.data = {};
      localStorage.removeItem('formData');
    },
  },
});

export const { updateField, nextStep, prevStep, resetForm } = formSlice.actions;
export default formSlice.reducer;
