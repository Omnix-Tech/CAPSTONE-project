import { Box, FormControl, FormLabel, Grid, GridItem, Heading, HStack, Select, SkeletonText, Text, Divider } from "@chakra-ui/react";
import Layout from "../../components/layout";
import FeatherIcon from 'feather-icons-react'
import useConnect from "../../controller/hooks/useConnect";
import ConnectMenu from "../../components/ConnectMenu";
import AlertList from "../../components/Alerts/list";


import React from 'react'


const parishes = ['Kingston & St. Andrew', 'Portland', 'St. Thomas', 'St. Catherine', 'St. Mary', 'Manchester', 'Clarendon', 'Hanover', 'Westmoreland', 'St. James', 'Trelawny', 'St. Elizabeth']


export default function Alerts({ user }) {

    const { connectDocument: connect, handleSetConnect, connectsDocs } = useConnect(user)
    const [category, setCategory] = React.useState()
    const [parish, setParish] = React.useState(null)

    return (
        <Layout user={user} currentTab={'alerts'}>
            <Grid w={'full'} templateColumns={'repeat(12,1fr)'} >

                <GridItem px={2} pt={10} colSpan={{ base: 12, md: 5, lg: 4 }} >
                    <Box top={{ base: 'unset', md: 70 }} position={{ base: 'unset', md: 'sticky' }}>
                        <Box boxShadow={'-2px -3px 16px -1px rgba(0,0,0,0.14)'} padding={10} bgColor={'white'} borderRadius={10}>
                            <Heading mb={2} size={'md'} >Hello, {user?.displayName}</Heading>
                            <HStack spacing={'5px'} fontWeight={'medium'} fontSize={'sm'} alignItems={'center'} >
                                <FeatherIcon size={16} icon={'map-pin'} />
                                {!connect ? <SkeletonText borderRadius={'full'} noOfLines={1} width={'30%'} /> : <Text>{connect ? `${connect.area} Connect` : ``}</Text>}
                                <ConnectMenu handleSetConnect={handleSetConnect} connectsDocs={connectsDocs} />
                            </HStack>
                        </Box>

                        <Box my={5} boxShadow={'-2px -3px 16px -1px rgba(0,0,0,0.14)'} padding={10} bgColor={'white'}>
                            <Text fontWeight={'medium'} fontSize={'lg'} >Categories</Text>
                            <Divider my={2} />
                            <Box>
                                <Box onClick={() => setCategory(null)} transition={'.25s'} _hover={{ cursor: 'pointer', bgColor: 'linkedin.500', textColor: 'white' }} bgColor={category ? 'unset' : 'linkedin.300'} textColor={category ? 'unset' : 'white'} p={2}>
                                    <Text fontWeight={'medium'} >Information</Text>
                                </Box>

                                <Box onClick={() => setCategory('wanted')} transition={'.25s'} _hover={{ cursor: 'pointer', bgColor: 'linkedin.500', textColor: 'white' }} bgColor={category === 'wanted' ? 'linkedin.300' : 'unset'} textColor={category === 'wanted' ? 'white' : 'unset'} p={2}>
                                    <Text fontWeight={'medium'} >Most Wanted</Text>
                                </Box>

                                <Box onClick={() => setCategory('missing')} transition={'.25s'} _hover={{ cursor: 'pointer', bgColor: 'linkedin.500', textColor: 'white' }} bgColor={category === 'missing' ? 'linkedin.300' : 'unset'} textColor={category === 'missing' ? 'white' : 'unset'} p={2}>
                                    <Text fontWeight={'medium'} >Missing Persons</Text>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </GridItem>


                <GridItem px={2} colSpan={{ base: 12, md: 7, lg: 8 }}>
                    <Box boxShadow={'-2px -3px 16px -1px rgba(0,0,0,0.12)'} padding={{ base: 5, md: 8 }} bgColor={'white'}>

                        {
                            category ? <></>
                                :

                                <>
                                    <HStack w={'50%'} >
                                        <FormControl>
                                            <FormLabel>Parish</FormLabel>
                                            <Select onChange={(e) => setParish(e.target.value !== '' ? e.target.value : null)}>
                                                <option value={''} >Your Connect</option>
                                                {parishes.map((parish, _) => <option key={_} value={parish} >{parish}</option>)}
                                            </Select>
                                        </FormControl>
                                    </HStack>
                                    <Divider mt={2} />
                                </>

                        }


                        <Box mt={10}>
                            <AlertList connect={connect} category={category} parish={parish} />
                        </Box>
                    </Box>
                </GridItem>

            </Grid>
        </Layout>
    )
}