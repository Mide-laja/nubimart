export interface CountryConfig {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  currency: string;
  currencySymbol: string;
  phoneCode: string;
  region: 'Africa' | 'Europe' | 'North America' | 'Middle East & Asia-Pacific';
  taxRate: number; // e.g. 0.075 for 7.5%
  flag: string;
}

export const SUPPORTED_COUNTRIES: CountryConfig[] = [
  // West Africa
  { code: 'NG', name: 'Nigeria', currency: 'NGN', currencySymbol: '₦', phoneCode: '+234', region: 'Africa', taxRate: 0.075, flag: '🇳🇬' },
  { code: 'GH', name: 'Ghana', currency: 'GHS', currencySymbol: 'GH₵', phoneCode: '+233', region: 'Africa', taxRate: 0.125, flag: '🇬🇭' },
  { code: 'CI', name: "Côte d'Ivoire", currency: 'XOF', currencySymbol: 'CFA', phoneCode: '+225', region: 'Africa', taxRate: 0.18, flag: '🇨🇮' },
  { code: 'SN', name: 'Senegal', currency: 'XOF', currencySymbol: 'CFA', phoneCode: '+221', region: 'Africa', taxRate: 0.18, flag: '🇸🇳' },

  // East & Southern Africa
  { code: 'KE', name: 'Kenya', currency: 'KES', currencySymbol: 'KSh', phoneCode: '+254', region: 'Africa', taxRate: 0.16, flag: '🇰🇪' },
  { code: 'ZA', name: 'South Africa', currency: 'ZAR', currencySymbol: 'R', phoneCode: '+27', region: 'Africa', taxRate: 0.15, flag: '🇿🇦' },
  { code: 'RW', name: 'Rwanda', currency: 'RWF', currencySymbol: 'FRw', phoneCode: '+250', region: 'Africa', taxRate: 0.18, flag: '🇷🇼' },
  { code: 'UG', name: 'Uganda', currency: 'UGX', currencySymbol: 'USh', phoneCode: '+256', region: 'Africa', taxRate: 0.18, flag: '🇺🇬' },
  { code: 'TZ', name: 'Tanzania', currency: 'TZS', currencySymbol: 'TSh', phoneCode: '+255', region: 'Africa', taxRate: 0.18, flag: '🇹🇿' },
  { code: 'EG', name: 'Egypt', currency: 'EGP', currencySymbol: 'E£', phoneCode: '+20', region: 'Africa', taxRate: 0.14, flag: '🇪🇬' },
  { code: 'MA', name: 'Morocco', currency: 'MAD', currencySymbol: 'DH', phoneCode: '+212', region: 'Africa', taxRate: 0.20, flag: '🇲🇦' },

  // Europe & UK
  { code: 'GB', name: 'United Kingdom', currency: 'GBP', currencySymbol: '£', phoneCode: '+44', region: 'Europe', taxRate: 0.20, flag: '🇬🇧' },
  { code: 'DE', name: 'Germany', currency: 'EUR', currencySymbol: '€', phoneCode: '+49', region: 'Europe', taxRate: 0.19, flag: '🇩🇪' },
  { code: 'FR', name: 'France', currency: 'EUR', currencySymbol: '€', phoneCode: '+33', region: 'Europe', taxRate: 0.20, flag: '🇫🇷' },
  { code: 'NL', name: 'Netherlands', currency: 'EUR', currencySymbol: '€', phoneCode: '+31', region: 'Europe', taxRate: 0.21, flag: '🇳🇱' },
  { code: 'IT', name: 'Italy', currency: 'EUR', currencySymbol: '€', phoneCode: '+39', region: 'Europe', taxRate: 0.22, flag: '🇮🇹' },
  { code: 'ES', name: 'Spain', currency: 'EUR', currencySymbol: '€', phoneCode: '+34', region: 'Europe', taxRate: 0.21, flag: '🇪🇸' },
  { code: 'IE', name: 'Ireland', currency: 'EUR', currencySymbol: '€', phoneCode: '+353', region: 'Europe', taxRate: 0.23, flag: '🇮🇪' },
  { code: 'PL', name: 'Poland', currency: 'PLN', currencySymbol: 'zł', phoneCode: '+48', region: 'Europe', taxRate: 0.23, flag: '🇵🇱' },
  { code: 'SE', name: 'Sweden', currency: 'SEK', currencySymbol: 'kr', phoneCode: '+46', region: 'Europe', taxRate: 0.25, flag: '🇸🇪' },
  { code: 'CH', name: 'Switzerland', currency: 'CHF', currencySymbol: 'CHF', phoneCode: '+41', region: 'Europe', taxRate: 0.081, flag: '🇨🇭' },
  { code: 'BE', name: 'Belgium', currency: 'EUR', currencySymbol: '€', phoneCode: '+32', region: 'Europe', taxRate: 0.21, flag: '🇧🇪' },
  { code: 'AT', name: 'Austria', currency: 'EUR', currencySymbol: '€', phoneCode: '+43', region: 'Europe', taxRate: 0.20, flag: '🇦🇹' },
  { code: 'PT', name: 'Portugal', currency: 'EUR', currencySymbol: '€', phoneCode: '+351', region: 'Europe', taxRate: 0.23, flag: '🇵🇹' },

  // North America
  { code: 'US', name: 'United States', currency: 'USD', currencySymbol: '$', phoneCode: '+1', region: 'North America', taxRate: 0.08, flag: '🇺🇸' },
  { code: 'CA', name: 'Canada', currency: 'CAD', currencySymbol: 'CA$', phoneCode: '+1', region: 'North America', taxRate: 0.13, flag: '🇨🇦' },

  // Middle East & Asia-Pacific
  { code: 'AE', name: 'United Arab Emirates', currency: 'AED', currencySymbol: 'AED', phoneCode: '+971', region: 'Middle East & Asia-Pacific', taxRate: 0.05, flag: '🇦🇪' },
  { code: 'SA', name: 'Saudi Arabia', currency: 'SAR', currencySymbol: 'SAR', phoneCode: '+966', region: 'Middle East & Asia-Pacific', taxRate: 0.15, flag: '🇸🇦' },
  { code: 'QA', name: 'Qatar', currency: 'QAR', currencySymbol: 'QAR', phoneCode: '+974', region: 'Middle East & Asia-Pacific', taxRate: 0.0, flag: '🇶🇦' },
  { code: 'TR', name: 'Turkey', currency: 'TRY', currencySymbol: '₺', phoneCode: '+90', region: 'Middle East & Asia-Pacific', taxRate: 0.20, flag: '🇹🇷' },
  { code: 'IN', name: 'India', currency: 'INR', currencySymbol: '₹', phoneCode: '+91', region: 'Middle East & Asia-Pacific', taxRate: 0.18, flag: '🇮🇳' },
  { code: 'SG', name: 'Singapore', currency: 'SGD', currencySymbol: 'S$', phoneCode: '+65', region: 'Middle East & Asia-Pacific', taxRate: 0.09, flag: '🇸🇬' },
  { code: 'MY', name: 'Malaysia', currency: 'MYR', currencySymbol: 'RM', phoneCode: '+60', region: 'Middle East & Asia-Pacific', taxRate: 0.08, flag: '🇲🇾' },
  { code: 'AU', name: 'Australia', currency: 'AUD', currencySymbol: 'A$', phoneCode: '+61', region: 'Middle East & Asia-Pacific', taxRate: 0.10, flag: '🇦🇺' },
  { code: 'NZ', name: 'New Zealand', currency: 'NZD', currencySymbol: 'NZ$', phoneCode: '+64', region: 'Middle East & Asia-Pacific', taxRate: 0.15, flag: '🇳🇿' },
  { code: 'JP', name: 'Japan', currency: 'JPY', currencySymbol: '¥', phoneCode: '+81', region: 'Middle East & Asia-Pacific', taxRate: 0.10, flag: '🇯🇵' },
  { code: 'CN', name: 'China / HK', currency: 'HKD', currencySymbol: 'HK$', phoneCode: '+852', region: 'Middle East & Asia-Pacific', taxRate: 0.0, flag: '🇭🇰' },
  { code: 'BR', name: 'Brazil', currency: 'BRL', currencySymbol: 'R$', phoneCode: '+55', region: 'North America', taxRate: 0.17, flag: '🇧🇷' },
];

export const DEFAULT_COUNTRY = SUPPORTED_COUNTRIES.find((c) => c.code === 'US') || SUPPORTED_COUNTRIES[0];
