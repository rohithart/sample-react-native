import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import { useAuth0 } from '@context/index';
import { Button, Input, Header } from '@components/index';
import { Colors, Spacing } from '@constants/index';
import { isValidEmail } from '@utils/index';

export function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isSigningin } = useAuth0();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    setError('');
    try {
      await login();
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Header title="Welcome" subtitle="Sign in to your account" />

        <View style={styles.content}>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Input
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError('');
            }}
            keyboardType="email-address"
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError('');
            }}
            secureTextEntry
          />

          <Button
            title="Sign In"
            onPress={handleLogin}
            loading={isSigningin}
            style={styles.loginButton}
          />

          <Button
            title="Sign In with Auth0"
            onPress={handleLogin}
            variant="secondary"
            loading={isSigningin}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    padding: Spacing.lg,
  },
  errorText: {
    color: Colors.error,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  loginButton: {
    marginTop: Spacing.lg,
  },
});
