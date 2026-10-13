import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

export default function PrayerCTA({
    onPress,
}: any) {

    return (
        <View
            style={{
                margin: 20,
                backgroundColor: '#1486D4',
                borderRadius: 30,
                padding: 25,
            }}
        >
            <Text
                style={{
                    color: '#fff',
                    fontSize: 28,
                    fontWeight: '700',
                }}
            >
                Need Prayer?
            </Text>

            <Text
                style={{
                    color: '#E2E8F0',
                    marginTop: 10,
                }}
            >
                Our prayer team is ready to stand
                with you.
            </Text>

            <TouchableOpacity
                onPress={onPress}
                style={{
                    marginTop: 20,
                    backgroundColor: '#fff',
                    padding: 14,
                    borderRadius: 16,
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontWeight: '700',
                    }}
                >
                    Submit Prayer Request
                </Text>
            </TouchableOpacity>
        </View>
    );
}