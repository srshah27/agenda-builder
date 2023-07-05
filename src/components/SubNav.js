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
import { useDispatch, useSelector } from 'react-redux'
import { updateBoard } from '@/store/boardSlice'
const SubNav = ({ boardData, setBoardData }) => {
  const board = useSelector((state) => state.board)
  const {
    isOpen: isOpenAttributes,
    onOpen: onOpenAttributes,
    onClose: onCloseAttributes
  } = useDisclosure()

  const dispatch = useDispatch()

  if (!boardData.board) return null
  return (
    <div className={`flex bg-black bg-opacity-30 px-4`}>
      <input
        fontSize="md"
        color="white"
        value={board.name == undefined ? '' : board.name}
        onChange={(e) => {
          dispatch(updateBoard({ field: 'name', value: e.target.value }))
        }}
        className="bg-transparent text-slate-50"
      />
      <Spacer />
      <div className="my-3 text-slate-100">
        <button className="mr-4">Timings </button>
        <button className="mx-4">Sections</button>
        <button className="mx-4">Activities</button>
        <button className="mx-4" onClick={onOpenAttributes}>
          Attributes
        </button>
      </div>
      <Spacer />
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<SettingsIcon />}
          variant="ghost"
          p="4"
          color={'whiteAlpha.900'}
        />
        <MenuList>
          <MenuItem textColor={'blackAlpha.300'}>Invite</MenuItem>
          <MenuItem>Archive</MenuItem>
        </MenuList>
      </Menu>
      <AttributeModal
        onOpen={isOpenAttributes}
        onClose={onCloseAttributes}
        isOpen={isOpenAttributes}
      />
    </div>
  )
}

export default SubNav
