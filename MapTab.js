import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import DashboardCard from '../components/DashboardCard';
import { startGeoFencingMonitor, stopGeoFencingMonitor } from '../services/geoFencingService';
import { useIsFocused } from '@react-navigation/native';

// Sample danger zones to display on the map
// In a real app, these would be fetched from a database or a configuration file.
const DANGER_ZONES = [
  { id: 'zone-1', name: 'Manipur', latitude: 24.6633, longitude: 93.9056, radius: 25000 },
  { id: 'zone-2', name: 'Assam', latitude: 26.1433, longitude: 91.7898, radius: 50000 },
];

/**
 * The MapTab component, responsible for displaying the map, user location,
 * and geo-fenced zones.
 */
const MapTab = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [inDangerZone, setInDangerZone] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    // Start geo-fencing monitoring when the tab is focused
    if (isFocused) {
      console.log("Map tab is focused. Starting location monitoring.");
      startGeoFencingMonitor((location, zone) => {
        setUserLocation(location);
        setInDangerZone(zone);
      });
    } else {
      // Stop monitoring when the tab is unfocused to save battery
      console.log("Map tab is unfocused. Stopping location monitoring.");
      stopGeoFencingMonitor();
    }
  }, [isFocused]);

  // Set initial map region
  const initialRegion = {
    latitude: 25.5786,
    longitude: 94.7571,
    latitudeDelta: 3,
    longitudeDelta: 3,
  };

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map}
        initialRegion={initialRegion}
        showsUserLocation={true}
        followsUserLocation={true}
      >
        {/* Render the pre-defined danger zones as circles on the map */}
        {DANGER_ZONES.map(zone => (
          <React.Fragment key={zone.id}>
            <Circle
              center={{ latitude: zone.latitude, longitude: zone.longitude }}
              radius={zone.radius}
              strokeWidth={2}
              strokeColor={'rgba(220, 38, 38, 0.5)'}
              fillColor={'rgba(220, 38, 38, 0.2)'}
            />
            {/* Add a marker to label the danger zone */}
            <Marker
              coordinate={{ latitude: zone.latitude, longitude: zone.longitude }}
              title={zone.name}
              description="High-Risk Zone"
              pinColor="#DC2626"
            />
          </React.Fragment>
        ))}

        {/* Display a marker for the user's simulated location */}
        {userLocation && (
          <Marker
            coordinate={{ latitude: userLocation.latitude, longitude: userLocation.longitude }}
            title="Your Location"
            pinColor={inDangerZone ? '#DC2626' : '#1A73E8'}
          />
        )}
      </MapView>

      <View style={styles.overlayContainer}>
        <DashboardCard title="Geo-Fencing Status">
          <Text style={styles.statusText}>
            {inDangerZone ? `You are in a high-risk zone: ${inDangerZone.name}` : 'You are in a safe zone.'}
          </Text>
          <Text style={styles.infoText}>
            Monitoring location for emergencies...
          </Text>
        </DashboardCard>
      </View>
    </View>
  );
};

export default MapTab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  overlayContainer: {
    position: 'absolute',
    top: 20,
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
