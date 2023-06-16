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


export const AttributeInput = ({ attributes, setAttributes, index }) => {
  const [name, setName] = useState(attributes[index].name);
  const [type, setType] = useState(attributes[index].attributeType);
  const [show, setShow] = useState(attributes[index].show);
  const [options, setOptions] = useState(attributes[index].options);

  return (
    <>
      <Switch
        isChecked={show}
        onChange={() => {
          let newAttrs = attributes
          newAttrs[index].show = !newAttrs[index].show
          setAttributes(newAttrs)
          setShow(!show)
        }}
      />
      <Input type='text' value={name} onChange={(e) => {
        let newAttributes = [...attributes];
        newAttributes[index].name = e.target.value;
        setAttributes(newAttributes);
        setName(e.target.value);
      }} />

      <Select value={type} onChange={(e) => {
        let newAttributes = [...attributes];
        newAttributes[index].attributeType = e.target.value;
        setAttributes(newAttributes);
        setType(e.target.value);
      }}>
        <option value="text">Text</option>
        <option value="multi">Multiple Select Option</option>
        <option value="option">Option</option>
      </Select>
      {/* Options if type== multi or option */}

      <Button onClick={(e) => {
        let newAttributes = attributes.filter((attr, i) => i !== index);
        setAttributes(newAttributes);
      }} >Delete
      </Button>
    </>

  )

}


const AttributeModal = ({ boardData, onClose, isOpen, onOpen }) => {
  const [oldAttrs, setOldAttrs] = useState(JSON.parse(JSON.stringify(boardData.board.activityAttributes)));
  const [oldBoard, setOldBoard] = useState(boardData.board)
  const [attributes, setAttributes] = useState(boardData.board.activityAttributes)
  // console.log(attributes);
  console.log(oldBoard);
  const UpdateAttributes = async (body) => {
    
    let resAdd, resDel, resMod;
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
      console.log(body.deletedAttributes);
      resDel = await fetch(
        `/api/w/${oldBoard.workspaceId}/b/${oldBoard.id}/attr`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ attributes: body.deletedAttributes, modify: false })
        }
      )

    }
    if (body.modifiedAttributes.length > 0) {
      resDel = await fetch(
        `/api/w/${oldBoard.workspaceId}/b/${oldBoard.id}/attr`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ attributes: body.modifiedAttributes, modify: true })
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

    for (let i = 0; i < attributes.length; i++) {
      const attr1 = attributes[i];
      for (let j = i + 1; j < attributes.length; j++) {
        const attr2 = attributes[j];
        if (attr1.name === attr2.name) {
          alert("Attribute names should be unique");
          return;
        }
      }
    }
    let addedAttributes = attributes.filter((attr) => attr._id === undefined);
    let deletedAttributes = oldAttrs.filter((attr) => {
      for (let i = 0; i < attributes.length; i++) {
        const attr1 = attributes[i];
        if (attr._id === attr1._id) {
          return false;
        }
      }
      return true;
    });
    let modifiedAttributes = attributes.filter((attr) => {
      let oldAttr = oldAttrs.find((oldAttr) => oldAttr._id === attr._id);
      if (oldAttr === undefined) return false;
      if (JSON.stringify(oldAttr) == JSON.stringify(attr)) return false;
      return true
    });
    // console.log(addedAttributes);
    // console.log(deletedAttributes);
    // console.log(modifiedAttributes);


    let body = {
      addedAttributes: addedAttributes,
      modifiedAttributes: modifiedAttributes,
      deletedAttributes: deletedAttributes
    }
    let res = await UpdateAttributes(body)
    console.log(res)
    // onClose();
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
                return (
                  <AttributeInput attributes={attributes} setAttributes={setAttributes} index={index} key={index} />
                )
              })}

              <Button onClick={(e) => {
                let newAttributes = [...attributes, {
                  name: 'New Attribute',
                  attributeType: 'text',
                  value: '',
                  options: [],
                  show: false
                }]
                setAttributes(newAttributes);
              }}>Add New Attribute</Button>
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
