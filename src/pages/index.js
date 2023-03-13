import Link from 'next/link'
import { useSession, getSession, signOut } from 'next-auth/react'

export default function Home({ sess }) {
  const { data: session, status } = useSession()
  console.log(sess);
  return (
    <>
      <div className="flex justify-center h-screen">
        <h1 className="my-auto font-semibold">Agenda Builder</h1>
        {session ? <button onClick={()=>signOut()} className="my-auto font-semibold">Sign Out</button> : <Link href="/login" className="my-auto font-semibold">Login</Link>}

        {/* <button className="btn btn-primary">Button</button> */}
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  let session = await getSession(context)
  return {
    props: {
      sess: session
    }
  }
}

