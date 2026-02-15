import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  setSelectedCategory,
  setSearchQuery,
  refreshTransactions,
} from '../store/transactionSlice';
import { Transaction } from '../types/transaction';
import { RootStackParamList } from '../navigation/AppNavigator';
import { CATEGORIES, formatAmount } from '../types/transaction';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'TransactionList'>;

function TransactionItem({
  transaction,
  onPress,
}: {
  transaction: Transaction;
  onPress: () => void;
}) {
  const isNegative = transaction.amount < 0;
  const amountColor = isNegative ? '#e74c3c' : '#27ae60';

  return (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.itemLeft}>
        <Text style={styles.merchant} numberOfLines={1}>
          {transaction.merchant}
        </Text>
        <Text style={styles.meta}>
          {transaction.category} • {formatDate(transaction.date)}
        </Text>
      </View>
      <Text style={[styles.amount, { color: amountColor }]}>
        {formatAmount(transaction.amount)}
      </Text>
    </TouchableOpacity>
  );
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function TransactionListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const { items, selectedCategory, searchQuery } = useAppSelector((s) => s.transactions);
  const [refreshing, setRefreshing] = React.useState(false);

  const filteredTransactions = useMemo(() => {
    return items.filter((t) => {
      const matchesCategory =
        !selectedCategory || t.category === selectedCategory;
      const matchesSearch =
        !searchQuery.trim() ||
        t.merchant.toLowerCase().includes(searchQuery.trim().toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [items, selectedCategory, searchQuery]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(refreshTransactions());
    setRefreshing(false);
  }, [dispatch]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by merchant..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={(text) => dispatch(setSearchQuery(text))}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.filterSection}>
        <Text style={styles.filterLabel}>Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          <TouchableOpacity
            style={[styles.chip, !selectedCategory && styles.chipActive]}
            onPress={() => dispatch(setSelectedCategory(null))}
          >
            <Text
              style={[
                styles.chipText,
                !selectedCategory && styles.chipTextActive,
              ]}
            >
              All
            </Text>
          </TouchableOpacity>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.chip,
                selectedCategory === cat && styles.chipActive,
              ]}
              onPress={() =>
                dispatch(
                  setSelectedCategory(selectedCategory === cat ? null : cat)
                )
              }
            >
              <Text
                style={[
                  styles.chipText,
                  selectedCategory === cat && styles.chipTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            transaction={item}
            onPress={() =>
              navigation.navigate('TransactionDetail', { transaction: item })
            }
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          filteredTransactions.length === 0 && styles.listEmpty,
        ]}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No transactions match your filters.</Text>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#eee"
          />
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTransaction')}
        activeOpacity={0.8}
      >
        <Text style={styles.fabText}>+ Add</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  searchRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1a1a2e',
  },
  searchInput: {
    backgroundColor: '#252542',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#eee',
  },
  filterSection: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#252542',
  },
  filterLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  chips: {
    paddingHorizontal: 16,
    gap: 8,
    flexDirection: 'row',
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#252542',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#4361ee',
  },
  chipText: {
    color: '#aaa',
    fontSize: 14,
  },
  chipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  listEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
  },
  itemLeft: {
    flex: 1,
    marginRight: 12,
  },
  merchant: {
    fontSize: 16,
    fontWeight: '600',
    color: '#eee',
  },
  meta: {
    fontSize: 13,
    color: '#888',
    marginTop: 4,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 48,
    right: 24,
    backgroundColor: '#4361ee',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 28,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
