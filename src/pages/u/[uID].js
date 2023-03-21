import React, {useState, useEffect} from 'react'
import { getSession } from 'next-auth/react'
import TopBar from '@/components/TopBar'
import SideBar from '@/components/SideBar'
import Work from '@/components/Work'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from 'next/router'
const Dashboard = ({ user }) => {
  const router = useRouter()
  const { uID } = router.query
  const [asCreator, setAsCreator] = useState([])
  const [asCollaborator, setAsCollaborator] = useState([])
  const [refreshKey, setRefreshKey] = useState(0);
  
  useEffect(() => {
   
    fetch(`/api/u/${uID}`).then((res) => res.json()).then((data) => { setAsCreator(data.asCreator); setAsCollaborator(data.asCollaborator); console.log("Updated"); })
  }, [refreshKey, uID]);
  
  
  console.log(asCreator);
  return (
    <ChakraProvider >
      <TopBar />
      <SideBar updateRefresh={ () => setRefreshKey((prev) => prev + 1) }>
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