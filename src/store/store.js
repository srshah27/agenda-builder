import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'

import boardReducer from './boardSlice'
// import listsReducer from './listsSlice'
// import cardsReducer from './cardsSlice'

const rootReducer = combineReducers({
  board: boardReducer,
  // lists: listsReducer,
  // cards: cardsReducer
})

const store = configureStore({
  reducer: rootReducer
})

export default store
