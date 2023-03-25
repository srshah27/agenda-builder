import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Task from './Task'

const TaskList = ({ tasks }) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} />
      ))}
    </div>
  )
}
export default TaskList
