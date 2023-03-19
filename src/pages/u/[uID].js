import React from 'react'
import { getSession } from 'next-auth/react'
const Dashboard = () => {
  return (
    <div>Dashboard</div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if(!session){
    return {
      redirect :{
        destination: '/login',
      }
    }
  }
  const { uID } = context.params
  if(uID != session.user.uid)
    return {
      redirect: {
        destination: '/u/'+session.user.uid,
      }
    }
  console.log(uID);
  let res = await fetch(`${process.env.BASE_URL}/api/u/${uID}`)
  let data = await res.json()
  if(data.user){
    return {
      props: {
        session,
        user: data.user
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