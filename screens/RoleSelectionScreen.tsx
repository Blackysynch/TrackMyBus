import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RoleSelectionScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/ict-logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>What is your Role?</Text>
      <Text style={styles.subtitle}>Please select your role to continue</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('StudentRegister')}
      >
        <Text style={styles.buttonText}>Student</Text>
        <Text style={styles.buttonSubtext}>Use your ICTU email</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('DriverRegister')}
      >
        <Text style={styles.buttonText}>Driver</Text>
        <Text style={styles.buttonSubtext}>Use your Gmail account</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#4169E1',
    width: '100%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonSubtext: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
    opacity: 0.8,
    marginTop: 5,
  },
  backButton: {
    marginTop: 20,
  },
  backButtonText: {
    color: '#4169E1',
    fontSize: 16,
  },
});

export default RoleSelectionScreen;
