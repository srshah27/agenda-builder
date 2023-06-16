import React from 'react'
import {
  MultipleOptionInput,
  TextInput,
  OptionInput
} from '@/components/Modals/AttributeInputs/Types'
const Attribute = ({ task, attributes, index, setAttributes }) => {
  switch (attributes[index].attributeType) {
    case 'text':
      return (
        <TextInput
          task={task}
          attributes={attributes}
          index={index}
          setAttributes={setAttributes}
        />
      )
    case 'multi':
      return (
        <MultipleOptionInput
          task={task}
          attributes={attributes}
          index={index}
          setAttributes={setAttributes}
        />
      )
    // case 'option':
    //   return (<OptionInput task={task} attributes={attributes} index={ index } setAttributes={setAttributes} />)
    default:
      return <>Error</>
  }

  return <div>Attribute</div>
}

export default Attribute
