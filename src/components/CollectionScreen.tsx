import React, { ReactElement } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, Text, View } from 'react-native';
import AppScreen from './AppScreen';
import { colors } from '../theme';

export default function CollectionScreen({ title, eyebrow, data, loading, refreshing = false, onRefresh, renderItem }: { title: string; eyebrow: string; data: any[]; loading: boolean; refreshing?: boolean; onRefresh?: () => void; renderItem: ({ item }: any) => ReactElement }) {
    return <AppScreen>{loading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color={colors.coral} /><Text style={{ color: colors.muted, marginTop: 10 }}>Loading…</Text></View> : <FlatList
        data={data} keyExtractor={item => String(item.id)} renderItem={renderItem} refreshControl={onRefresh ? <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.coral} colors={[colors.coral]} /> : undefined}
        ListHeaderComponent={<View style={{ backgroundColor: colors.navy, borderRadius: 28, padding: 22, marginBottom: 18 }}><Text style={{ color: '#FFB19D', fontWeight: '800', letterSpacing: 1.5 }}>{eyebrow}</Text><Text style={{ color: '#fff', fontSize: 34, fontWeight: '800', marginTop: 7 }}>{title}</Text></View>}
        ListEmptyComponent={<Text style={{ color: colors.muted, textAlign: 'center', marginTop: 30 }}>Nothing has been published yet.</Text>}
        contentContainerStyle={{ padding: 22, paddingBottom: 50 }} showsVerticalScrollIndicator={false}
    />}</AppScreen>;
}
