import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Image } from 'react-native-expo-image-cache'
import AppText from '../components/AppText';
import colors from '../config/colors';
import ListItem from '../components/ListItem';

import ContactSellerForm from '../components/ContactSellerForm.js'

function ListingDetailsScreen({ route }) {
    const listing = route.params
    return (
        <ScrollView >
            <Image style={styles.image} preview={{ uri: listing.images[0].thumbnailUrl }} tint="light" uri={listing.images[0].url} />
            <View style={styles.detailsContainer}>
                <AppText style={styles.title}>{listing.title}</AppText>
                <AppText style={styles.price}>${listing.price}</AppText>
                <View style={styles.userContainer}>
                    <ListItem
                        image={require("../assets/mosh.jpg")}
                        title="Amit Rozen"
                        subTitle="5 Listings"
                    />
                </View>
                <ContactSellerForm listing={listing} />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    price: {
        color: colors.secondary,
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10
    },
    title: {
        fontSize: 24,
        fontWeight: '500'
    },
    userContainer: {
        marginVertical: 40
    }
})

export default ListingDetailsScreen;