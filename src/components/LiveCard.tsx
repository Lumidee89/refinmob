import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import { Livestream } from '../types/livestream';

interface LiveCardProps {
    stream: Livestream | null;
    onPress: () => void;
}

export default function LiveCard({
    stream,
    onPress,
}: LiveCardProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: '#DC2626',
                borderRadius: 28,
                marginHorizontal: 20,
                marginVertical: 20,
                padding: 24,
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        width: 14,
                        height: 14,
                        borderRadius: 20,
                        backgroundColor: '#fff',
                        marginRight: 10,
                    }}
                />

                <Text
                    style={{
                        color: '#fff',
                        fontWeight: '700',
                        fontSize: 18,
                    }}
                >
                    LIVE NOW
                </Text>
            </View>

            <Text
                style={{
                    color: '#fff',
                    fontSize: 24,
                    fontWeight: '700',
                    marginTop: 15,
                }}
            >
                {stream?.title || 'Sunday Worship Service'}
            </Text>

            <Text
                style={{
                    color: '#FDE68A',
                    marginTop: 10,
                }}
            >
                Tap to watch live
            </Text>
        </TouchableOpacity>
    );
}