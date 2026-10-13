import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

export default function AppScreen({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
    return <SafeAreaView edges={['top', 'left', 'right']} style={[{ flex: 1, backgroundColor: colors.background }, style]}>{children}</SafeAreaView>;
}
