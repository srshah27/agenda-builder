import React from "react"
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure
} from "@chakra-ui/react"
import { FiStar, FiSettings } from "react-icons/fi"
import { AiFillCaretRight } from "react-icons/ai"
import { HiOutlineTemplate } from "react-icons/hi"
import { TbLayoutBoardSplit } from "react-icons/tb"
const LinkItems = [
    { name: "Boards", icon: TbLayoutBoardSplit },
    { name: "Templates", icon: HiOutlineTemplate },
    { name: "Favourites", icon: FiStar },
    { name: "Settings", icon: FiSettings }
]

export default function SimpleSidebar({ children }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <Box minH="100%" bg={useColorModeValue("gray.100", "gray.900")}>
            <SidebarContent
                onClose={() => onClose}
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
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} pt="16" h="100%" w="100%" pos="fixed" top="0" zIndex="-1" bg={useColorModeValue("gray.100", "gray.700")}>
                {children}
            </Box>
        </Box>
    )
}

const SidebarContent = ({ onClose, ...rest }) => {
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
                <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} color="cyan.400" />
            </Flex>
            {LinkItems.map(link => (
                <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
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
