import React, {useState, useEffect} from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'
import Avatar from '@/components/Avatar'

const checkExists = async (uname) => {
  let res = await fetch('http://localhost:3000/api/u/uname', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: uname })
  })
  let data = await res.json()
  console.log(data);
  return data.exists
}

const NewUser = ({ session }) => {
  console.log(session);
  
  const [uname, setUname] = useState(session.user.name.replace(/\s/g, '').toLowerCase());
  const [image, setImage] = useState(`https://api.dicebear.com/5.x/initials/svg?seed=${session.user.name}&radius=50&backgroundColor=27d3d5,3ea7da,9d8eef&backgroundType=gradientLinear&fontFamily=Verdana&fontSize=46`);
  let e = false
  checkExists(uname).then((res) => e = res)
  const [exists, setExists] = useState(e);
  
  useEffect( () => {
    async function check(uname) {
      let e = await checkExists(uname)
      setExists(e)
    }
    check(uname)
  }, [uname]);
  let router = useRouter()
  let Submit = async  (e) => {
    e.preventDefault()
    let res = await fetch('/api/u/uname', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: uname, email: session.user.email, image })
    })
    let data = await res.json()
    if(data.user)
      // router.push('/u/[uname]', `/u/${uname}`)
      router.push('/')
  }
  
  return (
    <>
    <form>
        <Avatar url={ image }/>
      <label htmlFor="username">Username</label>
      <br />
      <input type="text" name="username" id="username" value={uname} onChange={(e) => setUname(e.target.value)} />
      <br />
      <button disabled={exists} onClick={Submit} >Submit</button>
        {uname.includes(' ') ? <p>Username should not include space</p> : <></>}
        {exists? <p>Username already exists</p> : <></>}
    </form>
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  if (!session || !session.user.userId) {
    return {
      redirect: {
        destination: '/login',
      }
    }
  }
  return {
    props: {
      session
    }
  }
}


export default NewUser