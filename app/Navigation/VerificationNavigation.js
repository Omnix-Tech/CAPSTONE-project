import React from 'react'
import { Button, Heading } from 'native-base'
import { Icon } from 'react-native-elements'

import Slider from '../Components/Slider'
import SlideContainer from '../Components/Slider/SlideContainer'


import InformationScreen from '../Screens/AuthScreens/VerificationScreens/InformationScreen'
import IdScanScreen from '../Screens/AuthScreens/VerificationScreens/IdScanScreen'

function Container({ item: Item, ... props }) {
    return <SlideContainer><Item.Element {... Item.props} /></SlideContainer>
}

const slideContent = [
    {
        Element: (props) => <InformationScreen {... props} />,
        props: {
            name: 'Joel Henry'
        }
    },
    {
        Element: (props) => <IdScanScreen {... props} />,
        props: {
            name: 'Joel Henry'
        }
    }
]


export default function VerificationStepNavigation({ navigation }) {
    return (
        <Slider
            data={slideContent}
            renderItem={Container}
            paginationColor={'#a5f3fc'}
            backgroundColour={'#1c1917'}
        />
    )
}