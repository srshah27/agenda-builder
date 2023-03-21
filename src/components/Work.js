import React, { useState, useEffect } from 'react'
import { Wrap, WrapItem, Flex, Text, Center, Stack, Box } from '@chakra-ui/react'

const Workspace = ({ id, workspace }) => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    fetch(`/api/w/${id}/b`).then((res) => res.json()).then((data) => { setBoards(data.boards) })
  }, [boards, id]);

  return (
    <Flex p="5">
      <Stack>
        <Text fontSize="sm" color="gray.500"> {workspace.name} </Text>
        <Wrap >
          {boards.length > 0 && boards.map((board) => (
            <WrapItem key={board.id} >
              <Center w='180px' h='80px' bg='red.200'>
                {board.name}
              </Center>
            </WrapItem>
          ))}
          <WrapItem  >
            <Center w='180px' h='80px' bg='gray.500' as="button" >
              Create
            </Center>
          </WrapItem>
        </Wrap>
      </Stack>
    </Flex>
  )
}

const Work = ({ asCreator, asCollaborator }) => {
  console.log(asCreator.length)
  return (
      <Stack m="12" pos="fixed">
        {asCreator.length > 0 && <Text fontSize="lg" color="red" > Workspaces you created</Text>}
        {asCreator.map((workspace) => (<Workspace key={workspace.id} id={workspace.id} workspace={workspace} />))}

        {asCollaborator.length > 0 && <Text fontSize="lg" color="red"> Workspaces you Collaborate</Text>}
        {asCollaborator.map((workspace) => (<Workspace key={workspace.id} id={workspace.id} workspace={workspace} />))}
      </Stack >
  )
}

export default Work