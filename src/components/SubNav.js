import React from 'react'
import { HStack, Spacer, Text } from '@chakra-ui/react'
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'

const SubNav = () => {
    return (
        <HStack boxShadow="sm" bg="rgba(0,0,0,0.1)" display="flex">
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