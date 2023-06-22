import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lists: [],
  status: 'idle',
  isLoading: false,
  error: ''
}

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    initalizeLists: (state, action) => {
      state.lists = action.payload;
    },
    update: (state, action) => {
      state[action.payload.field] = action.payload.value;
      
    },
    addAttributes: (state, action) => {
      action.payload.forEach(attr => {
      state.activityAttributes.push(attr);
      });
    },
  }
});

export const { initalizeLists, update, addAttributes } = listsSlice.actions;

export default listsSlice.reducer;