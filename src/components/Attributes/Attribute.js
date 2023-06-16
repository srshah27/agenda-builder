import React from 'react'
import { MultipleOption, Text, Option } from '@/components/Attributes/Types'
const Attribute = ({ attr, task }) => {
  // console.log("hi");
  if(!attr.show) return (<></>)
  switch (attr.attributeType) {
    case 'text':
      return (<Text attr={ attr } task={task}/>)
    case 'multi':
      return (<MultipleOption attr={ attr } task={task}/>)
    case 'option':
      return (<Option attr={ attr } task={task}/>)
    default:
      return (<>Error</>)
  }
  
  
  return (
    <div>Attribute</div>
  )
}

export default Attribute