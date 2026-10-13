import React from 'react';
import {
    Dimensions,
    Image,
    View,
} from 'react-native';

import {
    SwiperFlatList,
} from 'react-native-swiper-flatlist';

import { CarouselItem } from '../types/carousel';

const { width } = Dimensions.get('window');

interface HeroCarouselProps {
    items: CarouselItem[];
}

export default function HeroCarousel({
    items,
}: HeroCarouselProps) {
    return (
        <SwiperFlatList
            autoplay
            autoplayDelay={3}
            autoplayLoop
            showPagination
        >
            {items.map((item) => (
                <View
                    key={item.id}
                    style={{
                        paddingHorizontal: 16,
                    }}
                >
                    <Image
                        source={{
                            uri: item.image,
                        }}
                        style={{
                            width: width - 32,
                            height: 220,
                            borderRadius: 24,
                        }}
                    />
                </View>
            ))}
        </SwiperFlatList>
    );
}