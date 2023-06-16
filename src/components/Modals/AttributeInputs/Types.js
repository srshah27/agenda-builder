import React, { useState } from 'react'
import {
  FormControl, FormLabel,
  Input, Textarea,
  useDisclosure, Select
} from '@chakra-ui/react'
import { MultiSelect, useMultiSelect } from 'chakra-multiselect'

export const TextInput = ({ task, attributes, index, setAttributes }) => {
  const [value, setValue] = useState(attributes[index].value);
  const attr = attributes[index];
  return (
    <FormControl mt={4} key={index} >
      <FormLabel FormLabel > {attr.name}</FormLabel>
      <Input placeholder={attr.name} value={value} type='text' onChange={(e) => {
        let newAttrs = attributes;
        newAttrs[index].value = e.target.value;
        setValue(e.target.value);
        setAttributes(newAttrs);
      }} />
    </FormControl >
  )
}
export const MultipleOptionInput = ({ task, attributes, index, setAttributes }) => {
  const [value, setValue] = useState(JSON.parse(attributes[index].value));
  // const [options, setOption] = useState(attributes[index].options);
  // https://bmartel.github.io/chakra-multiselect/docs/
  let { options, onChange } = useMultiSelect({
    value: JSON.parse(attributes[index].value),
    options: attributes[index].options,
  })

  const attr = attributes[index];
  return (
    <FormControl mt={4} key={index} >
      <FormLabel FormLabel > {attr.name}</FormLabel>
      <MultiSelect
        options={options}
        value={value}
        label='Choose or create items'
        onChange={(e) => {
          let newAttrs = attributes;
          newAttrs[index].value = JSON.stringify(e);
          setValue(e);
          e.forEach(Input => {
            if(!options.includes(Input)) {
              options.push(Input);
            }
          });
          console.log(options);
          setAttributes(newAttrs);
        }}
        create
      />
    </FormControl >
  )
}