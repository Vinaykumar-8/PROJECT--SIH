import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import DashboardCard from '../components/DashboardCard';

const ProfileTab = () => {
  // Placeholder user data
  const [userData, setUserData] = useState({
    profilePhoto: 'https://placehold.co/120x120/E5E7EB/4B5563?text=Profile',
    uniqueId: 'USER-ID-123456789', // New field for unique ID
    tripStatus: 'Active',
    aadharNumber: 'XXXX-XXXX-1234',
    bloodGroup: 'O+',
    emergencyContact: 'Jane Doe',
    emergencyRelation: 'Spouse',
    emergencyNumber: '+1 123-456-7890',
    address: '123 Main St, Anytown, USA 12345',
  });

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileHeader}>
        <Image style={styles.profilePhoto} source={{ uri: userData.profilePhoto }} />
      </View>

      <DashboardCard title="Unique ID">
        <Text style={styles.cardText}>{userData.uniqueId}</Text>
      </DashboardCard>
      
      <DashboardCard title="Trip Status">
        <Text style={styles.cardText}>Status: {userData.tripStatus}</Text>
      </DashboardCard>
      
      <DashboardCard title="Aadhar Number">
        <Text style={styles.cardText}>{userData.aadharNumber}</Text>
      </DashboardCard>

      <DashboardCard title="Blood Group">
        <Text style={styles.cardText}>{userData.bloodGroup}</Text>
      </DashboardCard>

      <DashboardCard title="Emergency Contact">
        <Text style={styles.cardText}>Name: {userData.emergencyContact}</Text>
        <Text style={styles.cardText}>Relation: {userData.emergencyRelation}</Text>
        <Text style={styles.cardText}>Phone: {userData.emergencyNumber}</Text>
      </DashboardCard>

      <DashboardCard title="Address">
        <Text style={styles.cardText}>{userData.address}</Text>
      </DashboardCard>

    </ScrollView>
  );
};

export default ProfileTab;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  profileHeader: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#DC2626',
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
