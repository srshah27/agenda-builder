import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'

const TaskList = ({ tasks, list, deleteListOrCard }) => {
  return (
    <Droppable droppableId={list.id} type="task" direction="vertical">
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={`flex min-h-[50px] w-full flex-col`}
        >
          <div className="flex flex-col">
            {tasks.map((task, index) => (
              <Task task={task} index={task.sequence} key={task.index} />
            ))}
          </div>
        </div>
      )}
    </Droppable>
  )
}
export default TaskList
