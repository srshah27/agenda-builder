import React, { useState, useEffect } from 'react'
import { getSession, useSession } from 'next-auth/react'
import TopBar from '@/components/TopBar'
import SideBar from '@/components/SideBar'
import Work from '@/components/Workspace'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
const Dashboard = ({ Creator, Collaborator }) => {
  const router = useRouter()
  const { uID } = router.query
  const [asCreator, setAsCreator] = useState(Creator)
  const [asCollaborator, setAsCollaborator] = useState(Collaborator)
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    fetch(`/api/u/${uID}`)
      .then((res) => res.json())
      .then((data) => {
        setAsCreator(data.asCreator)
        setAsCollaborator(data.asCollaborator)
      })
  }, [refreshKey, uID])

  return (
    <>
      <TopBar asCreator={asCreator} asCollaborator={asCollaborator} />
      <SideBar updateRefresh={() => setRefreshKey((prev) => prev + 1)}>
        <Work asCreator={asCreator} asCollaborator={asCollaborator} />
      </SideBar>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session) {
    return {
      redirect: {
        destination: '/login'
      }
    }
  }
  const { uID } = context.params
  if (uID != session.user.uid)
    return {
      redirect: {
        destination: '/u/' + session.user.user_id
      }
    }
  let res = await fetch(`${process.env.BASE_URL}/api/u/${uID}`)
  let data = await res.json()
  if (data.user) {
    return {
      props: {
        session,
        user: data.user,
        Creator: data.asCreator,
        Collaborator: data.asCollaborator
      }
    }
  }
  return {
    redirect: {
      destination: '/'
    }
  }
}

export default Dashboard
