import React from 'react'
import { getSession } from 'next-auth/react'
import TopBar from '@/components/TopBar'
import SideBar from '@/components/SideBar'
import Work from '@/components/Work'
import { ChakraProvider } from '@chakra-ui/react'
const Dashboard = ({ user, asCreator, asCollaborator }) => {
  console.log(user);
  return (
    <ChakraProvider >
      <TopBar />
      <SideBar>
        <Work asCreator={asCreator} asCollaborator={asCollaborator} />
      </SideBar>
    </ChakraProvider>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/login',
      }
    }
  }
  const { uID } = context.params
  if (uID != session.user.uid)
    return {
      redirect: {
        destination: '/u/' + session.user.uid,
      }
    }
  console.log(uID);
  let res = await fetch(`${process.env.BASE_URL}/api/u/${uID}`)
  let data = await res.json()
  console.log(data);
  if (data.user) {
    return {
      props: {
        session,
        user: data.user,
        asCreator: data.asCreator,
        asCollaborator: data.asCollaborator,
      }
    }
  }
  return {
    redirect: {
      destination: '/',
    }
  }
}

export default Dashboard