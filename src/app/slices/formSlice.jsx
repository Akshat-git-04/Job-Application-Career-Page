// src/app/slices/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const DRAFTS_KEY = 'jobAppDrafts';

const saveDraft = (id, data) => {
  const drafts = JSON.parse(localStorage.getItem(DRAFTS_KEY)) || {};
  drafts[id] = { ...data, updatedAt: new Date().toISOString() };
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
};

const initialState = {
  step: 0,
  data: {},
  draftId: null,  // Each draft gets a unique ID
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    startNewForm: (state) => {
      const id = Date.now().toString(); // simple ID
      state.draftId = id;
      state.data = {};
      state.step = 0;
      saveDraft(id, {});
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.data[field] = value;
      if (state.draftId) saveDraft(state.draftId, state.data);
    },
    nextStep: (state) => {
      state.step += 1;
      if (state.draftId) saveDraft(state.draftId, state.data);
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    loadDraft: (state, action) => {
      const { id, data } = action.payload;
      state.draftId = id;
      state.data = data;
      state.step = 0;
    },
    deleteDraft: (state, action) => {
      const id = action.payload;
      const drafts = JSON.parse(localStorage.getItem(DRAFTS_KEY)) || {};
      delete drafts[id];
      localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
    },
    resetForm: (state) => {
      state.step = 0;
      state.data = {};
      state.draftId = null;
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
} = formSlice.actions;

export default formSlice.reducer;
