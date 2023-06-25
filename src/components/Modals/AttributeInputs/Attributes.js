import React from 'react'
import {
  MultipleOptionInput,
  TextInput,
  OptionInput
} from '@/components/Modals/AttributeInputs/Types'
const Attribute = ({ taskId, index }) => {
  const attributes = useSelector(state => state.cards.cards.find(card => card.id === taskId)).attributes
  switch (attributes[index].attributeType) {
    case 'text':
      return (
        <TextInput
          taskID={taskId}
          index={index}
        />
      )
    case 'multi':
      return (
        <MultipleOptionInput
          taskID={taskId}
          index={index}
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
