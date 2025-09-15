import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";

// Global variables provided by the environment for Firebase configuration
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Saves a new emergency alert to the Firestore database.
 * The data is stored in a public collection for all users.
 * @param {string} userId - The authenticated user's ID.
 * @param {object} alertDetails - An object containing the alert information.
 * @returns {Promise<boolean>} True if the details were saved successfully.
 */
export const saveEmergencyAlert = async (userId, alertDetails) => {
  if (!userId) {
    console.error('Error: User ID is required to save an emergency alert.');
    return false;
  }
  
  try {
    const alertsCollection = collection(db, 'artifacts', appId, 'public', 'data', 'emergencies');
    
    await addDoc(alertsCollection, {
      userId,
      ...alertDetails,
      timestamp: Timestamp.now(),
    });
    
    console.log('Emergency alert saved successfully for user:', userId);
    return true;
  } catch (error) {
    console.error('Error saving emergency alert:', error);
    return false;
  }
};
