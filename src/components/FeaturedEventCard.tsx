import React from 'react';
import { assetUrl } from '../api/axios';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

export default function FeaturedEventCard({
    event,
    onPress,
}: any) {

    if (!event) return null;

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                marginHorizontal: 20,
                marginTop: 25,
                borderRadius: 28,
                overflow: 'hidden',
                backgroundColor: '#111827',
            }}
        >
            <Image
                source={{
                    uri: assetUrl(event.banner),
                }}
                style={{
                    width: '100%',
                    height: 220,
                }}
            />

            <View
                style={{
                    padding: 20,
                }}
            >
                <Text
                    style={{
                        color: '#FDB827',
                        fontWeight: '700',
                    }}
                >
                    UPCOMING EVENT
                </Text>

                <Text
                    style={{
                        color: '#fff',
                        fontSize: 22,
                        fontWeight: '700',
                        marginTop: 10,
                    }}
                >
                    {event.title}
                </Text>

                <Text
                    style={{
                        color: '#9CA3AF',
                        marginTop: 5,
                    }}
                >
                    {event.event_date}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
