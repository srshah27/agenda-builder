import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Task from './Task'

const TaskList = ({ tasks, list }) => {
  return (
    <div className='w-full'>
      {tasks.map((task, index) => (
        <Task key={task.id} task={task} index={task.sequence} />
      ))}
    </div>
  )
}
export default TaskList
