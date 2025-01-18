import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ReceiptUpload = () => {
  const [receiptImage, setReceiptImage] = useState<string | null>(null);

  const pickImage = async () => {
    // Request media library permissions
    const permissionResult =z
      Platform.OS === 'web'
        ? true
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult?.granted || Platform.OS === 'web') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });

      if (!result.canceled) {
        setReceiptImage(result.assets[0].uri);
      }
    } else {
      alert('Permission to access media library is required!');
    }
  };

  const uploadReceipt = () => {
    if (!receiptImage) {
      alert('Please select an image first!');
      return;
    }

    // Replace this with your API logic
    alert('Receipt uploaded successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your Receipt</Text>
      {receiptImage && (
        <Image source={{ uri: receiptImage }} style={styles.image} />
      )}
      <Button title="Pick a Receipt Image" onPress={pickImage} />
      <Button title="Upload Receipt" onPress={uploadReceipt} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default ReceiptUpload;
