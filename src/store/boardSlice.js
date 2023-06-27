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
    updateBoard: (state, action) => {
      state[action.payload.field] = action.payload.value;
      
    },
    addBoardAttributes: (state, action) => {
      action.payload.forEach(attr => {
      state.activityAttributes.push(attr);
      });
    },
    deleteBoardAttribute: (state, action) => {
      state.activityAttributes = state.activityAttributes.filter(attr => attr.id !== action.payload);
    },
    modifyBoardAttribute: (state, action) => {
      let index = state.activityAttributes.findIndex(attr => attr.id === action.payload.new.id);
      let newAttr = action.payload.new;
      
      for (const key in newAttr) {
        if (Object.hasOwnProperty.call(newAttr, key)) {
          const element = newAttr[key];
          if (key === "id" || key === "_id")
            continue;
          state.activityAttributes[index][key] = element;

        }
      }
    }
  }
});

export const { initalizeBoard, update, addAttributes } = boardSlice.actions;

export default boardSlice.reducer;