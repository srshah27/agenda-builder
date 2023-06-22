import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'


const combinedReducer = combineReducers({})


export const makeStore = () => {
  configureStore({
    reducer: {},
  })
}

export const wrapper = createWrapper(makeStore, { debug: true })