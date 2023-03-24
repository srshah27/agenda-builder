import TopBar from '../components/TopBar'
import SideBar from '../components/SideBar'
import Work from '../components/Work'
import { ChakraProvider } from '@chakra-ui/react'

export default function Home({ sess }) {
  return (
    <>
      <ChakraProvider>
        {/* <TopBar /> */}
        <SideBar />
        {/* <Work /> */}
      </ChakraProvider>
    </>
  )
}
