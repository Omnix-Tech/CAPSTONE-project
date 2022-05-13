
import { Box, Grid, GridItem, Image, VStack } from "@chakra-ui/react"

const styles = {
    MainContainer: {
        bg: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
        margin: { base: 0, lg: 0 },
        colSpan: { base: 12, lg: 7 }
    }
}

export default function AuthLayout({ children }) {

    return (
        <Box bgRepeat={'no-repeat !important'} bgPosition={'unset'} bgSize={'cover !important'} bg={`url('/images/bg.jpg')`}  >
            <Grid templateColumns={'repeat(12,1fr)'}>

                <GridItem {...styles.MainContainer} colSpan={{ base: 12, md: 7 }}>
                    {children}
                </GridItem>

                <GridItem display={{basee: 'none', md: 'unset'}} colSpan={{ base: 0, md: 5 }}>
                    <Image src="/images/logo.png" />
                </GridItem>

            </Grid>
        </Box>
    )
}