import React from 'react'

import { StyleSheet } from 'react-native'
import { Layout, Button, ButtonGroup } from '@ui-kitten/components'

const styles = StyleSheet.create({
    btn: {
        color: 'white'
    }
})

export default function Landing() {
    return (
        <Layout>
            <ButtonGroup>
                <Button>Login</Button>
                <Button>Register</Button>
            </ButtonGroup>
        </Layout>
    )
}