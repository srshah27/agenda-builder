import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: null,
  id: null,
  name: null,
  workspaceId: null,
  createdAt: null,
  createdBy: null,
  start: null,
  end: null,
  activityAttributes: [],
  backgroundImage: 'default',
  status: 'idle',
  isLoading: false,
  error: '',
  lists: [],
  cards: []
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {

    //  ==================================BOARD==================================
    initalizeBoard: (state, action) => {
      state._id = action.payload._id
      state.id = action.payload.id
      state.name = action.payload.name
      state.createdAt = action.payload.createdAt
      state.workspaceId = action.payload.workspaceId
      state.createdBy = action.payload.createdBy
      state.backgroundImage = action.payload.backgroundImage
      state.start = action.payload.start
      state.end = action.payload.end
      state.activityAttributes = action.payload.activityAttributes
    },
    updateBoard: (state, action) => {
      state[action.payload.field] = action.payload.value
    },
    addBoardAttributes: (state, action) => {
      action.payload.forEach((attr) => {
        state.activityAttributes.push(attr)
      })
    },
    deleteBoardAttribute: (state, action) => {
      state.activityAttributes = state.activityAttributes.filter(
        (attr) => attr.id !== action.payload
      )
    },
    modifyBoardAttribute: (state, action) => {
      let index = state.activityAttributes.findIndex(
        (attr) => attr.id === action.payload.new.id
      )
      let newAttr = action.payload.new

      for (const key in newAttr) {
        if (Object.hasOwnProperty.call(newAttr, key)) {
          const element = newAttr[key]
          if (key === 'id' || key === '_id') continue
          state.activityAttributes[index][key] = element
        }
      }
    },

    //  ==================================LISTS==================================
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


    // ==================================CARDS==================================
    
    initalizeCards: (state, action) => {
      state.cards = action.payload
    },
    updateCards: (state, action) => {
      state.cards[action.payload.field] = action.payload.value
    },
    addAllCardAttributes: (state, action) => {
      for (let i = 0; i < state.cards; i++) {
        state.cards[i].attributes.push(action.payload)
      }
    },
    deleteAllCardSttribute: (state, action) => {
      for (let i = 0; i < state.cards; i++) {
        state.cards[i].attributes = state.cards[i].attributes.filter(
          (attr) => attr !== action.payload
        )
      }
    },
    modifyCardAttribute: (state, action) => {
      let newAttr = action.payload.new
      let attrId = newAttr.id
      let index = state.cards[index].attributes.findIndex(
        (attr) => attr.id === attrId
      )
      for (const key in newAttr) {
        if (Object.hasOwnProperty.call(newAttr, key)) {
          const element = newAttr[key]
          if (key === 'id') continue
          state.cards[action.payload.index].attributes[attrId][key] = element
        }
      }
    },
    modifyAllCardAttribute: (state, action) => {
      let newAttr = action.payload.new
      let attrId = newAttr.id
      for (const key in newAttr) {
        if (Object.hasOwnProperty.call(newAttr, key)) {
          const element = newAttr[key]
          if (key === 'id') continue
          state.cards.forEach((card) => {
            let index = card.attributes.findIndex((attr) => attr.id === attrId)
            card.attributes[index][key] = element
          })
        }
      }
    },
    addCard: (state, action) => {
      let listId = action.payload
      console.log(state.cards)
      let list = state.lists.find((list) => list.id === listId)
      console.log(list)
      let sequence = state.cards.cards.filter(
        (card) => card.listId === listId
      ).length
      const data = {
        id: nanoid(),
        name: 'New Card',
        createdAt: new Date().toISOString(),
        createdBy: session.user.uid,
        listId,
        workspaceId: boardData.board.workspaceId,
        boardId: boardData.board.id,
        start: list.start,
        end: list.end,
        attributes: list.activityAttributes,
        sequence
      }
      fetch(`/api/w/${state.board.workspaceId}/b/${state.board.id}/c`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
    }
    
  }
})

export const { initalizeBoard, update, addAttributes } = boardSlice.actions

export default boardSlice.reducer
