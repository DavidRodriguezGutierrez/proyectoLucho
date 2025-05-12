export const defaultThemeConfig = {
    light: {
      background: '#ffffff',
      foreground: '#1f2937',
      card: '#ffffff',
      cardForeground: '#1f2937',
      popover: '#ffffff',
      popoverForeground: '#1f2937',
      primary: '#469910', // igual en ambos modos
      primaryForeground: '#ffffff',
      secondary: '#f59e0b',
      secondaryForeground: '#1f2937',
      muted: '#f3f4f6',
      mutedForeground: '#6b7280',
      accent: '#F2F2F5',
      destructive: '#ef4444',
      destructiveForeground: '#ffffff',
      border: '#e5e7eb',
      input: '#e5e7eb',
      ring: '#3b82f6',
      chart1: '#10b981',
      chart2: '#3b82f6',
      chart3: '#f59e0b',
      chart4: '#6366f1',
      chart5: '#ef4444',
      radius: '0.625rem',
    },
    dark: {
      background: '#2F3840',
      foreground: '#f9fafb',
      card: '#374151',
      cardForeground: '#f9fafb',
      popover: '#374151',
      popoverForeground: '#f9fafb',
      primary: '#469910', // igual en ambos modos
      primaryForeground: '#ffffff',
      secondary: '#fbbf24',
      secondaryForeground: '#1f2937',
      muted: '#4b5563',
      mutedForeground: '#d1d5db',
      accent: '#3E4A59',
      accentForeground: '#ffffff',
      destructive: '#dc2626',
      destructiveForeground: '#ffffff',
      border: '#3E4B5E', // border modificado a blanco esqueleto
      input: '#3E4B5E',
      ring: '#2563eb',
      chart1: '#10b981',
      chart2: '#3b82f6',
      chart3: '#f59e0b',
      chart4: '#6366f1',
      chart5: '#ef4444',
      radius: '0.625rem',
      sidebar: '#2F3840',
    },
  };
  
  export async function fetchThemeConfig() {
    return defaultThemeConfig;
  }
  
