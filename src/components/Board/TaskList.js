import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'

const TaskList = ({ tasks, list, deleteListOrCard }) => {
  return (
    <Droppable droppableId={list.id} type="task" direction='vertical'>
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={`p-2 w-full flex flex-col min-h-[150px} bg-green-400`}
        >
          <div className="flex flex-col mt-8">
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
