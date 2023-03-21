import { Box, Flex, useColorModeValue, Link, Drawer, DrawerContent, Text, useDisclosure, Stack, HStack, Input } from "@chakra-ui/react"
import { IconButton, CloseButton, Button, Icon, Spacer } from "@chakra-ui/react"
import { FiStar, FiSettings } from "react-icons/fi"
import { AiFillCaretRight } from "react-icons/ai"
import { HiOutlineViewGridAdd } from "react-icons/hi"
import { TbLayoutBoardSplit } from "react-icons/tb"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'

export default function SimpleSidebar({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box minH="100%" bg={useColorModeValue("gray.200", "gray.900")}>
            <SidebarContent
                onClose1={() => onClose}
                display={{ base: "none", md: "block" }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose1={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} pt="16" h="100%" w="100%" pos="fixed" top="0" zIndex="-1" bg={useColorModeValue("gray.50", "gray.700")}>
                {children}
            </Box>
        </Box>
    )
}

const SidebarContent = ({ onClose1, ...rest }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box
            bg={useColorModeValue("white", "gray.900")}
            borderRight="1px"
            borderRightColor={useColorModeValue("gray.200", "gray.700")}
            w={{ base: "full", md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex h="10" m="2" justifyContent="end" >
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose1} color="cyan.400" />
            </Flex>
            {/* {LinkItems.map(link => (
                <NavItem key={link.name} icon={link.icon}  >
                    {link.name}
                </NavItem>
            ))} */}
            <Stack px="5" alignItems='flex-start'>
                <HStack fontSize="lg">
                    <HiOutlineViewGridAdd /> <Button onClick={onOpen} bg="transparent" _hover={{bg:"transparent"}}>Create Workspace</Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Create workspace</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Input placeholder='Workspace Name' />
                            </ModalBody>
                            <ModalFooter>
                                <Button mr={3} onClick={onClose}>
                                    Create
                                </Button>
                                <Button variant='ghost'>Close</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </HStack>
                <HStack>
                    <TbLayoutBoardSplit fontSize="lg"/>
                    <Button bg="transparent" _hover={{bg:"transparent"}}>Boards</Button>
                </HStack>
                <HStack>
                    <FiStar fontSize="lg"/>
                    <Button bg="transparent" _hover={{bg:"transparent"}}>Favourites</Button>
                </HStack>
                <HStack>
                    <FiSettings fontSize="lg"/>
                    <Button bg="transparent" _hover={{bg:"transparent"}}>Settings</Button>
                </HStack>

            </Stack>
        </Box >
    )
}

const NavItem = ({ icon, children, ...rest }) => {
    return (
        <Link
            href="#"
            style={{ textDecoration: "none" }}
            _focus={{ boxShadow: "none" }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: "cyan.400",
                    color: "white"
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: "white"
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    )
}

const MobileNav = ({ onOpen, ...rest }) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="10"
            alignItems="center"
            bg={useColorModeValue("white", "gray.900")}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue("gray.200", "gray.700")}
            justifyContent="flex-start"
            {...rest}
        >
            <Text > See More</Text>
            <IconButton
                variant="ghost"
                onClick={onOpen}
                aria-label="open menu"
                icon={<AiFillCaretRight />}
            />

        </Flex>
    )
}
