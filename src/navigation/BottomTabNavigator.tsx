import React from 'react';

import {
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import {
    Ionicons,
} from '@expo/vector-icons';

import { CommunityScreen, GrowScreen, HomeHubScreen, WatchScreen } from '../screens/AppSections';
import MoreScreen from '../screens/MoreScreen';
import { colors } from '../theme';

const Tab =
    createBottomTabNavigator();

export default function BottomTabNavigator() {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({

                headerShown: false,

                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopWidth: 0,
                    height: 72,
                    paddingTop: 6,
                    borderTopLeftRadius: 24,
                    borderTopRightRadius: 24,
                    position: 'absolute',
                },

                tabBarActiveTintColor:
                    colors.coral,

                tabBarInactiveTintColor:
                    colors.muted,

                tabBarIcon: ({
                    color,
                    size,
                }) => {

                    let iconName:
                        any = 'home';

                    if (
                        route.name ===
                        'Home'
                    ) {
                        iconName =
                            'home';
                    }

                    if (route.name === 'Watch') iconName = 'play-circle';
                    if (route.name === 'Grow') iconName = 'leaf';
                    if (route.name === 'Community') iconName = 'people';
                    if (route.name === 'More') iconName = 'grid';

                    return (
                        <Ionicons
                            name={
                                iconName
                            }
                            size={size}
                            color={
                                color
                            }
                        />
                    );
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={
                    HomeHubScreen
                }
            />

            <Tab.Screen
                name="Watch"
                component={WatchScreen}
            />

            <Tab.Screen
                name="Grow"
                component={GrowScreen}
            />

            <Tab.Screen
                name="Community"
                component={CommunityScreen}
            />

            <Tab.Screen name="More" component={MoreScreen} />
        </Tab.Navigator>
    );
}
