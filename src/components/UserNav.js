import React from 'react'
import {
  Button,
  Box,
  Spacer,
  HStack,
  Image,
  useColorModeValue
} from '@chakra-ui/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useSession } from 'next-auth/react'
import AvatarMenu from './Avatar/AvatarMenu'
import agendaImage from '../public/svg/agenda.svg'

const UserNav = ({ board }) => {
  const { data: session } = useSession()
  return (
    <HStack
      boxShadow="sm"
      bgColor={useColorModeValue('gray.300', 'gray.700')}
      display="flex"
      height={'60px'}
      pl="4"
      pr="4"
    >
      <Link href={`/u/${session?.user?.uid}`}>
        <Button  size="sm">
          Boards
        </Button>
      </Link>
      <Spacer />
      <Link href="/">
        <Image src={agendaImage} alt="Agenda Logo" />
      </Link>
      <Spacer />
      <AvatarMenu />
    </HStack>
  )
}

UserNav.propTypes = {
  bg: PropTypes.string
}

export default UserNav
