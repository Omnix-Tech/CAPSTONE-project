import { Box, Divider, HStack, Text, Image, Heading, Button } from '@chakra-ui/react';
import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel';
import FeatherIcon from 'feather-icons-react'



function Alert() {
  return (
    <Box p={5} mb={5} >
      <HStack boxShadow={'-2px -3px 16px -1px rgba(0,0,0,0.14)'} pr={5} overflow={'hidden'} bgColor={'white'} borderRadius={10} h={150} justifyContent={'flex-start'} >
        <Box overflow={'hidden'} borderRightRadius={10} w={'40%'}>
          <Image w={'full'} objectFit={'cover'} src={'/images/bg.jpg'} />
        </Box>
        <Box w={'60%'} >
          <Heading size={'sm'} isTruncated >Power Outage in your area</Heading>
          <HStack alignItems={'center'}>
            <FeatherIcon size={'12px'} icon={'arrow-up-right'} />
            <Text fontSize={'x-small'} fontWeight={'medium'}>Source</Text>
          </HStack>

          <Button variant={'ghost'} colorScheme={'messenger'} size={'sm'} my={2} w={'full'}>
            <HStack spacing={2} alignItems={'center'} >
              <Text>Learn More</Text>
              <FeatherIcon size={12} icon={'arrow-right'} />
            </HStack>
          </Button>
        </Box>
      </HStack>
    </Box>
  )
}

export default function AlertContainer({ location, ...props }) {
  return (
    <Box {...props}>

      <Text px={5} color={'gray.400'} fontWeight={'medium'} textTransform={'uppercase'} fontSize={'xs'}>Latest Alerts in your area</Text>
      <Divider my={5} />


      <Box>
        <Carousel>
          <Alert />
          <Alert />
          <Alert />
        </Carousel>
      </Box>


    </Box>
  );
}
