import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure
} from '@chakra-ui/react'
import Attribute from './AttributeInputs/Attributes'




const CardModal = ({ board, onClose, isOpen, onOpen }) => {
  const [oldBoard, setOldBoard] = useState(board);

  const UpdateAttributes = async (oldBoard, body) => {
    let res = await fetch(`/api/w/${oldBoard.workspaceId}/b/${oldBoard.boardId}/c/${oldBoard.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    let data = await res.json()
    return data
  }

  const handleSubmit = async () => {
    let body = {
      attributes: attributes
    }
    let res = await UpdateTask(currentTask, body);
    setTask(res.updatedCard)
    setDuration(duration)
    console.log(res);
    // onClose();
  }

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        blockScrollOnMount={false}
        isCentered
        motionPreset="slideInBottom"
        size={'xl'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Board Attributes</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* Board Details */}
            {
              attributes.map((attr, index) => {

                return <Attribute task={task} attributes={attributes} index={index} setAttributes={setAttributes} key={index} />

              })
            }

          </ModalBody>
          {/* {JSON.stringify(attributes)} */}


          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CardModal
