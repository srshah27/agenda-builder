import React from 'react'
import { MultipleOption, Text, Option } from '@/components/Attributes/Types'
import { useSelector } from 'react-redux'
const Attribute = ({ taskId, index }) => {
  const card = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskId)
  )
  const attribute = card?.attributes[index]
  if (attribute && !attribute.show) return <></>
  switch (attribute?.attributeType) {
    case 'text':
      return <Text taskId={taskId} index={index} />
    case 'multi':
      return <MultipleOption taskId={taskId} index={index} />
    case 'option':
      return <Option taskId={taskId} index={index} />
    default:
      return <>Error</>
  }

  return <div>Attribute</div>
}

export default Attribute
