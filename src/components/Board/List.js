import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { AddIcon } from '@chakra-ui/icons'
import moment from 'moment'
import CustomInput from '../utils/CustomInput'
import Task from './Task'
import { addCard, updateList, deleteList } from '@/store/boardSlice'
import AddCardModal from '@/components/Modals/AddCardModal'
import { useDispatch, useSelector } from 'react-redux'
import { useDisclosure } from '@chakra-ui/react'
const List = ({ listId, index }) => {
  const dispatch = useDispatch()
  const currentList = useSelector((state) =>
    state.board.lists.find((l) => l.id === listId)
  )
  const tasks = useSelector((state) =>
    state.board.cards.filter((card) => card.listId === listId)
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  let sortedTasks = tasks.sort((a, b) => new Date(a.start) < new Date(b.start) ? -1 : 1)


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
          {/* <div className={`cardAnimation mx-2 mb-3 flex h-[144px] rounded-md border bg-slate-200 p-2 font-light shadow-md`} >
            <div className="flex h-full min-w-fit flex-col items-baseline justify-around">
              <strong>From: </strong>
              <strong>Dur: </strong>
              <strong>To: </strong>
            </div>
            <div className="ml-1 flex h-full min-w-fit flex-col items-baseline justify-around">
              <span>{new Date(currentList.start).toLocaleTimeString()}</span>
              <span>
                {JSON.stringify(
                  moment(currentList.end).diff(new moment(currentList.start), 'hours')
                )} {' '} hr {' '} : {' '}
                {JSON.stringify(
                  new moment(currentList.end).diff(
                    new moment(currentList.start),
                    'minutes'
                  ) % 60
                )} {' '} min
              </span>
              <span>{new Date(currentList.end).toLocaleTimeString()}</span>
            </div>
          </div> */}
          
          <div className="flex mx-auto gap-12">
            <span>{new Date(currentList.start).toLocaleTimeString()}</span>
            <span>
              {JSON.stringify(
                moment(currentList.end).diff(new moment(currentList.start), 'hours')
              )} {' '} hr {' '} : {' '}
              {JSON.stringify(
                new moment(currentList.end).diff(
                  new moment(currentList.start),
                  'minutes'
                ) % 60
              )} {' '}
            </span>
            <span>{new Date(currentList.end).toLocaleTimeString()}</span>
          </div>
          <div
            {...draggableProvided.dragHandleProps}
            className="flex justify-center p-2"
          >
            {/* <input value={listName} className='text-center' onChange={handleListName} /> */}
            <CustomInput
              center={true}
              placeholder="Title"
              value={currentList.name}
              onChange={(e) => dispatch(updateList({ id: currentList.id, field: 'name', value: e.target.value }))}
            />

            <button
              className={`m-2  w-44 margin-left: auto;  rounded-md border p-2 bg-red-500 text-white`}
              onClick={() => {
                dispatch(deleteList(currentList.id))
              }}
            >

              Delete List
            </button>
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
          <div className=' flex flex-row items-center justify-center self-center' >
            <button
              className={`m-2  w-44  rounded-md border p-2`}
              onClick={() => {

                dispatch(addCard(currentList.id))
              }}
              // onClick={onOpen}
            >
              <AddIcon w={3} h={3} mr={3} />
              Add a card
            </button>

          <AddCardModal
            onOpen={onOpen}
            onClose={ onClose}
            isOpen={isOpen}
            listId={listId}
          />
        </div>
          </div>
      )}
    </Draggable>
  )
}

export default List
