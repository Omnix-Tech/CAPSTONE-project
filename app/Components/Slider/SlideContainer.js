import { StyleSheet, View, useWindowDimensions } from "react-native";



export default function SlideContainer({ children }) {
    const { width } = useWindowDimensions()
    return (
        <View style={{ width, ...styles.container }}>
            {children}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})