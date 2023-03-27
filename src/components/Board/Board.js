import React, { useState, useEffect } from 'react'
import { Flex, HStack, Spacer, useColorModeValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import UserNav from '../UserNav'
import SubNav from '../SubNav'
import { nanoid } from 'nanoid'
import { Box } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { GrFormAdd } from 'react-icons/gr'

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
  const { data: session } = useSession()
  useEffect(() => {
    setBoardData({
      ...boardData,
      lists: boardData.lists.sort((a, b) => a.sequence - b.sequence),
      cards: boardData.cards.sort((a, b) => a.sequence - b.sequence)
    })
  }, [refresh])
  let _color = useColorModeValue('gray.100', 'gray.700')

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
  const addCard = (listId) => {
    console.log('added card to: ' + listId);
    let sequence = boardData.cards.filter(card => card.listId === listId).length
    const data = {
      id: nanoid(),
      name: 'New Card',
      createdAt: new Date().toISOString(),
      createdBy: session.user.uid,
      listId,
      workspaceId: boardData.board.workspaceId,
      boardId: boardData.board.id,
      sequence
    }
    console.log(data);
    fetch(`/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/c`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
    let newCards = [...boardData.cards, data]
    setBoardData({ ...boardData, cards: newCards })
  }
  const addList = () => {
    let sequence = boardData.lists.length
    const data = {
      id: nanoid(),
      name: 'New List',
      createdAt: new Date().toISOString(),
      createdBy: session.user.uid,
      workspaceId: boardData.board.workspaceId,
      boardId: boardData.board.id,
      sequence
    }
    console.log(data);
    fetch(`/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/l`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
    let newLists = [...boardData.lists, data]
    setBoardData({ ...boardData, lists: newLists })
  }
  const handleColumnDrag = (data, destination, source, draggableId) => {
    let ogiData = data
    let id = draggableId
    let currentList = data.lists.find(list => list.id === id)
    console.log(source.index, destination.index);

    data.lists.forEach(list => {

      if (list.sequence > source.index) {
        list.sequence = list.sequence - 1 // Update query else
        console.log("1st" + list.sequence);
        updateDb(
          `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/l/${list.id}`,
          { sequence: list.sequence - 1 },
          ogiData
        )
      }

    })
    data.lists.forEach(list => {
      console.log("2nd" + list.sequence);
      if (list.sequence >= destination.index) {
        list.sequence = list.sequence + 1 // Update query else
        updateDb(
          `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/l/${list.id}`,
          { sequence: list.sequence + 1 },
          ogiData
        )
      }

    })
    currentList.sequence = destination.index // Upadte query currentList
    console.log("last" + currentList.sequence);
    updateDb(
      `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/l/${currentList.id}`,
      { sequence: destination.sequence },
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
    })
    data.cards.forEach(card => {
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
                      addCard={addCard}
                    />

                  )
                })}
                {droppableProvided.placeholder}
                <Box bgColor={_color}
                  className={`m-4 border rounded shadow-md `}
                  h='fit-content'
                  w={250}
                  m
                  flexDirection={'column'}
                >
                  <Box className="p-2 text-md" as='button' onClick={addList}>
                    Add new List <Spacer />  <GrFormAdd size={25} />
                  </Box>

                </Box>
              </Flex>
            )}
          </Droppable>

        </React.StrictMode>
      </DragDropContext>
    </Box>
  )
}

export default Board
