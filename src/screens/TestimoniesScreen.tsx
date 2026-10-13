import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
} from 'react-native';

import { useTestimonials } from '../hooks/useTestimonials';
import { assetUrl } from '../api/axios';

export default function TestimoniesScreen() {

    const {
        data,
        isLoading,
    } = useTestimonials();

    if (isLoading) {

        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: '#F5F4F8',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        color: '#14213D',
                    }}
                >
                    Loading...
                </Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#F5F4F8',
            }}
        >
            <ScrollView>

                <View
                    style={{
                        padding: 20,
                    }}
                >
                    <Text
                        style={{
                            color: '#14213D',
                            fontSize: 32,
                            fontWeight: '800',
                        }}
                    >
                        Testimonies
                    </Text>

                    <Text
                        style={{
                            color: '#6D7890',
                            marginTop: 8,
                        }}
                    >
                        Lives transformed by God's power
                    </Text>
                </View>

                {data?.map((item: any) => (

                    <View
                        key={item.id}
                        style={{
                            backgroundColor: '#FFFFFF',
                            marginHorizontal: 20,
                            marginBottom: 20,
                            borderRadius: 24,
                            padding: 20,
                        }}
                    >

                        {item.photo && (

                            <Image
                                source={{
                                    uri: assetUrl(item.photo),
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
                            style={{
                                color: '#14213D',
                                lineHeight: 24,
                                fontSize: 16,
                            }}
                        >
                            "{item.testimony}"
                        </Text>

                        <Text
                            style={{
                                color: '#FF8466',
                                marginTop: 15,
                                fontWeight: '700',
                            }}
                        >
                            {item.name}
                        </Text>

                        <Text
                            style={{
                                color: '#6D7890',
                            }}
                        >
                            {item.role}
                        </Text>

                    </View>

                ))}

                {!data?.length && (
                    <View style={{ margin: 20, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24 }}>
                        <Text style={{ color: '#14213D', fontSize: 20, fontWeight: '800' }}>No testimonies yet</Text>
                        <Text style={{ color: '#6D7890', lineHeight: 22, marginTop: 8 }}>Published testimonies from the church backend will appear here.</Text>
                    </View>
                )}

            </ScrollView>
        </SafeAreaView>
    );
}
