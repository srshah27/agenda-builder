import React from 'react'
import Task from './Task'
import { useColorModeValue, Box } from '@chakra-ui/react'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

const TaskList = ({ tasks, list, deleteListOrCard }) => {
  return (
    <div className="flex w-full items-center gap-4">
      {tasks.map((task, index) => (
        <div key={task.id} className='w-full'>
          <ContextMenuTrigger key={task.id} id={task.id}>
            <Task task={task} index={task.sequence} />
          </ContextMenuTrigger>
          <ContextMenu id={task.id}>
            <Box m={2} bg="gray.100" w={130} rounded={5}>
              <MenuItem
                onClick={deleteListOrCard}
                data={{ card: task, type: 'card' }}
              >
                <Box bg="gray.300" p={3} rounded={5}>
                  Delete
                </Box>
              </MenuItem>
            </Box>
          </ContextMenu>
        </div>
      ))}
    </div>
  )
}
export default TaskList
