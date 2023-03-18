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
  let res = await fetch(`/api/u/${uID}`)
  let data = await res.json()
  if(res.ok){
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