import React, { useEffect } from 'react'
import { HStack, Spacer, Text, useColorModeValue } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import styles from '../styles/SubNav.module.css'

const SubNav = ({ board }) => {

  const [boardName, setboardName] = useState(board.name)

  async function handleBoardName(e) {
    setboardName(e.target.value)
    let res = await fetch(`/api/w/${board.workspaceID}/b/${board.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: e.target.value })
    })
    let data = await res.json()
    console.log(data);
  }
  return (
    <div
      className={`flex bg-opacity-30 bg-slate-50 px-4`}
    >

      <input fontSize="md" p="2" value={boardName} onChange={handleBoardName} className='bg-transparent' />
      <Spacer />
      <div className='my-3'>
        <button className='mr-4'>Timings  </button>
        <button className='mx-4' >Sections</button>
        <button className='mx-4' >Activities</button>
        <button className='mx-4'>Attributes</button>
      </div>
      <Spacer />
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<SettingsIcon />}
          variant="ghost"
          p="4"
        />
        <MenuList>
          <MenuItem textColor={"blackAlpha.300"}>Invite</MenuItem>
          <MenuItem>Archive</MenuItem>
        </MenuList>
      </Menu>
    </div>

  )
}

export default SubNav
