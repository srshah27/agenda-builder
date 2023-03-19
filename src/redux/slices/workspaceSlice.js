import { createSlice } from '@reduxjs/toolkit'

export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState: {
    boards: [],
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = workspaceSlice.actions

export default workspaceSlice.reducer