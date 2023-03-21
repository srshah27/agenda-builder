import React from 'react'
import { getSession } from 'next-auth/react'
const Board = () => {
  return (
    <div>Board</div>
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
  const { wID, bID } = context.params

  let res = await fetch(`${process.env.BASE_URL}/api/w/${wID}`)
  let { workspace } = await res.json()
  if(workspace === null || workspace.collaborators.findIndex((collaborator) => collaborator.user === session.user.uid) === -1) 
    return {
      redirect: {
        destination: `/u/${session.user.uid}/`,
      }
    }
  res = await fetch(`${process.env.BASE_URL}/api/w/${wID}/b/${bID}`)
  let { board } = await res.json()
  res = await fetch(`${process.env.BASE_URL}/api/w/${wID}/b/${bID}/c`)
  let { cards } = await res.json()
  res = await fetch(`${process.env.BASE_URL}/api/w/${wID}/b/${bID}/l`)
  let { lists } = await res.json()
    return {
      props: {
        workspace: workspace,
        board,
        cards,
        lists,
        user: session.user
      }
    }
  
}
export default Board