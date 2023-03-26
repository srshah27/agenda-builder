import React from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import TaskList from './TaskList'

const List = ({ list, tasks, index }) => {
  // let bgColor = useColorModeValue('gray.50', 'gray.700')
  // let textColor = useColorModeValue('gray.700', 'gray.50')
  return (
    <Draggable draggableId={list.id} index={index}>
      {(draggableProvided, draggableSnapshot) => (
        <div
          {...draggableProvided.draggableProps}
          ref={draggableProvided.innerRef}
          className={`flex flex-col w-[250px] m-2 border rounded ${
            draggableSnapshot.isDragging ? 'bg-blue-400' : 'bg-blue-400'
          }`}
        >
          <div {...draggableProvided.dragHandleProps} className="p-2 text-2xl">
            {list.name}
          </div>
          <Droppable droppableId={list.id} type="task">
            {(droppableProvided, droppableSnapshot) => (
              <div
                ref={droppableProvided.innerRef}
                {...droppableProvided.droppableProps}
                className={`grow min-h-[100px] p-2 ${
                  droppableSnapshot.isDraggingOver ? 'bg-orange-400' : 'bg-orange-400'
                }`}
              >
                <TaskList tasks={tasks} list={ list } />

                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}

export default List
