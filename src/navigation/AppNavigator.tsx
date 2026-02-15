import React from 'react';
import {
  NavigationContainer,
  DarkTheme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#4361ee',
    background: '#0f0f1a',
    card: '#0f0f1a',
    text: '#eee',
    border: '#252542',
    notification: '#4361ee',
  },
};
import {
  TransactionListScreen,
  TransactionDetailScreen,
  AddTransactionScreen,
} from '../screens';
import CustomHeader from './CustomHeader';
import { Transaction } from '../types/transaction';

export type RootStackParamList = {
  TransactionList: undefined;
  TransactionDetail: { transaction: Transaction };
  AddTransaction: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          header: ({ options }) => (
            <CustomHeader title={options.title ?? ''} />
          ),
          contentStyle: { backgroundColor: '#0f0f1a' },
        }}
      >
        <Stack.Screen
          name="TransactionList"
          component={TransactionListScreen}
          options={{ title: 'Transactions' }}
        />
        <Stack.Screen
          name="TransactionDetail"
          component={TransactionDetailScreen}
          options={{ title: 'Transaction Details' }}
        />
        <Stack.Screen
          name="AddTransaction"
          component={AddTransactionScreen}
          options={{ title: 'Add Transaction' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
