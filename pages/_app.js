import '../styles/globals.css'

import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { getCurrentPosition } from '../controller/services/geolocation'
import { getLocations } from '../controller/handlers'
import { collection, doc, getDocs, query, where } from '@firebase/firestore'
import Loading from '../components/Loading'


const { auth, firestore } = require('../app/config/firebase.config')


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
  const [position, setPosition] = React.useState(null)
  const [locations, setLocations] = React.useState([])
  const [connects, setConnects] = React.useState([])
  const [currentConnect, setCurrentConnect] = React.useState(null)



  const [user, loading] = useAuthState(auth)
  const router = useRouter()


  const handleSetCurrentLocations = () => {
    if (position) {
      getLocations(position)
        .then(locations => setLocations(locations.locations))
        .catch(error => alert(error.message))
    }
  }

  const handleSetCurrentPosition = () => {
    getCurrentPosition(setPosition)
  }

  const handleSetUserConnects = () => {
    if (user) {
      getDocs(
        query(
          collection(firestore, 'User_Location'),
          where('user', '==', doc(firestore, `Users/${user?.uid}`))
        )
      )
        .then(querySnapshot => {
          const docs = querySnapshot.docs
          setConnects(docs.map(doc => doc.data()))
        })
        .catch(error => alert(error.message))
    }
  }


  const handleSetCurrentConnect = (connect = null) => {
    if (connects.length > 0) {
      if (!connect) setCurrentConnect(connects[0])
    }
  }


  React.useEffect(() => {

    if (!position) handleSetCurrentPosition()
    if (position) handleSetCurrentLocations()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position])


  React.useEffect(() => {
    if (!loading && user && router.pathname.includes('/auth')) router.replace('/')
    if (loading && !router.pathname.includes('/auth')) router.replace('/auth')
    if (user) handleSetUserConnects()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  React.useEffect(() => {
    if (connects.length > 0) handleSetCurrentConnect()
  }, [connects])

  
  return (
    <ChakraProvider resetCSS theme={extendedThemeO}>
      {loading ? <Loading /> :
        <Component
          {...pageProps}
          user={user}
          position={position}
          locations={locations}
          connects={connects}
          currentConnect={currentConnect}
        />}
    </ChakraProvider>
  )
}

export default MyApp
