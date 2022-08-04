import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import colors from '../config/colors';
import AppText from './AppText';

function Card({ title, subTitle, image, onPress, thumbnailUrl }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card}>
                <Image style={styles.image} tint="light" preview={{ uri: thumbnailUrl }} uri={image} />
                <View style={styles.detailsContainer}>
                    <AppText style={styles.title}>{title}</AppText>
                    <AppText style={styles.subTitle}>{subTitle}</AppText>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: 'hidden'
    },
    detailsContainer: {
        padding: 20
    },
    image: {
        width: '100%',
        height: 200
    },
    subTitle: {
        color: colors.secondary,
        fontWeight: 'bold'
    },
    title: {
        marginBottom: 7
    }
})

export default Card;