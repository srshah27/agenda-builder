import Link from 'next/link'

export default function Home() {
  return (
    <>
      <div className="flex justify-center h-screen">
        <Link href={'/login'}>
          <h1 className="my-auto font-semibold">Agenda Builder</h1>
        </Link>
        {/* <button className="btn btn-primary">Button</button> */}
        <form action="#"></form>
      </div>
    </>
  )
}
