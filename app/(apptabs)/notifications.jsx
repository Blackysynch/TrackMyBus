import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import { auth, db } from "@/firebaseConfig";
import { collection, addDoc, query, orderBy, onSnapshot, doc, getDoc, serverTimestamp } from "@firebase/firestore";

const NotificationsPage = () => {
  const [userData, setUserData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch user data
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

  // Listen for notifications
  useEffect(() => {
    const notificationsRef = collection(db, 'notifications');
    const q = query(notificationsRef, orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notificationsList = [];
      snapshot.forEach((doc) => {
        notificationsList.push({ id: doc.id, ...doc.data() });
      });
      setNotifications(notificationsList);
    });

    return () => unsubscribe();
  }, []);

  // Send notification (for drivers only)
  const sendNotification = async () => {
    if (!newMessage.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    try {
      const notificationsRef = collection(db, 'notifications');
      await addDoc(notificationsRef, {
        message: newMessage,
        driverName: userData.name || 'Driver',
        driverUID: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      });
      setNewMessage('');
      Alert.alert('Success', 'Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      Alert.alert('Error', 'Failed to send notification. Please try again.');
    }
  };

  const renderNotification = ({ item }) => (
    <View style={styles.notificationItem}>
      <View style={styles.notificationHeader}>
        <Text style={styles.driverName}>{item.driverName}</Text>
        <Text style={styles.timestamp}>
          {item.timestamp?.toDate().toLocaleString() || 'Just now'}
        </Text>
      </View>
      <Text style={styles.message}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      {/* Driver's view - with message input */}
      {userData?.role === 'Driver' && (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type your message here..."
            multiline
          />
          <TouchableOpacity 
            style={styles.sendButton}
            onPress={sendNotification}
          >
            <Feather name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}

      {/* Notifications list - for both drivers and students */}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={item => item.id}
        style={styles.notificationsList}
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: 'black',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  driverName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  message: {
    fontSize: 16,
    color: '#333',
  },
});

export default NotificationsPage;
