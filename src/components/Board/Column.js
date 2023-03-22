import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'

const Column = ({ column, tasks }) => {
  return (
    <Flex rounded={'md'} w="20rem" h="20rem" flexDir="column" bg={'#9d8eef'}>
      <Flex align={'center'} h="60px" rounded={'sm'} px="1.5rem">
        <Text fontSize={'20px'} color={'#000'}>
          {column.title}
        </Text>
      </Flex>

      <Droppable droppableId={column.id}>
        {(droppableProvided, droppanbleSnapshot) => (
          <Flex
            px={'1.5rem'}
            py={'1rem'}
            flexDir="column"
            flex={1}
            ref={droppableProvided.innerRef}
            {...droppableProvided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(draggableProvided, draggableSnapshot) => (
                  <Flex
                    mb="1rem"
                    h="72px"
                    p={'1.5rem'}
                    bg="#000"
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Text>{task.content}</Text>
                    {/* {draggableProvided.placeholder} */}
                  </Flex>
                )}
              </Draggable>
            ))}
            {droppableProvided.placeholder}
          </Flex>
        )}
      </Droppable>
    </Flex>
  )
}

export default Column
