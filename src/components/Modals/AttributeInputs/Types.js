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

export const ShowButton = ({ taskID, index }) => {
  const attribute = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskID)
  ).attributes[index]
  return (
    <>
      {/* <FormLabel FormLabel > Show </FormLabel> */}
      <Switch
        isChecked={attribute.show}
        onChange={() => {
          // let newAttrs = attributes
          // newAttrs[index].show = !newAttrs[index].show
          // setAttributes(newAttrs)
          // setShow(!Show)
        }}
      />
    </>
  )
}

export const TextInput = ({ taskID, index }) => {
  const attribute = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskID)
  ).attributes[index]
  // const [value, setValue] = useState(attributes[index].value)
  // const attr = attributes[index]
  return (
    <FormControl mt={4} key={index}>
      <div className="flex flex-row">
        <ShowButton taskID={taskID} index={index} />
        <FormLabel className="ml-5"> {attr.name}</FormLabel>
      </div>
      <Input
        placeholder={attribute.name}
        value={attribute.value}
        type="text"
        onChange={(e) => {
          // let newAttrs = attributes
          // newAttrs[index].value = e.target.value
          // setValue(e.target.value)
          // setAttributes(newAttrs)
          // setTask({ ...task, attributes: newAttrs })
        }}
      />
    </FormControl>
  )
}
export const MultipleOptionInput = ({ taskID, index }) => {
  const attribute = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskID)
  ).attributes[index]
  // const [options, setOption] = useState(attributes[index].options);
  // https://bmartel.github.io/chakra-multiselect/docs/
  let { options, onChange } = useMultiSelect({
    value: JSON.parse(attribute.value),
    options: attribute.options
  })

  return (
    <FormControl mt={4} key={index}>
      <div className="flex flex-row">
        <ShowButton taskID={taskID} index={index} />
        <FormLabel className="ml-5"> {attribute.name}</FormLabel>
      </div>
      <MultiSelect
        options={options}
        value={attribute.value}
        label="Choose or create items"
        onChange={(e) => {
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
