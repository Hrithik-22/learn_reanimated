import { View, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { runOnJS, runOnUI, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

const FadeInButton: () => React.JSX.Element = () => {
    const [shouldMount, setShouldMount] = useState(true)
    const opacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        }
    }, []);
    const unMountCircle = () => {
        setShouldMount(false);
    }
    useEffect(() => {
        const fadeIn = () => {
            'worklet';
            opacity.value = withTiming(1, { duration: 3000 }, (finished) => {
                //when need something from the thread
                //Brings data or actions back to the JavaScript thread.
                finished && runOnJS(unMountCircle)()
            })
        }
        // run on the ui thread
        //need 'worklet'makes it workletized function
        runOnUI(fadeIn)()
    }, [])
    return (
        <View style={styles.container}>
            {
                shouldMount &&
                <Animated.View style={[styles.circle, animatedStyle]} />

            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        width: 100,
        height: 100,
        backgroundColor: '#ffce1b',
        borderRadius: 50,
    },
})
export default FadeInButton