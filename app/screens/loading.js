import React from 'react'

import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'



const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        alignItems: 'center'
    }
})



export default function Loading() {
    return (
        <Layout style={styles.container} >
            <Text>Loading</Text>
        </Layout>
    )
}

