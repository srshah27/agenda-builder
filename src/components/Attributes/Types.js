import React, { useState } from 'react'

export const Text = ({ attr, task }) => {
  return (
    <div className="innerCard flex-col">
      <span className="p-auto m-auto text-xl">{attr.value}</span>
      <span className="p-auto  m-auto text-sm">{attr.name}</span>
    </div>
  )
}
export const Option = ({ attr, task }) => {
  return (
    <div className="innerCard flex-col">
      <span className="p-auto m-auto text-xl">{attr.value}</span>
      <span className="p-auto  m-auto text-sm">{attr.name}</span>
    </div>
  )
}

export const MultipleOption = ({ attr, task }) => {
  let values = attr.value ? JSON.parse(attr.value) : []
  let options = attr.options
  return (
    <div className="innerCard flex-col">
      <span className="text-xl">{attr.name}</span>
      <div className="flex flex-wrap justify-evenly">
        {values.map((value, index) => {
          return (

            <span key={index} className='m-1'>
              {value}
              <br />
            </span>


          )
        })}
      </div>
    </div>
  )
}
