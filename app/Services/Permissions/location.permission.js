
import * as Location from 'expo-location'


export default () => {
    return {
        location: async () => {
            const { status } = await Location.requestForegroundPermissionsAsync().catch(error => { throw error })
            if (status !== 'granted') {
                throw new Error('Permission to access location was denied')
            }
            const location = await Location.getCurrentPositionAsync({}).catch(error => { throw error })
            return location
        }
    }
}