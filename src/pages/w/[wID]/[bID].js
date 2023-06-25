import React, { useState, useEffect } from 'react'
import { getSession } from 'next-auth/react'
import Board from '@/components/Board/Board'
import UserNav from '@/components/UserNav'
import SubNav from '@/components/SubNav'
import { useDispatch, useSelector } from "react-redux"
import { initalizeBoard } from '@/store/boardSlice'
import { initalizeLists } from '@/store/listsSlice'
import { initalizeCards } from '@/store/cardsSlice'

const BoardPage = (props) => {
  const dispatch = useDispatch()
  const [boardData, setBoardData] = useState({
    board: props.board,
    cards: props.cards,
    lists: props.lists
  })
  // console.log(useSelector(state => state));
  const board = useSelector(state => state.board)
  // console.log("asdasd11");
  // console.log(useSelector(state => state.board.id));
  useEffect(() => {
    // console.log("board id: " + board.id);
    if (board.id === null) {
      // console.log(props.board);
      dispatch(initalizeBoard({ ...props.board }))
      dispatch(initalizeLists(props.lists.sort((a, b) => a.sequence - b.sequence)))
      dispatch(initalizeCards(props.cards))
      // console.log("Dispatched");
    }
  }, [board.id, dispatch, props.board, props.cards, props.lists]);

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
