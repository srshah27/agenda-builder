import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { TbLayoutBoardSplit } from 'react-icons/tb'
import { Wrap, WrapItem, Flex, Text, Center, Stack, useDisclosure, Button, Input, useColorModeValue, HStack, Spacer } from '@chakra-ui/react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { BsPersonGear, BsPeople } from 'react-icons/bs'

const Workspace = ({ id, workspace }) => {
  const [boards, setBoards] = useState([]);
  useEffect(() => {
    fetch(`/api/w/${id}/b`).then((res) => res.json()).then((data) => { setBoards(data.boards) })
  }, [boards, id]);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  const { uId } = router.query

  return (
    <Flex p="5">
      <Stack>
        <HStack  mb="2">
          <Text fontSize="xl" color={useColorModeValue("gray.900", "gray.50")}> {workspace.name} </Text>
          <Flex pos="fixed" right="14.5%">
            <Button h="8" mx="2" > <TbLayoutBoardSplit/> {'     '} Boards</Button>
            <Button h="8" mx="2" > <TbLayoutBoardSplit /> {' '} Boards</Button>
            <Button h="8" mx="2"> <TbLayoutBoardSplit /> {' '} Boards</Button>
            <Button h="8" mx="2"> <TbLayoutBoardSplit /> {' '} Boards</Button>
          </Flex>
        </HStack>
        <Wrap>
          {boards.length > 0 && boards.map((board) => (
            <WrapItem key={board.id} pr="4">
              <Center w='180px' h='100px' bg='red.200' borderRadius="md">
                {board.name}
              </Center>
            </WrapItem>
          ))}
          <WrapItem >
            <Button w='180px' h='100px' onClick={onOpen} bg={useColorModeValue("gray.300", "gray.600")}>Create Board</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader color="cyan.100">Create board</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input placeholder='Board Name' />
                  <Input hidden value={uId} />
                </ModalBody>
                <ModalFooter>
                  <Button mr={3} onClick={onClose}>
                    Create
                  </Button>
                  <Button variant='ghost'>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
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
      {asCreator.length > 0 && <HStack> <BsPersonGear /> <Text fontSize="md" color={useColorModeValue("gray.900", "gray.50")} fontWeight="semibold">  Workspaces you created</Text> </HStack>}
      {asCreator.map((workspace) => (<Workspace key={workspace.id} id={workspace.id} workspace={workspace} />))}

      {asCollaborator.length > 0 && <HStack> <BsPeople /> <Text fontSize="md" color={useColorModeValue("gray.900", "gray.50")} fontWeight="semibold">  Workspaces you Collaborate</Text> </HStack>}
      {asCollaborator.map((workspace) => (<Workspace key={workspace.id} id={workspace.id} workspace={workspace} />))}
    </Stack >
  )
}

export default Work