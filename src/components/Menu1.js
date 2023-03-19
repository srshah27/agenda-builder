import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Button, Text, Image } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons';

const Menu1 = ({workspaces}) => {
    return (
        <Menu color="cyan.500">
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="transparent" color="blue.800" my="1">
                Workspace
            </MenuButton>
            <MenuList >
                <Text mx="2" fontFamily="mono" color="blue.400" fontSize="sm" > Your Workspaces</Text>
                <MenuItem> <Image src="/img/image1.png" h="8" mx="2" borderRadius="3" /> Workspace 1</MenuItem>
                <MenuItem> <Image src="/img/image2.png" h="8" mx="2" borderRadius="3" /> Workspace 2</MenuItem>
            </MenuList>
        </Menu>
    )
}

export default Menu1