import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Attribute from '@/components/Attributes/Attribute'
import CardModal from '@/components/Modals/CardModal'
import { useDisclosure } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { computeBgCard } from '@/store/boardSlice'
import moment from 'moment'
const Task = ({ taskId, index }) => {
  const dispatch = useDispatch()
  dispatch(computeBgCard(taskId))
  const currentTask = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskId)
  )
  console.log(currentTask);
  const bg = currentTask.bg ? currentTask.bg == 'default' ? 'bg-slate-200' : currentTask.bg == 'red' ? 'bg-red-200' : 'bg-slate-200' : 'bg-slate-200' 
  
  const { isOpen, onOpen, onClose } = useDisclosure()
  // const [currentTask, setCurrentTask] = useState(task)
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
  // console.log(currentTask.attributes)
  if (!currentTask) return null
  return (
    <Draggable
      draggableId={currentTask.id}
      index={currentTask.sequence}
      disableInteractiveElementBlocking
    >
      {(draggableProvided, draggableSnapshot) => (
        <div
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          onClick={onOpen}
          className={`cardAnimation mx-2 mb-3 flex h-[144px] rounded-md border p-2 font-light shadow-md ${bg}`}
        >
          <div className="flex h-full min-w-fit flex-col items-baseline justify-around">
            <strong>From: </strong>
            <strong>Dur: </strong>
            <strong>To: </strong>
          </div>
          <div className="ml-1 flex h-full min-w-fit flex-col items-baseline justify-around">
            <span>{new Date(currentTask.start).toLocaleTimeString()}</span>
            <span>
              {JSON.stringify(
                moment(currentTask.end).diff(
                  new moment(currentTask.start),
                  'hours'
                )
              )}{' '}
              hr :{' '}
              {JSON.stringify(
                new moment(currentTask.end).diff(
                  new moment(currentTask.start),
                  'minutes'
                ) % 60
              )}{' '}
              min
            </span>
            <span>{new Date(currentTask.end).toLocaleTimeString()}</span>
          </div>
          <div className="flex w-[50%] min-w-[40%] flex-col p-2">
            <span className="w-full text-center text-xl font-semibold">
              {currentTask.name}
            </span>
            <span className="block overflow-hidden text-ellipsis p-2 text-center text-base">
              {currentTask.description}
            </span>
          </div>
          {/* Attributes */}
          <div className="flex w-full max-w-full flex-row">
            {currentTask.attributes.map((attribute, index) => {
              return (
                <Attribute taskId={taskId} attrId={attribute.id} key={index} />
              )
            })}
          </div>
          <CardModal
            onOpen={onOpen}
            onClose={onClose}
            isOpen={isOpen}
            taskId={taskId}
            setDuration={setDuration}
          />
        </div>
      )}
    </Draggable>
  )
}

export default Task
