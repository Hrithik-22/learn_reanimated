import { View, StyleSheet, Easing } from 'react-native'
import React, { useEffect, useState } from 'react'
import Animated, { runOnJS, runOnUI, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'

const FadeInButton: () => React.JSX.Element = () => {
    // const [shouldMount, setShouldMount] = useState(true)
    const opacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        }
    }, []);
    // const unMountCircle = () => {
    //     setShouldMount(false);
    // }
    const fadeIn = () => {
        'worklet';
        opacity.value = withRepeat(withTiming(1, { duration: 2000 }), 5, false)
    }
    // const fadeIn = () => {
    //     'worklet';
    //     opacity.value =
    //             withTiming(1, { duration: 300 }, (finished) => {
    //                 //when need something from the thread
    //                 //Brings data or actions back to the JavaScript thread.
    //                 finished && runOnJS(unMountCircle)()
    //             })
    // }
    useEffect(() => {
        // run on the ui thread
        //need 'worklet'makes it workletized function
        runOnUI(fadeIn)()
    }, [])
    return (
        <View style={styles.container}>

            <Animated.View style={[styles.circle, animatedStyle]} />


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