import React from 'react';
import { assetUrl } from '../api/axios';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';

import { Blog } from '../types/blog';
import { colors, shadows } from '../theme';

interface Props {
    blog: Blog;
    onPress: () => void;
}

export default function BlogCard({
    blog,
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
                    uri: blog.featured_image
                        ? assetUrl(blog.featured_image)
                        : 'https://placehold.co/600x350',
                }}
                style={{
                    width: '100%',
                    height: 220,
                }}
            />

            <View style={{ padding: 20 }}>
                <Text
                    numberOfLines={2}
                    style={{
                        color: colors.text,
                        fontSize: 20,
                        fontWeight: '700',
                    }}
                >
                    {blog.title}
                </Text>

                <Text
                    style={{
                        color: colors.coral,
                        marginTop: 8,
                    }}
                >
                    Read Article →
                </Text>
            </View>
        </TouchableOpacity>
    );
}
