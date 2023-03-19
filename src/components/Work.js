import React from 'react'
import { Grid, GridItem, Flex, Text } from '@chakra-ui/react'
const Work = () => {
  const colors = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink']
  const [index, setIndex] = React.useState(0)
  const changeColor = () => {
    index >= colors.length - 1 ? setIndex(0) : setIndex(index + 1)
  }
  return (

    <Flex >
      <Text pos="fixed" top="10%" left="20%" fontSize="lg" > Recent Workspaces</Text>
      <Flex pos="absolute" top="18%" left="20%">
        <Grid templateColumns='repeat(5, 1fr)' gap={6} >
          <GridItem w='52' h='32' bg='red.500' borderRadius={6} />
          <GridItem w='52' h='32' bg='red.500' borderRadius={6} />
          <GridItem w='52' h='32' bg='red.500' borderRadius={6} />
          <GridItem w='52' h='32' bg='red.500' borderRadius={6} />
          <GridItem w='52' h='32' bg='red.500' borderRadius={6} />
          <GridItem as="button" w='52' h='32' bg='gray.50' borderRadius={6} textColor="blue.400"> Create a board</GridItem>
        </Grid>
      </Flex>
    </Flex >
  )
}

export default Work
