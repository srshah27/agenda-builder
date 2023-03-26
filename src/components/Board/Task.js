import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Box, useColorModeValue } from '@chakra-ui/react'

const Task = ({ task, index }) => {
  let _color = useColorModeValue('gray.50', 'gray.900')
  return (
    <Draggable draggableId={task.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <Box bgColor={_color}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          className={`font-light flex p-2 pt-2 mb-3 border rounded-sm w-full shadow-md h-[40px] ${
            draggableSnapshot.isDragging ? 'bg-gray-500' : 'bg-gray-900'
          } `}
        >
          {task.name}
        </Box>
      )}
    </Draggable>
  )
}

export default Task
