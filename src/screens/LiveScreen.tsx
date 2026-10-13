import React from 'react';
import { ActivityIndicator, Alert, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import AppScreen from '../components/AppScreen';
import { useLiveStream } from '../hooks/useLiveStream';
import { colors, shadows } from '../theme';
import { youtubeVideoId } from '../utils/media';

export default function LiveScreen() {
    const { data, isLoading } = useLiveStream();
    if (isLoading) return <AppScreen><View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color={colors.coral} /><Text style={{ color: colors.muted, marginTop: 10 }}>Loading live service…</Text></View></AppScreen>;
    if (!data) return <AppScreen><View style={{ flex: 1, padding: 30, alignItems: 'center', justifyContent: 'center' }}><Text style={{ color: colors.text, fontSize: 28, fontWeight: '800' }}>We’re currently offline</Text><Text style={{ color: colors.muted, textAlign: 'center', marginTop: 10 }}>The next live service will appear here when broadcasting starts.</Text></View></AppScreen>;
    const videoId = youtubeVideoId(data.youtube_url);
    return <AppScreen><ScrollView contentContainerStyle={{ padding: 22 }}>
        <View style={{ backgroundColor: colors.navy, borderRadius: 28, padding: 22 }}><Text style={{ color: '#FFB19D', fontWeight: '800' }}>● LIVE NOW</Text><Text style={{ color: '#fff', fontSize: 30, fontWeight: '800', marginTop: 10 }}>{data.title}</Text></View>
        {videoId ? <View style={{ marginTop: 18, borderRadius: 22, overflow: 'hidden', backgroundColor: '#000', ...shadows.card }}><YoutubePlayer height={220} play videoId={videoId} onError={(error: string) => Alert.alert('Video unavailable', `YouTube could not play this stream (${error}).`)} /></View> : <Text style={{ color: colors.muted, marginTop: 20 }}>This livestream link is not a supported YouTube URL.</Text>}
        <TouchableOpacity onPress={() => Linking.openURL(data.youtube_url)} style={{ backgroundColor: colors.coral, padding: 18, borderRadius: 18, marginTop: 18 }}><Text style={{ color: '#fff', textAlign: 'center', fontWeight: '800' }}>Open on YouTube</Text></TouchableOpacity>
    </ScrollView></AppScreen>;
}
