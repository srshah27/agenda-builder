import React from 'react'
import { Wrap, WrapItem, Flex, Text, Center, Stack } from '@chakra-ui/react'
const Work = () => {


  return (

    <Stack left={["0%", "0%", "16%", "16%"]} m="4" pos="fixed">
      <Text fontSize="lg" color="red"> Your Workspaces</Text>
      <Flex >
        <Stack>
          <Text fontSize="sm" color="gray.500"> Your workspaces are where you can organize your projects and tasks. </Text>
          <Wrap>
            <WrapItem>
              <Center w='180px' h='80px' bg='red.200'>
                Box 1
              </Center>
            </WrapItem>
            <WrapItem>
              <Center w='180px' h='80px' bg='green.200'>
                Box 2
              </Center>
            </WrapItem>
            <WrapItem>
              <Center w='180px' h='80px' bg='tomato'>
                Box 3
              </Center>
            </WrapItem>
            <WrapItem>
              <Center w='180px' h='80px' bg='blue.200'>
                Box 4
              </Center>
            </WrapItem>
          </Wrap>
        </Stack>
      </Flex>
    </Stack >
  )
}

export default Work
