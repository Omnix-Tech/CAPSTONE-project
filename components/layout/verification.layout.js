import { Box, Grid, GridItem, } from "@chakra-ui/react"

const styles = {
    MainContainer: {
        bg: 'whiteAlpha.700',
        borderWidth: '1px',
        borderColor: 'whiteAlpha.700',
        minH: { base: '100vh', lg: 'unset' },
        py: 10,
        px: { base: 5, md: 10 }
    }
}



export default function VerificationLayout({ children }) {


    return (
        <Box overflowX={'hidden'} width={'100vw'} bgRepeat={'no-repeat !important'} bgPosition={'unset'} bgSize={'cover !important'} bg={`url('/images/bg.jpg')`}  >
            <Box backdropFilter={'blur(10px)'} minH={'100vh'} bgColor={'blackAlpha.500'}>
                <Grid py={{ base: 0, md: 10 }} templateColumns={('repeat(12,1fr)')}>
                    <GridItem colStart={{ base: 1, lg: 3 }} colSpan={{ base: 12, lg: 8 }}>
                        <Box {...styles.MainContainer}>
                            {children}
                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </Box>
    )
}