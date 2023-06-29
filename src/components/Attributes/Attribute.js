import React from 'react'
import { MultipleOption, Text, Option } from '@/components/Attributes/Types'
const Attribute = ({ taskId, index }) => {
  const attribute = useSelector((state) =>
    state.board.cards.find((card) => card.id === taskId)
  ).attributes[index]
  if (!attribute.show) return <></>
  switch (attribute.attributeType) {
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
