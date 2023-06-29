import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cards: [],
  status: 'idle',
  isLoading: false,
  error: ''
}

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
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
      console.log(state)
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

export const { initalizeCards, update, addAttributes, addCard } = cardsSlice.actions

export default cardsSlice.reducer
