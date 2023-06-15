import {
  Spacer,
} from '@chakra-ui/react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { useSession } from 'next-auth/react'
import AvatarMenu from './Avatar/AvatarMenu'
import Image from 'next/image'
import agendaImage from '../../public/svg/agenda.svg'

const UserNav = ({ board }) => {
  const { data: session } = useSession()
  return (
    <div
      className='bg-opacity-60 bg-slate-50 h-12 px-2 flex items-center'
    >
      <Link href={`/u/${session?.user?.uid}`}>
        <button className='btnSmall'>
          Boards
        </button>
      </Link>
      <Spacer />
      <Link href="/">
        <Image src={agendaImage} alt="Agenda Logo" className='w-44' />
      </Link>
      <Spacer />
      <AvatarMenu />
    </div>
  )
}

UserNav.propTypes = {
  bg: PropTypes.string
}

export default UserNav
