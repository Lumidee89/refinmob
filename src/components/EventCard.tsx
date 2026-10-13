import React from 'react';
import { assetUrl } from '../api/axios';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { Event } from '../types/event';
import { colors, shadows } from '../theme';

interface Props {
    event: Event;
    onPress: () => void;
}

export default function EventCard({
    event,
    onPress,
}: Props) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: colors.surface,
                borderRadius: 24,
                overflow: 'hidden',
                marginBottom: 20,
                ...shadows.card,
            }}
        >
            <Image
                source={{
                    uri: event.banner
                        ? assetUrl(event.banner)
                        : 'https://placehold.co/600x350',
                }}
                style={{
                    width: '100%',
                    height: 200,
                }}
            />

            <View style={{ padding: 20 }}>
                <Text
                    style={{
                        color: colors.coral,
                        fontWeight: '700',
                    }}
                >
                    {event.event_date}
                </Text>

                <Text
                    style={{
                        color: colors.text,
                        fontSize: 20,
                        fontWeight: '700',
                        marginTop: 8,
                    }}
                >
                    {event.title}
                </Text>

                <Text
                    style={{
                        color: colors.muted,
                        marginTop: 5,
                    }}
                >
                    {event.location}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
