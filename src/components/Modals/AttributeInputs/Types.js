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

export const ShowButton = ({ attr, index, attributes, setAttributes }) => {
  const [Show, setShow] = useState(attr.show)
  return (
    <>
      {/* <FormLabel FormLabel > Show </FormLabel> */}
      <Switch
        isChecked={Show}
        onChange={() => {
          let newAttrs = attributes
          newAttrs[index].show = !newAttrs[index].show
          setAttributes(newAttrs)
          setShow(!Show)
        }}
      />
    </>
  )
}

export const TextInput = ({ task, attributes, index, setAttributes, setTask}) => {
  const [value, setValue] = useState(attributes[index].value)
  const attr = attributes[index]
  return (
    <FormControl mt={4} key={index}>
      <div className="flex flex-row">
        <ShowButton
          attr={attr}
          attributes={attributes}
          index={index}
          setAttributes={setAttributes}
        />
        <FormLabel className="ml-5">
          {' '}
          {attr.name}
        </FormLabel>
      </div>
      <Input
        placeholder={attr.name}
        value={value}
        type="text"
        onChange={e => {
          let newAttrs = attributes
          newAttrs[index].value = e.target.value
          setValue(e.target.value)
          setAttributes(newAttrs)
          setTask({ ...task, attributes: newAttrs })
        }}
      />
    </FormControl>
  )
}
export const MultipleOptionInput = ({
  task,
  attributes,
  index,
  setAttributes,
  setTask
}) => {
  const [value, setValue] = useState(attributes[index].value ? JSON.parse(attributes[index].value) : [])
  // const [options, setOption] = useState(attributes[index].options);
  // https://bmartel.github.io/chakra-multiselect/docs/
  let { options, onChange } = useMultiSelect({
    value: value,
    options: attributes[index].options
  })

  const attr = attributes[index]
  return (
    <FormControl mt={4} key={index}>
      <div className="flex flex-row">
        <ShowButton
          attr={attr}
          attributes={attributes}
          index={index}
          setAttributes={setAttributes}
        />
        <FormLabel  className="ml-5">
          {' '}
          {attr.name}
        </FormLabel>
      </div>
      <MultiSelect
        options={options}
        value={value}
        label="Choose or create items"
        onChange={e => {
          let newAttrs = attributes
          newAttrs[index].value = JSON.stringify(e)
          setValue(e)
          // options.forEach((option, index) => {
          //   e.forEach(Input => {
          //     if (option.value === Input) {
                
          //     }
          //   });
          // })
          console.log(options)
          setAttributes(newAttrs)
          setTask({ ...task, attributes: newAttrs })
        }}
        // create
      />
    </FormControl>
  )
}
