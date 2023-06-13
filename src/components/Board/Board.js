import React, { useState, useEffect } from 'react'
import { Flex, HStack, Heading, Spacer, Text, useColorModeValue } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { nanoid } from 'nanoid'
import { Box } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import { AddIcon } from '@chakra-ui/icons'

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

  const updateDb = (url, body, cardsOrLists) => {
    fetch(url, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data.updatedList, data.updatedCard);
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
    fetch(`/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/l`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    })
    let newLists = [...boardData.lists, data]
    setBoardData({ ...boardData, lists: newLists })
  }

  const handleDelete = async (e, data) => {
    if (data.type === 'list') {
      fetch(`/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/l/${data.list.id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(d => {
          setBoardData({ ...boardData, lists: boardData.lists.filter(list => list.id != data.list.id) })
        })
    }
    if (data.type === 'card') {
      fetch(`/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/c/${data.card.id}`, { method: 'DELETE' })
        .then(res => res.json())
        .then(d => {
          setBoardData({ ...boardData, cards: boardData.cards.filter(card => card.id != data.card.id) })
        })
    }
  }

  const handleColumnDrag = (data, destination, source, draggableId) => {
    let ogiData = JSON.parse(JSON.stringify(data))
    let id = draggableId
    let currentList = data.lists.find(list => list.id === id)
    let oldData = []

    data.lists.forEach(list => {
      oldData.push({ ...list })
      if (list.sequence > source.index) {
        list.sequence = list.sequence - 1 // Update query else
        console.log(`rm ${list.id} ${list.sequence}`);

      }
      if (list.sequence >= destination.index) {
        list.sequence = list.sequence + 1 // Update query else
        console.log(`add ${list.id} ${list.sequence}`);

      }

    })

    currentList.sequence = destination.index // Upadte query currentList
    console.log(oldData === data);
    data.lists.forEach(list => {

      if (list.sequence !== oldData.find(l => l.id === list.id).sequence)
        updateDb(
          `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/l/${list.id}`,
          { sequence: list.sequence },
          ogiData
        )

    })
    return data
  }
  const handleTaskDrag = (data, destination, source, draggableId) => {
    let ogiData = JSON.parse(JSON.stringify(data))
    let id = draggableId
    let currentCard = data.cards.find(card => card.id === id)
    let oldData = []
    // handle remove from source
    data.cards.forEach(card => {
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
    data.cards.forEach(card => {
      if (card.sequence !== oldData.find(c => c.id === card.id).sequence)
        updateDb(
          `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/c/${card.id}`,
          { sequence: card.sequence },
          ogiData
        )
    })
    updateDb(
      `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/c/${currentCard.id}`,
      { listId: currentCard.listId },
      ogiData
    )
    return data
  }

  const onDragEnd = result => {
    const { destination, source, draggableId, type } = result
    if (!destination) return
    console.log(source.index, destination.index);
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
    // complete outside box
    <Box
      display="block"
      position="relative"
      overflowX="auto"
      bg={
        'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1);'
      }
    >
      <div className='flex justify-around outline-double m-2'>
        {/* <Heading className='text-center'>The Summit</Heading> */}
        <input type="text" className='bg-transparent' />
        <Text fontSize='3xl'>Start Time:</Text>
        <Text fontSize='3xl'>End Time:</Text>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <React.StrictMode>
          {/* all the lists */}
          <Droppable
            droppableId="all-columns"
            direction="vertical"
            type="column"
          >
            {droppableProvided => (
              // box with all lists
              <Flex
                px="4"
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                direction={"column"}
                alignItems={'center'}
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
                      deleteListOrCard={handleDelete}
                    />
                  )
                })}
                {droppableProvided.placeholder}
                <Box
                  className={`m-4 border rounded shadow-md `}
                  h='fit-content'
                  w={250}
                  minW={250}
                >
                  <Box className="p-2 text-md flex" as='button' onClick={addList} w='full' alignItems={'center'}>
                    <AddIcon w={4} h={4} mr={3} /> Add another list
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
