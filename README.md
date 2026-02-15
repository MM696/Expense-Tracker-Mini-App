# Transaction App — Softnet Limited Assessment

A React Native (Expo) FinTech-style transaction list app with list, detail, and add flows. Built with **TypeScript**, **Redux Toolkit**, and **React Navigation**.

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo Go app on your device (optional, for quick testing)
- Android Studio / Xcode for simulators (optional)

### Install and run

```bash
# Install dependencies (already done if you cloned)
npm install

# Start the development server
npm start
```

Then:

- Press **a** for Android emulator
- Press **i** for iOS simulator (macOS only)
- Or scan the QR code with **Expo Go** on your phone

### Scripts

| Command     | Description        |
|------------|--------------------|
| `npm start` | Start Expo dev server |
| `npm run android` | Run on Android   |
| `npm run ios`    | Run on iOS       |
| `npm run web`    | Run in browser   |

---

## Approach and structure

### Tech choices

- **Expo** — Fast setup, managed workflow, easy to run on device/simulator.
- **Redux Toolkit** — Single source of truth for transactions, filters, and search; predictable updates and good TypeScript support.
- **React Navigation (native stack)** — Native-feeling transitions and clear list → detail → add flow.

### Folder structure

```
src/
├── data/
│   └── mockTransactions.ts   # Initial 18 mock transactions
├── navigation/
│   └── AppNavigator.tsx     # Stack: List → Detail, List → Add
├── screens/
│   ├── TransactionListScreen.tsx   # List + search + category filter + pull-to-refresh
│   ├── TransactionDetailScreen.tsx # Full transaction info
│   └── AddTransactionScreen.tsx    # Form with validation + date/category pickers
├── store/
│   ├── index.ts             # Redux store
│   ├── hooks.ts             # useAppDispatch / useAppSelector
│   └── transactionSlice.ts  # transactions state, filters, search, add, refresh
└── types/
    └── transaction.ts       # Transaction type, categories
```

### State and data

- **Redux state:** `items` (transaction list), `selectedCategory`, `searchQuery`.
- **Filtering:** Derived in the list screen with `useMemo` from `items` + category + search (no duplicated list in state).
- **Add flow:** New transaction is dispatched to Redux and prepended to the list; no backend.
- **Pull-to-refresh:** Dispatches `refreshTransactions` to reset the list to the initial mock data.

### UI/UX

- Dark theme tuned for readability (contrast, amount colors: red for debits, green for credits).
- List: search bar, horizontal category chips, pull-to-refresh, FAB to add.
- Add screen: decimal keyboard for amount, category chips, native date picker, inline validation.
- Responsive: list and form work across small/large screens; layout uses flex and padding.

### Error handling

- Add form: required checks and numeric amount validation; errors shown inline.
- Empty list: message when no transactions match filters.
- No network layer (mock data only), so no API error handling.

---

## Requirements checklist

| Requirement | Implementation |
|------------|----------------|
| **A. Transaction list** | List with amount, merchant, category, date; pull-to-refresh; category filter (chips); search by merchant |
| **B. Transaction detail** | Tap row → detail screen with full transaction info |
| **C. Add transaction** | Form (amount, merchant, category, date); validation; category picker; date picker; native keyboards; add to Redux |
| **D. TypeScript** | Full TypeScript; typed Redux and navigation |
| **D. State management** | Redux Toolkit (slice + typed hooks) |
| **D. Navigation** | React Navigation native stack |
| **D. Responsive** | Flex-based layout, works on different screen sizes |
| **D. Error handling** | Form validation; empty state message |
| **D. Clean structure** | `src/` with data, navigation, screens, store, types |

---

## Sample data

Mock data includes 18 transactions across: Groceries, Transportation, Dining, Entertainment, Healthcare, Shopping, Utilities. See `src/data/mockTransactions.ts`.

---

## Notes

- New transactions are stored only in Redux (in-memory). Restart or pull-to-refresh resets to the initial mock set.
- Dates use `YYYY-MM-DD` in state; display uses locale formatting.
- Amounts entered in the Add form are stored as negative (expenses).
