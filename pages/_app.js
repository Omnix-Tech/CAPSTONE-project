import '../styles/globals.css'

import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Center, Alert, AlertDescription, AlertIcon, AlertTitle, Box, ChakraProvider, CloseButton, extendTheme, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import Loading from '../components/Loading'
import useGeolocation from '../controller/hooks/useGeolocation'
import useAlert from '../controller/hooks/useAlert'
import { AlertContext } from '../controller/context'


const { auth } = require('../app/config/firebase.config')


const extendedThemeO = extendTheme({
  components: {
    Button: {
      baseStyle: {
        _focus: {
          outline: 'none',
          boxShadow: 'none'
        }
      }
    }
  }
})

function MyApp({ Component, pageProps, ...props }) {
  const [user, loading] = useAuthState(auth)
  const { position, locations, error } = useGeolocation()
  const router = useRouter()


  const { isLoading, isOpen, onClose, handleOpenAlert, message, heading, status } = useAlert()
  const alerts = React.useMemo(() => {
    return { alert: handleOpenAlert }
  }, [handleOpenAlert])



  React.useEffect(() => {
    if (!loading) {
      if (user && router.pathname.includes('/auth')) router.replace('/')
      if (!user && !router.pathname.includes('/auth')) router.replace('/auth')
      if (!user && router.pathname.includes('/auth')) router.replace('/auth')
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user])



  return (
    <ChakraProvider resetCSS theme={extendedThemeO}>
      
      
      <AlertContext.Provider value={alerts} >
        {loading ? <Loading /> :
          <Component
            {...pageProps}
            user={user}
            position={position}
            locations={locations}
          />}
      </AlertContext.Provider>
      <Alert zIndex={'toast'} status={status} display={isOpen ? 'flex' : 'none'} borderRadius={30} position={'fixed'} width={350} bottom={{ base: 90, md: 10 }} right={{ base: 10, md: 90 }} >

        {isLoading ?
          <Center width={'full'}><Spinner /></Center>
          :
          <>
            <AlertIcon />
            <Box>
              {heading === '' ? <></> : <AlertTitle>{heading}</AlertTitle>}
              {message === '' ? <></> : <AlertDescription>{message}</AlertDescription>}
            </Box>
            <CloseButton borderRadius={'full'} onClick={onClose} position='absolute' right='8px' top='8px' />
          </>}


      </Alert>

    </ChakraProvider>
  )
}

export default MyApp
