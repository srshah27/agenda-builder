import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskList from './TaskList'
import { useColorModeValue, Box, Spacer, Flex } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
const List = ({ list, tasks, index, addCard, deleteListOrCard }) => {
  let _color = useColorModeValue('gray.100', 'gray.700')
  // let textColor = useColorModeValue('gray.700', 'gray.50')
  let _c = useColorModeValue('gray.50', 'gray.900')
  let invert = useColorModeValue('gray.900', 'gray.50')
  return (
    <Draggable draggableId={list.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (

        <Box bgColor={_color}
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          className={`m-4 border rounded shadow-md `}
          h="fit-content"
          w={250}
          minW={250}
          m
          flexDirection={'column'}
        >
          <ContextMenuTrigger key={list.id} id={list.id}>
          <Box {...draggableProvided.dragHandleProps} className="p-2 text-md " width={'full'}>
            {list.name} <Spacer/>{list.sequence}
          </Box>
          </ContextMenuTrigger>
          
          <ContextMenu id={list.id}>
            <Box m={2} bg="gray.100"  w={130} rounded={5}>
              <MenuItem
                onClick={deleteListOrCard}
                data={{ list: list, type:'list' }}
              >
                <Box bg="gray.300" p={3} rounded={5}>
                  Delete
                </Box>
              </MenuItem>
            </Box>
          </ContextMenu>
          
          <Droppable droppableId={list.id} type="task">
            {(droppableProvided, droppableSnapshot) => (
              <Box
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className={`min-h-0 p-2 border-t-2`}
              >
                <TaskList tasks={tasks} list={list} deleteListOrCard={deleteListOrCard } />

                {droppableProvided.placeholder}
              </Box>
            )}
          </Droppable>
          <Box className='px-2'>
            <Box bgColor={_color}
              className={`flex p-2 mb-2 w-full shadow-md `}
              as='button'
              alignItems={'center'}
              onClick={() => addCard(list.id)}
            >
              <AddIcon w={3} h={ 3 } mr={ 3 } />
              Add a card
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  )
}

export default List
