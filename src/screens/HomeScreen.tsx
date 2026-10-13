import React, { useState, useCallback } from 'react';

import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    RefreshControl,
    Image
} from 'react-native';
import {
    Mic2,
    CalendarDays,
    Newspaper,
    Radio,
} from 'lucide-react-native';
import {
    useNavigation,
} from '@react-navigation/native';

import HeroCarousel from '../components/HeroCarousel';
import SermonCard from '../components/SermonCard';
import LiveCard from '../components/LiveCard';
import TestimonyCard from '../components/TestimonyCard';
import QuickActionCard from '../components/QuickActionCard';
import FeaturedEventCard from '../components/FeaturedEventCard';
import PrayerCTA from '../components/PrayerCTA';
import FirstTimerCTA from '../components/FirstTimerCTA';

import { useHome } from '../hooks/useHome';
import HomeActionCard from '../components/HomeActionCard';

export default function HomeScreen() {

    const navigation = useNavigation<any>();

    const {
        data,
        isLoading,
        refetch,
    } = useHome();

    const [refreshing, setRefreshing] =
        useState(false);

    const onRefresh = useCallback(
        async () => {

            setRefreshing(true);

            await refetch();

            setRefreshing(false);

        },
        [refetch]
    );

    if (isLoading) {
        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#0F172A',
                }}
            >
                <Text style={{ color: '#fff' }}>
                    Loading...
                </Text>
            </SafeAreaView>
        );
    }

    const heroImages = [
        {
            id: 1,
            image:
                'http://172.20.10.6:8000/images/hero/hero1-v1.jpg',
        },
        {
            id: 2,
            image:
                'http://172.20.10.6:8000/images/hero/hero3-v1.jpg',
        },
        {
            id: 3,
            image:
                'http://172.20.10.6:8000/images/hero/hero4-v1.jpg',
        },
    ];

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#0F172A',
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor="#FDB827"
                    />
                }
            >
                <View
                    style={{
                        paddingHorizontal: 20,
                        paddingTop: 20,
                        flexDirection: 'row',
                        justifyContent:
                            'space-between',
                        alignItems: 'center',
                    }}
                >

                    <View>

                        <Image
                            source={require('../../assets/logo.png')}
                            style={{
                                width: 80,
                                height: 80,
                                resizeMode: 'contain',
                                tintColor: '#FFFFFF',
                            }}
                        />

                        <Text
                            style={{
                                color: '#94A3B8',
                            }}
                        >
                            Raising a generation of proof producers
                        </Text>

                    </View>

                </View>

                <View
                    style={{
                        marginTop: 25,
                    }}
                >
                    <HeroCarousel
                        items={heroImages}
                    />
                </View>
                
                <View
                    style={{
                        paddingHorizontal: 20,
                        marginTop: 30,
                    }}
                >
                    <Text
                        style={{
                            color: '#fff',
                            fontSize: 26,
                            fontWeight: '800',
                            marginBottom: 20,
                        }}
                    >
                        Quick Access
                    </Text>

                    <View
                        style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'space-between',
                        }}
                    >
                        <HomeActionCard
                            title="WATCH LIVE"
                            buttonText="WATCH"
                            image="http://172.20.10.6:8000/images/mobile/live.jpg"
                            onPress={() =>
                                navigation.navigate('Live')
                            }
                        />

                        <HomeActionCard
                            title="VIDEO/AUDIO SERMONS"
                            buttonText="WATCH"
                            image="http://172.20.10.6:8000/images/mobile/sermons.jpg"
                            onPress={() =>
                                navigation.navigate('Sermons')
                            }
                        />

                        <HomeActionCard
                            title="UPCOMING EVENTS"
                            buttonText="VIEW"
                            image="http://172.20.10.6:8000/images/mobile/events.jpg"
                            onPress={() =>
                                navigation.navigate('Events')
                            }
                        />

                        <HomeActionCard
                            title="READ BLOGS"
                            buttonText="READ"
                            image="http://172.20.10.6:8000/images/mobile/blogs.jpg"
                            onPress={() =>
                                navigation.navigate('Blogs')
                            }
                        />

                        {/* <HomeActionCard
                            title="PRAYER REQUEST"
                            buttonText="PRAY"
                            image="http://172.20.10.6:8000/images/mobile/prayer.jpg"
                            onPress={() =>
                                navigation.navigate(
                                    'PrayerRequest'
                                )
                            }
                        /> */}

                        {/* <HomeActionCard
                            title="FIRST TIMER"
                            buttonText="CONNECT"
                            image="http://172.20.10.6:8000/images/mobile/visitor.jpg"
                            onPress={() =>
                                navigation.navigate(
                                    'FirstTimer'
                                )
                            }
                        /> */}
                    </View>
                </View>

                {data?.live_stream && (
                    <LiveCard
                        stream={data.live_stream}
                        onPress={() =>
                            navigation.navigate(
                                'Live'
                            )
                        }
                    />
                )}

                <FeaturedEventCard
                    event={data?.events?.[0]}
                    onPress={() =>
                        navigation.navigate(
                            'EventDetails',
                            {
                                event:
                                    data?.events?.[0],
                            }
                        )
                    }
                />

                <View
                    style={{
                        marginTop: 20,
                    }}
                >
                    <View
                        style={{
                            paddingHorizontal: 20,
                            flexDirection: 'row',
                            justifyContent:
                                'space-between',
                            alignItems:
                                'center',
                        }}
                    >
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: 22,
                                fontWeight:
                                    '700',
                            }}
                        >
                            Latest Video Sermons
                        </Text>

                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate(
                                    'Sermons'
                                )
                            }
                        >
                            <Text
                                style={{
                                    color:
                                        '#FDB827',
                                }}
                            >
                                View All
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        horizontal
                        data={
                            data?.video_sermons || []
                        }
                        keyExtractor={(item) =>
                            item.id.toString()
                        }
                        contentContainerStyle={{
                            paddingHorizontal:
                                20,
                            marginTop: 20,
                        }}
                        renderItem={({
                            item,
                        }) => (
                            <SermonCard
                                sermon={item}
                                onPress={() =>
                                    navigation.navigate(
                                        'SermonDetails',
                                        {
                                            sermon:
                                                item,
                                        }
                                    )
                                }
                            />
                        )}
                    />

                    <View
                        style={{
                            marginTop: 30,
                            marginBottom: 30,
                        }}
                    >
                        <View
                            style={{
                                paddingHorizontal: 20,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    color: '#fff',
                                    fontSize: 22,
                                    fontWeight: '700',
                                }}
                            >
                                Latest Audio Messages
                            </Text>

                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate('Sermons')
                                }
                            >
                                <Text
                                    style={{
                                        color: '#FDB827',
                                    }}
                                >
                                    View All
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            horizontal
                            data={data?.audio_sermons || []}
                            keyExtractor={(item) =>
                                item.id.toString()
                            }
                            contentContainerStyle={{
                                paddingHorizontal: 20,
                                marginTop: 20,
                            }}
                            renderItem={({ item }) => (
                                <SermonCard
                                    sermon={item}
                                    onPress={() =>
                                        navigation.navigate(
                                            'SermonDetails',
                                            {
                                                sermon: item,
                                            }
                                        )
                                    }
                                />
                            )}
                            showsHorizontalScrollIndicator={false}
                        />

                        <View
                            style={{
                                marginTop: 30,
                            }}
                        >

                            <View
                                style={{
                                    paddingHorizontal: 20,
                                    marginBottom: 20,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#fff',
                                        fontSize: 26,
                                        fontWeight: '800',
                                    }}
                                >
                                    Testimonies
                                </Text>

                                <Text
                                    style={{
                                        color: '#94A3B8',
                                        marginTop: 5,
                                    }}
                                >
                                    Lives transformed by God's power
                                </Text>

                            </View>

                            <FlatList
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                data={data?.testimonials || []}
                                keyExtractor={(item) =>
                                    item.id.toString()
                                }
                                contentContainerStyle={{
                                    paddingHorizontal: 20,
                                }}
                                renderItem={({ item }) => (

                                    <TestimonyCard
                                        testimonial={item}
                                    />

                                )}
                            />

                        </View>

                        <PrayerCTA
                            onPress={() =>
                                navigation.navigate(
                                    'PrayerRequest'
                                )
                            }
                        />

                        <FirstTimerCTA
                            onPress={() =>
                                navigation.navigate(
                                    'FirstTimer'
                                )
                            }
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}