// src/app/slices/formSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { logAction } from '../../utils/audit';

const DRAFTS_KEY = 'jobAppDrafts';

const saveDraft = (id, data) => {
  const drafts = JSON.parse(localStorage.getItem(DRAFTS_KEY)) || {};
  drafts[id] = { ...data, updatedAt: new Date().toISOString() };
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
};

const initialState = {
  step: 0,
  data: {},
  role: 'user', // 'user', 'manager', 'admin'
  draftId: null,
  users: [ // For Admin role assignment
    { id: '1', name: 'Alice', role: 'user' },
    { id: '2', name: 'Bob', role: 'manager' },
    { id: '3', name: 'Charlie', role: 'admin' },
  ],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    startNewForm: (state) => {
      const id = Date.now().toString();
      state.draftId = id;
      state.data = {};
      state.step = 0;
      saveDraft(id, {});
      logAction('New Draft Started', { draftId: id, role: state.role });
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.data[field] = value;
      if (state.draftId) saveDraft(state.draftId, state.data);
      logAction('Field Updated', { field, value, role: state.role });
    },
    nextStep: (state) => {
      state.step += 1;
      if (state.draftId) saveDraft(state.draftId, state.data);
      logAction('Moved to Next Step', { step: state.step, role: state.role });
    },
    prevStep: (state) => {
      state.step -= 1;
      logAction('Moved to Previous Step', { step: state.step, role: state.role });
    },
    loadDraft: (state, action) => {
      const { id, data } = action.payload;
      state.draftId = id;
      state.data = data;
      state.step = 0;
      logAction('Draft Loaded', { draftId: id, role: state.role });
    },
    deleteDraft: (state, action) => {
      const id = action.payload;
      const drafts = JSON.parse(localStorage.getItem(DRAFTS_KEY)) || {};
      delete drafts[id];
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
      logAction('Draft Deleted', { draftId: id, role: state.role });
    },
    resetForm: (state) => {
      state.step = 0;
      state.data = {};
      state.draftId = null;
      logAction('Form Reset', { role: state.role });
    },
    setRole: (state, action) => {
      state.role = action.payload;
      logAction('Role Set', { newRole: action.payload });
    },
    updateUserRole: (state, action) => {
      const { userId, newRole } = action.payload;
      const user = state.users.find((u) => u.id === userId);
      if (user) {
        const oldRole = user.role;
        user.role = newRole;

        logAction('User Role Updated', { userId, oldRole, newRole });
      }
    },
    logout: (state) => {
      state.role = 'user';
      state.name = null;
      state.step = 0;
      state.data = {};
      state.draftId = null;
      localStorage.removeItem('formData');
      logAction('User Logged Out', {});
    },
  },
});

export const {
  startNewForm,
  updateField,
  nextStep,
  prevStep,
  resetForm,
  loadDraft,
  deleteDraft,
  setRole,
  updateUserRole,
  logout,
} = formSlice.actions;

export default formSlice.reducer;
