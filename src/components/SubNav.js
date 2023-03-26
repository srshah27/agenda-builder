import React from 'react'
import { HStack, Spacer, Text, useColorModeValue } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'

const SubNav = () => {
    return (
        <HStack boxShadow="sm" bgColor = {useColorModeValue('gray.300', 'gray.500')}  display="flex">
            <Text fontSize="md" p="2">Board Name</Text>
            <Spacer />
            <Menu >
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<SettingsIcon />}
                    variant='ghost'
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