import React from 'react'
import Task from './Task'
import { useColorModeValue, Box, Text } from '@chakra-ui/react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'
import { Droppable } from 'react-beautiful-dnd'

const TaskList = ({ tasks, list, deleteListOrCard }) => {
  return (
    <Droppable droppableId={list.id} type="task" direction='horizontal'>
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={`p-2 w-full flex flex-col min-h-[150px]`}
        >
          <h2 className='text-xl text-center'>This will be the description of the Task</h2>

          <div className="flex mt-8">
            {tasks.map((task, index) => (
              <Task task={task} index={task.sequence} />
            ))}
          </div>
        </div>
      )}

    </Droppable>
  )
}
export default TaskList
