import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

export default function FirstTimerCTA({
    onPress,
}: any) {

    return (
        <View
            style={{
                marginHorizontal: 20,
                marginBottom: 20,
                backgroundColor: '#FDB827',
                borderRadius: 30,
                padding: 25,
            }}
        >
            <Text
                style={{
                    color: '#000',
                    fontSize: 28,
                    fontWeight: '700',
                }}
            >
                New Here?
            </Text>

            <Text
                style={{
                    color: '#111827',
                    marginTop: 10,
                }}
            >
                We'd love to connect with you.
            </Text>

            <TouchableOpacity
                onPress={onPress}
                style={{
                    marginTop: 20,
                    backgroundColor: '#000',
                    padding: 14,
                    borderRadius: 16,
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: '700',
                    }}
                >
                    I'm A First Timer
                </Text>
            </TouchableOpacity>
        </View>
    );
}