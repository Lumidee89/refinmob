import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import {
    useAudioPlayer,
} from '../context/AudioPlayerContext';

export default function MiniPlayer() {

    const {
        currentSermon,
        isPlaying,
        togglePlayback,
    } =
        useAudioPlayer();

    if (!currentSermon)
        return null;

    return (

        <View
            style={{
                position:
                    'absolute',
                bottom: 80,
                left: 15,
                right: 15,
                backgroundColor:
                    '#111827',
                borderRadius: 24,
                padding: 16,
                flexDirection:
                    'row',
                justifyContent:
                    'space-between',
                alignItems:
                    'center',
            }}
        >

            <View
                style={{
                    flex: 1,
                }}
            >

                <Text
                    numberOfLines={1}
                    style={{
                        color:
                            '#fff',
                        fontWeight:
                            '700',
                    }}
                >
                    {
                        currentSermon.title
                    }
                </Text>

                <Text
                    style={{
                        color:
                            '#9CA3AF',
                    }}
                >
                    {
                        currentSermon.speaker
                    }
                </Text>

            </View>

            <TouchableOpacity
                onPress={
                    togglePlayback
                }
            >

                <Text
                    style={{
                        color:
                            '#FDB827',
                        fontWeight:
                            '700',
                    }}
                >
                    {isPlaying
                        ? 'Pause'
                        : 'Play'}
                </Text>

            </TouchableOpacity>

        </View>

    );
}