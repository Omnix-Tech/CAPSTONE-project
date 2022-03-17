import React from 'react'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import { Box } from 'native-base'

const Steps = createBottomTabNavigator()
const stepOptions = {
    labeled: false,
    tabBarStyle: {
        height: 50,
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0
    }
}

const navStepOptions = () => {
    const activeColor = '#06b6d4'
    const inActiveColor = '#dbf4ff'

    return {
        tabBarLabel: () => null,
        headerShown: false,
        tabBarIcon: ({ focused }) => <Icon type={'feather'} name={'circle'} color={focused ? activeColor : inActiveColor} />
    }
}


const Placeholder = () => <Box></Box>


export default function SetupStepNavigation() {
    return (
        <Steps.Navigator screenOptions={stepOptions}>
            <Steps.Screen name='first' component={Placeholder} options={navStepOptions} />  
            <Steps.Screen name='second' component={Placeholder} options={navStepOptions} />    
            <Steps.Screen name='third' component={Placeholder} options={navStepOptions} />  
            <Steps.Screen name='fourth' component={Placeholder} options={navStepOptions} />  
        </Steps.Navigator>
    )
}