import React, { useEffect, useState, useRef } from 'react'
import { Camera } from 'expo-camera'
import { Box, Button, Text, IconButton } from 'native-base'
import { StyleSheet, useWindowDimensions } from 'react-native'
import { Icon } from 'react-native-elements'
import { Platform } from 'react-native'


export default ({ closeCamera, ...props }) => {
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [photo, setPhoto] = useState(null)

    const camera = useRef(null)

    // const [cameraPadding, setCameraPadding] = useState(0)
    // const [ratio, setRatio] = useState('4:3')
    // const { height, width } = useWindowDimensions()
    // const screenRatio = height / width
    // const [isRatioSet, setIsRatioSet] = useState(false)

    
    useEffect(async () => {
        await (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })();
    }, [])

    if (hasPermission === null) {
        return <Box {...props}><Text>Permission Required</Text></Box>
    }

    if (hasPermission === false) {
        return <Box {...props} ><Text>No access to camera</Text></Box>
    }

    const handleSetType = () => {
        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)
    }

    const snap = async () => {
        if (camera) {
            setPhoto(await camera.takePictureAsync())
        }
    }

    return (
        <Box {...props} bgColor={'black'}>
            <Camera style={{ marginTop: 50, marginBottom: 30, ...styles.camera }} ratio={'16:9'}>
                
            </Camera>

        </Box>
    )
}


const styles = StyleSheet.create({
    camera: {
        width: '100%',
        height: '100%'
    }
})
