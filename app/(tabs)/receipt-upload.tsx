import React from 'react';
import ReceiptUpload from '../../components/ReceiptUpload';
import { View, StyleSheet } from 'react-native';

export default function ReceiptUploadScreen() {
  return (
    <View style={styles.container}>
      <ReceiptUpload />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
});
