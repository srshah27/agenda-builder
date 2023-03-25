import React from 'react'
import { Draggable } from 'react-beautiful-dnd'

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
          ref={draggableProvided.innerRef}
          className={`flex p-2 mb-2 border rounded ${
            draggableSnapshot.isDragging ? 'bg-emerald-400' : 'bg-emerald-400'
          } `}
        >
          {task.name}
        </div>
      )}
    </Draggable>
  )
}

export default Task
