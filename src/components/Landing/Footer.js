import Image from 'next/image'
import { BsTwitter, BsFacebook, BsYoutube } from 'react-icons/bs'
import { SiGmail } from 'react-icons/si'
import { IoCall } from 'react-icons/io5'
import agendaImage from '../../../public/svg/agenda.svg'

const Footer = () => {
  return (
    <footer className="footer bg-neutral text-neutral-content p-10" id="footer">
      <div>
        <Image src={agendaImage} alt="Agenda Builder Logo" />
        <p className="text-center lg:text-left">
          Agile Builder Ltd.
          <br />
          Providing reliable tech Solutions
        </p>
      </div>

      <div>
        <span className="footer-title text-center lg:text-left">About Us</span>
        <div className="">
          <p>
            {' '}
            Provident cupiditate voluptatem et in. Quaerat fugiat ut <br />
            assumenda excepturi exercitationem quasi. In deleniti <br /> eaque
            aut repudiandae et a id nisi.{' '}
          </p>
        </div>
      </div>

      <div>
        <span className="footer-title text-center lg:text-left">Contact</span>
        <div className="grid grid-flow-row gap-4">
          <a className="flex">
            <SiGmail className="h-4 w-4" />
            <p className="-mt-1 px-2"> agendabuilder@gmail.com</p>
          </a>
          <a className="flex">
            <IoCall className="h-4 w-4" />
            <p className="-mt-1 px-2"> +91 0000000</p>
          </a>
        </div>
      </div>

      <div>
        <span className="footer-title text-center lg:text-left">Social</span>
        <div className="grid grid-flow-col gap-4">
          <a>
            <BsTwitter className="h-6 w-6" />
          </a>
          <a>
            <BsFacebook className="h-6 w-6" />
          </a>
          <a>
            <BsYoutube className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
