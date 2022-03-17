import React from 'react'
import { View, Animated, StyleSheet, useWindowDimensions } from 'react-native'


export default function Paginator({ data, scrollx, paginationColor }) {
    const { width } = useWindowDimensions()

    return (
        <View style={styles.paginatorHorizontal}>
            {data.map((_, index) => {
                const inputRange = [(index - 1) * width, index * width, (index + 1) * width]

                const dotWidth = scrollx.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp'
                })

                const opacity = scrollx.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp'
                })
                return <Animated.View style={[styles.dot, { width: dotWidth, opacity, backgroundColor: paginationColor ? paginationColor :  "#493d8a"}]} key={index.toString()} />
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    paginatorHorizontal: {
        flexDirection: 'row',
        height: 64,
        justifyContent: 'center'
    },

    dot: {
        height: 10,
        borderRadius: 10,
        marginHorizontal: 8
    }
})