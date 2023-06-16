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



const CardModal = ({ task, onClose, isOpen, onOpen }) => {
  const [Task, setTask] = useState(task);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [start, setStart] = useState(task.start);
  const [end, setEnd] = useState(task.end);
  const [duration, setDuration] = useState(task.duration);
  const [attributes, setAttributes] = useState(task.attributes);
  const initialRef = React.useRef(null)
  
  const UpdateTask = async (oldTask, body) => {
    let res = await fetch(`/api/w/${oldTask.workspaceId}/b/${oldTask.boardId}/c/${oldTask.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    let data = await res.json()
    return data
  }
  
  const handleSubmit = async () => {
    let body = {
      name: name,
      description: description,
      start: start,
      end: end,
      duration: duration,
      attributes: attributes
    }
    let res = await UpdateTask(task, body);
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
          <ModalHeader>Edit Activity</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Activity Title</FormLabel>
              <Input ref={initialRef} placeholder='Activity Title' value={name} onChange={(e)=> {setName(e.target.value)}}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Activity Description</FormLabel>
              <Textarea placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }} />
            </FormControl>
            {
              attributes.map((attr, index) => {

                return <Attribute task={task} attributes={attributes} index={index} setAttributes={setAttributes} key={index} />

                return <FormControl mt={4} key={index}>
                  {/* <Attribute attr={attr} /> */}

                  <FormLabel>{attr.name}</FormLabel>
                  <Input placeholder={attr.name} value={attr.value} type={attr.attributeType} onChange={(e) => {
                    let newAttrs = attributes;
                    newAttrs[index].value = e.target.value;
                    console.log(newAttrs[index]);
                    setAttributes(newAttrs);
                  }} />
                </FormControl>
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
