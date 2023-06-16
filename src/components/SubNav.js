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
import { useDisclosure } from '@chakra-ui/react'
import AttributeModal from '@/components/Modals/Board/AttributeModal'

const SubNav = ({ boardData }) => {

  const [boardName, setboardName] = useState(boardData.board.name)
  const { isOpen: isOpenAttributes, onOpen: onOpenAttributes, onClose: onCloseAttributes } = useDisclosure()

  async function handleBoardName(e) {
    setboardName(e.target.value)
    let res = await fetch(`/api/w/${boardData.board.workspaceID}/b/${boardData.board.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: e.target.value })
    })
    let data = await res.json()
    console.log(data);
  }
  return (
    <div
      className={`flex bg-opacity-30 bg-black px-4`}
    >

      <input fontSize="md" color='white' p="2" value={boardName} onChange={handleBoardName} className='bg-transparent text-slate-50' />
      <Spacer />
      <div className='my-3 text-slate-100'>
        <button className='mr-4'>Timings  </button>
        <button className='mx-4' >Sections</button>
        <button className='mx-4'>Activities</button>
        <button className='mx-4' onClick={() => { }}>Attributes</button>
      </div>
      <Spacer />
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<SettingsIcon />}
          variant="ghost"
          p="4"
          color={"whiteAlpha.900"}
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
