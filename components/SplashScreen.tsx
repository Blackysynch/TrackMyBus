import React from 'react';
import type { FunctionComponent } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const SplashScreen: FunctionComponent = () => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/ict-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;
