import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


const initialState = {
  boards: [],
  id: '',
  createdAt: '',
  name: '',
  collaborators: [],
  roles: [],
  invite: { link: "", disabled: false, expiresAt: "" }
}

const fetchBoards = createAsyncThunk('workspace/fetchBoards', async (id) => {
  const response = await fetch(`/api/w/${id}/b`)
})


export const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,

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