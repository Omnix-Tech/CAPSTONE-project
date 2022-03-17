import { HStack, Text } from 'native-base';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { PressableContainer } from '../components';

export default function NextButton({ onPress, disabled }) {
    return (
        <TouchableOpacity>
            <PressableContainer borderRadius={50} padding={3} bgColor={'amber.400'} onPress={onPress} disabled={disabled}>
                <HStack justifyContent={'space-between'} alignItems={'center'}>
                    <Text fontSize={20} width={'40%'} fontWeight={'bold'} color={'light.800'}>
                        Next
                    </Text>
                    <Icon type='feather' name='arrow-right' />
                </HStack>

            </PressableContainer>
        </TouchableOpacity>
    );
}
