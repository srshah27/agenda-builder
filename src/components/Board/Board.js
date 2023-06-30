import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { nanoid } from 'nanoid'
import { useSession } from 'next-auth/react'
import { AddIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { addList } from '@/store/boardSlice'
const List = dynamic(() => import('./List'), {
  ssr: false
})

const Board = ({ boardData, setBoardData }) => {
  const [refresh, setRefresh] = useState(false)
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const lists = useSelector((state) => state.board.lists)

  // TORemove
  function updateDb(url, body, cardsOrLists) {
    fetch(url, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.updatedList === null) {
          setBoardData({ ...cardsOrLists })
          setRefresh(!refresh)
        }
        if (data.updatedCard === null) {
          setBoardData({ ...cardsOrLists })
          setRefresh(!refresh)
        }
      })
      .catch((error) => {
        console.log('Error:', error)
        setBoardData(data)
      })
  }

  // const addList = () => {
  //   let sequence = boardData.lists.length
  //   console.log('asdasdasdads')
  //   console.log(boardData.board.activityAttributes)
  //   const data = {
  //     id: nanoid(),
  //     name: 'New List',
  //     createdAt: new Date().toISOString(),
  //     createdBy: session.user.uid,
  //     workspaceId: boardData.board.workspaceId,
  //     boardId: boardData.board.id,
  //     start: boardData.board.start,
  //     end: boardData.board.end,
  //     activityAttributes: boardData.board.activityAttributes,
  //     sequence
  //   }
  //   fetch(`/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/l`, {
  //     method: 'POST',
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify(data)
  //   })
  //   let newLists = [...boardData.lists, data]
  //   console.log(data)
  //   setBoardData({ ...boardData, lists: newLists })
  // }
  const handleDelete = async (e, data) => {
    if (data.type === 'list') {
      fetch(
        `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/l/${data.list.id}`,
        { method: 'DELETE' }
      )
        .then((res) => res.json())
        .then((d) => {
          setBoardData({
            ...boardData,
            lists: boardData.lists.filter((list) => list.id != data.list.id)
          })
        })
    }
    if (data.type === 'card') {
      fetch(
        `/api/w/${boardData.board.workspaceId}/b/${boardData.board.id}/c/${data.card.id}`,
        { method: 'DELETE' }
      )
        .then((res) => res.json())
        .then((d) => {
          setBoardData({
            ...boardData,
            cards: boardData.cards.filter((card) => card.id != data.card.id)
          })
        })
    }
  }
  const handleColumnDrag = (data, destination, source, draggableId) => {
    let ogiData = JSON.parse(JSON.stringify(data))
    let id = draggableId
    let currentList = data.lists.find((list) => list.id === id)
    let oldData = []

    data.lists.forEach((list) => {
      oldData.push({ ...list })
      if (list.sequence > source.index) {
        list.sequence = list.sequence - 1 // Update query else
      }
      if (list.sequence >= destination.index) {
        list.sequence = list.sequence + 1 // Update query else
      }
    })

    currentList.sequence = destination.index // Upadte query currentList
    data.lists.forEach((list) => {
      if (list.sequence !== oldData.find((l) => l.id === list.id).sequence)
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
    let currentCard = data.cards.find((card) => card.id === id)
    let oldData = []
    // handle remove from source
    data.cards.forEach((card) => {
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
    data.cards.forEach((card) => {
      if (card.sequence !== oldData.find((c) => c.id === card.id).sequence)
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

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result
    if (!destination) return
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
    <DragDropContext onDragEnd={onDragEnd}>
      <React.StrictMode>
        <Droppable droppableId="all-columns" direction="vertical" type="column">
          {(droppableProvided) => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              className="flex flex-col items-center bg-[url(../../public/img/boardbg.png)] bg-cover px-4"
            >
              {/* {boardData.lists.map(list => {
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
                    boardData={boardData}
                    setBoardData={setBoardData}
                  />
                )
              })} */}
              {lists.map((list, index) => {
                return <List key={index} listId={list.id} index={index} />
              })}
              {droppableProvided.placeholder}
              <button
                onClick={() => dispatch(addList())}
                className="text-md m-4 flex min-w-[250px] items-center justify-center rounded-md border p-2 shadow-md"
              >
                <AddIcon />
                <p ml="4">Add List</p>
              </button>
            </div>
          )}
        </Droppable>
      </React.StrictMode>
    </DragDropContext>
  )
}

export default Board
