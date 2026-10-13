import React from 'react';

import {
    NavigationContainer,
} from '@react-navigation/native';

import {
    createNativeStackNavigator,
} from '@react-navigation/native-stack';

import BottomTabNavigator from './BottomTabNavigator';

import SermonDetailsScreen from '../screens/SermonDetailsScreen';
import BlogDetailsScreen from '../screens/BlogDetailsScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';

import LiveScreen from '../screens/LiveScreen';
import GivingScreen from '../screens/GivingScreen';
import PrayerRequestScreen from '../screens/PrayerRequestScreen';
import FirstTimerScreen from '../screens/FirstTimerScreen';
import TestimoniesScreen from '../screens/TestimoniesScreen';
import SermonsScreen from '../screens/SermonsScreen';
import EventsScreen from '../screens/EventsScreen';
import ContentListScreen from '../screens/ContentListScreen';
import ConnectRequestScreen from '../screens/ConnectRequestScreen';
import { ConnectScreen, GiveScreen, ProfileScreen } from '../screens/AppSections';
import AuthScreen from '../screens/AuthScreen';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import { colors } from '../theme';
import MyPrayerRequestsScreen from '../screens/MyPrayerRequestsScreen';

const Stack =
    createNativeStackNavigator();

export default function RootNavigator({ onNavigationChange }: { onNavigationChange?: () => void }) {
    const { user, loading } = useAuth();

    if (loading) return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background }}><ActivityIndicator color={colors.coral} /></View>;

    return (
        <NavigationContainer onStateChange={onNavigationChange}>

            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}
            >

                {!user ? (
                    <Stack.Screen name="Authentication" component={AuthScreen} />
                ) : (<>

                <Stack.Screen
                    name="Main"
                    component={
                        BottomTabNavigator
                    }
                />

                <Stack.Screen
                    name="Live"
                    component={
                        LiveScreen
                    }
                />

                <Stack.Screen
                    name="Giving"
                    component={
                        GivingScreen
                    }
                />

                <Stack.Screen
                    name="PrayerRequest"
                    component={
                        PrayerRequestScreen
                    }
                />

                <Stack.Screen
                    name="FirstTimer"
                    component={
                        FirstTimerScreen
                    }
                />

                <Stack.Screen
                    name="Testimonies"
                    component={
                        TestimoniesScreen
                    }
                />

                <Stack.Screen name="Sermons" component={SermonsScreen} />
                <Stack.Screen name="Events" component={EventsScreen} />
                <Stack.Screen name="ContentList" component={ContentListScreen} />
                <Stack.Screen name="ConnectRequest" component={ConnectRequestScreen} />
                <Stack.Screen name="ConnectHub" component={ConnectScreen} />
                <Stack.Screen name="GiveHub" component={GiveScreen} />
                <Stack.Screen name="ProfileHub" component={ProfileScreen} />
                <Stack.Screen name="MyPrayerRequests" component={MyPrayerRequestsScreen} />

                <Stack.Screen
                    name="SermonDetails"
                    component={
                        SermonDetailsScreen
                    }
                />

                <Stack.Screen
                    name="BlogDetails"
                    component={
                        BlogDetailsScreen
                    }
                />

                <Stack.Screen
                    name="EventDetails"
                    component={
                        EventDetailsScreen
                    }
                />

                </>)}

            </Stack.Navigator>

        </NavigationContainer>
    );
}
