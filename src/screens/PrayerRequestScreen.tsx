import React, { useState } from 'react';
import { Alert } from 'react-native';
import BackendFormScreen, { FormInput } from '../components/BackendFormScreen';
import { submitPrayerRequest } from '../api/prayerRequestApi';
export default function PrayerRequestScreen() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', prayer_request: '' }); const [loading, setLoading] = useState(false);
    const submit = async () => { if (!form.name.trim() || !form.prayer_request.trim()) return Alert.alert('Required', 'Please enter your name and prayer request.'); try { setLoading(true); const result = await submitPrayerRequest(form); Alert.alert('Prayer received', result.message); setForm({ name: '', email: '', phone: '', prayer_request: '' }); } catch (e: any) { Alert.alert('Unable to send', e?.response?.data?.message || 'Please check your details and connection.'); } finally { setLoading(false); } };
    return <BackendFormScreen eyebrow="WE ARE PRAYING WITH YOU" title="Prayer Request" subtitle="Share what is on your heart with our prayer team." loading={loading} submitLabel="Submit prayer request" onSubmit={submit}><FormInput placeholder="Full name" value={form.name} onChangeText={name => setForm({ ...form, name })} /><FormInput placeholder="Phone (optional)" keyboardType="phone-pad" value={form.phone} onChangeText={phone => setForm({ ...form, phone })} /><FormInput placeholder="Email (optional)" keyboardType="email-address" autoCapitalize="none" value={form.email} onChangeText={email => setForm({ ...form, email })} /><FormInput placeholder="How can we pray with you?" multiline value={form.prayer_request} onChangeText={prayer_request => setForm({ ...form, prayer_request })} style={{ minHeight: 145, textAlignVertical: 'top' }} /></BackendFormScreen>;
}
