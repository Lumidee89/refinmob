import React from 'react';
import { assetUrl } from '../api/axios';

import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { Sermon } from '../types/sermon';
import { colors, shadows } from '../theme';

interface SermonCardProps {
    sermon: Sermon;
    onPress: () => void;
}

export default function SermonCard({
    sermon,
    onPress,
}: SermonCardProps) {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: '100%',
                backgroundColor: colors.surface,
                borderRadius: 22,
                overflow: 'hidden',
                marginBottom: 16,
                ...shadows.card,
            }}
        >
            <Image
                source={{
                    uri: sermon.thumbnail
                        ? assetUrl(sermon.thumbnail)
                        : 'https://placehold.co/600x350',
                }}
                style={{
                    height: 180,
                    width: '100%',
                }}
            />

            <View
                style={{
                    padding: 17,
                }}
            >
                <View
                    style={{
                        alignSelf: 'flex-start',
                        backgroundColor:
                            sermon.type === 'video'
                                ? colors.coral
                                : colors.navy,
                        borderRadius: 50,
                        paddingHorizontal: 12,
                        paddingVertical: 4,
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 12,
                            fontWeight: '700',
                        }}
                    >
                        {sermon.type.toUpperCase()}
                    </Text>
                </View>

                <Text
                    numberOfLines={2}
                    style={{
                        color: colors.text,
                        fontSize: 18,
                        fontWeight: '700',
                        marginTop: 10,
                    }}
                >
                    {sermon.title}
                </Text>

                <Text
                    style={{
                        color: colors.muted,
                        marginTop: 4,
                    }}
                >
                    {sermon.speaker}
                </Text>
            </View>
        </TouchableOpacity>
    );
}
