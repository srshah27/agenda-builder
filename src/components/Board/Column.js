import { Flex, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { Draggable } from 'react-beautiful-dnd'

const Column = ({ column, tasks }) => {
  return (
    <Flex rounded={'md'} w="20rem" h="auto" flexDir="column" bgColor={'gray.200'}>
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
                    bg={useColorModeValue("gray.50", "gray.700")}
                    rounded="md"
                    ref={draggableProvided.innerRef}
                    {...draggableProvided.draggableProps}
                    {...draggableProvided.dragHandleProps}
                  >
                    <Text color={useColorModeValue("gray.700", "gray.50")}>{task.content}</Text>
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
