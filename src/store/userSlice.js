import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  uid: null,
  name: null,
  image: null,
  email: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.uid = action.payload.uid
      state.name = action.payload.name
      state.image = action.payload.image
      state.email = action.payload.email
    }
  }
})

export const { login } = userSlice.actions

export default userSlice.reducer
