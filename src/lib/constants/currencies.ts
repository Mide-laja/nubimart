export interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  exchangeRateFromUSD: number; // Conversion rate: 1 USD = rate * Currency
}

export const SUPPORTED_CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', exchangeRateFromUSD: 1.0 },
  NGN: { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', exchangeRateFromUSD: 1550.0 },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', exchangeRateFromUSD: 0.79 },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', exchangeRateFromUSD: 0.92 },
  KES: { code: 'KES', name: 'Kenyan Shilling', symbol: 'KSh', exchangeRateFromUSD: 130.0 },
  ZAR: { code: 'ZAR', name: 'South African Rand', symbol: 'R', exchangeRateFromUSD: 18.25 },
  GHS: { code: 'GHS', name: 'Ghanaian Cedi', symbol: 'GH₵', exchangeRateFromUSD: 15.4 },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', exchangeRateFromUSD: 1.36 },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'AED', exchangeRateFromUSD: 3.67 },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', exchangeRateFromUSD: 84.0 },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', exchangeRateFromUSD: 1.52 },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', exchangeRateFromUSD: 152.0 },
  XOF: { code: 'XOF', name: 'West African CFA Franc', symbol: 'CFA', exchangeRateFromUSD: 605.0 },
};

export const DEFAULT_CURRENCY = SUPPORTED_CURRENCIES.USD;
