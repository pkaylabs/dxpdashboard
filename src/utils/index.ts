export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const formatNumber = (value: number): string => {
  return value.toLocaleString();
};

// Alternative with more control
export const formatNumberWithOptions = (
  value: number,
  options?: {
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    locale?: string;
  }
): string => {
  const defaultOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    locale: 'en-US',
    ...options
  };
  
  return value.toLocaleString(defaultOptions.locale, {
    minimumFractionDigits: defaultOptions.minimumFractionDigits,
    maximumFractionDigits: defaultOptions.maximumFractionDigits,
  });
};

// Compact number formatting (K, M, B)
export const formatCompactNumber = (value: number): string => {
  if (value >= 1000000000) {
    return (value / 1000000000).toFixed(1) + 'B';
  }
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1) + 'M';
  }
  if (value >= 1000) {
    return (value / 1000).toFixed(1) + 'K';
  }
  return value.toString();
};