import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskList from './TaskList'
import { Box, Flex, Text } from '@chakra-ui/react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { AddIcon } from '@chakra-ui/icons'
import moment from 'moment';
import CustomInput from '../utils/CustomInput'


const List = ({ list, tasks, index, addCard, deleteListOrCard }) => {
  const [listName, setListName] = useState(list.name)

  async function handleListName(e) {
    setListName(e.target.value)
    let res = await fetch(`/api/w/${board.workspaceID}/b/${board.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: e.target.value })
    })
    let data = await res.json()
  }
  // const [start, setstart] = useState(`${new Date(list.start).getHours()}:${new Date(list.start).getMinutes()}`);
  const [start, setStart] = useState(moment(list.start).format('HH:mm'));
  const [end, setEnd] = useState(moment(list.end).format('HH:mm'));
  return (
    <Draggable draggableId={list.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (

        <div
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          className={`m-4 border rounded shadow-md bg-red-400 w-4/5 h-fit flex flex-col`}
        >
          <ContextMenuTrigger key={list.id} id={list.id}>
            <div {...draggableProvided.dragHandleProps} className="p-2 flex justify-center">
              {/* <input value={listName} className='text-center' onChange={handleListName} /> */}
              <CustomInput center={true} placeholder='Title' />

              {/* <Spacer /> */}
              {/* <input type='time' value={start} min={'09:00:00'} max={'20:00:00'} onChange={(e) => setStart(e.target.value)} />
              <input type='time' value={end} onChange={(e) => setEnd(e.target.value)} /> */}

            </div>
          </ContextMenuTrigger>


          <TaskList tasks={tasks} list={list} deleteListOrCard={deleteListOrCard} />
          <Box className='px-2'>
            <Box
              className={`flex p-2 mb-2 w-full shadow-md bg-indigo-200`}
              as='button'
              alignItems={'center'}
              onClick={() => addCard(list.id)}
            >
              <AddIcon w={3} h={3} mr={3} />
              Add a card
            </Box>
          </Box>
          <ContextMenu id={list.id}>
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
          </ContextMenu>
        </div>

      )}
    </Draggable>
  )
}

export default List
