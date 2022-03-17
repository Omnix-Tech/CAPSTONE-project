import React from 'react';
import { IconButton, Text } from 'native-base';
import { Icon } from 'react-native-elements'
import { PressableContainer } from '../components';

export default function PrevButton({ onPress, disabled }) {
    return (
        <PressableContainer onPress={onPress} paddingY={5} >
            <Text fontWeight={'bold'} color={disabled ? 'transparent' : 'light.100'}>BACK</Text>
        </PressableContainer>
    );
}
