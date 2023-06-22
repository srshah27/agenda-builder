import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cards: [],
  status: 'idle',
  isLoading: false,
  error: ''
}

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    initalizeCards: (state, action) => {
      state.cards = action.payload;
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

export const { initalizeCards, update, addAttributes } = cardsSlice.actions;

export default cardsSlice.reducer;