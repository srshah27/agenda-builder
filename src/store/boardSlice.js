import { createSlice } from '@reduxjs/toolkit'
import { stringify } from 'postcss'
import { nanoid } from 'nanoid'

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
  user: null,
  lists: [],
  cards: []
}

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // ===================================USER===================================
    initializeUser: (state, action)=>{
      state.user = action.payload
    },
    //  ==================================BOARD==================================
    initializeBoard: (state, action) => {
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
      let body = {}
      body[action.payload.field] = action.payload.value
      fetch(`/api/w/${state.workspaceId}/b/${state.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
    },
    addBoardAttributes: (state, action) => {
      action.payload.forEach((attr) => {
        state.activityAttributes.push(attr)
        state.lists.forEach((list) => {
          list.activityAttributes.push(attr)
        })
        state.cards.forEach((card) => {
          card.attributes.push(attr)
        })
      })
      fetch(`/api/w/${state.workspaceId}/b/${state.id}/attr`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attributes: action.payload })
      }).then((res) => res.json())
      .then((d) => console.log(d))
    },
    deleteBoardAttribute: (state, action) => {
      state.activityAttributes = state.activityAttributes.filter(
        (attr) => attr.id !== action.payload
      )
      state.lists.forEach((list) => {
        list.activityAttributes = list.activityAttributes.filter(
          (attr) => attr.id !== action.payload
        )
      })
      state.cards.forEach((card) => {
        card.attributes = card.attributes.filter(
          (attr) => attr.id !== action.payload
        )
      })
      
      fetch(`/api/w/${state.workspaceId}/b/${state.id}/attr`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attributes: [{id: action.payload}], modify: false })
      }).then((res) => res.json())
        .then((d) => console.log(d))
      
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
          state.lists.forEach((list) => {
            index = list.activityAttributes.findIndex((attr) => attr.id === newAttr.id)
            list.activityAttributes[index][key] = element
          })
          state.cards.forEach((card) => {
            index = card.attributes.findIndex((attr) => attr.id === newAttr.id)
            card.attributes[index][key] = element
          })
        }
      }
      fetch(`/api/w/${state.workspaceId}/b/${state.id}/attr`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ attributes: [newAttr], modify: true })
      }).then((res) => res.json())
        .then((d) => console.log(d))
      
    },

    //  ==================================LISTS==================================
    initializeLists: (state, action) => {
      state.lists = action.payload
    },
    
    addList: (state, action) => {
      let sequence = state.lists.length
      const data = {
        id: nanoid(),
        name: 'New List',
        createdAt: new Date().toISOString(),
        createdBy: state.user.uid,
        workspaceId: state.workspaceId,
        boardId: state.id,
        start: state.start,
        end: state.end,
        activityAttributes: state.activityAttributes,
        sequence
      }
      fetch(`/api/w/${state.workspaceId}/b/${state.id}/l`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      })
      state.lists.push(data)
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
    },


    // ==================================CARDS==================================

    initializeCards: (state, action) => {
      state.cards = action.payload
    },
    addCard: (state, action) => {
      let listId = action.payload
      console.log(state.cards)
      let list = state.lists.find((list) => list.id === listId)
      console.log(list)
      let sequence = state.cards.filter(
        (card) => card.listId === listId
      ).length
      const data = {
        id: nanoid(),
        name: 'New Card',
        createdAt: new Date().toISOString(),
        createdBy: state.user.uid,
        listId,
        workspaceId: state.workspaceId,
        boardId: state.id,
        start: list.start,
        end: list.end,
        attributes: list.activityAttributes,
        sequence
      }
      fetch(`/api/w/${state.workspaceId}/b/${state.id}/c`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data)
      }).then((res) => res.json())
      .then((d) => console.log(d))
      state.cards.push(data)
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

  }
})

export const {
  initializeUser,
  //  =========BOARD==========
  initializeBoard,
  updateBoard,
  addBoardAttributes,
  modifyBoardAttribute,
  deleteBoardAttribute,
  // ==========LISTS==========
  initializeLists,
  addList,
  updateList,
  addListAttributes,
  // ==========CARDS==========
  initializeCards,
  update,
  addAttributes,
  addCard,
} = boardSlice.actions

export default boardSlice.reducer
