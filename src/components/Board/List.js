import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskList from './TaskList'
import { useColorModeValue, Box } from '@chakra-ui/react'

const List = ({ list, tasks, index }) => {
  let _color = useColorModeValue('gray.100', 'gray.700')
  // let textColor = useColorModeValue('gray.700', 'gray.50')
  return (
    <Draggable draggableId={list.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <Box
          bgColor={_color}
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          className={`flex flex-col w-[280px] m-4 rounded shadow-md`}
        >
          <Box {...draggableProvided.dragHandleProps} className="p-2 text-md">
            {list.name}
          </Box>
          <Droppable droppableId={list.id} type="task">
            {(droppableProvided, droppableSnapshot) => (
              <Box
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className={`min-h-[100px] p-2 border-t-2`}
              >
                <TaskList tasks={tasks} list={list} />

                {droppableProvided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      )}
    </Draggable>
  )
}

export default List
