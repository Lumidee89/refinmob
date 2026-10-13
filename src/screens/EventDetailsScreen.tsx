import React from 'react';

import {
    ScrollView,
    SafeAreaView,
    View,
    Text,
    Image,
} from 'react-native';
import { assetUrl } from '../api/axios';

export default function EventDetailsScreen({
    route,
}: any) {

    const { event } = route.params;

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#F5F4F8',
            }}
        >
            <ScrollView>

                <Image
                    source={{
                        uri: event.banner
                            ? assetUrl(event.banner)
                            : 'https://placehold.co/600x350',
                    }}
                    style={{
                        width: '100%',
                        height: 300,
                    }}
                />

                <View
                    style={{
                        padding: 20,
                    }}
                >

                    <Text
                        style={{
                            color: '#FF8466',
                            fontWeight: '700',
                        }}
                    >
                        {event.event_date}
                    </Text>

                    <Text
                        style={{
                            color: '#14213D',
                            fontSize: 30,
                            fontWeight: '800',
                            marginTop: 10,
                        }}
                    >
                        {event.title}
                    </Text>

                    <Text
                        style={{
                            color: '#6D7890',
                            marginTop: 10,
                        }}
                    >
                        {event.location}
                    </Text>

                    <Text
                        style={{
                            color: '#344054',
                            marginTop: 25,
                            lineHeight: 28,
                        }}
                    >
                        {event.description}
                    </Text>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
