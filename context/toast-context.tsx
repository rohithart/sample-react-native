import { registerToastHandler, unregisterToastHandler } from '@/services/api-client';
import { ToastConfig, ToastType } from '@/types/toast';
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react-native';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type ToastContextType = {
  showToast: (config: ToastConfig) => void;
};

// ---------------------------------------------------------------------------
// Colors / icons per type
// ---------------------------------------------------------------------------
const TOAST_THEME: Record<ToastType, { bg: string; border: string; icon: string; iconBg: string }> = {
  success: { bg: '#ecfdf5', border: '#6ee7b7', icon: '#059669', iconBg: '#d1fae5' },
  error: { bg: '#fef2f2', border: '#fca5a5', icon: '#dc2626', iconBg: '#fee2e2' },
  warning: { bg: '#fffbeb', border: '#fcd34d', icon: '#d97706', iconBg: '#fef3c7' },
  info: { bg: '#eff6ff', border: '#93c5fd', icon: '#2563eb', iconBg: '#dbeafe' },
};

const TOAST_THEME_DARK: Record<ToastType, { bg: string; border: string; icon: string; iconBg: string }> = {
  success: { bg: '#052e16', border: '#065f46', icon: '#34d399', iconBg: '#064e3b' },
  error: { bg: '#350a0a', border: '#7f1d1d', icon: '#f87171', iconBg: '#450a0a' },
  warning: { bg: '#351c00', border: '#78350f', icon: '#fbbf24', iconBg: '#451a03' },
  info: { bg: '#0a1929', border: '#1e3a5f', icon: '#60a5fa', iconBg: '#172554' },
};

function ToastIcon({ type, color }: { type: ToastType; color: string }) {
  const size = 18;
  switch (type) {
    case 'success': return <CheckCircle2 size={size} color={color} />;
    case 'error': return <AlertCircle size={size} color={color} />;
    case 'warning': return <TriangleAlert size={size} color={color} />;
    case 'info': return <Info size={size} color={color} />;
  }
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------
const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children, isDark = false }: { children: ReactNode; isDark?: boolean }) {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState<(ToastConfig & { id: number }) | null>(null);
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const hideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idCounter = useRef(0);

  const dismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, { toValue: -100, duration: 250, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 0, duration: 250, useNativeDriver: true }),
    ]).start(() => setToast(null));
  }, [translateY, opacity]);

  const showToast = useCallback(
    (config: ToastConfig) => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current);

      const id = ++idCounter.current;
      setToast({ ...config, id });

      // Reset and animate in
      translateY.setValue(-100);
      opacity.setValue(0);

      Animated.parallel([
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true, damping: 15, stiffness: 150 }),
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
      ]).start();

      hideTimeout.current = setTimeout(dismiss, config.duration ?? 3500);
    },
    [translateY, opacity, dismiss],
  );

  // Register showToast so the API client can display toasts
  useEffect(() => {
    registerToastHandler(showToast);
    return unregisterToastHandler;
  }, [showToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  const theme = isDark ? TOAST_THEME_DARK : TOAST_THEME;
  const t = toast ? theme[toast.type] : null;

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast && t && (
        <Animated.View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            top: insets.top + 8,
            left: 16,
            right: 16,
            zIndex: 9999,
            transform: [{ translateY }],
            opacity,
          }}
        >
          <View
            style={{
              backgroundColor: t.bg,
              borderWidth: 1,
              borderColor: t.border,
              borderRadius: 12,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.15,
              shadowRadius: 8,
              elevation: 6,
            }}
          >
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: t.iconBg,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 1,
              }}
            >
              <ToastIcon type={toast.type} color={t.icon} />
            </View>

            <View style={{ flex: 1, gap: 2 }}>
              <Text style={{ fontSize: 14, fontWeight: '700', color: t.icon }}>{toast.title}</Text>
              {toast.message ? (
                <Text style={{ fontSize: 13, color: t.icon, opacity: 0.8, lineHeight: 18 }}>
                  {toast.message}
                </Text>
              ) : null}
            </View>

            <Pressable
              onPress={dismiss}
              hitSlop={8}
              style={{ padding: 2, marginTop: 1 }}
            >
              <X size={16} color={t.icon} />
            </Pressable>
          </View>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
}
