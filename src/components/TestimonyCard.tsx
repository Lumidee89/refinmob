import React from 'react';
import { assetUrl } from '../api/axios';

import {
    View,
    Text,
    Image,
} from 'react-native';

import { Testimonial } from '../types/testimonial';
import { colors, shadows } from '../theme';

interface Props {
    testimonial: Testimonial;
}

export default function TestimonyCard({
    testimonial,
}: Props) {

    return (

        <View
            style={{
                width: 320,
                backgroundColor: colors.surface,
                borderRadius: 24,
                padding: 20,
                marginRight: 15,
                ...shadows.card,
            }}
        >

            {testimonial.photo && (

                <Image
                    source={{
                        uri: assetUrl(testimonial.photo),
                    }}
                    style={{
                        width: 70,
                        height: 70,
                        borderRadius: 35,
                        marginBottom: 15,
                    }}
                />

            )}

            <Text
                numberOfLines={5}
                style={{
                    color: colors.text,
                    lineHeight: 24,
                    fontSize: 15,
                }}
            >
                "{testimonial.testimony}"
            </Text>

            <View
                style={{
                    marginTop: 15,
                }}
            >
                <Text
                    style={{
                        color: colors.text,
                        fontWeight: '700',
                        fontSize: 16,
                    }}
                >
                    {testimonial.name}
                </Text>

                <Text
                    style={{
                        color: colors.coral,
                        marginTop: 4,
                    }}
                >
                    {testimonial.role}
                </Text>
            </View>

        </View>

    );
}
