import { Grid, GridItem, Box, Heading, Spinner, VStack, Text, SkeletonText, HStack } from '@chakra-ui/react';
import React from 'react';
import Layout from '../components/layout';
import useConnect from '../controller/hooks/useConnect';

import MapComponent from '../components/Map'
import ConnectsContainer from '../components/Connects'
import ConnectMenu from '../components/ConnectMenu';

export default function Connects({ locations, user, position, }) {
  const { connectDocument, connectsDocs, handleSetConnect } = useConnect(user)
  const [otherLocations, setOtherLocations] = React.useState([])

  React.useEffect(() => {
    if (connectsDocs && locations.length > 0) {


      const connects = connectsDocs.map(connect => connect.place_id)
      const otherConnects = locations.filter(({ place_id }, index) => {
        return !connects.includes(place_id)
      })

      setOtherLocations(otherConnects)

    }

  }, [connectsDocs, locations])

  return (
    <Layout currentTab={'connect'} >
      <Grid templateColumns={`repeat(12,1fr)`} >
        <GridItem colSpan={{ base: 12, md: 5 }} >
          <Box p={{ base: 'unset', md: 5 }}>
            <Box boxShadow={'-2px -3px 16px -1px rgba(0,0,0,0.14)'} padding={10} bgColor={'white'} borderRadius={10}>
              <Heading mb={2} size={'md'}>Hello, {user?.displayName}</Heading>
              <HStack>
                {!connectDocument ? <SkeletonText borderRadius={'full'} noOfLines={1} width={'30%'} /> : <Text fontWeight={'medium'} fontSize={'sm'}>{connectDocument ? `Current Connect ${connectDocument.area}` : ``}</Text>}
                <ConnectMenu connectsDocs={connectsDocs} handleSetConnect={handleSetConnect} />
              </HStack>

            </Box>
          </Box>
          <Box px={{ base: 'unset', md: 5 }}>
            <Box bgColor={'white'} my={5} boxShadow={'-2px -3px 16px -1px rgba(0,0,0,0.14)'} borderRadius={10}>
              {
                connectsDocs ?
                  <ConnectsContainer connectsDocs={connectsDocs} otherLocations={otherLocations} currentUser={user} handleSetConnect={handleSetConnect} />
                  :
                  <>
                    <VStack py={10}>
                      <Spinner />
                    </VStack>
                  </>
              }
            </Box>
          </Box>

        </GridItem>
        <GridItem colSpan={{ base: 12, md: 7 }} >
          <Box
            position={{ base: 'relative', md: 'sticky' }}
            top={{ base: 'unset', md: 90 }}
            h={{ base: '70vh', md: '80vh'}} px={30}
            borderRadius={40}
            overflow={'hidden'}
            w={'full'} >
            <MapComponent position={position} connectsDocs={connectsDocs} otherLocations={otherLocations} connectDocument={connectDocument} />
          </Box>
        </GridItem>
      </Grid>
    </Layout>
  );
}
