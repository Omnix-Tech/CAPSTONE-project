import { HStack, Box } from 'native-base'
import React, { useState, useRef, useEffect } from 'react'
import { Animated, View, FlatList } from 'react-native'
import Paginator from './Paginator'

import NextButton from './NextButton'
import PrevButton from './PrevButton'

export default function Slider({ data, renderItem, keyExtractor, scrollEnabled, nextButtonComponent, prevButtonComponent, paginationColor, backgroundColour }) {
    const scrollx = useRef(new Animated.Value(0)).current
    const [currentIndex, setCurrentIndex] = useState(0)
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true)
    const [nextButtonDisabled, setNextButtonDisabled] = useState(false)


    const slider = useRef(null)


    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        setCurrentIndex(viewableItems[0].index)
    }).current

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current

    const scrollNext = () => {
        if (currentIndex < data.length - 1) {
            slider.current.scrollToIndex({
                index: currentIndex + 1
            })
        }
    }

    const scrollBack = () => {
        if (currentIndex > 0) {
            slider.current.scrollToIndex({
                index: currentIndex - 1
            })
        }
    }

    const NextBtn = ({ onPress, disabled }) => {
        return nextButtonComponent ? nextButtonComponent({ onPress, disabled }) : <NextButton onPress={onPress} disabled={disabled} />
    }

    const PrevBtn = ({ onPress, disabled }) => {
        return prevButtonComponent ? prevButtonComponent({ onPress, disabled }) : <PrevButton onPress={onPress} disabled={disabled} />
    }


    useEffect(() => {

        currentIndex === 0 ? setPrevButtonDisabled(true) : setPrevButtonDisabled(false)
        currentIndex < data.length - 1 ? setNextButtonDisabled(true) : setNextButtonDisabled(false)

    }, [currentIndex])

    return (
        <>
            <View style={{ flex: 1 }} >
                <FlatList
                    data={data}
                    renderItem={(props) => renderItem({scrollBack, scrollNext ,...props})}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    bouncing={false}
                    keyExtractor={keyExtractor ? keyExtractor : (_, key) => key}

                    onScroll={Animated.event([
                        {
                            nativeEvent: {
                                contentOffset: { x: scrollx }
                            }
                        }
                    ], {
                        useNativeDriver: false
                    })}

                    scrollEventThrottle={32}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    ref={slider}
                    scrollEnabled={scrollEnabled ? scrollEnabled : false}
                />
            </View>
            <Box bgColor={backgroundColour ? backgroundColour : 'light.100'}>
                <Paginator data={data} scrollx={scrollx} paginationColor={paginationColor} />

                <HStack paddingBottom={10} paddingX={8} justifyContent={'space-between'} alignItems={'center'}>
                    <PrevBtn onPress={scrollBack} disabled={prevButtonDisabled} />

                    {nextButtonDisabled ? <NextBtn onPress={scrollNext} /> : <></>}

                </HStack>
            </Box>


        </>
    )
}