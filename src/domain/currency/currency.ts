import { assert } from '../assert';

export interface Currency {
  code: string;
  symbol: string;
  decimals?: number;
  rounding?: number;
}

export type Currencies = { [currencyCode: string]: Currency };

export function assertCurrencyCode(currencyCode: string) {
  assert(
    /^[A-Z]{3}$/.test(currencyCode),
    `Currency code "${currencyCode}" doesn't match ISO-4217 format`
  );
}

export const KnownCurrencies: Currencies = {
  USD: {
    code: 'USD',
    symbol: '$',
    decimals: 2
  },
  CAD: {
    code: 'CAD',
    symbol: 'CA$',
    decimals: 2
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    decimals: 2
  },
  AED: {
    code: 'AED',
    symbol: 'AED',
    decimals: 2
  },
  AFN: {
    code: 'AFN',
    symbol: 'Af'
  },
  ALL: {
    code: 'ALL',
    symbol: 'ALL'
  },
  AMD: {
    code: 'AMD',
    symbol: 'AMD'
  },
  ARS: {
    code: 'ARS',
    symbol: 'AR$',
    decimals: 2
  },
  AUD: {
    code: 'AUD',
    symbol: 'AU$',
    decimals: 2
  },
  AZN: {
    code: 'AZN',
    symbol: 'man.',
    decimals: 2
  },
  BAM: {
    code: 'BAM',
    symbol: 'KM',
    decimals: 2
  },
  BDT: {
    code: 'BDT',
    symbol: 'Tk',
    decimals: 2
  },
  BGN: {
    code: 'BGN',
    symbol: 'BGN',
    decimals: 2
  },
  BHD: {
    code: 'BHD',
    symbol: 'BD',
    decimals: 3
  },
  BIF: {
    code: 'BIF',
    symbol: 'FBu'
  },
  BND: {
    code: 'BND',
    symbol: 'BN$',
    decimals: 2
  },
  BOB: {
    code: 'BOB',
    symbol: 'Bs',
    decimals: 2
  },
  BRL: {
    code: 'BRL',
    symbol: 'R$',
    decimals: 2
  },
  BWP: {
    code: 'BWP',
    symbol: 'BWP',
    decimals: 2
  },
  BYR: {
    code: 'BYR',
    symbol: 'BYR'
  },
  BZD: {
    code: 'BZD',
    symbol: 'BZ$',
    decimals: 2
  },
  CDF: {
    code: 'CDF',
    symbol: 'CDF',
    decimals: 2
  },
  CHF: {
    code: 'CHF',
    symbol: 'CHF',
    decimals: 2,
    rounding: 5
  },
  CLP: {
    code: 'CLP',
    symbol: 'CL$'
  },
  CNY: {
    code: 'CNY',
    symbol: 'CN¥',
    decimals: 2
  },
  COP: {
    code: 'COP',
    symbol: 'CO$'
  },
  CRC: {
    code: 'CRC',
    symbol: '₡'
  },
  CVE: {
    code: 'CVE',
    symbol: 'CV$',
    decimals: 2
  },
  CZK: {
    code: 'CZK',
    symbol: 'Kč',
    decimals: 2
  },
  DJF: {
    code: 'DJF',
    symbol: 'Fdj'
  },
  DKK: {
    code: 'DKK',
    symbol: 'Dkr',
    decimals: 2
  },
  DOP: {
    code: 'DOP',
    symbol: 'RD$',
    decimals: 2
  },
  DZD: {
    code: 'DZD',
    symbol: 'DA',
    decimals: 2
  },
  EEK: {
    code: 'EEK',
    symbol: 'Ekr',
    decimals: 2
  },
  EGP: {
    code: 'EGP',
    symbol: 'EGP',
    decimals: 2
  },
  ERN: {
    code: 'ERN',
    symbol: 'Nfk',
    decimals: 2
  },
  ETB: {
    code: 'ETB',
    symbol: 'Br',
    decimals: 2
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    decimals: 2
  },
  GEL: {
    code: 'GEL',
    symbol: 'GEL',
    decimals: 2
  },
  GHS: {
    code: 'GHS',
    symbol: 'GH₵',
    decimals: 2
  },
  GNF: {
    code: 'GNF',
    symbol: 'FG'
  },
  GTQ: {
    code: 'GTQ',
    symbol: 'GTQ',
    decimals: 2
  },
  HKD: {
    code: 'HKD',
    symbol: 'HK$',
    decimals: 2
  },
  HNL: {
    code: 'HNL',
    symbol: 'HNL',
    decimals: 2
  },
  HRK: {
    code: 'HRK',
    symbol: 'kn',
    decimals: 2
  },
  HUF: {
    code: 'HUF',
    symbol: 'Ft'
  },
  IDR: {
    code: 'IDR',
    symbol: 'Rp'
  },
  ILS: {
    code: 'ILS',
    symbol: '₪',
    decimals: 2
  },
  INR: {
    code: 'INR',
    symbol: 'Rs',
    decimals: 2
  },
  IQD: {
    code: 'IQD',
    symbol: 'IQD'
  },
  IRR: {
    code: 'IRR',
    symbol: 'IRR'
  },
  ISK: {
    code: 'ISK',
    symbol: 'Ikr'
  },
  JMD: {
    code: 'JMD',
    symbol: 'J$',
    decimals: 2
  },
  JOD: {
    code: 'JOD',
    symbol: 'JD',
    decimals: 3
  },
  JPY: {
    code: 'JPY',
    symbol: '¥'
  },
  KES: {
    code: 'KES',
    symbol: 'Ksh',
    decimals: 2
  },
  KHR: {
    code: 'KHR',
    symbol: 'KHR',
    decimals: 2
  },
  KMF: {
    code: 'KMF',
    symbol: 'CF'
  },
  KRW: {
    code: 'KRW',
    symbol: '₩'
  },
  KWD: {
    code: 'KWD',
    symbol: 'KD',
    decimals: 3
  },
  KZT: {
    code: 'KZT',
    symbol: 'KZT',
    decimals: 2
  },
  LBP: {
    code: 'LBP',
    symbol: 'LB£'
  },
  LKR: {
    code: 'LKR',
    symbol: 'SLRs',
    decimals: 2
  },
  LTL: {
    code: 'LTL',
    symbol: 'Lt',
    decimals: 2
  },
  LVL: {
    code: 'LVL',
    symbol: 'Ls',
    decimals: 2
  },
  LYD: {
    code: 'LYD',
    symbol: 'LD',
    decimals: 3
  },
  MAD: {
    code: 'MAD',
    symbol: 'MAD',
    decimals: 2
  },
  MDL: {
    code: 'MDL',
    symbol: 'MDL',
    decimals: 2
  },
  MGA: {
    code: 'MGA',
    symbol: 'MGA'
  },
  MKD: {
    code: 'MKD',
    symbol: 'MKD',
    decimals: 2
  },
  MMK: {
    code: 'MMK',
    symbol: 'MMK'
  },
  MOP: {
    code: 'MOP',
    symbol: 'MOP$',
    decimals: 2
  },
  MUR: {
    code: 'MUR',
    symbol: 'MURs'
  },
  MXN: {
    code: 'MXN',
    symbol: 'MX$',
    decimals: 2
  },
  MYR: {
    code: 'MYR',
    symbol: 'RM',
    decimals: 2
  },
  MZN: {
    code: 'MZN',
    symbol: 'MTn',
    decimals: 2
  },
  NAD: {
    code: 'NAD',
    symbol: 'N$',
    decimals: 2
  },
  NGN: {
    code: 'NGN',
    symbol: '₦',
    decimals: 2
  },
  NIO: {
    code: 'NIO',
    symbol: 'C$',
    decimals: 2
  },
  NOK: {
    code: 'NOK',
    symbol: 'Nkr',
    decimals: 2
  },
  NPR: {
    code: 'NPR',
    symbol: 'NPRs',
    decimals: 2
  },
  NZD: {
    code: 'NZD',
    symbol: 'NZ$',
    decimals: 2
  },
  OMR: {
    code: 'OMR',
    symbol: 'OMR',
    decimals: 3
  },
  PAB: {
    code: 'PAB',
    symbol: 'B/.',
    decimals: 2
  },
  PEN: {
    code: 'PEN',
    symbol: 'S/.',
    decimals: 2
  },
  PHP: {
    code: 'PHP',
    symbol: '₱',
    decimals: 2
  },
  PKR: {
    code: 'PKR',
    symbol: 'PKRs'
  },
  PLN: {
    code: 'PLN',
    symbol: 'zł',
    decimals: 2
  },
  PYG: {
    code: 'PYG',
    symbol: '₲'
  },
  QAR: {
    code: 'QAR',
    symbol: 'QR',
    decimals: 2
  },
  RON: {
    code: 'RON',
    symbol: 'RON',
    decimals: 2
  },
  RSD: {
    code: 'RSD',
    symbol: 'din.'
  },
  RUB: {
    code: 'RUB',
    symbol: 'RUB',
    decimals: 2
  },
  RWF: {
    code: 'RWF',
    symbol: 'RWF'
  },
  SAR: {
    code: 'SAR',
    symbol: 'SR',
    decimals: 2
  },
  SDG: {
    code: 'SDG',
    symbol: 'SDG',
    decimals: 2
  },
  SEK: {
    code: 'SEK',
    symbol: 'Skr',
    decimals: 2
  },
  SGD: {
    code: 'SGD',
    symbol: 'S$',
    decimals: 2
  },
  SOS: {
    code: 'SOS',
    symbol: 'Ssh'
  },
  SYP: {
    code: 'SYP',
    symbol: 'SY£'
  },
  THB: {
    code: 'THB',
    symbol: '฿',
    decimals: 2
  },
  TND: {
    code: 'TND',
    symbol: 'DT',
    decimals: 3
  },
  TOP: {
    code: 'TOP',
    symbol: 'T$',
    decimals: 2
  },
  TRY: {
    code: 'TRY',
    symbol: 'TL',
    decimals: 2
  },
  TTD: {
    code: 'TTD',
    symbol: 'TT$',
    decimals: 2
  },
  TWD: {
    code: 'TWD',
    symbol: 'NT$',
    decimals: 2
  },
  TZS: {
    code: 'TZS',
    symbol: 'TSh'
  },
  UAH: {
    code: 'UAH',
    symbol: '₴',
    decimals: 2
  },
  UGX: {
    code: 'UGX',
    symbol: 'USh'
  },
  UYU: {
    code: 'UYU',
    symbol: '$U',
    decimals: 2
  },
  UZS: {
    code: 'UZS',
    symbol: 'UZS'
  },
  VEF: {
    code: 'VEF',
    symbol: 'Bs.F.',
    decimals: 2
  },
  VND: {
    code: 'VND',
    symbol: '₫'
  },
  XAF: {
    code: 'XAF',
    symbol: 'FCFA'
  },
  XOF: {
    code: 'XOF',
    symbol: 'CFA'
  },
  YER: {
    code: 'YER',
    symbol: 'YR'
  },
  ZAR: {
    code: 'ZAR',
    symbol: 'R',
    decimals: 2
  },
  ZMK: {
    code: 'ZMK',
    symbol: 'ZK'
  }
};
