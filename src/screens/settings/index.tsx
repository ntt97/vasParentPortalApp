import styles from './styles';
import React, { useEffect } from 'react';
import { ViewVertical } from '@components/viewBox.component';
import { StatusBar, Image, Text } from 'react-native';
import colors from '@constants/colors';

const SettingsScreen = () => {
    useEffect(() => {
    }, []);

    return (
        <ViewVertical style={{ backgroundColor: colors.background }}>
            <Text>Settings</Text>
        </ViewVertical>
    );
}

export default SettingsScreen;