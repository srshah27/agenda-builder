import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: null,
  id: null,
  createdAt: null,
  workspaceId: null,
  createdBy: null,
  backgroundImage: 'default',
  lastViewedAt: null,
  favorite: false,
  start: null,
  end: null,
  activityAttributes: []
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    initalizeBoard: (state, action) => {
      state._id = action.payload._id;
      state.id = action.payload.id;
      state.createdAt = action.payload.createdAt;
      state.workspaceId = action.payload.workspaceId;
      state.createdBy = action.payload.createdBy;
      state.backgroundImage = action.payload.backgroundImage;
      state.lastViewedAt = action.payload.lastViewedAt;
      state.favorite = action.payload.favorite;
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