import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskList from './TaskList'
import { useColorModeValue, Box, Spacer, Flex } from '@chakra-ui/react'
import { GrFormAdd } from 'react-icons/gr'
import { IconContext } from 'react-icons'

const List = ({ list, tasks, index }) => {
  let _color = useColorModeValue('gray.50', 'gray.700')
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
          h='fit-content'
          w={250}
          m
          flexDirection={'column'}
        > 
          <Box {...draggableProvided.dragHandleProps} className="p-2 text-md"> 
            {list.name}
          </Box>
          <Droppable droppableId={list.id} type="task">
            {(droppableProvided, droppableSnapshot) => (
              <Box
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className={`min-h-[0px] p-2 border-t-2`}
              >
                <TaskList tasks={tasks} list={list}/>

                {droppableProvided.placeholder}
              </Box>
            )}
          </Droppable>
          <Box className='px-2'>
          <Box bgColor={_c}
            className={`flex p-2 mb-2  border rounded-md w-full shadow-md bg-gray-900 `}
          >
            Add Card
              <Spacer />
              
              <GrFormAdd size={25} />
          </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  )
}

export default List
