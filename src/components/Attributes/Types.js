import React, { useState } from 'react'

export const Text = ({ attr, task }) => {
  return (
    <div className="flex flex-col">
      <span className="text-xl m-auto p-auto">{attr.value}</span>
      <span className="text-sm  m-auto p-auto">{attr.name}</span>
    </div>
  )
}
export const Option = ({ attr, task }) => {
  return (
    <div className="flex flex-col">
      <span className="text-xl m-auto p-auto">{attr.value}</span>
      <span className="text-sm  m-auto p-auto">{attr.name}</span>
    </div>
  )
}

export const MultipleOption = ({ attr, task }) => {
  let values = JSON.parse(attr.value)
  let options = attr.options
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        {values.map((value, index) => {
          return (
            <div key={index} className="bg-green-300 rounded-md p-2 mx-5">
              <span className="">{value}</span>
            </div>
          )
        })}
        {/* <button className='bg-green-300 rounded-3xl p-2 mx-5' onClick={()=>{console.log('ohh yeah');}}>+</button> */}
      </div>
      <span className="m-auto p-auto">{attr.name}</span>
    </div>
  )
}
