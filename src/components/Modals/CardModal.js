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
  useToast,
  useDisclosure
} from '@chakra-ui/react'
import Attribute from './AttributeInputs/Attributes'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { updateCard, deleteCard } from '@/store/boardSlice'
const CardModal = ({ taskId, isOpen, onClose }) => {
  const toast = useToast()
  const dispatch = useDispatch()
  const currentTask = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskId)
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
                  let value = new Date(
                    `${moment(currentTask.start).format('YYYY-MM-DD')} ${
                      e.target.value
                    }`
                  ).toISOString()
                  dispatch(updateCard({ id: taskId, field: 'start', value }))

                  setCurrentDuration({
                    hours: new moment(currentTask.end).diff(
                      new moment(
                        `${moment(currentTask.start).format('YYYY-MM-DD')} ${
                          e.target.value
                        }`
                      ),
                      'hours'
                    ),
                    miniutes:
                      new moment(currentTask.end).diff(
                        new moment(
                          `${moment(currentTask.start).format('YYYY-MM-DD')} ${
                            e.target.value
                          }`
                        ),
                        'minutes'
                      ) % 60
                  })
                }}
              />
              <FormLabel>Duration</FormLabel>
              <div className="flex justify-around">
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
                    dispatch(
                      updateCard({
                        id: taskId,
                        field: 'end',
                        value: m.toDate().toISOString()
                      })
                    )
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
                    dispatch(
                      updateCard({
                        id: taskId,
                        field: 'end',
                        value: m.toDate().toISOString()
                      })
                    )
                  }}
                />
              </div>
              <FormLabel>End Time</FormLabel>
              <Input
                type="time"
                disabled
                value={moment(currentTask.end).format('HH:mm')}
                onChange={(e) => {
                  let value = new Date(
                    `${moment(currentTask.end).format('YYYY-MM-DD')} ${
                      e.target.value
                    }`
                  ).toISOString()
                  dispatch(updateCard({ id: taskId, field: 'end', value }))

                  setCurrentDuration({
                    hours: new moment(currentTask.end).diff(
                      new moment(
                        `${moment(currentTask.start).format('YYYY-MM-DD')} ${
                          e.target.value
                        }`
                      ),
                      'hours'
                    ),
                    miniutes:
                      new moment(currentTask.end).diff(
                        new moment(
                          `${moment(currentTask.start).format('YYYY-MM-DD')} ${
                            e.target.value
                          }`
                        ),
                        'minutes'
                      ) % 60
                  })
                }}
              />

              <FormLabel>Activity Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Activity Title"
                value={currentTask.name}
                onChange={(e) => {
                  dispatch(
                    updateCard({
                      id: taskId,
                      field: 'name',
                      value: e.target.value
                    })
                  )
                }}
              />

              <FormLabel>Activity Description</FormLabel>
              <Textarea
                placeholder="Description"
                value={currentTask.description}
                onChange={(e) => {
                  dispatch(
                    updateCard({
                      id: taskId,
                      field: 'description',
                      value: e.target.value
                    })
                  )
                }}
              />
            </FormControl>
            {currentTask.attributes.map((attr, index) => {
              return <Attribute taskId={taskId} attrId={attr.id} key={index} />
            })}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={(e) => {
                dispatch(deleteCard(taskId))
                toast({
                  title: 'Activity Deleted',
                  status: 'error',
                  duration: 1500,
                  isClosable: true
                }),
                  onClose()
              }}
            >
              Delete
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                toast({
                  title: 'Changes Saved',
                  status: 'success',
                  duration: 1500,
                  isClosable: true
                }),
                  onClose()
              }}
            >
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CardModal
