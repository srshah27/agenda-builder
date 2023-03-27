import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskList from './TaskList'
import { useColorModeValue, Box, Spacer, Flex } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

const List = ({ list, tasks, index, addCard }) => {
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
          <Box {...draggableProvided.dragHandleProps} className="p-2 text-md">
            {list.name} <Spacer/>{list.sequence}
          </Box>
          <Droppable droppableId={list.id} type="task">
            {(droppableProvided, droppableSnapshot) => (
              <Box
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className={`min-h-0 p-2 border-t-2`}
              >
                <TaskList tasks={tasks} list={list} />

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
