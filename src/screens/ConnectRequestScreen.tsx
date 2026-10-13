import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import AppScreen from '../components/AppScreen';
import { colors } from '../theme';
import { ConnectRequestType, submitConnectRequest } from '../api/connectRequestApi';

export default function ConnectRequestScreen({ route }: any) {
    const { title, type } = route.params as { title: string; type: ConnectRequestType };
    const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);
    const submit = async () => {
        if (!form.name.trim() || !form.phone.trim()) return Alert.alert('Required', 'Please enter your name and phone number.');
        try { setLoading(true); const result = await submitConnectRequest({ ...form, type }); Alert.alert('Received', result.message); setForm({ name: '', phone: '', email: '', message: '' }); }
        catch (error: any) { Alert.alert('Unable to submit', error?.response?.data?.message || 'Please check your connection and try again.'); }
        finally { setLoading(false); }
    };
    const input = { backgroundColor: colors.surface, borderColor: colors.border, borderWidth: 1, borderRadius: 18, padding: 17, color: colors.text, marginTop: 14 } as const;
    return <AppScreen><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ padding: 22, paddingBottom: 50 }}>
        <Text style={{ color: colors.coral, fontWeight: '800', letterSpacing: 1.5 }}>CONNECT</Text>
        <Text style={{ color: colors.text, fontSize: 32, fontWeight: '800', marginTop: 7 }}>{title}</Text>
        <Text style={{ color: colors.muted, lineHeight: 22, marginTop: 8, marginBottom: 8 }}>Share your details and a member of our pastoral team will contact you.</Text>
        <TextInput style={input} placeholder="Full name" value={form.name} onChangeText={name => setForm({ ...form, name })} />
        <TextInput style={input} placeholder="Phone number" keyboardType="phone-pad" value={form.phone} onChangeText={phone => setForm({ ...form, phone })} />
        <TextInput style={input} placeholder="Email (optional)" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={email => setForm({ ...form, email })} />
        <TextInput style={[input, { minHeight: 140, textAlignVertical: 'top' }]} multiline placeholder="How can we help?" value={form.message} onChangeText={message => setForm({ ...form, message })} />
        <TouchableOpacity disabled={loading} onPress={submit} style={{ backgroundColor: colors.coral, borderRadius: 18, padding: 18, marginTop: 18 }}><Text style={{ color: '#fff', fontWeight: '800', textAlign: 'center' }}>{loading ? 'Sending…' : 'Send request'}</Text></TouchableOpacity>
    </ScrollView></AppScreen>;
}
