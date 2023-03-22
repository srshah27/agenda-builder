import React, { useState } from 'react'
import { Flex, Heading, Text } from '@chakra-ui/react'
import { DragDropContext } from 'react-beautiful-dnd'
import dynamic from 'next/dynamic'
// import { initialData } from '../../data/InitialData'
const Column = dynamic(() => import('../components/Board/Column'), { ssr: false })

const Board = () => {
  const [initData, setinitData] = useState(initialData)

  const onDragEnd = result => {
    const { destination, source } = result
  }
  console.log('here')
  console.log(initData)
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex flexDir="column" bg="#3ea7da" minH="100vh" w="full" color={'white'}>
        <Flex py="4rem" flexDir={'column'} align="center">
          <Heading>Agile Builder</Heading>
          <Text fontSize={'20px'}>(Board Name)</Text>
        </Flex>

        <Flex justify={'space-between'} px="4rem" py="2rem">
          {initData.columnOrder.map(columnId => {
            const column = initData.columns[columnId]
            const tasks = column.taskIds.map(taskId => initData.tasks[taskId])

            return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </Flex>
      </Flex>
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
