import React from 'react';

import {
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Props {
    title: string;
    buttonText: string;
    image: string;
    onPress: () => void;
}

export default function HomeActionCard({
    title,
    buttonText,
    image,
    onPress,
}: Props) {

    return (

        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.9}
            style={{
                // marginHorizontal: 20,
                marginBottom: 20,
                height: 200,
                width: '100%',
                borderRadius: 28,
                overflow: 'hidden',
            }}
        >

            <ImageBackground
                source={{
                    uri: image,
                }}
                style={{
                    flex: 1,
                    justifyContent: 'center',
                }}
            >

                <View
                    style={{
                        flex: 1,
                        backgroundColor:
                            'rgba(0,0,0,0.45)',
                        justifyContent:
                            'center',
                        padding: 25,
                    }}
                >

                    <Text
                        style={{
                            color: '#FDB827',
                            fontSize: 22,
                            fontWeight: '800',
                        }}
                    >
                        {title.split(' ')[0]}
                    </Text>

                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 38,
                            fontWeight: '900',
                        }}
                    >
                        {title
                            .split(' ')
                            .slice(1)
                            .join(' ')}
                    </Text>

                    <TouchableOpacity
                        onPress={onPress}
                        style={{
                            backgroundColor:
                                '#fff',
                            alignSelf:
                                'flex-start',
                            paddingHorizontal:
                                25,
                            paddingVertical:
                                10,
                            borderRadius:
                                999,
                            marginTop: 20,
                        }}
                    >

                        <Text
                            style={{
                                color:
                                    '#DC2626',
                                fontWeight:
                                    '700',
                            }}
                        >
                            {buttonText}
                        </Text>

                    </TouchableOpacity>

                </View>

            </ImageBackground>

        </TouchableOpacity>

    );
}