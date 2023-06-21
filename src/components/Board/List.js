import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskList from './TaskList'
import { AddIcon } from '@chakra-ui/icons'
import moment from 'moment'
import CustomInput from '../utils/CustomInput'
import { Spacer } from '@chakra-ui/react'

const List = ({ list, tasks, index, addCard, deleteListOrCard, boardData, setBoardData }) => {
  const [listName, setListName] = useState(list.name)

  async function handleListName(e) {
    setListName(e.target.value)
    let res = await fetch(
      `/api/w/${list.workspaceID}/b/${list.boardId}/l/${list.id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: e.target.value })
      }
    )
    let data = await res.json()
  }
  // const [start, setstart] = useState(`${new Date(list.start).getHours()}:${new Date(list.start).getMinutes()}`);
  const [start, setStart] = useState(moment(list.start).format('HH:mm'))
  const [end, setEnd] = useState(moment(list.end).format('HH:mm'))
  return (
    <Draggable draggableId={list.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          className={`m-4 flex h-fit w-4/5 flex-col justify-center rounded-xl bg-white shadow-md `}
        >
          {/* <ContextMenuTrigger key={list.id} id={list.id}> */}
          <div
            {...draggableProvided.dragHandleProps}
            className="flex justify-center p-2"
          >
            {/* <input value={listName} className='text-center' onChange={handleListName} /> */}
            <CustomInput
              center={true}
              placeholder="Title"
              value={listName}
              onChange={e => handleListName(e)}
            />
          </div>

          <TaskList
            tasks={tasks}
            list={list}
            deleteListOrCard={deleteListOrCard}
            boardData={boardData}
            setBoardData={setBoardData}
          />
          <button
            className={`m-2 flex w-44 items-center justify-center self-center rounded-md border p-2`}
            onClick={() => addCard(list.id)}
          >
            <AddIcon w={3} h={3} mr={3} />
            Add a card
          </button>

          {/* <button class="cssbuttons-io-button">
            {' '}
            Get started
            <div class="icon">
              <AddIcon w={3} h={3} mr={3} />
            </div>
          </button> */}
          {/* <ContextMenu id={list.id}>
            <Box m={2} bg="gray.100" w={130} rounded={5}>
              <MenuItem
                onClick={deleteListOrCard}
                data={{ list: list, type: 'list' }}
              >
                <Box bg="gray.300" p={3} rounded={5}>
                  Delete
                </Box>
              </MenuItem>
            </Box>
          </ContextMenu> */}
        </div>
      )}
    </Draggable>
  )
}

export default List
