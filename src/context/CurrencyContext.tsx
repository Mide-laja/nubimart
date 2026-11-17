'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SUPPORTED_COUNTRIES, CountryConfig, DEFAULT_COUNTRY } from '../lib/constants/countries';
import { SUPPORTED_CURRENCIES, CurrencyConfig, DEFAULT_CURRENCY } from '../lib/constants/currencies';

interface CurrencyContextType {
  currentCountry: CountryConfig;
  currentCurrency: CurrencyConfig;
  setCountry: (countryCode: string) => void;
  setCurrency: (currencyCode: string) => void;
  formatPrice: (amountInUSD: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currentCountry, setCurrentCountryState] = useState<CountryConfig>(DEFAULT_COUNTRY);
  const [currentCurrency, setCurrentCurrencyState] = useState<CurrencyConfig>(DEFAULT_CURRENCY);

  useEffect(() => {
    const savedCountry = localStorage.getItem('nubimart_country');
    const savedCurrency = localStorage.getItem('nubimart_currency');

    if (savedCountry) {
      const found = SUPPORTED_COUNTRIES.find((c) => c.code === savedCountry);
      if (found) setCurrentCountryState(found);
    }
    if (savedCurrency && SUPPORTED_CURRENCIES[savedCurrency]) {
      setCurrentCurrencyState(SUPPORTED_CURRENCIES[savedCurrency]);
    }
  }, []);

  const setCountry = (countryCode: string) => {
    const country = SUPPORTED_COUNTRIES.find((c) => c.code === countryCode);
    if (country) {
      setCurrentCountryState(country);
      localStorage.setItem('nubimart_country', country.code);
      // Automatically switch currency if supported
      if (SUPPORTED_CURRENCIES[country.currency]) {
        setCurrentCurrencyState(SUPPORTED_CURRENCIES[country.currency]);
        localStorage.setItem('nubimart_currency', country.currency);
      }
    }
  };

  const setCurrency = (currencyCode: string) => {
    if (SUPPORTED_CURRENCIES[currencyCode]) {
      const curr = SUPPORTED_CURRENCIES[currencyCode];
      setCurrentCurrencyState(curr);
      localStorage.setItem('nubimart_currency', curr.code);
    }
  };

  const formatPrice = (amountInUSD: number) => {
    const converted = amountInUSD * currentCurrency.exchangeRateFromUSD;
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currentCurrency.code,
      currencyDisplay: 'narrowSymbol',
      minimumFractionDigits: currentCurrency.code === 'JPY' ? 0 : 2,
      maximumFractionDigits: currentCurrency.code === 'JPY' ? 0 : 2,
    }).format(converted);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currentCountry,
        currentCurrency,
        setCountry,
        setCurrency,
        formatPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
