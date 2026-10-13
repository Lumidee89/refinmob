import React from 'react';
import { useNavigation } from '@react-navigation/native';
import CollectionScreen from '../components/CollectionScreen';
import EventCard from '../components/EventCard';
import { useEvents } from '../hooks/useEvents';
export default function EventsScreen() { const navigation = useNavigation<any>(); const { data, isLoading, isRefetching, refetch } = useEvents(); return <CollectionScreen title="Events" eyebrow="COMMUNITY" data={data?.data || []} loading={isLoading} refreshing={isRefetching} onRefresh={refetch} renderItem={({ item }) => <EventCard event={item} onPress={() => navigation.navigate('EventDetails', { event: item })} />} />; }
