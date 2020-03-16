import React from 'react';
import AppContent from "./app/AppContent";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SettingsView from "./app/SettingsView";

const RootStack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <RootStack.Navigator mode="modal" headerMode="none">
                <RootStack.Screen name="Main" component={AppContent} />
                <RootStack.Screen name="SettingsView" component={SettingsView} />
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
