import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';

const DARK_BG = '#0f0f1a';

export default function App() {
  return (
    <View style={styles.root}>
      <Provider store={store}>
        <SafeAreaProvider style={styles.root}>
          <StatusBar style="light" />
          <View style={styles.root}>
            <AppNavigator />
          </View>
        </SafeAreaProvider>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: DARK_BG,
  },
});
