import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'

const TaskList = ({ tasks, list, deleteListOrCard }) => {
  return (
    <Droppable droppableId={list.id} type="task" direction='vertical'>
      {(droppableProvided, droppableSnapshot) => (
        <div
          ref={droppableProvided.innerRef}
          {...droppableProvided.droppableProps}
          className={`p-2 w-full flex flex-col min-h-[150px}`}
        >
          <h2 className='text-xl text-center'>This will be the description of the Task</h2>

          <div className="flex flex-col mt-8 bg-red-400">
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
