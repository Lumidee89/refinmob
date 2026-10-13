import React from 'react';
import { ActivityIndicator, Image, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AppScreen from '../components/AppScreen';
import { useAppContent } from '../hooks/useAppContent';
import { AppSection } from '../types/appContent';
import { assetUrl } from '../api/axios';
import { colors, shadows } from '../theme';

export default function ContentListScreen({ route }: any) {
    const { title, section, category } = route.params as { title: string; section: AppSection; category: string };
    const { data, isLoading, refetch } = useAppContent(section);
    const items = data?.sections?.[section]?.[category] || [];
    const open = async (url?: string | null, isMedia = false) => { const target = isMedia ? assetUrl(url) : url; if (target && await Linking.canOpenURL(target)) Linking.openURL(target); };
    return <AppScreen><ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 55 }}>
        <View style={{ backgroundColor: colors.navy, borderRadius: 28, padding: 22, marginBottom: 18 }}>
            <Text style={{ color: '#FFB19D', fontWeight: '800', letterSpacing: 1.5 }}>{section.toUpperCase()}</Text>
            <Text style={{ color: '#fff', fontSize: 32, fontWeight: '800', marginTop: 7 }}>{title}</Text>
        </View>
        {isLoading && <ActivityIndicator color={colors.coral} />}
        {!isLoading && items.length === 0 && <TouchableOpacity onPress={() => refetch()}><Text style={{ color: colors.muted, textAlign: 'center' }}>No published content yet. Tap to refresh.</Text></TouchableOpacity>}
        {items.map(item => <TouchableOpacity key={item.id} activeOpacity={0.85} disabled={!item.action_url && !item.media_url}
            onPress={() => open(item.action_url || item.media_url, !item.action_url)} style={{ backgroundColor: colors.surface, borderRadius: 22, overflow: 'hidden', marginBottom: 15, ...shadows.card }}>
            {!!item.image_url && <Image source={{ uri: assetUrl(item.image_url) }} style={{ width: '100%', height: 180 }} />}
            <View style={{ padding: 19 }}>
                {!!item.media_type && <Text style={{ color: colors.coral, fontSize: 12, fontWeight: '800', textTransform: 'uppercase' }}>{item.media_type}</Text>}
                <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800', marginTop: 4 }}>{item.title}</Text>
                {!!item.summary && <Text style={{ color: colors.muted, lineHeight: 22, marginTop: 8 }}>{item.summary}</Text>}
                {!!item.body && item.body !== item.summary && <Text style={{ color: colors.text, lineHeight: 23, marginTop: 12 }}>{item.body}</Text>}
                {(item.action_url || item.media_url) && <Text style={{ color: colors.coral, fontWeight: '800', marginTop: 13 }}>Open content →</Text>}
            </View>
        </TouchableOpacity>)}
    </ScrollView></AppScreen>;
}
