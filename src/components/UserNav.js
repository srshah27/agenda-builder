import React from "react"
import {
    Button,
    Box,
    Spacer,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Image
} from "@chakra-ui/react"
import Link from "next/link"
import PropTypes from "prop-types"
// import { useAppSelector } from "@/src/hooks"
import { useSession } from "next-auth/react";
import Avatar from "./Avatar"

const UserNav = () => {
    // const user = useAppSelector(state => state.user)

    // const logout = async () => {
    //     const URL = "/api/logout"

    //     const response = await fetch(URL, {
    //         method: "POST",
    //         mode: "cors",
    //         cache: "no-cache",
    //         credentials: "same-origin",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         redirect: "follow",
    //         referrerPolicy: "no-referrer",
    //         body: JSON.stringify({})
    //     })

    //     const responseInJson = await response.json()

    //     if (responseInJson.message === "success") {
    //         window.location.href = `${window.location.origin}/login`
    //     }
    // }

    const renderButtons = () => {

        const { data: session } = useSession();
        return (
            <>
                <Menu>
                    <MenuButton m="2">
                        <Avatar url={session?.user.image} w={25} h={25} />
                    </MenuButton>
                    <MenuList>
                        <MenuItem>Log out</MenuItem>
                    </MenuList>
                </Menu>
            </>
        )
    }

    return (
        <Box boxShadow="sm" bg="rgba(0,0,0,0.2)" display="flex">
            <Link href="/"><Button mt="2" bg="transparent" size="sm">Boards</Button></Link>
            <Spacer />
            <Link href="/">
                <Image src="/svg/agenda.svg" h="auto" w="32" m="2" pt="2"
                    alt="Agenda Logo"
                />
            </Link>
            <Spacer />
            {renderButtons()}
        </Box>
    )
}

UserNav.propTypes = {
    bg: PropTypes.string
}

export default UserNav
