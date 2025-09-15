import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Global variables provided by the environment for Firebase configuration
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/**
 * Saves a user's KYC details to the Firestore database.
 * The data is stored in a private collection for the specific user.
 * @param {string} userId - The authenticated user's ID.
 * @param {object} details - An object containing the user's KYC information.
 * @returns {Promise<boolean>} True if the details were saved successfully.
 */
export const saveKycDetails = async (userId, details) => {
  if (!userId) {
    console.error('Error: User ID is required to save KYC details.');
    return false;
  }
  
  try {
    // Set the document path to a private location for the specific user
    const kycDocRef = doc(db, `/artifacts/${appId}/users/${userId}/kyc/details`);
    
    await setDoc(kycDocRef, details);
    
    console.log('KYC details saved successfully for user:', userId);
    return true;
  } catch (error) {
    console.error('Error saving KYC details:', error);
    return false;
  }
};
