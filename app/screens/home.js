import React from 'react'

import { StyleSheet } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})


export default function HomeScreen() {
    return (
        <Layout style={styles.container}>
            <Text category={'h1'}>Home Screen</Text>
        </Layout>
    )
}