import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const Text = ({ taskId, index }) => {
  const attribute = useSelector((state) =>
    state.cards.cards.find((card) => card.id === taskId)
  ).attributes[index]
  return (
    <div className="innerCard flex-col">
      <span className="p-auto m-auto text-xl">{attribute.value}</span>
      <span className="p-auto  m-auto text-sm">{attribute.name}</span>
    </div>
  )
}
export const Option = ({ taskId, index }) => {
  const attribute = useSelector((state) =>
    state.cards.cards.find((card) => card.id === taskId)
  ).attributes[index]
  return (
    <div className="innerCard flex-col">
      <span className="p-auto m-auto text-xl">{attribute.value}</span>
      <span className="p-auto  m-auto text-sm">{attribute.name}</span>
    </div>
  )
}

export const MultipleOption = ({ taskId, index }) => {
  const attribute = useSelector((state) =>
    state.cards.cards.find((card) => card.id === taskId)
  ).attributes[index]
  let values = attribute.value ? JSON.parse(attribute.value) : []
  let options = attribute.options
  return (
    <div className="innerCard flex-col">
      <span className="text-xl">{attribute.name}</span>
      <div className="flex flex-wrap justify-evenly">
        {values.map((value, index) => {
          return (
            <span key={index} className="m-1">
              {value}
              <br />
            </span>
          )
        })}
      </div>
    </div>
  )
}
