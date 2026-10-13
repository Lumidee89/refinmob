import React from 'react';

import {
    ScrollView,
    SafeAreaView,
    View,
    Text,
    Image,
} from 'react-native';
import { assetUrl } from '../api/axios';

export default function BlogDetailsScreen({
    route,
}: any) {

    const { blog } = route.params;

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#F5F4F8',
            }}
        >
            <ScrollView>

                <Image
                    source={{
                        uri: blog.featured_image
                            ? assetUrl(blog.featured_image)
                            : 'https://placehold.co/600x350',
                    }}
                    style={{
                        width: '100%',
                        height: 280,
                        borderRadius: 20,
                    }}
                />

                <View
                    style={{
                        padding: 20,
                    }}
                >

                    <Text
                        style={{
                            color: '#14213D',
                            fontSize: 30,
                            fontWeight: '800',
                        }}
                    >
                        {blog.title}
                    </Text>

                    <Text
                        style={{
                            color: '#6D7890',
                            marginTop: 10,
                        }}
                    >
                        {blog.created_at}
                    </Text>

                    <Text
                        style={{
                            color: '#344054',
                            marginTop: 25,
                            lineHeight: 28,
                            fontSize: 16,
                        }}
                    >
                        {blog.content}
                    </Text>

                </View>

            </ScrollView>
        </SafeAreaView>
    );
}
