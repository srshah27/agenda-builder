import React from "react"
import {
    Button,
    Box,
    Spacer,
    HStack,
    Image,
    useColorModeValue
} from "@chakra-ui/react"
import Link from "next/link"
import PropTypes from "prop-types"
// import { useAppSelector } from "@/src/hooks"
import { useSession } from "next-auth/react";
import AvatarMenu from "./AvatarMenu";

const UserNav = () => {


    

    return (
        <HStack boxShadow="sm" bgColor = {useColorModeValue('gray.300', 'gray.700')} display="flex">
            <Link href="/"><Button  bg="transparent" size="sm">Boards</Button></Link>
            <Spacer />
            <Link href="/">
                <Image src="/svg/agenda.svg" h="auto" w="40"  p="2"
                    alt="Agenda Logo"
                />
            </Link>
            <Spacer />
            <AvatarMenu/>
        </HStack>
    )
}

UserNav.propTypes = {
    bg: PropTypes.string
}

export default UserNav
