import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { AddIcon } from '@chakra-ui/icons'
import moment from 'moment'
import CustomInput from '../utils/CustomInput'
import Task from './Task'
import { addCard } from '@/store/cardsSlice'
import { useDispatch, useSelector } from 'react-redux'

const List = ({ listId, index }) => {
  const dispatch = useDispatch()
  const currentList = useSelector((state) =>
    state.lists.lists.find((l) => l.id === listId)
  )
  const tasks = useSelector((state) =>
    state.cards.cards.filter((card) => card.listId === listId)
  )
  const [listName, setListName] = useState(currentList?.name)

  async function handleListName(e) {
    setListName(e.target.value)
    let res = await fetch(
      `/api/w/${currentList?.workspaceID}/b/${currentList?.boardId}/l/${currentList?.id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: e.target.value })
      }
    )
    let data = await res.json()
  }
  // const [start, setstart] = useState(`${new Date(currentList?.start).getHours()}:${new Date(currentList?.start).getMinutes()}`);
  const [start, setStart] = useState(moment(currentList?.start).format('HH:mm'))
  const [end, setEnd] = useState(moment(currentList?.end).format('HH:mm'))
  if (!currentList) return null
  return (
    <Draggable draggableId={currentList.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          className={`m-4 flex h-fit w-4/5 flex-col justify-center rounded-xl bg-white shadow-md `}
        >
          {/* <ContextMenuTrigger key={currentList?.id} id={currentList?.id}> */}
          <div
            {...draggableProvided.dragHandleProps}
            className="flex justify-center p-2"
          >
            {/* <input value={listName} className='text-center' onChange={handleListName} /> */}
            <CustomInput
              center={true}
              placeholder="Title"
              value={currentList.name}
              onChange={(e) => handleListName(e)}
            />
          </div>

          <Droppable
            droppableId={currentList.id}
            type="task"
            direction="vertical"
          >
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className={`flex min-h-[50px] w-full flex-col`}
              >
                <div className="flex flex-col">
                  {tasks.map((task, index) => (
                    <Task key={index} taskId={task.id} index={task.sequence} />
                  ))}
                </div>
              </div>
            )}
          </Droppable>

          <button
            className={`m-2 flex w-44 items-center justify-center self-center rounded-md border p-2`}
            onClick={() => {
              console.log(currentList.id)
              dispatch(addCard(currentList.id))
            }}
          >
            <AddIcon w={3} h={3} mr={3} />
            Add a card
          </button>
        </div>
      )}
    </Draggable>
  )
}

export default List
