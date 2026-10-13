import React from 'react';
import { useNavigation } from '@react-navigation/native';
import CollectionScreen from '../components/CollectionScreen';
import SermonCard from '../components/SermonCard';
import { useSermons } from '../hooks/useSermons';
export default function SermonsScreen() { const navigation = useNavigation<any>(); const { data, isLoading, isRefetching, refetch } = useSermons(); return <CollectionScreen title="Messages" eyebrow="WATCH & LISTEN" data={data?.data || []} loading={isLoading} refreshing={isRefetching} onRefresh={refetch} renderItem={({ item }) => <SermonCard sermon={item} onPress={() => navigation.navigate('SermonDetails', { sermon: item })} />} />; }
