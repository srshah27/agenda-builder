import React, { useState } from 'react'
import {
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
  Select,
  Switch
} from '@chakra-ui/react'
import { MultiSelect, useMultiSelect } from 'chakra-multiselect'
import { useDispatch, useSelector } from 'react-redux'
import { modifyCardAttributes } from '@/store/boardSlice'

export const ShowButton = ({ taskID, attrId }) => {
  const dispatch = useDispatch()
  const attribute = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskID)
  ).attributes.find((attr) => attr.id == attrId)
  return (
    <>
      {/* <FormLabel FormLabel > Show </FormLabel> */}
      <Switch
        isChecked={attribute.show}
        onChange={() => {
          dispatch(
            modifyCardAttributes({
              cardId: taskID,
              newAttr: { ...attribute, show: !attribute.show }
            })
          )
        }}
      />
    </>
  )
}

export const TextInput = ({ taskID, attrId }) => {
  const dispatch = useDispatch()
  const attribute = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskID)
  ).attributes.find((attr) => attr.id == attrId)
  // const [value, setValue] = useState(attributes[index].value)
  // const attr = attributes[index]
  return (
    <FormControl mt={4} key={attrId}>
      <div className="flex flex-row">
        <ShowButton taskID={taskID} attrId={attrId} />
        <FormLabel className="ml-5"> {attribute.name}</FormLabel>
      </div>
      <Input
        placeholder={attribute.name}
        value={attribute.value}
        type="text"
        onChange={(e) => {
          dispatch(
            modifyCardAttributes({
              cardId: taskID,
              newAttr: { ...attribute, value: e.target.value }
            })
          )
        }}
      />
    </FormControl>
  )
}
export const MultipleOptionInput = ({ taskID, attrId }) => {
  const dispatch = useDispatch()
  const attribute = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskID)
  ).attributes.find((attr) => attr.id == attrId)
  // const [options, setOption] = useState(attributes[index].options);
  // https://bmartel.github.io/chakra-multiselect/docs/
  // console.log(attribute);
  let { options, onChange } = useMultiSelect({
    value: attribute.value != '' ? JSON.parse(attribute.value) : [],
    options: attribute.options
  })

  return (
    <FormControl mt={4} key={attrId}>
      <div className="flex flex-row">
        <ShowButton taskID={taskID} attrId={attrId} />
        <FormLabel className="ml-5"> {attribute.name}</FormLabel>
      </div>
      <MultiSelect
        options={options}
        value={attribute.value != '' ? JSON.parse(attribute.value) : []}
        label="Choose or create items"
        onChange={(e) => {
          dispatch(
            modifyCardAttributes({
              cardId: taskID,
              newAttr: { ...attribute, value: JSON.stringify(e) }
            })
          )
          // let newAttrs = attributes
          // newAttrs[index].value = JSON.stringify(e)
          // setValue(e)
          // // options.forEach((option, index) => {
          // //   e.forEach(Input => {
          // //     if (option.value === Input) {
          // //     }
          // //   });
          // // })
          // console.log(options)
          // setAttributes(newAttrs)
          // setTask({ ...task, attributes: newAttrs })
        }}
        // create
      />
    </FormControl>
  )
}
