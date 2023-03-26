import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskList from './TaskList'
import { useColorModeValue, Flex } from '@chakra-ui/react'

const List = ({ list, tasks, index }) => {
  // let bgColor = useColorModeValue('gray.50', 'gray.700')
  // let textColor = useColorModeValue('gray.700', 'gray.50')
  return (
    <Draggable draggableId={list.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <Flex mx="6" my="4" flexDir="column" borderRadius="md" bgColor = {useColorModeValue('gray.200', 'gray.200')}
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
        >
          <Flex minW="300px" p="2" fontSize="xl"  textColor={useColorModeValue('gray.600', 'black')} {...draggableProvided.dragHandleProps}>
            {list.name}
          </Flex>
          <Droppable droppableId={list.id} type="task">
            {(droppableProvided, droppableSnapshot) => (
              <Flex borderBottomRadius="md" p="2" borderTop="2px" flexGrow="1"
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
               
              >
                <TaskList tasks={tasks} list={ list } />

                {droppableProvided.placeholder}
              </Flex>
            )}
          </Droppable>
        </Flex>
      )}
    </Draggable>
  )
}

export default List
