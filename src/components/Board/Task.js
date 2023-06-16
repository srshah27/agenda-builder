import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Box, useColorModeValue, Spacer } from '@chakra-ui/react'
import Attribute from '@/components/Attributes/Attribute'
import CardModal from '@/components/Modals/CardModal'
import { useDisclosure } from '@chakra-ui/react'
import moment from 'moment'
const Task = ({ task, index }) => {
  const attrs = [
    {
      name: 'Session Title',
      attributeType: 'text',
      value: 'WELCOME',
      options: [],
      show: true
    },
    {
      name: 'Details',
      attributeType: 'text',
      value: 'Some Detail',
      options: [],
      show: false
    },
    {
      name: 'Speaker',
      attributeType: 'multi',
      value: '["Akbar", "Amar", "Anthony"]',
      options: ['Akbar', 'Amar', 'Anthony', 'Akshay', 'Virat'],
      show: true
    }
    // { name: 'Status', attributeType: 'option', value: 'Doing', options: ["Pending", "Doing"], show: true },
  ]
  
  const [duration, setDuration] = useState(new moment(task.end).diff(new moment(task.start), 'minutes'));
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentTask, setCurrentTask] = useState({ ...task});
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
          className={`font-light p-2 mx-2 flex mb-2 border rounded-md shadow-md h-[144px]`}
        >
          <div className="flex flex-col h-full min-w-fit justify-around items-baseline">
            <span className=''>
              <strong>From: </strong> {new Date(task.start).toLocaleTimeString()}
            </span>
            <span>
              <strong>To: </strong> {new Date(task.end).toLocaleTimeString()}
            </span>
            <span>
              <strong>Duration: </strong> {duration / 60} hrs : {duration % 60} mins
            </span>
          </div>

          {task.name}
          {task.description}
          {/* Attributes */}
          <div className="flex flex-row w-full">
            {task.attributes.map((attribute, index) => {
              return (
                <div key={index} className="">
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
