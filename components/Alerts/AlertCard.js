import { Box, Heading, HStack, Text, Button, useDisclosure } from "@chakra-ui/react";
import FeatherIcon from 'feather-icons-react'


import React from 'react'
import AlertModal from "./AlertModal";


const styles = {
    background: (bg) => ({
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        bg: `url('${bg}')`,
        borderRadius: 5,
        overflow: 'hidden'
    }),

    card: {
        background: 'rgba(0, 0, 0, 0.4)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        py: 10,
        px: 5,
        h: 'full'
    },

    heading: {
        color: 'white',
        textAlign: 'left',
        noOfLines: 2,
        size: 'lg'
    },


    source: {
        fontSize: 'xs',
        alignItems: 'center',
        fontWeight: 'bold',
        lineHeight: 0,
        color: 'gray.200',
        mt: 3,
    },

    content: {
        noOfLines: 4,
        color: 'gray.300',
        textAlign: 'left',
        fontSize: 'xs'
    },


    button: {
        mt: 5,
        variant: 'ghost',
        colorScheme: 'whiteAlpha',
        size: 'sm'
    }


}

function linkify(text) {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
    return text.replace(urlRegex, url => {
        return `<a target='_blank' href='${url}' >${url}</a>`
    })
}

export default function AlertCard({ alert }) {

    const { isOpen, onClose, onOpen } = useDisclosure()
    const modalRef = React.useRef()

    return (
        <>

            <AlertModal isOpen={isOpen} onClose={onClose} modalRef={modalRef} alert={alert} />
            <Box h={'full'} _hover={{ cursor: 'pointer' }} onClick={onOpen} ref={modalRef} {...styles.background(alert.media)} >
                <Box h={'full'} {...styles.card}>
                    <Heading {...styles.heading} >{alert.title}</Heading>

                    <Text {...styles.content} 
                    dangerouslySetInnerHTML={{
                        __html: linkify(alert.content)
                    }} />


                    <HStack {...styles.source}>
                        <FeatherIcon size={18} icon={'arrow-up-right'} />
                        <Text>{alert.source}</Text>
                    </HStack>




                    <HStack justifyContent={'right'}>
                        {alert.link ? <Button as={'a'} target="_blank" href={alert.source.includes('Loop') ? alert.origin + alert.link : alert.link} {...styles.button} >Learn more</Button> : <></>}
                    </HStack>
                </Box>
            </Box>
        </>
    )
}