import React from 'react'
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

const CardModal = ({ task, onClose, isOpen, onOpen }) => {
  const initialRef = React.useRef(null)
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
          <ModalHeader>Edit Card</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Card Name</FormLabel>
              <Input ref={initialRef} placeholder="Snehil" value={task.name} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder="Here is a sample placeholder"
                value={task.description}
              />
            </FormControl>
            <div id="checklist" className=''>
              <input checked="" value="1" name="r" type="checkbox" id="01" />
              <label htmlFor="01">Bread</label>
              <input value="2" name="r" type="checkbox" id="02" />
              <label htmlFor="02">Cheese</label>
              <input value="3" name="r" type="checkbox" id="03" />
              <label htmlFor="03">Coffee</label>
            </div>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
            {/* {JSON.stringify(task.attributes)} */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CardModal
