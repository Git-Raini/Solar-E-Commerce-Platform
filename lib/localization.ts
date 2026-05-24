export type LocaleConfig = {
  label: string;
  locale: string;
  currency: string;
};

export const countryConfig: Record<string, LocaleConfig> = {
  India: { label: "India", locale: "en-IN", currency: "INR" },
  USA: { label: "USA", locale: "en-US", currency: "USD" },
  Germany: { label: "Germany", locale: "de-DE", currency: "EUR" },
  UK: { label: "United Kingdom", locale: "en-GB", currency: "GBP" },
  Australia: { label: "Australia", locale: "en-AU", currency: "AUD" },
};

export const supportedCountries = Object.keys(countryConfig);

export function formatCurrency(value: number, country = "USA") {
  const config = countryConfig[country] ?? countryConfig.USA;
  return new Intl.NumberFormat(config.locale, {
    style: "currency",
    currency: config.currency,
  }).format(value);
}
