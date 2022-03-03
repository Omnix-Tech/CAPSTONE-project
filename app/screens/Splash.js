import { HStack, Spinner } from "native-base"
import React from "react"


export default function Splash() {
    return (
        <HStack bg={'info.900'} alignItems='center' justifyContent={'center'} width={'100vw'} height={'100vh'}>
            <Spinner size={'lg'} />
        </HStack>
    )
}