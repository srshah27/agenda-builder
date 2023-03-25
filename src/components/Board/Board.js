import React, { useState } from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import AvatarMenu from '@/components/AvatarMenu'
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";

// import { initialData } from '../../data/InitialData'
const Column = dynamic(() => import('./Column'), {
  ssr: false
})

const Board = () => {
  const [initData, setinitData] = useState(initialData)

  const onDragEnd = result => {
    const { destination, source, draggableId } = result
    if (!destination) return
    console.log(destination, source, draggableId)
    let newData = { ...initData }
    newData.columns[source.droppableId].taskIds.splice(source.index, 1)
    newData.columns[destination.droppableId].taskIds.splice(
      destination.index,
      0,
      draggableId
    )
    setinitData(newData)
  }
  return (
    <DragDropContext onDragEnd={()=>{}}>
      <React.StrictMode>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {droppableProvided => (
            <div
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
              className="flex"
            >
              {initData.columnOrder.map((columnId, index) => {
                const column = initData.columns[columnId]
                const tasks = column.taskIds.map(taskId => initData.tasks[taskId])

                return (
                  <Column
                    key={column.id}
                    column={column}
                    tasks={tasks}
                    index={index}
                  />
                )
              })}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </React.StrictMode>
    </DragDropContext>
  )
}

export default Board

const initialData = {
  tasks: {
    1: { id: '1', content: 'Lmao' },
    2: { id: '2', content: 'This' },
    3: { id: '3', content: 'Sucks' },
    4: { id: '4', content: 'More' },
    5: { id: '5', content: 'HUH' },
    6: { id: '6', content: 'Test' }
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'LMAO',
      taskIds: ['3', '4', '5', '6']
    },
    'column-2': {
      id: 'column-2',
      title: 'YOU',
      taskIds: ['1', '2']
    },
    'column-3': {
      id: 'column-3',
      title: 'SUCK',
      taskIds: []
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3']
}
