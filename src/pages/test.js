import TopBar from '../components/TopBar'
import List from '../components/List'
import Example from '../components/Example'
import Create from '../components/Create'
import { ChakraProvider, Text } from '@chakra-ui/react'

export default function Home({ sess }) {
  return (
    <>
    <ChakraProvider>
      {/* <TopBar/> */}
      {/* <List/> */}
      {/* <Example/> */}
      <Create/>
    </ChakraProvider>
    </>
  )
}
