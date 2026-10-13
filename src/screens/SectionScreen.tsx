import React from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ChevronRight } from 'lucide-react-native';
import { useAppContent } from '../hooks/useAppContent';
import { AppSection } from '../types/appContent';
import AppScreen from '../components/AppScreen';
import { colors, shadows } from '../theme';

export interface SectionItem {
    title: string;
    category: string;
    screen?: string;
    params?: Record<string, unknown>;
}

interface Props { title: string; section: AppSection; items: SectionItem[] }

export default function SectionScreen({ title, section, items }: Props) {
    const navigation = useNavigation<any>();
    const { data, isLoading, isRefetching, refetch } = useAppContent(section);
    const content = data?.sections?.[section] || {};

    return (
        <AppScreen>
            <ScrollView refreshControl={<RefreshControl refreshing={isRefetching && !isLoading} onRefresh={refetch} tintColor={colors.coral} colors={[colors.coral]} />} contentContainerStyle={{ padding: 22, paddingBottom: 115 }}>
                <View style={{ backgroundColor: colors.navy, borderRadius: 28, padding: 22, marginBottom: 12, ...shadows.card }}>
                    <Text style={{ color: '#FFB19D', fontSize: 12, fontWeight: '800', letterSpacing: 2 }}>REFINERS CHURCH</Text>
                    <Text style={{ color: '#fff', fontSize: 36, fontWeight: '800', marginTop: 8 }}>{title}</Text>
                    <Text style={{ color: '#D6DFEE', marginTop: 8, lineHeight: 21 }}>Everything you need for your next step.</Text>
                </View>
                {isLoading && <ActivityIndicator color={colors.coral} style={{ marginVertical: 16 }} />}
                {items.map((item) => {
                    const entries = content[item.category] || [];
                    const latest = entries[0];
                    return (
                        <TouchableOpacity
                            key={item.category}
                            activeOpacity={0.8}
                            onPress={() => item.screen
                                ? navigation.navigate(item.screen, item.params)
                                : navigation.navigate('ContentList', { title: item.title, section, category: item.category })}
                            style={{ backgroundColor: colors.surface, borderRadius: 22, padding: 17, marginTop: 12, flexDirection: 'row', alignItems: 'center', ...shadows.card }}
                        >
                            <View style={{ width: 46, height: 46, borderRadius: 16, backgroundColor: '#FFF0EC', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ color: colors.coral, fontSize: 18, fontWeight: '800' }}>{item.title.charAt(0)}</Text>
                            </View>
                            <View style={{ flex: 1, marginLeft: 14 }}>
                                <Text style={{ color: colors.text, fontSize: 17, fontWeight: '700' }}>{item.title}</Text>
                                <Text numberOfLines={1} style={{ color: colors.muted, marginTop: 4 }}>
                                    {latest?.title || (isLoading ? 'Loading…' : 'Explore')}
                                </Text>
                            </View>
                            <ChevronRight color={colors.coral} size={20} />
                        </TouchableOpacity>
                    );
                })}
                {!isLoading && Object.keys(content).length === 0 && (
                    <TouchableOpacity onPress={() => refetch()}><Text style={{ color: colors.muted, textAlign: 'center', marginTop: 20 }}>Content will appear here when published. Tap to refresh.</Text></TouchableOpacity>
                )}
            </ScrollView>
        </AppScreen>
    );
}
