import { View, StyleSheet, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { cancelAnimation, runOnUI, useSharedValue, withRepeat, withSequence, withTiming } from 'react-native-reanimated'
import { withPause } from 'react-native-redash'
const SequenceBounce = () => {
    const translateY = useSharedValue(0)
    const paused = useSharedValue(false);
    const toggle = () => {
        'worklet';
        paused.value = !paused.value;
    }
    const animate = () => {
        'worklet';
        translateY.value = withPause(withSequence(
            withTiming(-100, { duration: 3000 }),
            withTiming(50, { duration: 3000 }),
            withTiming(0, { duration: 3000 }),
            withTiming(50, { duration: 3000 }),
            withTiming(100, { duration: 3000 })
        ), paused)
    }
    const stop = () => {
        cancelAnimation(translateY)
    }
    useEffect(() => {
        runOnUI(animate)()
    }, [])
    return (
        <View style={styles.container}>
            <Pressable onPress={() => { runOnUI(toggle)() }}>
                <Animated.View style={[styles.circle, {
                    transform: [{ translateY }]
                }]} />
            </Pressable>
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
export default SequenceBounce