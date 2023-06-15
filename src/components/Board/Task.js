import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Box, useColorModeValue, Spacer } from '@chakra-ui/react'
import Attribute from '@/components/Attributes/Attribute'
import CardModal from '@/components/Modals/CardModal'
import { useDisclosure } from '@chakra-ui/react'
const Task = ({ task, index }) => {
  const attrs = [
    {
      name: 'Session Title',
      type: 'text',
      value: 'WELCOME',
      options: [],
      show: true
    },
    {
      name: 'Details',
      type: 'text',
      value: 'Some Detail',
      options: [],
      show: false
    },
    {
      name: 'Speaker',
      type: 'multi',
      value: '["Akbar", "Amar", "Anthony"]',
      options: ['Akbar', 'Amar', 'Anthony', 'Akshay', 'Virat'],
      show: true
    }
    // { name: 'Status', type: 'option', value: 'Doing', options: ["Pending", "Doing"], show: true },
  ]
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentTask, setCurrentTask] = useState({ ...task, attributes: attrs })
  const initialRef = React.useRef(null)

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      disableInteractiveElementBlocking
    >
      {(draggableProvided, draggableSnapshot) => (
        <div
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          onClick={onOpen}
          className={`font-light p-2 mx-2 flex mb-2 border rounded-md shadow-md h-[144px] bg-blue-400`}
        >
          {/* <div className="flex flex-row w-full h-full bg-yellow-400"> */}
          {/* <div className="flex flex-col h-full w-auto my-auto py-auto bg-yellow-400"> */}
          <div className="flex flex-col h-full min-w-fit justify-around items-baseline bg-yellow-400">
            <span className=''>
              <strong>From: </strong> {new Date(task.start).toLocaleTimeString()}
            </span>
            <span>
              <strong>To: </strong> {new Date(task.end).toLocaleTimeString()}
            </span>
            <span>
              <strong>Duration: </strong>
            </span>
          </div>
          {/* </div> */}

          {/* Attributes */}
          <div className="flex flex-row w-full bg-red-400">
            {attrs.map((attribute, index) => {
              return (
                <div key={index} className="w-44">
                  <Attribute attr={attribute} task={task} />
                </div>
              )
            })}
          </div>
          {/* </div> */}

          <CardModal
            onOpen={onOpen}
            onClose={onClose}
            isOpen={isOpen}
            task={currentTask}
          />
        </div>
      )}
    </Draggable>
  )
}

export default Task
