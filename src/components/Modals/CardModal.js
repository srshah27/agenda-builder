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
const CardModal = ({ taskId, onClose, isOpen, onOpen, setDuration }) => {
  // const [currentTask, setCurrentTask] = useState(task)
  const currentTask = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskId)
  )

  const [startTime, setStartTime] = useState(
    moment(currentTask.start).format('HH:mm')
  )
  const [endTime, setEndTime] = useState(
    moment(currentTask.end).format('HH:mm')
  )
  const [duration, setCurrentDuration] = useState({
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
  const initialRef = React.useRef(null)

  const UpdateTask = async (oldTask, body) => {
    let res = await fetch(
      `/api/w/${oldTask.workspaceId}/b/${oldTask.boardId}/c/${oldTask.id}`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    )
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
    let res = await UpdateTask(currentTask, body)
    setTask(res.updatedCard)
    setDuration(duration)
    onClose()
  }

  const handleDelete = async () => {
    let res = await fetch(
      `/api/w/${currentTask.workspaceId}/b/${currentTask.boardId}/c/${currentTask.id}`,
      {
        method: 'DELETE'
      }
    )
    let data = await res.json()

    onClose()
  }
  if (!currentTask) return null
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
                  // setStartTime(e.target.value)
                  // setStart(
                  //   new Date(
                  //     `${moment(currentTask.start).format('YYYY-MM-DD')} ${e.target.value}`
                  //   )
                  // )
                  setCurrentDuration({
                    hours: new moment(end).diff(
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
                  // setEndTime(e.target.value)
                  // setEnd(
                  //   new Date(
                  //     `${moment(currentTask.end).format('YYYY-MM-DD')} ${e.target.value}`
                  //   )
                  // )
                  setCurrentDuration({
                    hours: new moment(end).diff(
                      new moment(
                        `${moment(currentTask.start).format('YYYY-MM-DD')} ${e.target.value
                        }`
                      ),
                      'hours'
                    ),
                    miniutes:
                      new moment(end).diff(
                        new moment(
                          `${moment(start).format('YYYY-MM-DD')} ${e.target.value
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
                onChange={(e) => {
                  setCurrentDuration({
                    hours: e.target.value,
                    miniutes: duration.miniutes
                  })
                  let m = new moment(start)
                    .add(e.target.value, 'hours')
                    .add(duration.miniutes, 'minutes')
                  // setEnd(m.toDate())
                  // setEndTime(m.format('HH:mm'))
                }}
              />
              <Input
                type="number"
                value={duration.miniutes}
                step={1}
                onChange={(e) => {
                  setCurrentDuration({
                    hours: duration.hours,
                    miniutes: e.target.value
                  })
                  let m = new moment(start)
                    .add(duration.hours, 'hours')
                    .add(e.target.value, 'minutes')
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
                }}
              />

              <FormLabel>Activity Description</FormLabel>
              <Textarea
                placeholder="Description"
                value={currentTask.description}
                onChange={(e) => {
                  // setDescription(e.target.value)
                }}
              />
            </FormControl>
            {currentTask.attributes.map((attr, index) => {
              return <Attribute taskId={taskId} index={index} key={index} />
            })}
          </ModalBody>
          {/* {JSON.stringify(attributes)} */}

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={(e) => {
                // deleteListOrCard(e, { card: task, type: 'card' } )
              }}
            >
              {' '}
              Delete{' '}
            </Button>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
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
