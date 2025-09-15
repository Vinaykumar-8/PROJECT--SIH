import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Shield, MapPin, User } from 'lucide-react-native';

// Import all the screens and components
import Loginscreen from './src/screens/Loginscreen';
import DashboardTab from './src/screens/DashboardTab';
import ProfileTab from './src/screens/ProfileTab';
import MapTab from './src/screens/MapTab';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/**
 * A component that contains the tab-based navigation for the main app.
 * @returns {React.ReactElement} The tab navigator component.
 */
function DashboardScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#DC2626',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          paddingTop: 8,
          paddingBottom: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Dashboard') {
            return <Shield size={size} color={color} strokeWidth={2} />;
          } else if (route.name === 'Map') {
            return <MapPin size={size} color={color} strokeWidth={2} />;
          } else if (route.name === 'Profile') {
            return <User size={size} color={color} strokeWidth={2} />;
          }
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardTab} />
      <Tab.Screen name="Map" component={MapTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
}

/**
 * The main component that renders the entire application.
 * It manages the authentication state and switches between the login and dashboard screens.
 * @returns {React.ReactElement} The main app component.
 */
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // <-- This has been changed to true

  // We can use a simple effect to simulate a successful login for now.
  useEffect(() => {
    // To see the dashboard, simply change this to true.
    setIsAuthenticated(true);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          // If authenticated, show the Dashboard with tabs
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
        ) : (
          // If not authenticated, show the Login screen
          <Stack.Screen name="Login" component={Loginscreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
