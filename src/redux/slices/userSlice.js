import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  uid: '',
  name: '',
  email: '',
  image: '',
  loading: 'idle'
  
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
    fetchUser,
    updateUser: (state, action) => {
      state[action.payload.key] = action.payload.value
    }
  },
  extraReducers
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer