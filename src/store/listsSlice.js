import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lists: [],
  status: 'idle',
  isLoading: false,
  error: ''
}

const listsSlice = createSlice({
  name: 'lists',
  initialState,
  reducers: {
    initalizeLists: (state, action) => {
      state.lists = action.payload
    },
    updateLists: (state, action) => {
      state.lists[action.payload.field] = action.payload.value
    },

    addAllListAttributes: (state, action) => {
      for (let i = 0; i < state.lists; i++) {
        state.lists[i].activityAttributes.push(action.payload)
      }
    },
    deleteAllliststtribute: (state, action) => {
      for (let i = 0; i < state.lists; i++) {
        state.lists[i].activityAttributes = state.lists[
          i
        ].activityAttributes.filter((attr) => attr !== action.payload)
      }
    },
    modifyListAttribute: (state, action) => {
      let index = action.payload.index
      let newAttr = action.payload.new
      let attrId = newAttr.id
      for (const key in newAttr) {
        if (Object.hasOwnProperty.call(newAttr, key)) {
          const element = newAttr[key]
          if (key === 'id') continue
          state.lists[index].activityAttributes[attrId][key] = element
        }
      }
    },
    modifyAllListAttribute: (state, action) => {
      let newAttr = action.payload.new
      let attrId = newAttr.id
      for (const key in newAttr) {
        if (Object.hasOwnProperty.call(newAttr, key)) {
          const element = newAttr[key]
          if (key === 'id' || key === '_id') continue
          state.lists.forEach((list) => {
            let index = list.activityAttributes.findIndex(
              (attr) => attr.id === attrId
            )
            list.activityAttributes[index][key] = element
          })
        }
      }
    }
  }
})

export const { initalizeLists, update, addAttributes } = listsSlice.actions

export default listsSlice.reducer
