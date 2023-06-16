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
import moment from 'moment'



const CardModal = ({ task, setTask, onClose, isOpen, onOpen, setDuration }) => {
  const [currentTask, setCurrentTask] = useState(task);
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [start, setStart] = useState(new Date(task.start));
  const [end, setEnd] = useState(new Date(task.end));
  const [startTime, setStartTime] = useState(moment(task.start).format('HH:mm'));
  const [endTime, setEndTime] = useState(moment(task.end).format('HH:mm'));
  const [duration, setCurrentDuration] = useState({
    hours: new moment(task.end).diff(new moment(task.start), 'hours'),
    miniutes: new moment(task.end).diff(new moment(task.start), 'minutes') % 60
  });
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
          <ModalHeader>Edit Activity</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Input type='time' value={startTime} onChange={(e) => {
                setStartTime(e.target.value);
                setStart(new Date(`${moment(start).format('YYYY-MM-DD')} ${e.target.value}`))
                setCurrentDuration({
                  hours: new moment(end).diff(new moment(`${moment(start).format('YYYY-MM-DD')} ${e.target.value}`), 'hours'),
                  miniutes: new moment(end).diff(new moment(`${moment(start).format('YYYY-MM-DD')} ${e.target.value}`), 'minutes') % 60
                })
              }}/>
            </FormControl>
            <FormControl>
              <FormLabel>End Time</FormLabel>
              <Input type='time' value={endTime} onChange={(e) => {
                setEndTime(e.target.value);
                setEnd(new Date(`${moment(end).format('YYYY-MM-DD')} ${e.target.value}`))
                setCurrentDuration({
                  hours: new moment(end).diff(new moment(`${moment(start).format('YYYY-MM-DD')} ${e.target.value}`), 'hours'),
                  miniutes: new moment(end).diff(new moment(`${moment(start).format('YYYY-MM-DD')} ${e.target.value}`), 'minutes') % 60
                })
              }}/>
            </FormControl>
            <FormControl>
              <FormLabel>Duration</FormLabel>
              <Input type='number' value={duration.hours} step={1} onChange={(e) => {
                setCurrentDuration({
                  hours: e.target.value,
                  miniutes: duration.miniutes
                })
                let m = new moment(start).add(e.target.value, 'hours').add(duration.miniutes, 'minutes')
                setEnd(m.toDate())
                setEndTime(m.format('HH:mm'))
              }}/>
              <Input type='number' value={duration.miniutes} step={1} onChange={(e) => {
                setCurrentDuration({
                  hours: duration.hours,
                  miniutes: e.target.value
                })
                let m = new moment(start).add(duration.hours, 'hours').add(e.target.value, 'minutes')
                setEnd(m.toDate())
                setEndTime(m.format('HH:mm'))
                
              }}/>
            </FormControl>
          
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
