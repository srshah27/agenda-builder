import React, { useState } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskList from './TaskList'
import { useColorModeValue, Box, Spacer, Flex, Text } from '@chakra-ui/react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { AddIcon } from '@chakra-ui/icons'
import moment from 'moment';


const List = ({ list, tasks, index, addCard, deleteListOrCard }) => {
  let _color = useColorModeValue('gray.100', 'gray.700')
  // let textColor = useColorModeValue('gray.700', 'gray.50')
  let _c = useColorModeValue('gray.50', 'gray.900')
  let invert = useColorModeValue('gray.900', 'gray.50')
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
            <div {...draggableProvided.dragHandleProps} className=" flex p-2 text-md justify-between">
              <input value={list.name} />
              <Spacer/>
              <input type='time' value={start} min={'09:00:00'} max={'20:00:00'} onChange={(e) => setStart(e.target.value)} />
              <input type='time' value={end} onChange={(e) => setEnd(e.target.value)} />
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
