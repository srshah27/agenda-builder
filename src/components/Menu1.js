import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button, Text, Image } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';

const Menu1 = ({ workspaces }) => {
    return (
        <Menu color="cyan.500">
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="transparent" color="blue.800" my="1">
                Workspace
            </MenuButton>
            <MenuList >
                <Text mx="2" fontFamily="mono" color="blue.400" fontSize="sm" > Your Workspaces</Text>
                {workspaces.map((workspace) => (
                    <MenuItem> <Image src="/img/image1.png" h="8" mx="2" borderRadius="3" /> {workspace.name}</MenuItem>
                    )
                )}
            </MenuList>
        </Menu>
    )
}

export default Menu1