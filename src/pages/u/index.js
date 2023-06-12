
import { getSession } from 'next-auth/react'

export default function Home() {
  return (<>Redirecting...</>)
}


export  async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    console.log(session.user.uid);
    return {
      redirect: {
        destination: `/u/${session.user.uid}`,
        permanent: false
      }
    }
  } else {
    return {
      redirect: {
        destination: `/login`,
        permanent: false
      }
    }
  }
}
