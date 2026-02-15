import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '../store/hooks';
import { addTransaction } from '../store/transactionSlice';
import { Transaction } from '../types/transaction';
import { CATEGORIES, CURRENCY, CURRENCY_SYMBOL } from '../types/transaction';

interface FormErrors {
  amount?: string;
  merchant?: string;
  category?: string;
  date?: string;
}

export default function AddTransactionScreen() {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState('');
  const [merchant, setMerchant] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): boolean => {
    const next: FormErrors = {};
    const amountNum = parseFloat(amount);
    if (amount === '' || isNaN(amountNum)) {
      next.amount = 'Enter a valid amount';
    }
    if (!merchant.trim()) {
      next.merchant = 'Merchant name is required';
    }
    if (!category) {
      next.category = 'Select a category';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onDateChange = (_: unknown, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setDate(selectedDate);
  };

  const formatDateForDisplay = (d: Date) =>
    d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

  const formatDateForStorage = (d: Date) =>
    d.toISOString().split('T')[0];

  const handleSubmit = () => {
    if (!validate()) return;

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      amount: -Math.abs(parseFloat(amount)),
      merchant: merchant.trim(),
      category: category!,
      date: formatDateForStorage(date),
      status: 'completed',
      currency: CURRENCY,
    };

    dispatch(addTransaction(newTransaction));
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { paddingTop: insets.top }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.field}>
          <Text style={styles.label}>Amount ({CURRENCY_SYMBOL}) *</Text>
          <TextInput
            style={[styles.input, errors.amount && styles.inputError]}
            placeholder="0.00"
            placeholderTextColor="#666"
            value={amount}
            onChangeText={(t) => {
              setAmount(t);
              if (errors.amount) setErrors((e) => ({ ...e, amount: undefined }));
            }}
            keyboardType="decimal-pad"
          />
          {errors.amount ? (
            <Text style={styles.errorText}>{errors.amount}</Text>
          ) : null}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Merchant *</Text>
          <TextInput
            style={[styles.input, errors.merchant && styles.inputError]}
            placeholder="e.g. Whole Foods"
            placeholderTextColor="#666"
            value={merchant}
            onChangeText={(t) => {
              setMerchant(t);
              if (errors.merchant)
                setErrors((e) => ({ ...e, merchant: undefined }));
            }}
            autoCapitalize="words"
            autoCorrect={false}
          />
          {errors.merchant ? (
            <Text style={styles.errorText}>{errors.merchant}</Text>
          ) : null}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Category *</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categories}
          >
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  category === cat && styles.categoryChipActive,
                ]}
                onPress={() => {
                  setCategory(cat);
                  if (errors.category)
                    setErrors((e) => ({ ...e, category: undefined }));
                }}
              >
                <Text
                  style={[
                    styles.categoryChipText,
                    category === cat && styles.categoryChipTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {errors.category ? (
            <Text style={styles.errorText}>{errors.category}</Text>
          ) : null}
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date *</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              {formatDateForDisplay(date)}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={onDateChange}
              maximumDate={new Date()}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>Add Transaction</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1a',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#eee',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  errorText: {
    color: '#e74c3c',
    fontSize: 12,
    marginTop: 6,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1a1a2e',
    marginRight: 8,
    marginBottom: 4,
  },
  categoryChipActive: {
    backgroundColor: '#4361ee',
  },
  categoryChipText: {
    color: '#aaa',
    fontSize: 14,
  },
  categoryChipTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  dateButton: {
    backgroundColor: '#1a1a2e',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dateButtonText: {
    fontSize: 16,
    color: '#eee',
  },
  submitButton: {
    backgroundColor: '#4361ee',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
