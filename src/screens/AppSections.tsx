import React from 'react';
import SectionScreen, { SectionItem } from './SectionScreen';
import HomeDashboardScreen from './HomeDashboardScreen';

const home: SectionItem[] = [
    { title: 'Watch Live', category: 'watch-live', screen: 'Live' },
    { title: 'Upcoming Service', category: 'upcoming-service', screen: 'Events' },
    { title: 'Daily Devotional', category: 'daily-devotional' },
    { title: 'Latest Message', category: 'latest-message', screen: 'Sermons' },
    { title: 'Prayer', category: 'prayer', screen: 'PrayerRequest' },
    { title: 'Announcements', category: 'announcements' },
];
const watch: SectionItem[] = [
    { title: 'Live Service', category: 'live-service', screen: 'Live' },
    { title: 'Sermons', category: 'sermons', screen: 'Sermons' },
];
const grow: SectionItem[] = [
    { title: 'Discipleship School', category: 'discipleship-school' },
];
const community: SectionItem[] = [
    { title: 'Events', category: 'events', screen: 'Events' },
    { title: 'Testimonies', category: 'testimonies', screen: 'Testimonies' },
    { title: 'Online Campus', category: 'online-campus' },
];
const connect: SectionItem[] = [
    { title: "I'm New", category: 'im-new', screen: 'FirstTimer' },
    { title: 'Salvation', category: 'salvation', screen: 'ConnectRequest', params: { title: 'Salvation', type: 'salvation' } },
    { title: 'Membership', category: 'membership', screen: 'ConnectRequest', params: { title: 'Membership', type: 'membership' } },
    { title: 'Prayer Request', category: 'prayer-request', screen: 'PrayerRequest' },
    { title: 'Speak to a Pastor', category: 'speak-to-a-pastor', screen: 'ConnectRequest', params: { title: 'Speak to a Pastor', type: 'speak-to-a-pastor' } },
    { title: 'Join a Team', category: 'join-a-team', screen: 'ConnectRequest', params: { title: 'Join a Team', type: 'join-a-team' } },
];
const give: SectionItem[] = [
    { title: 'Tithe', category: 'tithe', screen: 'Giving' },
    { title: 'Offering', category: 'offering', screen: 'Giving' },
    { title: 'Projects', category: 'projects', screen: 'Giving' },
    { title: 'Missions', category: 'missions', screen: 'Giving' },
];
const profile: SectionItem[] = [
    { title: 'My Prayer Requests', category: 'my-prayer-requests', screen: 'MyPrayerRequests' },
    { title: 'My Journey', category: 'my-journey' },
    { title: 'Groups', category: 'groups' },
    { title: 'Serving Team', category: 'serving-team' },
    { title: 'Notifications', category: 'notifications' },
];

export const HomeHubScreen = HomeDashboardScreen;
export const WatchScreen = () => <SectionScreen title="Watch" section="watch" items={watch} />;
export const GrowScreen = () => <SectionScreen title="Grow" section="grow" items={grow} />;
export const CommunityScreen = () => <SectionScreen title="Community" section="community" items={community} />;
export const ConnectScreen = () => <SectionScreen title="Connect" section="connect" items={connect} />;
export const GiveScreen = () => <SectionScreen title="Give" section="give" items={give} />;
export const ProfileScreen = () => <SectionScreen title="Profile" section="profile" items={profile} />;
