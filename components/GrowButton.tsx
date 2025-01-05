import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
const GrowButton: () => React.JSX.Element = () => {
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }]
        };
    }, []);
    const handlePress = () => {
        scale.value = withTiming(scale.value + 0.3)
    }
    return (
        <View style={styles.container}>
            <Pressable onPress={handlePress}>
                <Animated.View style={[styles.circle, animatedStyle]}>
                    <Text style={styles.text}>Click Me</Text>
                </Animated.View>
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
        position: 'relative'
    },
    text: {
        textAlign: "center",
        position: 'absolute',
        top: "43%",
        left: "20%",
    }

})
export default GrowButton;