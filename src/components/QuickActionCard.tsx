import React from 'react';

import {
    TouchableOpacity,
    View,
    Text,
} from 'react-native';

import {
    LucideIcon,
} from 'lucide-react-native';

interface Props {
    title: string;
    subtitle: string;
    icon: LucideIcon;
    color: string;
    onPress: () => void;
}

export default function QuickActionCard({
    title,
    subtitle,
    icon: Icon,
    color,
    onPress,
}: Props) {

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={{
                width: '48%',
                marginBottom: 16,
            }}
        >
            <View
                style={{
                    backgroundColor: '#111827',
                    borderRadius: 28,
                    padding: 20,
                    borderWidth: 1,
                    borderColor: '#1F2937',
                    minHeight: 130,

                    shadowColor: '#000',
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    shadowOffset: {
                        width: 0,
                        height: 4,
                    },

                    elevation: 5,
                }}
            >
                <View
                    style={{
                        width: 55,
                        height: 55,
                        borderRadius: 18,
                        backgroundColor: color,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Icon
                        size={26}
                        color="#fff"
                    />
                </View>

                <Text
                    style={{
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: '700',
                        marginTop: 16,
                    }}
                >
                    {title}
                </Text>

                <Text
                    style={{
                        color: '#94A3B8',
                        marginTop: 5,
                        fontSize: 13,
                    }}
                >
                    {subtitle}
                </Text>
            </View>
        </TouchableOpacity>
    );
}