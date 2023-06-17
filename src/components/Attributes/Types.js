import React, { useState } from 'react'

export const Text = ({ attr, task }) => {
  return (
    <div className="flex flex-col">
      <span className="p-auto m-auto text-xl">{attr.value}</span>
      <span className="p-auto  m-auto text-sm">{attr.name}</span>
    </div>
  )
}
export const Option = ({ attr, task }) => {
  return (
    <div className="flex flex-col">
      <span className="p-auto m-auto text-xl">{attr.value}</span>
      <span className="p-auto  m-auto text-sm">{attr.name}</span>
    </div>
  )
}

export const MultipleOption = ({ attr, task }) => {
  let values = attr.value? JSON.parse(attr.value) : []
  let options = attr.options
  return (
    <div className="flex flex-col">
      <div className="flex flex-row">
        {values.map((value, index) => {
          return (
            <div key={index} className="mx-5 rounded-md bg-green-300 p-2">
              <span className="">{value}</span>
            </div>
          )
        })}
        {/* <button className='bg-green-300 rounded-3xl p-2 mx-5' onClick={()=>{console.log('ohh yeah');}}>+</button> */}
      </div>
      <span className="p-auto m-auto">{attr.name}</span>
    </div>
  )
}
