import React, { useState } from 'react'
import { getSession } from 'next-auth/react'
import Board from '@/components/Board/Board'
import UserNav from '@/components/UserNav'
import SubNav from '@/components/SubNav'

const BoardPage = ({ board, cards, lists }) => {
  const [boardData, setBoardData] = useState({
    board,
    cards,
    lists: lists.sort((a, b) => a.sequence - b.sequence)
  })
  return (
    <div>
      <UserNav board={board} />
      <SubNav boardData={boardData} setBoardData={setBoardData} />
      <Board boardData={boardData} setBoardData={setBoardData} />
    </div>
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
  const { wID, bID } = context.params

  let res = await fetch(`${process.env.BASE_URL}/api/w/${wID}`) // get workspace
  let { workspace } = await res.json()
  if (
    workspace === null ||
    workspace.collaborators.findIndex(
      collaborator => collaborator.user === session.user.uid
    ) === -1
  )
    return {
      redirect: {
        destination: `/u/${session.user.uid}/`
      }
    }
  res = await fetch(`${process.env.BASE_URL}/api/w/${wID}/b/${bID}`) // fetch the current board
  let { board } = await res.json()
  res = await fetch(`${process.env.BASE_URL}/api/w/${wID}/b/${bID}/l`) // fetch all lists in current board
  let { lists } = await res.json()
  res = await fetch(`${process.env.BASE_URL}/api/w/${wID}/b/${bID}/c`) // fetch all cards in current board
  let { cards } = await res.json()
  return {
    props: {
      board,
      cards,
      lists
    }
  }
}
export default BoardPage
