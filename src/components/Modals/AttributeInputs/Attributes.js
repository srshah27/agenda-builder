import React from 'react'
import {
  MultipleOptionInput,
  TextInput,
  OptionInput
} from '@/components/Modals/AttributeInputs/Types'
import { useSelector } from 'react-redux'
const Attribute = ({ taskId, attrId }) => {
  const attribute = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskId)
  ).attributes.find((attr) => attr.id === attrId)
  switch (attribute.attributeType) {
    case 'text':
      return <TextInput taskID={taskId} attrId={attrId} />
    case 'multi':
      return <MultipleOptionInput taskID={taskId} attrId={attrId} />
    // case 'option':
    //   return (<OptionInput task={task} attributes={attributes} attrId={ attrId } setAttributes={setAttributes} />)
    default:
      return <>Error</>
  }

  return <div>Attribute</div>
}

export default Attribute
