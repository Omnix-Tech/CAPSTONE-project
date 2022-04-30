
import React from 'react'
import Layout from '../components/layout'

import { Text, Box, Heading, HStack, Grid, Divider, GridItem, Tooltip, SkeletonText } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'



import NewButton from '../components/New'
import useConnect from '../controller/hooks/useConnect'
import ConnectMenu from '../components/ConnectMenu'



import AlertContainer from '../components/Alerts'
import SearchContainer from '../components/Search'

import Forums from '../components/Forum/Listing/Forums'
import UserForums from '../components/Forum/Listing/UserForums'
import Forum from '../components/Forum'

const ButtonStyle = {
  fontSize: 'sm',
  spacing: 5,
  borderRadius: 10,
  p: 10,
  py: 2,
  w: 'full',
  alignItems: 'center',
  transition: '.5s',
  justifyContent: 'center',
  _hover: {
    cursor: 'pointer',
    color: 'green.700'
  }
}

export default function Home({ user }) {
  const { connectDocument: connect, handleSetConnect, connectsDocs } = useConnect(user)
  const [selectedContent, setSelectedContent] = React.useState(0)

  return (
    <>
      <Layout user={user} currentTab={'home'} >
        <NewButton user={user} location={connect} />
        <Grid w={'full'} templateColumns={'repeat(12,1fr)'}>
          <GridItem px={2} py={10} colSpan={{ base: 12, md: 5, lg: 4 }} top={{ base: 'unset', md: 70 }} maxH={{ base: 'unset', md: '95vh' }} overflowY={{ base: 'unset', md: 'scroll' }} position={{ base: 'unset', md: 'sticky' }} >


            <Box>
              <Box boxShadow={'-2px -3px 16px -1px rgba(0,0,0,0.14)'} padding={10} bgColor={'white'} borderRadius={10}>
                <Heading mb={2} size={'md'}>Hello, {user?.displayName}</Heading>
                <HStack spacing={'5px'} fontWeight={'medium'} fontSize={'sm'} alignItems={'center'} >
                  <FeatherIcon size={'16px'} icon={'map-pin'} />

                  {!connect ? <SkeletonText borderRadius={'full'} noOfLines={1} width={'30%'} /> : <Text>{connect ? `${connect.area} Connect` : ``}</Text>}

                  <ConnectMenu handleSetConnect={handleSetConnect} connectsDocs={connectsDocs} />

                </HStack>
              </Box>
            </Box>

            <Box mt={5} boxShadow={'0px 0px 10px 0px rgba(0,0,0,0.14)'} bgColor={'white'}>
              <Grid templateColumns={'repeat(12,1fr)'}>
                <GridItem py={2} colSpan={{ base: 4, lg: 4 }} >
                  <Tooltip label={'Forums'}>
                    <HStack onClick={() => setSelectedContent(0)} color={selectedContent === 0 ? 'green.500' : 'teal.500'} {...ButtonStyle}>
                      <FeatherIcon icon={'users'} />
                    </HStack>
                  </Tooltip>
                </GridItem>
                <GridItem py={2} colSpan={{ base: 4, lg: 4 }} >
                  <Tooltip label={'Your Forums'}>
                    <HStack onClick={() => setSelectedContent(1)} color={selectedContent === 1 ? 'green.500' : 'teal.500'} {...ButtonStyle}>
                      <FeatherIcon icon={'message-circle'} />
                    </HStack>
                  </Tooltip>
                </GridItem>
                <GridItem py={2} colSpan={{ base: 4, lg: 4 }} >

                  <Tooltip label={'Alerts'}>
                    <HStack onClick={() => setSelectedContent(2)} color={selectedContent === 2 ? 'green.500' : 'teal.500'} {...ButtonStyle}>
                      <FeatherIcon icon={'airplay'} />
                    </HStack>
                  </Tooltip>
                </GridItem>
              </Grid>
            </Box>

            <Box p={5} bgColor={'white'}>

              {selectedContent === 1 ? <UserForums location={connect} user={user} setSelectedContent={setSelectedContent} /> : <></>}

              {selectedContent === 0 ? <Forums location={connect} user={user} /> : <></>}

              {selectedContent === 2 ? <>Alerts</> : <></>}

            </Box>


          </GridItem>

          <GridItem px={2} colSpan={{ base: 12, md: 7, lg: 5 }} >
            <AlertContainer my={5} />

            <Box my={5}>
              <Text px={5} color={'gray.400'} fontWeight={'medium'} textTransform={'uppercase'} fontSize={'xs'}>{connect ? connect?.area : ''} Forum</Text>
              <Divider my={2} />
              {connect ? <Forum location={connect} user={user} /> : <></>}
            </Box>

          </GridItem>

          <GridItem px={2} top={70} position={'sticky'} height={'fit-content'} minH={'90vh'} display={{ base: 'none', md: 'none', lg: 'unset' }} colSpan={{ base: 0, md: 0, lg: 3 }}>
            <SearchContainer overflow={'scroll'} />
          </GridItem>
        </Grid>
      </Layout>
    </>
  )
}



