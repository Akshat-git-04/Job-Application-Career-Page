import { configureStore } from '@reduxjs/toolkit';
import formReducer from './slices/formSlice';
import { offlineMiddleware } from './middleware/offlineMiddleware';

const saveState = (state) => {
  try {
    localStorage.setItem('formData', JSON.stringify(state.form));
  } catch (err) {
    console.error('Failed to save state', err);
  }
};

const loadState = () => {
  try {
    const serialized = localStorage.getItem('formData');
    if (!serialized) return undefined;

    const loaded = JSON.parse(serialized);

    // Ensure default users exist if missing
    if (!loaded.users || loaded.users.length === 0) {
      loaded.users = [
        { id: '1', name: 'Alice', role: 'user' },
        { id: '2', name: 'Bob', role: 'manager' },
        { id: '3', name: 'Charlie', role: 'admin' },
      ];
    }

    return { form: loaded };
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
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(offlineMiddleware),
  preloadedState,
});

store.subscribe(() => {
  saveState(store.getState());
});
