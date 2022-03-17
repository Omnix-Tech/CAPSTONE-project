import React from 'react'


import { Button, Heading, HStack, IconButton, Modal, Text, Box, Input, VStack, Divider, Avatar, TextArea } from 'native-base'
import { Icon } from 'react-native-elements'
import { Container } from '../Components/components'


export default function NewPost({ modalOpen, setModalVisible }) {
    return (
        <>
            <Modal closeOnOverlayClick={false} bgColor={'coolGray.200'} isOpen={modalOpen} onClose={() => setModalVisible(false)} size={'full'} >
                <Box position={'absolute'} top={0} left={0} right={0} bottom={0} >
                    <HStack justifyContent={'space-between'} alignItems={'center'} paddingX={3} paddingY={2}>
                        <IconButton onPress={() => setModalVisible(false)} icon={<Icon type={'feather'} name={'x'} />} />
                        <Heading size={'md'} color={'coolGray.600'}>New Post</Heading>
                    </HStack>
                    <Divider />
                    <Container height={'1/2'} bgColor={'coolGray.100'}>
                        <VStack paddingTop={5}>
                            <HStack space={2} alignItems={'flex-start'} height={'full'} >
                                <Avatar />
                                <TextArea width={'5/6'} height={'full'} variant={'unstyled'} placeholder={'What would you like to say?'} size={'lg'} />
                            </HStack>

                        </VStack>
                    </Container>
                    <Box paddingY={2}>
                        

                        <Input type='file' />
                        <Button borderRadius={0} size={'lg'} variant={'solid'} width={'full'}>Post</Button>
                    </Box>

                </Box>



            </Modal>
        </>
    )
}