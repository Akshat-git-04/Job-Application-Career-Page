// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';

// Middleware to save state to localStorage on every change
const saveState = (state) => {
  try {
    localStorage.setItem('formData', JSON.stringify(state.form));
  } catch (err) {
    console.error('Failed to save state', err);
  }
};

// Load state from localStorage on app start
const loadState = () => {
  try {
    const serialized = localStorage.getItem('formData');
    return serialized ? { form: JSON.parse(serialized) } : undefined;
  } catch (err) {
    console.error('Failed to load state', err);
    return undefined;
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    form: formReducer,
  },
  preloadedState,
});

// Subscribe to store changes and persist
store.subscribe(() => {
  saveState(store.getState());
});
