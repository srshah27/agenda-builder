import React from "react"
import {
    Button,
    Box,
    Spacer,
    HStack,
    Image
} from "@chakra-ui/react"
import Link from "next/link"
import PropTypes from "prop-types"
// import { useAppSelector } from "@/src/hooks"
import { useSession } from "next-auth/react";
import AvatarMenu from "./AvatarMenu";

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
               <AvatarMenu/>
            </>
        )
    }

    return (
        <HStack boxShadow="sm" bg="rgba(0,0,0,0.3)" display="flex">
            <Link href="/"><Button  bg="transparent" size="sm">Boards</Button></Link>
            <Spacer />
            <Link href="/">
                <Image src="/svg/agenda.svg" h="auto" w="40"  p="2"
                    alt="Agenda Logo"
                />
            </Link>
            <Spacer />
            <AvatarMenu/>
            {/* {renderButtons()} */}
        </HStack>
    )
}

UserNav.propTypes = {
    bg: PropTypes.string
}

export default UserNav
