import { getSession } from 'next-auth/react'

export default function Home() {
  return <h1>Redirecting...</h1>
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (session) {
    return {
      redirect: {
        destination: `/u/${session.user.uid}`,
        permanent: false // can go back to login page
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
