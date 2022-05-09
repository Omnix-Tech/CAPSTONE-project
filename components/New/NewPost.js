import { Box, Text, HStack, Image, Avatar, Textarea, Divider, IconButton, Tooltip, Select, Button, Progress, FormLabel, Input, useDisclosure, Slide } from '@chakra-ui/react';

import FeatherIcon from 'feather-icons-react'
import React from 'react';

import { storage } from '../../app/config/firebase.config';
import { deleteObject, ref as storageRef } from 'firebase/storage';
import { useUploadFile, useDownloadURL } from 'react-firebase-hooks/storage'

import { v4 as uuidv4 } from 'uuid'
import useRequestHandlers from '../../controller/handlers';

const scrollCSS = {
    overflowX: 'auto',
    css: {
        '&::-webkit-scrollbar': {
            width: '4px',
        },
        '&::-webkit-scrollbar-track': {
            width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'none',
            borderRadius: '24px',
        },
    }
}

const actionBtnStyle = {
    size: 'sm',
    borderRadius: 'full',
    variant: 'ghost'
}


function UploadSuccess({ url }) {
    const [value, loading] = useDownloadURL(storageRef(storage, url));
    return (
        <>
            {loading ?
                <FeatherIcon size={36} color={'green'} icon={'check-circle'} />
                :
                <Box position={'relative'}>
                    <Image alt='' src={value} w={'full'} h={'auto'} />
                    <HStack bgColor={'rgba(255,255,255,0.5)'} position={'absolute'} top={0} left={0} right={0} bottom={0} justifyContent={'center'} >
                        <FeatherIcon size={36} color={'green'} icon={'check-circle'} />
                    </HStack>
                </Box>
            }
        </>

    )
}


function FileUploadContainer({ file, uid, handleSuccessiveFile, handleDeleteSuccessive, index }) {


    const ref = storageRef(storage, `/media/posts/user-${uid}/${file.id}`)
    const [uploadFile, uploading, snapshot, error] = useUploadFile()


    const [data] = React.useState(file.data)
    const [cancel, setCancel] = React.useState(false)
    const [resume, setResume] = React.useState(true)
    const [pause, setPause] = React.useState(false)
    const [url, setURL] = React.useState(null)

    const upload = async () => {
        if (data) {
            const response = await uploadFile(ref, data, { contentType: data.type }).catch()
            if (response) {
                setURL(response.ref.toString())
                handleSuccessiveFile(response.ref.toString())
            }
        }
    }

    React.useEffect(() => {
        upload()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handlePause = (event) => {
        if (event) {
            setResume(false)
            setPause(true)
            setCancel(false)
        }
    }
    const handleResume = (event) => {
        if (event) {
            setResume(true)
            setPause(false)
            setCancel(false)
        }
    }
    const handleCancel = (event) => {
        if (event) {
            setResume(true)
            setPause(true)
            setCancel(true)
        }
    }

    return (
        <Box h={'full'} >
            <Text maxW={200} color={'gray.300'} textAlign={'center'} fontSize={'xs'} isTruncated >{data.name}</Text>
            <Progress my={2} height={1} hasStripe display={uploading ? null : 'none'} value={snapshot ? (snapshot?.bytesTransferred / snapshot?.totalBytes) * 100 : 0} />
            <HStack overflow={'hidden'} maxW={200} borderRadius={10} bgPosition={'center'} bg={'gray.200'} h={'full'} justifyContent={'center'} alignItems={'center'} >
                {uploading ?
                    <Box px={2}>
                        <Tooltip label={'Resume'}>
                            <IconButton
                                disabled={resume}
                                onClick={() => handleResume(snapshot.task.resume())}
                                {...actionBtnStyle}
                                icon={<FeatherIcon size={16} icon={'play'} />} />
                        </Tooltip>
                        <Tooltip label={'Pause'}>
                            <IconButton
                                disabled={pause}
                                onClick={() => handlePause(snapshot.task.pause())}
                                {...actionBtnStyle}
                                icon={<FeatherIcon size={16} icon={'pause'} />} />
                        </Tooltip>
                        <Tooltip label={'Cancel'}>
                            <IconButton
                                disabled={cancel}
                                onClick={() => handleCancel(snapshot.task.cancel())}
                                {...actionBtnStyle}
                                icon={<FeatherIcon size={16} icon={'x'} />} />
                        </Tooltip>
                    </Box>
                    :
                    <>
                        {error ?
                            <FeatherIcon size={36} color={'red'} icon={'x-circle'} />
                            :
                            <>
                                {url ? <UploadSuccess url={url} /> : <FeatherIcon size={36} color={'green'} icon={'check-circle'} />}
                                <Tooltip label={'Remove'} >
                                    <IconButton variant={'ghost'} size={'sm'} onClick={() => handleDeleteSuccessive(url, file.id)} icon={<FeatherIcon icon={'x-circle'} />} />
                                </Tooltip>
                            </>
                        }

                    </>}
            </HStack>
        </Box>
    )
}


export default function NewPost({ location, user, forum, closeModal, showError, showSuccess }) {
    const { Post } = useRequestHandlers()

    const { isOpen, onClose, onToggle } = useDisclosure()
    const [content, setContent] = React.useState('')
    const [privacy, setPrivacy] = React.useState(forum ? null : false)
    const [successFiles, setSuccessFiles] = React.useState([])
    const [files, setFiles] = React.useState([])


    const handleSuccessiveFile = (file) => setSuccessFiles([...successFiles, file])

    const handleDeleteSuccessive = (url, id) => {
        if (url) {
            const remainingFiles = successFiles.filter(file => file != url)
            deleteObject(storageRef(storage, url)).then(() => {
                setSuccessFiles(remainingFiles)
                const filteredFiles = files.filter((file) => file.id !== id)
                setFiles(filteredFiles)
            }).catch(error => showError({ message: error.message }))
        }
    }

    const handleFileUpload = (e) => {
        const allFiles = [...files, ...Array.from(e.target.files).map(file => { return { data: file, id: uuidv4() } })]
        setFiles(allFiles)
        onClose()
    }

    const handleSumbitPost = async () => {
        const post = { content, privacy, files: successFiles, uid: user.uid, forum: forum ? forum : null, location: forum ? null : location.place_id }

        Post(`api/post`, post)
            .then(res => {
                showSuccess({ message: 'Posted' })
                closeModal()
            })
            .catch(error => showError({ message: 'Something went wrong, Try Again' }))
    }

    return (
        <Box>
            <HStack mt={30} alignItems={'flex-start'} w={'full'}>
                <Avatar />
                <Box px={5} w={'full'} >
                    <Textarea value={content} onChange={(e) => setContent(e.target.value)} variant={'unstyled'} placeholder={'What would you like to say?'} />
                </Box>
            </HStack>


            {forum
                ? <></>
                : <>
                    <Divider mb={1} mt={5} />
                    <Box w={{ base: '50%', lg: '40%' }} >
                        <FormLabel fontSize={'xs'} >Privacy</FormLabel>
                        <Select onChange={(e) => setPrivacy(eval(e.target.value))} value={privacy} size={'sm'}>
                            <option value={false}>Public</option>
                            <option value={true}>Connect Members Only</option>
                        </Select>
                        <Text p={3} fontWeight={'medium'} fontSize={'xx-small'} textTransform={'uppercase'} >{`Posting to ${location?.area} public forum`}</Text>
                    </Box>
                </>}

            <Box>
                <Divider mb={1} mt={5} />

                {files.length === 0
                    ? <></>
                    :
                    <HStack {...scrollCSS} py={5} h={150} w={'full'} >
                        {files.map((file) => (
                            <FileUploadContainer key={file.id} file={file} uid={user.uid} handleSuccessiveFile={handleSuccessiveFile} handleDeleteSuccessive={handleDeleteSuccessive} />
                        ))}
                    </HStack>
                }



                <Tooltip label={'Attach files'}>
                    <IconButton onClick={onToggle} borderRadius={0} w={'full'} variant={'ghost'} colorScheme={'linkedin'} size={'sm'} icon={<FeatherIcon size={18} icon={'upload'} />} />
                </Tooltip>
                <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }} >
                    <Box mx={{ base: 0, lg: 40 }} boxShadow={'-2px -3px 16px -1px rgba(0,0,0,0.64)'} borderTopRadius={30} p={10} bgColor={'gray.800'}>
                        <Input onChange={handleFileUpload} color={'white'} type={'file'} />
                    </Box>
                </Slide>
            </Box>

            <Divider my={2} />
            <HStack spacing={5} justifyContent={'flex-end'} alignItems={'center'}>
                <Tooltip label={'Post'}>
                    <Button
                        disabled={(content === '') && (successFiles.length === 0)}
                        onClick={handleSumbitPost}
                        colorScheme={'messenger'}
                        w={'20%'}
                        fontSize={'xs'}
                        textTransform={'uppercase'}
                        size={'md'}
                        icon={<FeatherIcon size={14} icon={'upload'} />}
                    >Post</Button>
                </Tooltip>
            </HStack>
        </Box>
    );
}
