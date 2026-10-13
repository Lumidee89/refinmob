import React, { ReactNode } from 'react';
import { ScrollView, Text, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import AppScreen from './AppScreen';
import { colors, shadows } from '../theme';

export const FormInput = (props: TextInputProps) => <TextInput placeholderTextColor="#929BAE" {...props} style={[{ backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 17, padding: 16, color: colors.text, marginTop: 13 }, props.style]} />;

export default function BackendFormScreen({ eyebrow, title, subtitle, children, loading, submitLabel, onSubmit }: { eyebrow: string; title: string; subtitle: string; children: ReactNode; loading: boolean; submitLabel: string; onSubmit: () => void }) {
    return <AppScreen><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 22, paddingBottom: 55 }}>
        <View style={{ backgroundColor: colors.navy, borderRadius: 28, padding: 22, marginBottom: 8 }}><Text style={{ color: '#FFB19D', fontWeight: '800', letterSpacing: 1.4 }}>{eyebrow}</Text><Text style={{ color: '#fff', fontSize: 32, fontWeight: '800', marginTop: 7 }}>{title}</Text><Text style={{ color: '#D6DFEE', lineHeight: 21, marginTop: 8 }}>{subtitle}</Text></View>
        <View style={{ backgroundColor: colors.surface, borderRadius: 24, padding: 17, marginTop: 14, ...shadows.card }}>{children}<TouchableOpacity disabled={loading} onPress={onSubmit} style={{ backgroundColor: colors.coral, borderRadius: 17, padding: 17, marginTop: 17 }}><Text style={{ color: '#fff', fontWeight: '800', textAlign: 'center' }}>{loading ? 'Sending…' : submitLabel}</Text></TouchableOpacity></View>
    </ScrollView></AppScreen>;
}
