import { configureStore } from '@reduxjs/toolkit'

import boardReducer from './boardSlice'
import listsReducer from './listsSlice'
import cardsReducer from './cardsSlice'

const store = configureStore({
  reducer: {
    board: boardReducer,
    lists: listsReducer,
    cards: cardsReducer
  }
})

export default store
