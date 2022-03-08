
import { Box, Pressable } from "native-base"
import { LinearGradient } from "expo-linear-gradient"
// import Carousel from "react-native-snap-carousel"

export function Container({ children, ...props }) { return (<Box padding={3} {...props}>{children}</Box>) }

export function PressableContainer({ children, color, ...props }) {

    return (
        <Pressable bgColor={color} {...props} >
            {children}
        </Pressable>
    )


}

// export function CarouselComponent({ data, renderComponent, ...props }) {


//     return (
//         <Carousel
//             renderItem={renderComponent}
//             data={data}
//             { ... props }
//         />
//     )
// }