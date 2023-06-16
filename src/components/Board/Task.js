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

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentTask, setCurrentTask] = useState(task)
  const initialRef = React.useRef(null)
  const [duration, setDuration] = useState({
    hours: JSON.stringify(
      moment(currentTask.end).diff(new moment(currentTask.start), 'hours')
    ),
    miniutes: JSON.stringify(
      new moment(currentTask.end).diff(
        new moment(currentTask.start),
        'minutes'
      ) % 60
    )
  })

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
          className={`cardAnimation mx-2 mb-3 flex h-[144px] rounded-md border bg-slate-200 p-2 font-light shadow-md`}
        >
          <div className="flex h-full min-w-fit flex-col items-baseline justify-around">
            <strong>From: </strong>
            <strong>To: </strong>
            <strong>Dur: </strong>
          </div>
          <div className="ml-1 flex h-full min-w-fit flex-col items-baseline justify-around">
            <span>{new Date(currentTask.start).toLocaleTimeString()}</span>
            <span>{new Date(currentTask.end).toLocaleTimeString()}</span>
            <span>
              {duration.hours}hr {duration.miniutes}min
            </span>
          </div>
          <div className="flex w-[50%] min-w-[50%] flex-col p-2">
            <span className="w-full text-center text-xl font-semibold">
              {currentTask.name}
            </span>
            <span className="block overflow-hidden text-ellipsis p-2 text-base">
              {currentTask.description}
            </span>
          </div>
          {/* Attributes */}
          <div className="flex w-full max-w-full flex-row">
            {currentTask.attributes.map((attribute, index) => {
              return <Attribute attr={attribute} task={currentTask} />
            })}
          </div>
          <CardModal
            onOpen={onOpen}
            onClose={onClose}
            isOpen={isOpen}
            task={currentTask}
            setTask={setCurrentTask}
            setDuration={setDuration}
          />
        </div>
      )}
    </Draggable>
  )
}

export default Task
