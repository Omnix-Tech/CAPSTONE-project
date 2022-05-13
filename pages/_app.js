import '../styles/globals.css'

import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import Loading from '../components/Loading'
import useGeolocation from '../controller/hooks/useGeolocation'
import useAuthData from '../controller/hooks/useAuthData'



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
  const { user, userDoc: doc, loading } = useAuthData()
  const { position, locations, error } = useGeolocation()


  const router = useRouter()

  React.useEffect(() => {
    if (!loading) {
      if (user && doc) {
        if (!doc.verified && doc.isRegistered) {
          router.replace('/verify')
        } else {
          if (router.pathname.includes('/auth')) router.replace('/')
        }
      } else if (user === null) {
        router.replace('/auth')
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, loading, user])



  return (
    <ChakraProvider resetCSS theme={extendedThemeO}>

      {loading ? <Loading /> :
        <Component
          {...pageProps}
          userDoc={doc}
          user={user}
          position={position}
          locations={locations}
        />}

    </ChakraProvider>
  )
}

export default MyApp
