import Image from "next/image"
import { BsTwitter, BsFacebook, BsYoutube } from "react-icons/bs"
import { SiGmail } from "react-icons/si"
import { IoCall } from "react-icons/io5"

const Footer = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content" id="footer">
      <div>
        <Image src="/svg/agenda.svg" width={150} height={50} />
        <p className="text-center lg:text-left">
          Agile Builder Ltd.
          <br />
          Providing reliable tech Solutions
        </p>
      </div>

      <div>
        <span className="footer-title text-center lg:text-left">About Us</span>
        <div className="">
          <p> Provident cupiditate voluptatem et in. Quaerat fugiat ut <br/>assumenda  excepturi exercitationem quasi. In deleniti <br/> eaque aut repudiandae et a id nisi. </p>
        </div>
      </div>
      
      <div>
        <span className="footer-title text-center lg:text-left">Contact</span>
        <div className="grid grid-flow-row gap-4">
          <a className="flex">
            <SiGmail className="w-4 h-4" />
            <p className="px-2 -mt-1"> agendabuilder@gmail.com</p>
          </a>
          <a className="flex">
            <IoCall className="w-4 h-4" />
            <p className="px-2 -mt-1"> +91 0000000</p>
          </a>
        </div>
      </div>
      
      <div>
        <span className="footer-title text-center lg:text-left">Social</span>
        <div className="grid grid-flow-col gap-4">
          <a>
            <BsTwitter className="w-6 h-6" />
          </a>
          <a>
            <BsFacebook className="w-6 h-6" />
          </a>
          <a>
            <BsYoutube className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
