import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  id: null,
  name: null,
  workspaceId: null,
  createdAt: null,
  createdBy: null,
  start: null,
  end: null,
  activityAttributes: [],
  backgroundImage: 'default',
  status: 'idle',
  isLoading: false,
  error: ''
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    initalizeBoard: (state, action) => {
      state._id = action.payload._id;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.createdAt = action.payload.createdAt;
      state.workspaceId = action.payload.workspaceId;
      state.createdBy = action.payload.createdBy;
      state.backgroundImage = action.payload.backgroundImage;
      state.start = action.payload.start;
      state.end = action.payload.end;
      state.activityAttributes = action.payload.activityAttributes;
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

export const { initalizeBoard, update, addAttributes } = boardSlice.actions;

export default boardSlice.reducer;