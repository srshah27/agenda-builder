import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Box, useColorModeValue, Spacer } from '@chakra-ui/react'
import Attribute from '@/components/Attributes/Attribute'
const Task = ({ task, index }) => {

  const attrs = [
    { name: 'Session Title', type: 'text', value: 'WELCOME', options: [], show: true },
    { name: 'Details', type: 'text', value: 'Some Detail', options: [], show: false },
    { name: 'Speaker', type: 'multi', value: '["Akbar", "Amar", "Anthony"]', options: ["Akbar", "Amar", "Anthony", "Akshay", "Virat"], show: true },
    // { name: 'Status', type: 'option', value: 'Doing', options: ["Pending", "Doing"], show: true },
  ]

  return (
    <Draggable draggableId={task.id} index={index} disableInteractiveElementBlocking >
      {(draggableProvided, draggableSnapshot) => (
        <Box
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          className={`font-light p-2 mx-2 flex min-w-[150px] mb-2 border rounded-md shadow-md h-[100px] bg-blue-400`}
        >
          {/* {task.name} */}

          <div className='flex flex-row w-full h-full'>
            {/* Time */}
            <div className='flex flex-col h-full w-auto my-auto py-auto' >
              <span>
                {new Date(task.start).toLocaleTimeString()}
              </span>
              <span>
                Duration
              </span>
              <span>
                {new Date(task.end).toLocaleTimeString()}
              </span>
            </div>

            {/* Attributes */}
            <div className='flex flex-row p-auto, m-auto'>

              {attrs.map((attribute, index) => {
                return <div key={index} className='p-auto m-auto pr-16'>
                  <Attribute attr={attribute} task={task}  />
                </div>
              })}
            </div>

          </div>

        </Box>
      )}
    </Draggable>
  )
}

export default Task
