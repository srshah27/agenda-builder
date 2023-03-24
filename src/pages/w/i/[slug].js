import React from 'react'
import { useSession, getSession } from 'next-auth/react'
const Invite = ({ workspace, session, notFound }) => {
  
  const onSubmit = async (e) => {
    const res = await fetch(`/api/w/invite`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inviteCode: workspace.invite.link, uId: session.user.id })
    })
  }
  
  if(notFound) return <div>Workspace not found</div>
  
  return (  
    <div>Invite</div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if(!session.user){
    console.log('no session');
    console.log(session);
  }
    
  const res = await fetch(`${process.env.BASE_URL}/api/w/invite?inviteCode=${context.query.slug}`)
  const { workspace } = await res.json()
  console.log(workspace);
  if (!workspace) return {
    props: { notFound: true }
}
  else return { props: { workspace, session } }
}

export default Invite