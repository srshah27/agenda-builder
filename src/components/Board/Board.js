import React, { useState, useEffect } from 'react'
import { Flex, HStack, useColorModeValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import UserNav from '../UserNav'
import SubNav from '../SubNav'
import { Box } from '@chakra-ui/react'

// import { initialData } from '../../data/InitialData'
const List = dynamic(() => import('./List'), {
  ssr: false
})

const Board = ({ board, cards, lists }) => {
  const [boardData, setBoardData] = useState({
    board,
    cards,
    lists: lists.sort((a, b) => a.sequence - b.sequence)
  })
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setBoardData({
      ...boardData,
      lists: boardData.lists.sort((a, b) => a.sequence - b.sequence),
      cards: boardData.cards.sort((a, b) => a.sequence - b.sequence)
    })
  }, [refresh])

  const updateDb = (url, body, cardsOrLists) => {
    fetch(url, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data.updatedList === null) {
          setBoardData({ ...cardsOrLists })
          setRefresh(!refresh)
        }
        if (data.updatedCard === null) {
          setBoardData({ ...cardsOrLists })
          setRefresh(!refresh)
        }
      })
      .catch(error => {
        console.log(error)
        setBoardData(data)
      })
  }

  const handleColumnDrag = (data, destination, source, draggableId) => {
    let ogiData = data
    let id = draggableId
    let sequence = destination.index
    let currentList = data.lists.find(list => list.id === id)
    let current = currentList.sequence
    current = data.lists.find(list => list.id === id).sequence
    let Greater =
      sequence > data.lists.find(list => list.id === id).sequence ? true : false // true if greater else false
    data.lists.forEach(list => {
      if (Greater) {
        if (list.sequence > current && list.sequence <= sequence) {
          list.sequence = list.sequence - 1 // Update query else
          updateDb(
            `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/l/${list.id}`,
            { sequence: list.sequence - 1 },
            ogiData
          )
        }
      } else {
        if (list.sequence < current && list.sequence >= sequence) {
          list.sequence = list.sequence + 1 // Update query else
          updateDb(
            `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/l/${list.id}`,
            { sequence: list.sequence + 1 },
            ogiData
          )
        }
      }
    })
    currentList.sequence = sequence // Upadte query currentList
    updateDb(
      `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/l/${currentList.id}`,
      { sequence: currentList.sequence + 1 },
      ogiData
    )
    console.log(data.lists)

    return data
  }
  const handleTaskDrag = (data, destination, source, draggableId) => {
    let ogiData = data
    let id = draggableId
    let currentCard = data.cards.find(card => card.id === id)
    // handle remove from source
    data.cards.forEach(card => {
      if (card.listId === source.droppableId) {
        if (card.sequence > source.index) {
          card.sequence = card.sequence - 1
          updateDb(
            `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/c/${card.id}`,
            { sequence: card.sequence - 1 },
            ogiData
          )
        }
      }
      if (card.listId === destination.droppableId) {
        if (card.sequence >= destination.index) {
          card.sequence = card.sequence + 1
          updateDb(
            `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/c/${card.id}`,
            { sequence: card.sequence + 1 },
            ogiData
          )
        }
      }
    })
    currentCard.listId = destination.droppableId
    currentCard.sequence = destination.index // Upadte query currentCard
    updateDb(
      `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/c/${currentCard.id}`,
      { sequence: currentCard.sequence, listId: currentCard.listId },
      ogiData
    )
    console.log(data.cards)
    return data
  }

  const onDragEnd = result => {
    // console.log(result);
    const { destination, source, draggableId, type } = result
    if (!destination) return
    console.log(type, destination, source, draggableId)
    let ogiData = { ...boardData }
    let updatedData = {}
    if (type === 'column') {
      updatedData = handleColumnDrag(ogiData, destination, source, draggableId)
    } else if (type === 'task') {
      updatedData = handleTaskDrag(ogiData, destination, source, draggableId)
    } else {
      return
    }

    setBoardData(updatedData)
  }
  return (
    <Box
      display="block"
      position="relative"
      height="calc(100vh - 80px)"
      overflowX="auto"
      bg={
        'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);'
      }
    >
      <DragDropContext onDragEnd={onDragEnd}>
        <React.StrictMode>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {droppableProvided => (
              <Flex
                pl="4"
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                h="500px"
                bg={"red.100"}
              >
                {boardData.lists.map(list => {
                  const tasks = boardData.cards.filter(
                    card => card.listId === list.id
                  )
                  tasks.sort((a, b) => a.sequence - b.sequence)
                  return (
                    <List
                      key={list.id}
                      list={list}
                      tasks={tasks}
                      index={list.sequence}
                    />
                  )
                })}
                {droppableProvided.placeholder}
              </Flex>
            )}
          </Droppable>
        </React.StrictMode>
      </DragDropContext>
    </Box>
  )
}

export default Board
