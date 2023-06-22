import { configureStore } from '@reduxjs/toolkit'
// import { createWrapper } from 'next-redux-wrapper'

import userReducer from './userSlice'


export const store = configureStore({
  reducer: {
    user: userReducer
  },
})

// export const makeStore = () => {
//   configureStore({
    // reducer: combinedReducer,
//   })
// }

// export const wrapper = createWrapper(makeStore, { debug: true })