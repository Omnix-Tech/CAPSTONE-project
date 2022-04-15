import { Box, Divider, HStack, Text, Image, Heading, Button } from '@chakra-ui/react';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';
import FeatherIcon from 'feather-icons-react'



function Alert() {
  return (
    <Box m={5} >
      <HStack boxShadow={'-2px -3px 16px -1px rgba(0,0,0,0.14)'} pr={2} overflow={'hidden'} bgColor={'white'} borderRadius={10} h={'full'} justifyContent={'flex-start'} >
        <Box overflow={'hidden'} w={'40%'}>
          <Image w={'full'} objectFit={'cover'} alt='' src={'https://i0.wp.com/mckoysnews.com/wp-content/uploads/2019/11/Jamaica-News-Today-October-5-2019JBNN.jpeg?w=1280&ssl=1'} />
        </Box>
        <Box p={2} w={'60%'} >
          <Heading textAlign={'left'} size={'sm'} isTruncated >Power Outage in your area</Heading>
          <HStack alignItems={'center'}>
            <FeatherIcon size={'12px'} icon={'arrow-up-right'} />
            <Text fontSize={'x-small'} fontWeight={'medium'}>Source</Text>
          </HStack>

          <Box px={5}>
            <Button variant={'ghost'} colorScheme={'messenger'} size={'sm'} my={5} isFullWidth >
              <HStack spacing={2} alignItems={'center'} >
                <Text>Learn More</Text>
                <FeatherIcon size={12} icon={'arrow-right'} />
              </HStack>
            </Button>
          </Box>

        </Box>
      </HStack>
    </Box>
  )
}

export default function AlertContainer({ location, ...props }) {
  return (
    <Box {...props}>

      <Text px={5} color={'gray.400'} fontWeight={'medium'} textTransform={'uppercase'} fontSize={'xs'}>Latest Alerts in your area</Text>
      <Divider mt={5} mb={2} />

      <Carousel showStatus={false} >
        <Alert />
        <Alert />
        <Alert />
      </Carousel>


    </Box>
  );
}
