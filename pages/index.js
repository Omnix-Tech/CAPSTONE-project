import Head from 'next/head'
import React from 'react'
import Layout from '../components/layout'
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore'
import { query, where, collection, doc, getDoc } from 'firebase/firestore'

import { Text, Box, Heading, HStack, Grid, GridItem, Button, IconButton, Tooltip } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'
import AlertContainer from '../components/home/AlertsContainer'
import PublicForumContiner from '../components/home/PublicForumContainer'
import SearchContainer from '../components/home/SearchContainer'

const { firestore } = require('../config/firebase.config')


const ButtonStyle = {
  fontSize: 'sm',
  spacing: 5,
  borderRadius: 10,
  color: 'teal.500',
  p: 10,
  py: 2,
  w: 'full',
  alignItems: 'center',
  transition: '.5s',
  justifyContent: 'center',
  _hover: {
    cursor: 'pointer',
    color: 'teal.700'
  }
}

export default function Home({ user, ...props }) {
  const [values, loading, error, snapshot] = useCollectionDataOnce(
    query(
      collection(firestore, 'User_Location'),
      where('user', '==', doc(firestore, `Users/${user?.uid}`))
    )
  )
  const [location, setLocation] = React.useState(null)

  const handleSetLocation = async () => {
    if (values && values.length > 0) {
      setLocation((await getDoc(values[0].location)).data())
    }
  }
  React.useEffect(() => {
    handleSetLocation()
  }, [values])
  return (
    <>
      <Layout user={user} currentTab={'home'} >
        <Grid w={'full'} templateColumns={'repeat(12,1fr)'}>
          <GridItem p={2} colSpan={{ base: 12, md: 5, lg: 4 }} top={{base: 'unset', lg: 70}} position={{base: 'unset', lg: 'sticky'}} h={'fit-content'} >


            <Box >
              <Box boxShadow={'-2px -3px 16px -1px rgba(0,0,0,0.14)'} padding={10} bgColor={'white'} borderRadius={10}>
                <Heading mb={2} size={'md'}>Hello, {user?.displayName}</Heading>
                <HStack spacing={'5px'} fontWeight={'medium'} fontSize={'sm'} alignItems={'center'} >
                  <FeatherIcon size={'16px'} icon={'map-pin'} />
                  <Text>{location ? `${location.area} Connect` : ``}</Text>

                  <Tooltip label={'More Connects'} >
                    <IconButton variant={'ghost'} size={'xs'} icon={<FeatherIcon icon={'more-horizontal'} />} />
                  </Tooltip>

                </HStack>
              </Box>
            </Box>

            <Box mt={5} boxShadow={'0px 0px 10px 0px rgba(0,0,0,0.14)'} bgColor={'white'}>
              <Grid templateColumns={'repeat(12,1fr)'}>
                <GridItem py={2} colSpan={{ base: 4, lg: 4 }} >
                  <Tooltip label={'Public Forum'}>
                    <HStack {...ButtonStyle}>
                      <FeatherIcon icon={'users'} />
                    </HStack>
                  </Tooltip>
                </GridItem>
                <GridItem py={2} colSpan={{ base: 4, lg: 4 }} >
                  <Tooltip label={'Forums'}>
                    <HStack {...ButtonStyle}>
                      <FeatherIcon icon={'message-circle'} />
                    </HStack>
                  </Tooltip>
                </GridItem>
                <GridItem py={2} colSpan={{ base: 4, lg: 4 }} >

                  <Tooltip label={'Alerts'}>
                    <HStack {...ButtonStyle}>
                      <FeatherIcon icon={'airplay'} />
                    </HStack>
                  </Tooltip>
                </GridItem>
              </Grid>
            </Box>


          </GridItem>

          <GridItem px={2} colSpan={{ base: 12, md: 7, lg: 5 }} >
            <AlertContainer my={5} />
            <PublicForumContiner location={location} my={5} />
          </GridItem>

          <GridItem px={2} top={70} position={'sticky'} height={'fit-content'} minH={'90vh'} display={{base: 'none', md: 'none', lg: 'unset'}} colSpan={{ base: 0, md: 0, lg: 3 }}>
            <SearchContainer overflow={'scroll'} />
          </GridItem>
        </Grid>


      </Layout>
    </>
  )
}
