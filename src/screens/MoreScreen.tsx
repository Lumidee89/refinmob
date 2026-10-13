import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { ChevronRight, HandHeart, MessageCircleHeart, UserRound } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import AppScreen from '../components/AppScreen';
import { colors, shadows } from '../theme';
import { useAuth } from '../context/AuthContext';

const destinations = [
    { title: 'Connect', subtitle: 'New here, salvation, membership and pastoral care', screen: 'ConnectHub', Icon: MessageCircleHeart, tint: '#FFF0EC' },
    { title: 'Give', subtitle: 'Tithes, offerings, projects and missions', screen: 'GiveHub', Icon: HandHeart, tint: '#EEF4FF' },
    { title: 'Profile', subtitle: 'Your journey, groups, serving and notifications', screen: 'ProfileHub', Icon: UserRound, tint: '#F2EEFF' },
];

export default function MoreScreen() {
    const navigation = useNavigation<any>();
    const { user, logout } = useAuth();
    return <AppScreen><ScrollView contentContainerStyle={{ padding: 22, paddingBottom: 110 }}>
        <View style={{ backgroundColor: colors.navy, borderRadius: 28, padding: 22, marginBottom: 12 }}><Text style={{ color: '#FFB19D', fontWeight: '800', letterSpacing: 1.5 }}>YOUR NEXT STEP</Text><Text style={{ color: '#fff', fontSize: 34, fontWeight: '800', marginTop: 7 }}>More</Text><Text style={{ color: '#D6DFEE', lineHeight: 21, marginTop: 8 }}>Connect, participate, and manage your church journey.</Text></View>
        {destinations.map(({ title, subtitle, screen, Icon, tint }) => <TouchableOpacity key={title} onPress={() => navigation.navigate(screen)} style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, borderRadius: 22, padding: 18, marginTop: 13, ...shadows.card }}>
            <View style={{ width: 50, height: 50, borderRadius: 17, backgroundColor: tint, alignItems: 'center', justifyContent: 'center' }}><Icon color={colors.coral} size={24} /></View>
            <View style={{ flex: 1, marginLeft: 14 }}><Text style={{ color: colors.text, fontSize: 19, fontWeight: '800' }}>{title}</Text><Text style={{ color: colors.muted, lineHeight: 19, marginTop: 4 }}>{subtitle}</Text></View><ChevronRight color={colors.coral} size={21} />
        </TouchableOpacity>)}
        <View style={{ alignItems: 'center', marginTop: 28 }}><Text style={{ color: colors.muted }}>Signed in as {user?.email}</Text><TouchableOpacity onPress={logout}><Text style={{ color: colors.coral, fontWeight: '800', marginTop: 12 }}>Sign out</Text></TouchableOpacity></View>
    </ScrollView></AppScreen>;
}
