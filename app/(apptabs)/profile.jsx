import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, FlatList, Alert } from "react-native";
import { auth, db } from "@/firebaseConfig";
import { collection, doc, getDoc, getDocs, query, where, updateDoc } from "@firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [availableDrivers, setAvailableDrivers] = useState([]);
  const [assignedDriver, setAssignedDriver] = useState(null);
  const router = useRouter();

  // Fetch current user data
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

  // Fetch available drivers
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const driversQuery = query(collection(db, 'users'), where('role', '==', 'Driver'));
        const querySnapshot = await getDocs(driversQuery);
        const drivers = [];
        querySnapshot.forEach((doc) => {
          drivers.push({ id: doc.id, ...doc.data() });
        });
        setAvailableDrivers(drivers);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      }
    };

    if (userData?.role === 'Student') {
      fetchDrivers();
    }
  }, [userData]);

  // Fetch assigned driver
  useEffect(() => {
    const fetchAssignedDriver = async () => {
      try {
        if (userData?.assignedDriver) {
          const driverRef = doc(db, 'users', userData.assignedDriver);
          const driverDoc = await getDoc(driverRef);
          if (driverDoc.exists()) {
            setAssignedDriver({ id: driverDoc.id, ...driverDoc.data() });
          }
        }
      } catch (error) {
        console.error('Error fetching assigned driver:', error);
      }
    };

    if (userData?.role === 'Student') {
      fetchAssignedDriver();
    }
  }, [userData]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login-page");
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const renderDriverItem = ({ item }) => (
    <TouchableOpacity 
      style={[
        styles.driverItem,
        assignedDriver?.id === item.id && styles.selectedDriver
      ]}
      onPress={() => handleAssignDriver(item)}
    >
      <Text style={styles.driverName}>{item.username}</Text>
      {assignedDriver?.id === item.id && (
        <Text style={styles.assignedText}>Assigned</Text>
      )}
    </TouchableOpacity>
  );

  const handleAssignDriver = async (driver) => {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, {
        assignedDriver: driver.id
      });

      setAssignedDriver(driver);
      Alert.alert('Success', `${driver.username} has been assigned as your driver`);
    } catch (error) {
      console.error('Error assigning driver:', error);
      Alert.alert('Error', 'Failed to assign driver. Please try again.');
    }
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
      <View style={styles.header}>
        <Feather name="user" size={50} color="black" />
        <Text style={styles.name}>{userData.username}</Text>
        <Text style={styles.role}>{userData.role}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{userData.email}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{userData.phoneNumber}</Text>
        </View>
      </View>

      {userData.role === 'Student' && (
        <View style={styles.driversSection}>
          <Text style={styles.sectionTitle}>Available Drivers</Text>
          <FlatList
            data={availableDrivers}
            renderItem={renderDriverItem}
            keyExtractor={item => item.id}
            style={styles.driversList}
          />
        </View>
      )}

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Feather name="log-out" size={24} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  role: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  infoSection: {
    marginBottom: 30,
  },
  infoRow: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    width: 80,
    fontSize: 16,
    color: '#666',
  },
  value: {
    flex: 1,
    fontSize: 16,
  },
  driversSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  driversList: {
    flex: 1,
  },
  driverItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedDriver: {
    backgroundColor: '#f8f8f8',
  },
  driverName: {
    fontSize: 16,
  },
  assignedText: {
    color: 'green',
    fontSize: 14,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: 'black',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default ProfilePage;
