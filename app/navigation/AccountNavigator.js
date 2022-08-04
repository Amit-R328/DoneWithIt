import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import AccountScreen from '../screens/AccountScreen';
import MessageScreen from '../screens/MessageScreen';
import ListingsScreen from '../screens/ListingsScreen';

const Stack = createStackNavigator()

const AccountNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name="Account" component={AccountScreen} />
        <Stack.Screen name="Messages" component={MessageScreen} />
        <Stack.Screen name="Listings" component={ListingsScreen} />
    </Stack.Navigator>
)

export default AccountNavigator