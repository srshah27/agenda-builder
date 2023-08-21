import {
  Menu,
  IconButton,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider
} from '@chakra-ui/react'

import Avatar from './Avatar'
import { useSession, signOut } from 'next-auth/react'

const AvatarMenu = () => {
  const { data: session } = useSession()
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        variant="ghost"
        pr="4"
        _hover={{ bg: 'transparent' }}
      >
        <Avatar url={session?.user.image} w={30} h={30} />
      </MenuButton>
      <MenuList>
        <MenuGroup title="Profile">
          <MenuItem>My Account</MenuItem>
                  <MenuItem onClick={() => signOut({ callbackUrl: '/' })}>Sign Out </MenuItem>
        </MenuGroup>
        <MenuDivider />
        <MenuGroup title="Help">
          <MenuItem>Docs</MenuItem>
          <MenuItem>FAQ</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default AvatarMenu
