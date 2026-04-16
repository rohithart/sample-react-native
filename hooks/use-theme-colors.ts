import { useTheme } from '@/context/theme-context';

const SLATE_950 = '#0f172a';
const SLATE_800 = '#1e293b';
const SLATE_700 = '#334155';
const SLATE_600 = '#4b5563';
const SLATE_500 = '#64748b';
const SLATE_400 = '#94a3b8';
const SLATE_300 = '#e2e8f0';
const SLATE_200 = '#e5e7eb';
const SLATE_100 = '#f1f5f9';
const SLATE_50 = '#f8fafc';

const GRAY_700 = '#1f2937';
const GRAY_500 = '#6b7280';
const GRAY_400 = '#9ca3af';
const GRAY_300 = '#d1d5db';
const GRAY_200 = '#e5e7eb';

const NEUTRAL_850 = '#1c1c1c';
const NEUTRAL_800 = '#2a2a2a';
const NEUTRAL_750 = '#2a3648';
const NEUTRAL_200 = '#e2e2e2';
const NEUTRAL_100 = '#f0f4f8';
const NEUTRAL_50 = '#f5f5f5';

const PURPLE_400 = '#b279d8';
const PURPLE_700 = '#673ab7';
const PURPLE_200 = '#e9d5ff';
const PURPLE_50_DARK = '#2a1f3d';
const PURPLE_50_LIGHT = '#f3eeff';
const TEAL_400 = '#5dccb5';
const TEAL_700 = '#009688';
const TEAL_50_DARK = '#1a2e2c';
const TEAL_50_LIGHT = '#e8f5f3';
const RED_500 = '#ef4444';
const RED_900_30 = 'rgba(127, 29, 29, 0.3)';
const RED_50 = '#fef2f2';
const ORANGE_500 = '#f97316';
const GREEN_50 = '#ecfdf5';
const GREEN_500 = '#10b981';
const GREEN_500_30 = 'rgba(16, 185, 129, 0.3)';

const WHITE = '#ffffff';
const PRESSED_ALPHA_LIGHT = 'rgba(0, 0, 0, 0.05)';
const PRESSED_ALPHA_DARK = 'rgba(255, 255, 255, 0.1)';

const DARK: Omit<ThemeColors, 'isDark'> = {
  bg: SLATE_950,
  card: SLATE_800,
  text: SLATE_100,
  sub: SLATE_400,
  border: SLATE_700,
  primary: PURPLE_400,
  secondary: TEAL_400,
  danger: RED_500,
  warning: ORANGE_500,
  success: GREEN_500,
  inputBg: SLATE_950,
  inputBorder: SLATE_700,
  pressed: NEUTRAL_750,
  pressedAlpha: PRESSED_ALPHA_DARK,
  icon: SLATE_200,
  inactive: GRAY_500,
  shimmer: NEUTRAL_800,
  skeleton: NEUTRAL_850,
  separator: SLATE_800,
  switchTrack: SLATE_600,
  switchThumb: GRAY_400,
  switchThumbActive: PURPLE_200,
  dangerBg: RED_900_30,
  successBg: GREEN_500_30,
  cardPrimaryBg: PURPLE_50_DARK,
  cardSecondaryBg: TEAL_50_DARK,
};

const LIGHT: Omit<ThemeColors, 'isDark'> = {
  bg: SLATE_50,
  card: WHITE,
  text: SLATE_800,
  sub: SLATE_500,
  border: SLATE_300,
  primary: PURPLE_700,
  secondary: TEAL_700,
  danger: RED_500,
  warning: ORANGE_500,
  success: GREEN_500,
  inputBg: WHITE,
  inputBorder: SLATE_300,
  pressed: NEUTRAL_100,
  pressedAlpha: PRESSED_ALPHA_LIGHT,
  icon: GRAY_700,
  inactive: GRAY_400,
  shimmer: NEUTRAL_200,
  skeleton: NEUTRAL_50,
  separator: SLATE_200,
  switchTrack: GRAY_300,
  switchThumb: SLATE_200,
  switchThumbActive: PURPLE_200,
  dangerBg: RED_50,
  successBg: GREEN_50,
  cardPrimaryBg: PURPLE_50_LIGHT,
  cardSecondaryBg: TEAL_50_LIGHT,
};

export interface ThemeColors {
  isDark: boolean;
  bg: string;
  card: string;
  text: string;
  sub: string;
  border: string;
  primary: string;
  secondary: string;
  danger: string;
  warning: string;
  success: string;
  inputBg: string;
  inputBorder: string;
  /** Slightly lighter/darker pressed state */
  pressed: string;
  /** Transparent pressed overlay for lists/drawers */
  pressedAlpha: string;
  /** Icon color for nav/header icons */
  icon: string;
  /** Inactive tab/icon color */
  inactive: string;
  /** Skeleton shimmer base */
  shimmer: string;
  /** Skeleton card background */
  skeleton: string;
  /** Divider/separator color */
  separator: string;
  /** Switch track color when off */
  switchTrack: string;
  /** Switch thumb color when off */
  switchThumb: string;
  /** Switch thumb color when on */
  switchThumbActive: string;
  /** Danger-tinted background for buttons */
  dangerBg: string;
  /** Success-tinted background for buttons */
  successBg: string;
  /** Dashboard card background — primary accent */
  cardPrimaryBg: string;
  /** Dashboard card background — secondary accent */
  cardSecondaryBg: string;
}

export function useThemeColors(): ThemeColors {
  const { isDark } = useTheme();
  return { isDark, ...(isDark ? DARK : LIGHT) };
}
