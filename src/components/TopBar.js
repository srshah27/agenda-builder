import React from 'react';
import Menu1 from './Menu1';
import { Image, Flex, Text, IconButton, Link, Button, Box } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { HiHome } from 'react-icons/hi';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton} from '@chakra-ui/react'

// import { Container } from 'postcss';


export default function TopBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Flex>
            <Flex h="12" w="full" bgColor="gray.400" >
                <Image src="/svg/agenda.svg" alt="logo" h="6" m="3" />
                <Menu1/>
                <Menu color="cyan.500">
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="transparent" color="blue.800" my="1">
                        Templates
                    </MenuButton>
                    <MenuList >
                        <Text mx="2" fontFamily="mono" color="blue.400" fontSize="sm" > Top Templates</Text>
                        <MenuItem> <Image src="/img/bg.jpg" h="8" w="8" mx="2" borderRadius="3" /> Nature</MenuItem>
                        <MenuItem> <Box bg='tomato' h="8" w="8" mx="2" borderRadius="3" /> Red</MenuItem>
                    </MenuList>
                </Menu>
                <Button onClick={onOpen}>Open Modal</Button>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Modal Title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p> dve</p>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                            </Button>
                            <Button variant='ghost'>Secondary Action</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Link href="/">
                    <IconButton
                        icon={<HiHome />}
                        size="md"
                        pos="absolute"
                        right="1"
                        color="cyan.900"
                        bg="transparent"
                        my="1"
                    />
                </Link>
            </Flex>
            {/* <Flex h="10" w="full" pos="absolute" bgColor="gray.200" top="10">
                <Text m="2" fontFamily="mono" color="blue.500" fontWeight="bold" > Board Name</Text>
                <Link href="/">
                <IconButton
                    icon={ <BsImages/>}
                    size="md"
                    pos="absolute"
                    right="0"
                    color="blue.500"
                />
                </Link>
            </Flex> */}

        </Flex>
    );
}