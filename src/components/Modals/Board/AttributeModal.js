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
  Select,
  Textarea,
  Switch,
  useDisclosure
} from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { MultiSelect, useMultiSelect } from 'chakra-multiselect'
import { useDispatch, useSelector } from 'react-redux'

export const AttributeInput = ({ index }) => {
  const attributes = useSelector(
    (state) => state.board.activityAttributes[index]
  )

  return (
    <>
      <Switch
        isChecked={attributes.show}
        onChange={() => {
          // let newAttrs = attributes
          // newAttrs[index].show = !newAttrs[index].show
          // setAttributes(newAttrs)
          // setShow(!show)
        }}
      />
      <Input
        type="text"
        value={attributes.name}
        placeholder="Attribute Name"
        onChange={(e) => {
          // let newAttributes = [...attributes]
          // newAttributes[index].name = e.target.value
          // setAttributes(newAttributes)
          // setName(e.target.value)
        }}
      />

      <Select
        value={attributes.type}
        onChange={(e) => {
          // let newAttributes = [...attributes]
          // newAttributes[index].attributeType = e.target.value
          // setAttributes(newAttributes)
          // setType(e.target.value)
        }}
      >
        <option value="text">Text</option>
        <option value="multi">Multiple Select Option</option>
        <option value="option">Option</option>
      </Select>
      {/* Options if type== multi or option */}
      {attributes.type === 'multi' || attributes.type === 'option' ? (
        <span>
          <MultiSelect
            // options={[]}
            value={attributes.options}
            label="Choose or create items"
            onChange={(e) => {
              // let newAttrs = attributes
              // newAttrs[index].options = e
              // setOptions(e)
              // setAttributes(newAttrs)
              // console.log(e)
            }}
            create
          />
        </span>
      ) : (
        <></>
      )}

      <Button
        onClick={(e) => {
          // let newAttributes = attributes.filter((attr, i) => i !== index)
          // setAttributes(newAttributes)
        }}
      >
        Delete
      </Button>
    </>
  )
}

const AttributeModal = ({ onClose, isOpen, onOpen }) => {
  // const [oldAttrs, setOldAttrs] = useState(JSON.parse(JSON.stringify(boardData.board.activityAttributes)));
  // const [oldBoard, setOldBoard] = useState(boardData.board)
  // const [attributes, setAttributes] = useState(boardData.board.activityAttributes)
  // console.log(attributes);
  // console.log(oldBoard);
  const attributes = useSelector((state) => state.board.activityAttributes)

  const updateBoardData = async () => {
    let res
    res = await fetch(`/api/w/${oldBoard.workspaceId}/b/${oldBoard.id}`)
    let { board } = await res.json()
    res = await fetch(`/api/w/${oldBoard.workspaceId}/b/${oldBoard.id}/c`)
    let { cards } = await res.json()
    res = await fetch(`/api/w/${oldBoard.workspaceId}/b/${oldBoard.id}/l`)
    let { lists } = await res.json()

    // setBoardData({
    //   board,
    //   cards,
    //   lists: lists.sort((a, b) => a.sequence - b.sequence)
    // })
    // setOldBoard(board)
    // setAttributes(board.activityAttributes)
  }

  const UpdateAttributes = async (body) => {
    let resAdd, resDel, resMod
    if (body.addedAttributes.length > 0) {
      resAdd = await fetch(
        `/api/w/${oldBoard.workspaceId}/b/${oldBoard.id}/attr`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ attributes: body.addedAttributes })
        }
      )
    }
    if (body.deletedAttributes.length > 0) {
      console.log(body.deletedAttributes)
      resDel = await fetch(
        `/api/w/${oldBoard.workspaceId}/b/${oldBoard.id}/attr`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            attributes: body.deletedAttributes,
            modify: false
          })
        }
      )
    }
    if (body.modifiedAttributes.length > 0) {
      resMod = await fetch(
        `/api/w/${oldBoard.workspaceId}/b/${oldBoard.id}/attr`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            attributes: body.modifiedAttributes,
            modify: true
          })
        }
      )
    }

    let data = {
      addedAttributes: resAdd ? await resAdd.json() : [],
      deletedAttributes: resDel ? await resDel.json() : [],
      modifiedAttributes: resMod ? await resMod.json() : []
    }

    return data
  }

  const handleSubmit = async () => {
    // for (let i = 0; i < attributes.length; i++) {
    //   const attr1 = attributes[i]
    //   for (let j = i + 1; j < attributes.length; j++) {
    //     const attr2 = attributes[j]
    //     if (attr1.name === attr2.name) {
    //       alert('Attribute names should be unique')
    //       return
    //     }
    //   }
    // }

    let addedAttributes = attributes.filter((attr) => attr._id === undefined)
    let deletedAttributes = oldAttrs.filter((attr) => {
      for (let i = 0; i < attributes.length; i++) {
        const attr1 = attributes[i]
        if (attr.id === attr1.id) {
          return false
        }
      }
      return true
    })
    let modifiedAttributes = attributes.filter((attr) => {
      let oldAttr = oldAttrs.find((oldAttr) => oldAttr.id === attr.id)
      if (oldAttr === undefined) return false
      if (JSON.stringify(oldAttr) == JSON.stringify(attr)) return false
      return true
    })
    console.log(addedAttributes.length)
    console.log(deletedAttributes.length)
    console.log(modifiedAttributes.length)

    let body = {
      addedAttributes: addedAttributes,
      modifiedAttributes: modifiedAttributes,
      deletedAttributes: deletedAttributes
    }
    console.log(modifiedAttributes)
    let res = await UpdateAttributes(body)
    console.log(res)
    // onClose();

    updateBoardData()
  }
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
          <ModalHeader>Edit Board Attributes</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {/* Board Details */}
            <FormControl>
              <FormLabel>Board Attributes</FormLabel>
              {attributes.map((attribute, index) => {
                return <AttributeInput index={index} key={index} />
              })}

              <Button
                onClick={(e) => {
                  let newAttributes = [
                    ...attributes,
                    {
                      id: nanoid(),
                      name: '',
                      attributeType: 'text',
                      value: '',
                      options: [],
                      show: false
                    }
                  ]
                  setAttributes(newAttributes)
                }}
              >
                Add New Attribute
              </Button>
            </FormControl>
          </ModalBody>
          <ModalFooter>
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

export default AttributeModal
