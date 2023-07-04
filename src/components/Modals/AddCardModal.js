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
import { useDispatch, useSelector } from 'react-redux'
import {saveCard, addCard} from '@/store/boardSlice'

const doDispatch = (dispatch,  listId, startLimit, endLimit) => {
  // dispatch(addCard({ listId, startLimit, endLimit }))
}

const AddCardModal = ({ listId, onClose, isOpen, onOpen }) => {
  const dispatch = useDispatch()
  const currentList = useSelector((state) =>
    state.board.lists.find((l) => l.id === listId)
  )
  const toAddCard = useSelector((state) => state.board.toAddCard)
  if(toAddCard == null)
    doDispatch(dispatch, listId, currentList.start, currentList.end)

  const taskId = useSelector((state) => state.board.toAddCard)
  // const [currentTask, setCurrentTask] = useState(task)
  const currentTask = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskId)
  )
  console.log(toAddCard, currentTask);
  console.log();
  const [duration, setCurrentDuration] = useState({})
  const initialRef = React.useRef(null)
  if (!currentTask) return null
  if (setCurrentDuration === {})
    setCurrentDuration({
      hours: new moment(currentTask.end).diff(
        new moment(currentTask.start),
        'hours'
      ),
      miniutes:
        new moment(currentTask.end).diff(
          new moment(currentTask.start),
          'minutes'
        ) % 60
    })
  
  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="scale"
        size={'xl'}
        scrollBehavior="inside"
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>Edit Activity</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Start Time</FormLabel>
              <Input
                type="time"
                value={moment(currentTask.start).format('HH:mm')}
                onChange={(e) => {
                  let value = new Date(`${moment(currentTask.start).format('YYYY-MM-DD')} ${e.target.value}`).toISOString()
                  dispatch(updateCard({ id: taskId, field: 'start', value}))
                  
                  setCurrentDuration({
                    hours: new moment(currentTask.end).diff(
                      new moment(
                        `${moment(currentTask.start).format('YYYY-MM-DD')} ${e.target.value
                        }`
                      ),
                      'hours'
                    ),
                    miniutes:
                      new moment(currentTask.end).diff(
                        new moment(
                          `${moment(currentTask.start).format('YYYY-MM-DD')} ${e.target.value
                          }`
                        ),
                        'minutes'
                      ) % 60
                  })
                }}
              />
              <FormLabel>End Time</FormLabel>
              <Input
                type="time"
                value={moment(currentTask.end).format('HH:mm')}
                onChange={(e) => {
                  let value = new Date(`${moment(currentTask.end).format('YYYY-MM-DD')} ${e.target.value}`).toISOString()
                  dispatch(updateCard({ id: taskId, field: 'end', value }))
                  
                  setCurrentDuration({
                    hours: new moment(currentTask.end).diff(
                      new moment(
                        `${moment(currentTask.start).format('YYYY-MM-DD')} ${e.target.value
                        }`
                      ),
                      'hours'
                    ),
                    miniutes:
                      new moment(currentTask.end).diff(
                        new moment(
                          `${moment(currentTask.start).format('YYYY-MM-DD')} ${e.target.value
                          }`
                        ),
                        'minutes'
                      ) % 60
                  })
                }}
              />
              <FormLabel>Duration</FormLabel>
              <Input
                type="number"
                value={duration.hours}
                step={1}
                min={0}
                max={23}
                onChange={(e) => {
                  setCurrentDuration({
                    hours: e.target.value,
                    miniutes: duration.miniutes
                  })
                  let m = new moment(currentTask.start)
                    .add(e.target.value, 'hours')
                    .add(duration.miniutes, 'minutes')
                  dispatch(updateCard({ id: taskId, field: 'end', value: m.toDate().toISOString() }))
                  // setEndTime(m.format('HH:mm'))
                }}
              />
              <Input
                type="number"
                value={duration.miniutes}
                step={1}
                min={0}
                max={59}
                onChange={(e) => {
                  setCurrentDuration({
                    hours: duration.hours,
                    miniutes: e.target.value
                  })
                  let m = new moment(currentTask.start)
                    .add(duration.hours, 'hours')
                    .add(e.target.value, 'minutes')
                  dispatch(updateCard({ id: taskId, field: 'end', value: m.toDate().toISOString() }))
                  // setEnd(m.toDate())
                  // setEndTime(m.format('HH:mm'))
                }}
              />

              <FormLabel>Activity Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Activity Title"
                value={currentTask.name}
                onChange={(e) => {
                  // setName(e.target.value)
                  dispatch(updateCard({id:taskId, field: "name", value: e.target.value}))
                }}
              />

              <FormLabel>Activity Description</FormLabel>
              <Textarea
                placeholder="Description"
                value={currentTask.description}
                onChange={(e) => {
                  // setDescription(e.target.value)
                  dispatch(updateCard({ id: taskId, field: "description", value: e.target.value }))
                }}
              />
            </FormControl>
            {currentTask.attributes.map((attr, index) => {
              return <Attribute taskId={taskId} attrId={attr.id} key={index} />
            })}
          </ModalBody>
          {/* {JSON.stringify(attributes)} */}

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" mr={3} onClick={() => {dispatch(saveCard())}}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddCardModal
