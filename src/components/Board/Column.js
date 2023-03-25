import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskList from './TaskList'

const Column = ({ column, tasks, index }) => {
  // let bgColor = useColorModeValue('gray.50', 'gray.700')
  // let textColor = useColorModeValue('gray.700', 'gray.50')
  return (
    <Draggable draggableId={column.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          className={`flex flex-col w-[250px] m-2 border rounded ${
            draggableSnapshot.isDragging ? 'bg-blue-400' : 'bg-blue-400'
          }`}
        >
          <div {...draggableProvided.dragHandleProps} className="p-2 text-2xl">
            {column.title}
          </div>
          <Droppable droppableId={column.id} type="task">
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className={`grow min-h-[100px] p-2 ${
                  droppableSnapshot.isDraggingOver ? 'bg-orange-400' : 'bg-orange-400'
                }`}
              >
                <TaskList tasks={tasks} />

                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default Column
