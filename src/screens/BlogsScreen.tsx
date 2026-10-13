import React from 'react';
import { useNavigation } from '@react-navigation/native';
import CollectionScreen from '../components/CollectionScreen';
import BlogCard from '../components/BlogCard';
import { useBlogs } from '../hooks/useBlogs';
export default function BlogsScreen() { const navigation = useNavigation<any>(); const { data, isLoading, isRefetching, refetch } = useBlogs(); return <CollectionScreen title="Devotionals" eyebrow="READ & GROW" data={data?.data || []} loading={isLoading} refreshing={isRefetching} onRefresh={refetch} renderItem={({ item }) => <BlogCard blog={item} onPress={() => navigation.navigate('BlogDetails', { blog: item })} />} />; }
