import React, { useEffect, useMemo, useState } from 'react';
import { Alert, Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Audio, AVPlaybackStatus } from 'expo-av';
import AppScreen from '../components/AppScreen';
import { assetUrl } from '../api/axios';
import { colors, shadows } from '../theme';
import { youtubeVideoId } from '../utils/media';

export default function SermonDetailsScreen({ route }: any) {
    const { sermon } = route.params;
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [playing, setPlaying] = useState(false);
    const [loadingAudio, setLoadingAudio] = useState(false);
    const videoId = useMemo(() => youtubeVideoId(sermon.youtube_url), [sermon.youtube_url]);

    const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if (!status.isLoaded) return;
        setPlaying(status.isPlaying);
        if (status.didJustFinish) setPlaying(false);
    };

    const toggleAudio = async () => {
        const uri = assetUrl(sermon.audio_path);
        if (!uri) return Alert.alert('Audio unavailable', 'No audio file is attached to this message.');
        try {
            setLoadingAudio(true);
            await Audio.setAudioModeAsync({ playsInSilentModeIOS: true, staysActiveInBackground: false, shouldDuckAndroid: true });
            if (sound) {
                const status = await sound.getStatusAsync();
                if (status.isLoaded && status.isPlaying) await sound.pauseAsync(); else await sound.playAsync();
                return;
            }
            const created = await Audio.Sound.createAsync({ uri }, { shouldPlay: true }, onPlaybackStatusUpdate);
            setSound(created.sound);
        } catch (error: any) {
            Alert.alert('Playback failed', error?.message || 'The audio file could not be played. Check the server file and connection.');
        } finally { setLoadingAudio(false); }
    };

    useEffect(() => () => { sound?.unloadAsync(); }, [sound]);

    return <AppScreen><ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        {!!sermon.thumbnail && <Image source={{ uri: assetUrl(sermon.thumbnail) }} style={{ width: '100%', height: 260 }} />}
        <View style={{ padding: 22 }}>
            <Text style={{ color: colors.coral, fontWeight: '800', letterSpacing: 1.4 }}>{String(sermon.type).toUpperCase()} MESSAGE</Text>
            <Text style={{ color: colors.text, fontSize: 30, fontWeight: '800', lineHeight: 37, marginTop: 8 }}>{sermon.title}</Text>
            <Text style={{ color: colors.muted, marginTop: 8 }}>{sermon.speaker}</Text>

            {sermon.type === 'video' && videoId && <View style={{ marginTop: 22, borderRadius: 22, overflow: 'hidden', backgroundColor: '#000', ...shadows.card }}>
                <YoutubePlayer height={220} play={false} videoId={videoId} onError={(error: string) => Alert.alert('Video unavailable', `YouTube could not play this video (${error}).`)} />
            </View>}
            {sermon.type === 'video' && !videoId && !!sermon.facebook_url && <TouchableOpacity onPress={() => Linking.openURL(sermon.facebook_url)} style={{ backgroundColor: colors.navy, borderRadius: 18, padding: 18, marginTop: 22 }}><Text style={{ color: '#fff', textAlign: 'center', fontWeight: '800' }}>Watch on Facebook</Text></TouchableOpacity>}
            {sermon.type === 'video' && !videoId && !sermon.facebook_url && <Text style={{ color: colors.muted, marginTop: 22 }}>No playable video link is attached to this message.</Text>}

            {sermon.type === 'audio' && <TouchableOpacity disabled={loadingAudio} onPress={toggleAudio} style={{ backgroundColor: colors.coral, borderRadius: 18, padding: 18, marginTop: 22 }}><Text style={{ color: '#fff', textAlign: 'center', fontWeight: '800' }}>{loadingAudio ? 'Loading audio…' : playing ? 'Pause audio' : 'Play audio'}</Text></TouchableOpacity>}

            {!!sermon.description && <View style={{ backgroundColor: colors.surface, borderRadius: 22, padding: 20, marginTop: 22, ...shadows.card }}><Text style={{ color: colors.text, fontSize: 17, lineHeight: 26 }}>{sermon.description}</Text></View>}
        </View>
    </ScrollView></AppScreen>;
}
