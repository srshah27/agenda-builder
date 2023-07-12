import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import { useSession } from 'next-auth/react'
import { AddIcon } from '@chakra-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  addList,
  handleListDragEnd,
  handleCardDragEnd
} from '@/store/boardSlice'
const List = dynamic(() => import('./List'), {
  ssr: false
})

const Board = ({ boardData, setBoardData }) => {
  const [refresh, setRefresh] = useState(false)
  const { data: session } = useSession()
  const dispatch = useDispatch()
  const lists = useSelector((state) => state.board.lists)

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result
    if (!destination) return
    if (type === 'column') {
      dispatch(handleListDragEnd({ destination, source, draggableId }))
    } else if (type === 'task') {
      dispatch(handleCardDragEnd({ destination, source, draggableId }))
    } else {
      return
    }
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
              {lists.map((list, index) => {
                return <List key={index} listId={list.id} index={list.sequence} />
              })}
              {droppableProvided.placeholder}
              <button
                onClick={() => dispatch(addList())}
                className="text-md m-4 flex min-w-[250px] items-center justify-center rounded-md border p-2 shadow-md"
              >
                <AddIcon />
                <p>Add List</p>
              </button>
            </div>
          )}
        </Droppable>
      </React.StrictMode>
    </DragDropContext>
  )
}

export default Board
