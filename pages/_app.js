import '../styles/globals.css'

import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import Loading from '../components/Loading'
import useGeolocation from '../controller/hooks/useGeolocation'


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
  const {position, locations, error} = useGeolocation()
  
  
  const router = useRouter()


  React.useEffect(() => {
    if (!loading && user && router.pathname.includes('/auth')) router.replace('/')
    if (!loading && !user && !router.pathname.includes('/auth')) router.replace('/auth')
    if (!loading && !user && router.pathname.includes('/auth')) router.replace('/auth')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])
  
  return (
    <ChakraProvider resetCSS theme={extendedThemeO}>
      {loading ? <Loading /> :
        <Component
          {...pageProps}
          user={user}
          position={position}
          locations={locations}
        />}
    </ChakraProvider>
  )
}

export default MyApp
