import React from 'react';
import Constatnts from 'expo-constants'
import { SafeAreaView, StyleSheet } from 'react-native'

function Screen({ children, style }) {
    return (
        <SafeAreaView style={[styles.screen, style]}>
            {children}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        paddingTop: Constatnts.statusBarHeight,
        flex: 1
    }
})

export default Screen;