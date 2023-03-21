import TopBar from '../components/TopBar'
import List from '../components/List'
import Example from '../components/Example'
import SideBar from '../components/SideBar'
import Work from '../components/Work'
import { ChakraProvider, Grid, GridItem } from '@chakra-ui/react'

export default function Home({ sess }) {
  return (
    <>
      <ChakraProvider>
        <TopBar />
        {/* <Grid
          templateAreas={`"nav main"`}
          gridTemplateRows={'80%'}
          gridTemplateColumns={'240px '}
        >
          <GridItem area={'nav'}>
            <SideBar />
          </GridItem>
          <GridItem area={'main'} >
            <Work />
          </GridItem>

        </Grid> */}
        <SideBar />
        <Work />
      </ChakraProvider>
    </>
  )
}
