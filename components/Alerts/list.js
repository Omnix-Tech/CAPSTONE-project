import { Box, Center, Grid, GridItem, Spinner, Text } from "@chakra-ui/react"
import useAlerts from "../../controller/hooks/useAlerts"
import AlertCard from "./AlertCard"

export default function AlertList({ connect, category, parish }) {

    const { alerts, render } = useAlerts({ connect, category, parish })

    return (
        <>
            {render()}
            <Box>

                {alerts ?
                    alerts.length === 0
                        ?
                        <Center p={10}>
                            <Text fontSize={'xs'} fontWeight={'medium'}>No Alerts</Text>
                        </Center>
                        :
                        <>
                            <Grid templateColumns={'repeat(12,1fr)'} >
                                {alerts.map( alert => (
                                    <GridItem key={alert.id} p={1} colSpan={{ base: 12, md: 6 }} >
                                        <AlertCard alert={alert} />
                                    </GridItem>
                                ))}
                            </Grid>
                        </>
                    :

                    <Center>
                        <Spinner />
                    </Center>}
            </Box>
        </>
    )
}