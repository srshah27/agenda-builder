import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  uid: '',
  name: '',
  email: '',
  image: '',
  status: 'idle',
  isValid: false,
  isCreating: false,
  isFetching: false,
}

const fetchUser = createAsyncThunk('user/fetchUser', async (uid) => {
  const response = await fetch(`/api/users/${uid}`)
  data = await response.json()
  return {
    uid: data.uid,
    name: data.name,
    email: data.email,
    image: data.image
  }
})



export const userSlice = createSlice({
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
export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer