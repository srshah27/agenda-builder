import { configureStore } from '@reduxjs/toolkit'
import workspaceSlice from './slices/workspaceSlice'

export default configureStore({
  reducer: {
    workspace: workspaceSlice
  }
})