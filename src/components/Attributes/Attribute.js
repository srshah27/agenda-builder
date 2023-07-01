import React from 'react'
import { MultipleOption, Text, Option } from '@/components/Attributes/Types'
import { useSelector } from 'react-redux'
const Attribute = ({ taskId, attrId }) => {
  const card = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskId)
  )
  const attribute = card.attributes.find((attr) => attr.id === attrId)
  if (attribute && !attribute.show) return <></>
  switch (attribute?.attributeType) {
    case 'text':
      return <Text taskId={taskId} attrId={attrId} />
    case 'multi':
      return <MultipleOption taskId={taskId} attrId={attrId} />
    case 'option':
      return <Option taskId={taskId} attrId={attrId} />
    default:
      return <>Error</>
  }

  return <div>Attribute</div>
}

export default Attribute
