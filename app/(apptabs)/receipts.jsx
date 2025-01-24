import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, updateDoc, arrayUnion } from "@firebase/firestore";

const ReceiptsPage = () => {
  const [userData, setUserData] = useState(null);

  // Fetch user data including receipts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const uid = auth.currentUser?.uid;
        if (!uid) return;

        const userRef = doc(db, 'users', uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const pickImage = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission needed', 'Please grant permission to access your photos');
        return;
      }

      // Pick the image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        await addReceipt();
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const addReceipt = async () => {
    try {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      
      // Create new receipt object
      const newReceipt = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        status: 'pending',
        type: 'Bus Fare'
      };

      // Add receipt to user's receipts array
      await updateDoc(userRef, {
        receipts: arrayUnion(newReceipt)
      });

      // Refresh user data to show new receipt
      const updatedUserDoc = await getDoc(userRef);
      setUserData(updatedUserDoc.data());

      Alert.alert('Success', 'Receipt added successfully!');
    } catch (error) {
      console.error('Error adding receipt:', error);
      Alert.alert('Error', 'Failed to add receipt. Please try again.');
    }
  };

  const renderReceipt = ({ item }) => {
    const date = new Date(item.date);
    const formattedDate = `${date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })}`;
    
    return (
      <View style={styles.receiptItem}>
        <View style={styles.receiptHeader}>
          <Text style={styles.receiptType}>Bus Receipt</Text>
          <Text style={[
            styles.status,
            item.status === 'approved' && styles.statusApproved,
            item.status === 'rejected' && styles.statusRejected
          ]}>
            {item.status}
          </Text>
        </View>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
    );
  };

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receipts</Text>

      {userData.role === 'Student' && (
        <TouchableOpacity 
          style={styles.addButton}
          onPress={pickImage}
        >
          <Feather name="plus" size={24} color="white" />
          <Text style={styles.addButtonText}>Add Receipt</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={userData.receipts || []}
        renderItem={renderReceipt}
        keyExtractor={item => item.id}
        style={styles.receiptsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  receiptsList: {
    flex: 1,
  },
  receiptItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  receiptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  receiptType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    color: '#666',
    fontSize: 14,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    textTransform: 'capitalize',
  },
  statusApproved: {
    color: 'green',
  },
  statusRejected: {
    color: 'red',
  },
});

export default ReceiptsPage;
