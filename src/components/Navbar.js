import Image from 'next/image'

function Navbar() {
  return (
    <header>
      <nav className="fixed top-0 z-50 w-screen shadow-md">
        <div className="flex items-stretch mx-auto my-0">
          <a href="/" className="flex items-center p-4">
            <Image
              className="i"
              src="/logo.svg"
              alt="agenda"
              width={50}
              height={63}
            />
            <h1 className="ml-4">Agenda Builder</h1>
          </a>
          <div className='flex'>
            <button>
              
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
