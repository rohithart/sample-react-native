import React, { Component } from 'react';
import { Pressable, Text, View } from 'react-native';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  handleReset = () => this.setState({ hasError: false, error: undefined });

  render() {
    if (this.state.hasError) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 12, backgroundColor: '#0f172a' }}>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#f1f5f9' }}>Something went wrong</Text>
          <Text style={{ fontSize: 14, color: '#94a3b8', textAlign: 'center', lineHeight: 20 }}>
            {this.state.error?.message ?? 'An unexpected error occurred.'}
          </Text>
          <Pressable style={{ marginTop: 8, paddingVertical: 12, paddingHorizontal: 24, borderRadius: 8, backgroundColor: '#673ab7', alignItems: 'center', justifyContent: 'center' }} onPress={this.handleReset}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: '#ffffff', letterSpacing: 0.3 }}>Try again</Text>
          </Pressable>
        </View>
      );
    }
    return this.props.children;
  }
}
