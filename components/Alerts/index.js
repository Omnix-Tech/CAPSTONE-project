import { Box, Center, Divider, Spinner, Text } from '@chakra-ui/react';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';
import AlertCard from './AlertCard';
import useAlerts from '../../controller/hooks/useAlerts';



export default function AlertContainer({ location, ...props }) {

  const { alerts } = useAlerts({ connect: location })
  // const alerts =[]

  return (
    <Box {...props}>

      <Text px={5} color={'gray.400'} fontWeight={'medium'} textTransform={'uppercase'} fontSize={'xs'}>Latest Alerts in your area</Text>
      <Divider mt={5} mb={2} />

      {alerts ?

        alerts.length === 0
          ?
          <Center p={10}>
            <Text fontSize={'xs'} fontWeight={'medium'} >No Alerts</Text>
          </Center>
          :

          <>
            <Carousel showStatus={false} >
              {alerts.map(alert => {
                return <Box key={alert.id} mx={2}><AlertCard alert={alert} /></Box>
              })}
            </Carousel>
          </>
        :


        <>
          <Center p={10}>
            <Spinner />
          </Center>
        </>}




    </Box>
  );
}
