import React from 'react';
import { ActivityIndicator, Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import AppScreen from '../components/AppScreen';
import { useGiving } from '../hooks/useGiving';
import { colors, shadows } from '../theme';

export default function GivingScreen() {
    const { data = [], isLoading, refetch } = useGiving();
    return <AppScreen><ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 55 }}>
        <View style={{ backgroundColor: colors.navy, borderRadius: 28, padding: 22, marginBottom: 16 }}>
            <Text style={{ color: '#FFB19D', fontWeight: '800', letterSpacing: 1.5 }}>GENEROSITY</Text>
            <Text style={{ color: '#fff', fontSize: 34, fontWeight: '800', marginTop: 7 }}>Giving</Text>
            <Text style={{ color: '#D6DFEE', lineHeight: 22, marginTop: 8 }}>Your giving helps the church serve people and advance the mission.</Text>
        </View>
        {isLoading && <ActivityIndicator color={colors.coral} />}
        {!isLoading && data.length === 0 && <TouchableOpacity onPress={() => refetch()}><Text style={{ color: colors.muted, textAlign: 'center' }}>No giving accounts are currently available. Tap to refresh.</Text></TouchableOpacity>}
        {data.map(account => <View key={account.id} style={{ backgroundColor: colors.surface, borderRadius: 22, padding: 19, marginBottom: 14, ...shadows.card }}>
            <Text style={{ color: colors.coral, fontWeight: '800', textTransform: 'uppercase', fontSize: 12 }}>{account.category}</Text>
            <Text style={{ color: colors.text, fontSize: 20, fontWeight: '800', marginTop: 5 }}>{account.title}</Text>
            <Text style={{ color: colors.navy, fontSize: 25, fontWeight: '800', marginTop: 15 }}>{account.account_number}</Text>
            <Text style={{ color: colors.muted, marginTop: 7 }}>{account.bank_name} · {account.account_name}</Text>
            <View style={{ flexDirection: 'row', marginTop: 15, gap: 10 }}>
                <TouchableOpacity onPress={() => Clipboard.setStringAsync(account.account_number)} style={{ backgroundColor: '#EEF2F8', borderRadius: 14, paddingVertical: 11, paddingHorizontal: 16 }}><Text style={{ color: colors.navy, fontWeight: '800' }}>Copy account</Text></TouchableOpacity>
                {!!account.payment_url && <TouchableOpacity onPress={() => Linking.openURL(account.payment_url!)} style={{ backgroundColor: colors.coral, borderRadius: 14, paddingVertical: 11, paddingHorizontal: 16 }}><Text style={{ color: '#fff', fontWeight: '800' }}>Give online</Text></TouchableOpacity>}
            </View>
        </View>)}
    </ScrollView></AppScreen>;
}
