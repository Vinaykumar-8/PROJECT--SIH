import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from 'react-native';
import DashboardCard from '../components/DashboardCard';
import TripForm from '../components/TripForm';
import { generateTripId, saveTripDetails } from '../services/tripAPI';
import * as Location from 'expo-location';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { PlusCircle, MapPin as MapPinIcon, ShieldAlert } from 'lucide-react-native';

// Placeholder for your Firebase config
// You will need to replace this with your actual config
const firebaseConfig = {
  // your firebase config here
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Geo-fence parameters (example: India Gate, New Delhi)
const GEOFENCE_LATITUDE = 28.6129;
const GEOFENCE_LONGITUDE = 77.2295;
const GEOFENCE_RADIUS_METERS = 500; // 500 meters

// Function to calculate distance between two coordinates
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180; // φ, λ in radians
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const d = R * c; // in metres
  return d;
}

const DashboardTab = ({ navigation }) => {
  const [userName, setUserName] = useState('John Doe');
  const [trip, setTrip] = useState(null);
  const [showTripForm, setShowTripForm] = useState(false);
  const [zoneType, setZoneType] = useState('default zone');
  const [location, setLocation] = useState(null);
  const [isWithinGeofence, setIsWithinGeofence] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  // Function to send an emergency alert to Firestore
  const sendEmergencyAlert = async (locationData) => {
    try {
      const docRef = await addDoc(collection(db, 'emergencies'), {
        latitude: locationData.coords.latitude,
        longitude: locationData.coords.longitude,
        timestamp: new Date(),
        alertType: 'Geofence Breach',
        userId: 'some-user-id', // Placeholder, replace with actual user ID
      });
      console.log("Emergency alert sent with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  // Function to check if the user is inside the geofence
  const checkGeofence = (currentLocation) => {
    const distance = getDistance(
      currentLocation.coords.latitude,
      currentLocation.coords.longitude,
      GEOFENCE_LATITUDE,
      GEOFENCE_LONGITUDE
    );
    return distance <= GEOFENCE_RADIUS_METERS;
  };

  useEffect(() => {
    // Location tracking and geofence logic
    const setupLocationTracking = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const locationSubscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 10 },
        (location) => {
          setLocation(location);
          const isInside = checkGeofence(location);
          if (isInside && !isWithinGeofence) {
            // User just entered the geofence
            setIsWithinGeofence(true);
            sendEmergencyAlert(location);
          } else if (!isInside && isWithinGeofence) {
            // User just exited the geofence
            setIsWithinGeofence(false);
          }
        }
      );
      return () => {
        if (locationSubscription) {
          locationSubscription.remove();
        }
      };
    };
    setupLocationTracking();

    // Existing trip and zone simulation logic
    const defaultTrip = {
      uniqueId: 'ABC-123-XYZ',
      location: 'New York City',
      status: 'Active',
    };
    setTrip(defaultTrip);

    const zoneInterval = setInterval(() => {
      const zones = ['default zone', 'dead zone', 'danger zone'];
      const randomZone = zones[Math.floor(Math.random() * zones.length)];
      setZoneType(randomZone);
    }, 5000); // Changes the zone every 5 seconds

    return () => clearInterval(zoneInterval); // Clean up the interval
  }, [isWithinGeofence]);

  const handleStartTrip = async (details) => {
    const newUniqueId = generateTripId();
    const tripSaved = await saveTripDetails({ ...details, uniqueId: newUniqueId });
    
    if (tripSaved) {
      setTrip({ ...details, uniqueId: newUniqueId, status: 'Active' });
      setShowTripForm(false);
      console.log(`Trip started! Your unique ID is: ${newUniqueId}`);
    } else {
      console.error('Failed to start trip. Please try again.');
    }
  };

  const handleEmergencyPress = () => {
    console.log('Emergency card pressed. Chatbot functionality is a future feature.');
  };

  const handleLocationPress = () => {
    navigation.navigate('Map');
  };

  const renderTripSection = () => {
    if (trip && trip.status === 'Active') {
      return (
        <DashboardCard title="Active Trip">
          <Text style={styles.cardText}>Trip Status: {trip.status}</Text>
          <Text style={styles.cardText}>Location: {trip.location}</Text>
          <Text style={styles.cardText}>Unique Trip ID: <Text style={{ fontWeight: 'bold' }}>{trip.uniqueId}</Text></Text>
        </DashboardCard>
      );
    } else if (showTripForm) {
      return (
        <DashboardCard title="Plan a Trip">
          <TripForm onConfirm={handleStartTrip} onCancel={() => setShowTripForm(false)} />
        </DashboardCard>
      );
    } else {
      return (
        <DashboardCard title="Trip Status">
          <Text style={styles.cardText}>No active trips.</Text>
          <TouchableOpacity style={styles.planTripButton} onPress={() => setShowTripForm(true)}>
            <PlusCircle color="#fff" size={24} style={styles.planTripIcon} />
            <Text style={styles.planTripButtonText}>Plan Trip</Text>
          </TouchableOpacity>
        </DashboardCard>
      );
    }
  };

  const getZoneColor = (zone) => {
    switch (zone) {
      case 'default zone':
        return 'green';
      case 'dead zone':
        return 'orange';
      case 'danger zone':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.headerText}>Hello, {userName}!</Text>
      
      {/* SOS Button Section */}
      <View style={styles.sosButtonContainer}>
        <TouchableOpacity style={styles.sosButton}>
          <Text style={styles.sosButtonText}>SOS</Text>
        </TouchableOpacity>
      </View>

      {renderTripSection()}

      <DashboardCard title="Current Location">
        {errorMsg ? (
          <Text style={styles.cardText}>{errorMsg}</Text>
        ) : location ? (
          <View>
            <Text style={styles.cardText}>Latitude: {location.coords.latitude.toFixed(6)}</Text>
            <Text style={styles.cardText}>Longitude: {location.coords.longitude.toFixed(6)}</Text>
          </View>
        ) : (
          <Text style={styles.cardText}>Fetching location...</Text>
        )}
      </DashboardCard>
      
      <DashboardCard title="Geofence Status">
        <Text style={[styles.cardText, { color: isWithinGeofence ? 'red' : 'green' }]}>
          Status: {isWithinGeofence ? 'IN DANGER ZONE' : 'SAFE'}
        </Text>
      </DashboardCard>

      <View style={styles.row}>
        {/* Location Card */}
        <TouchableOpacity style={styles.card} onPress={handleLocationPress}>
          <Text style={styles.cardHeader}>Location</Text>
          <Text style={styles.cardText}>View on map</Text>
        </TouchableOpacity>
        {/* Emergency Card */}
        <TouchableOpacity style={[styles.card, styles.emergencyCard]} onPress={handleEmergencyPress}>
          <Text style={[styles.cardHeader, { color: '#fff' }]}>Emergency</Text>
          <Text style={[styles.cardText, { color: '#fff' }]}>Chatbot</Text>
        </TouchableOpacity>
      </View>

      <DashboardCard title="Network Status">
        <Text style={styles.cardText}>Status: Connected</Text>
        <Text style={styles.cardSubText}>You are online.</Text>
      </DashboardCard>

      <DashboardCard title="Zone">
        <View style={styles.zoneRow}>
          <View style={[styles.zoneDot, { backgroundColor: getZoneColor(zoneType) }]} />
          <Text style={styles.cardText}>Current Zone: {zoneType}</Text>
        </View>
      </DashboardCard>
    </ScrollView>
  );
};

export default DashboardTab;

const styles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#40E0D0',
    width: '100%',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  scrollContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flex: 1,
    marginHorizontal: 5,
  },
  emergencyCard: {
    backgroundColor: '#DC2626',
    marginRight: 10,
    alignContent: 'center',
  },
  cardHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 5,
  },
  cardSubText: {
    fontSize: 14,
    color: '#6B7280',
  },
  planTripButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DC2626',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: 'center',
  },
  planTripIcon: {
    marginRight: 8,
  },
  planTripButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  zoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  zoneDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  sosButtonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  sosButton: {
    backgroundColor: '#DC2626', // Red color
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sosButtonText: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
});
