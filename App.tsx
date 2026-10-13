import { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';

import RootNavigator from './src/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AppState } from 'react-native';
import { focusManager } from '@tanstack/react-query';
import { useEffect } from 'react';
import { AuthProvider } from './src/context/AuthContext';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            refetchInterval: 15000,
            refetchIntervalInBackground: false,
            refetchOnMount: 'always',
            refetchOnReconnect: 'always',
            retry: 2,
        },
    },
});

export default function App() {

    useEffect(() => {
        const subscription = AppState.addEventListener('change', status => {
            const active = status === 'active';
            focusManager.setFocused(active);
            if (active) queryClient.refetchQueries({ type: 'active' });
        });
        return () => subscription.remove();
    }, []);

    return (

        <SafeAreaProvider>
            <StatusBar style="dark" backgroundColor="#F5F4F8" translucent={false} />
            <QueryClientProvider client={queryClient}>
                <AuthProvider>
                    <RootNavigator onNavigationChange={() => queryClient.refetchQueries({ type: 'active' })} />
                </AuthProvider>
            </QueryClientProvider>
        </SafeAreaProvider>

    );
}
