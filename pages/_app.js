import '../styles/globals.css'

import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ChakraProvider, VStack, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router'


const { auth } = require('../config/firebase.config')



function MyApp({ Component, pageProps, ...props }) {

  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()

  React.useEffect(() => {
    if (!loading) {
      if (user) {
        if (router.pathname.includes('/auth')) {
          router.replace('/')
        }
      } else {
        if (!router.pathname.includes('/auth')) {
          router.replace('/auth')
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, user])



  return (
    <ChakraProvider>
      {loading
        ? <VStack w={'100vw'} h={'100vh'} justifyContent={'center'} alignItems={'center'} ><Spinner /></VStack>
        : <Component {...pageProps} user={user} />}
    </ChakraProvider>
  )



}

export default MyApp