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

const SubNav = ({ board }) => {
  
  const [boardName, setboardName] = useState(board.name)

  async function handleBoardName(e){
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
    <HStack
      boxShadow="sm"
      bgColor={useColorModeValue('gray.200', 'gray.500')}
      display="flex"
      height="70px"
    >

      <input fontSize="md" p="2" value={boardName} onChange={handleBoardName} className='bg-transparent'/>
      <button>Timings</button>
      <button>Sections</button>
      <button>Activities</button>
      <button>Attributes</button>
      <Spacer />
      button
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<SettingsIcon />}
          variant="ghost"
          p="4"
        />
        <MenuList>
          <MenuItem>Invite</MenuItem>
          <MenuItem>Archive</MenuItem>
        </MenuList>
      </Menu>
    </HStack>

  )
}

export default SubNav
