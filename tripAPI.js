import { Platform } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Global variables provided by the environment for Firebase configuration
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Generates a unique trip ID.
 * @returns {string} The unique trip ID.
 */
export const generateTripId = () => {
  // A simple, unique ID based on a timestamp and random number.
  // In a real app, this might come from a database.
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 10000);
  return `trip-${timestamp}-${randomNumber}`;
};

/**
 * Saves trip details to the Firestore database.
 * The data is stored in a public collection for all users.
 * @param {object} tripDetails - The trip details to save.
 * @returns {Promise<boolean>} True if the details were saved successfully.
 */
export const saveTripDetails = async (tripDetails) => {
  if (!tripDetails.uniqueId) {
    console.error('Error: Trip uniqueId is required to save details.');
    return false;
  }

  try {
    const tripDocRef = doc(db, `/artifacts/${appId}/public/data/trips/${tripDetails.uniqueId}`);
    
    await setDoc(tripDocRef, tripDetails);
    
    console.log('Trip details saved successfully for trip:', tripDetails.uniqueId);
    return true;
  } catch (error) {
    console.error('Error saving trip details:', error);
    return false;
  }
};
