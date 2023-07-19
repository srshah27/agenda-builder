import { createSlice } from '@reduxjs/toolkit'
import { list, stringify } from 'postcss'
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

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // ===================================USER===================================
    initializeUser: (state, action) => {
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
        body: JSON.stringify({
          attributes: [{ id: action.payload }],
          modify: false
        })
      }).then((res) => res.json())
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
            index = list.activityAttributes.findIndex(
              (attr) => attr.id === newAttr.id
            )
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
    },

    //  ==================================LISTS==================================
    initializeLists: (state, action) => {
      state.lists = action.payload.sort((a, b) => a.sequence - b.sequence)
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

    updateList: (state, action) => {
      state.lists.find((list) => list.id === action.payload.id)[
        action.payload.field
      ] = action.payload.value
      let body = {}
      body[action.payload.field] = action.payload.value
      fetch(
        `/api/w/${state.workspaceId}/b/${state.id}/l/${action.payload.id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      )
    },
    deleteList: (state, action) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload)
      fetch(`/api/w/${state.workspaceId}/b/${state.id}/l/${action.payload}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
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
    handleListDragEnd: (state, action) => {
      let source = action.payload.source
      let destination = action.payload.destination
      console.log(source, destination);
      let id = action.payload.draggableId
      let currentList = state.lists.find((list) => list.id === id)
      let oldData = []
      
      state.lists.forEach((list) => {
        oldData.push({ ...list })
        if (list.sequence > source.index) {
          list.sequence = list.sequence - 1 // Update query else
          // state.lists.find((l) => l.id === list.id)['sequence'] = list.sequence - 1
        }
        if (list.sequence >= destination.index) {
          list.sequence = list.sequence + 1 // Update query else
          // state.lists.find((l) => l.id === list.id)['sequence'] = list.sequence + 1
        }
      })

      currentList.sequence = destination.index // Upadte query currentList
      state.lists.find((list) => list.id === id)['sequence'] = destination.index
      // oldData.push({ ...currentList })
      // console.log(oldData);
      
      state.lists.sort((a, b) => a.sequence - b.sequence)
      state.lists.forEach((list) => {
        if (list.sequence !== oldData.find((l) => l.id === list.id).sequence)
          // console.log(list.id);
          fetch(`/api/w/${state.workspaceId}/b/${state.id}/l/${list.id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ sequence: list.sequence })
          })
      })
    },

    // ==================================CARDS==================================

    initializeCards: (state, action) => {
      state.cards = action.payload
      
      state.cards.forEach(card => {
        boardSlice.caseReducers.computeBgCard(state,{payload: card.id})
      });
      
    },
    addCard: (state, action) => {
      let listId = action.payload
      console.log(listId)
      let list = state.lists.find((list) => list.id === listId)
      let sequence = state.cards.filter((card) => card.listId === listId).length
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
      state.cards.push(data)
    },

    updateCard: (state, action) => {
      state.cards.find((card) => card.id === action.payload.id)[
        action.payload.field
      ] = action.payload.value
      let body = {}
      body[action.payload.field] = action.payload.value
      fetch(
        `/api/w/${state.workspaceId}/b/${state.id}/c/${action.payload.id}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }
      )
    },
    computeBgCard: (state, action) => {
      let currCard = state.cards.find((card) => card.id === action.payload)
      console.log("Called");
      if(!currCard) return
      let currentStart = new Date(currCard.start)
      let currentEnd = new Date(currCard.end)
      let bg = 'default'
      state.cards.forEach(card => {
        if(card.id !== action.payload && currCard.listId === card.listId) {
          let otherStart = new Date(card.start)
          let otherEnd = new Date(card.end)
          
          if ((currentStart > otherStart && currentStart < otherEnd) || (currentStart < otherStart && currentStart > otherEnd)) {
            bg = 'red'
          }
          if ((currentEnd > otherStart && currentEnd < otherEnd) || (currentEnd > otherStart && currentEnd < otherEnd)) {
            bg = 'red'
          }
        }
      });
      currCard.bg = bg
    },
    
    deleteCard: (state, action) => {
      state.cards = state.cards.filter((card) => card.id !== action.payload)
      fetch(`/api/w/${state.workspaceId}/b/${state.id}/c/${action.payload}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      })
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
    modifyCardAttributes: (state, action) => {
      let { newAttr } = action.payload
      let cardIndex = state.cards.findIndex(
        (card) => (card.id = action.payload.cardId)
      )
      let attrIndex = state.cards[cardIndex].attributes.findIndex(
        (attr) => attr.id == newAttr.id
      )
      state.cards[cardIndex].attributes[attrIndex] = { ...newAttr }
      fetch(
        `/api/w/${state.workspaceId}/b/${state.id}/c/${action.payload.cardId}`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            attributes: state.cards[cardIndex].attributes
          })
        }
      )
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
    handleCardDragEnd: (state, action) => {
      let source = action.payload.source
      let destination = action.payload.destination
      let id = action.payload.draggableId
      let currentCard = state.cards.find((card) => card.id === id)
      let oldData = []

      // handle remove from source
      state.cards.forEach((card) => {
        oldData.push({ ...card })
        if (card.listId === source.droppableId) {
          if (card.sequence > source.index) {
            card.sequence = card.sequence - 1
          }
        }
        if (card.listId === destination.droppableId) {
          if (card.sequence >= destination.index) {
            card.sequence = card.sequence + 1
          }
        }
      })
      currentCard.listId = destination.droppableId
      currentCard.sequence = destination.index // Upadte query currentCard
      state.cards.find((card) => card.id === id)['listId'] = destination.droppableId
      state.cards.find((card) => card.id === id)['sequence'] = destination.index
      state.cards.sort((a, b) => a.sequence - b.sequence)
      state.cards.forEach((card) => {
        if (card.sequence !== oldData.find((c) => c.id === card.id).sequence)
          fetch(`/api/w/${state.workspaceId}/b/${state.id}/c/${card.id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ sequence: card.sequence })
          })
      })
      fetch(`/api/w/${state.workspaceId}/b/${state.id}/c/${currentCard.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ listId: currentCard.listId })
      })
    }
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
  deleteList,
  computeBgCard,
  addListAttributes,
  handleListDragEnd,
  // ==========CARDS==========
  initializeCards,
  addCard,
  updateCard,
  deleteCard,
  addAttributes,
  modifyCardAttributes,
  handleCardDragEnd
} = boardSlice.actions



export default boardSlice.reducer
