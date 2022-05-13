import { Box, Image, VStack, Text } from "@chakra-ui/react"

export default function PeerVerification({ setStep }) {
    

    return (
        <VStack>
            <Text fontSize={'3xl'} fontWeight={'bold'}>Peer Verification</Text>
            <Box w={"50%"} p={2} borderRadius={5} borderWidth={8} borderColor={'blackAlpha.400'}>
                <Image src="/images/qr.png" />
            </Box>

            <Text fontSize={'xl'} fontWeight={'bold'} >Share This</Text>
        </VStack>
    )
}