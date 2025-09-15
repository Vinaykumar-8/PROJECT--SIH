import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut as firebaseSignOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Global variables provided by the environment for Firebase configuration
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/**
 * Registers a new user with email and password and saves their details to Firestore.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {string} name - User's name.
 * @param {string} role - User's role ('user' or 'admin').
 * @returns {Promise<Object|null>} A promise that resolves with user data on success, or null on failure.
 */
export const registerWithEmailAndRole = async (email, password, name, role) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user's name and role to Firestore
    await setDoc(doc(db, `/artifacts/${appId}/users/${user.uid}/profile/details`), {
      name: name,
      email: email,
      role: role,
    });

    console.log("User registered and profile created successfully.");
    return user;
  } catch (error) {
    console.error("Error during registration:", error.message);
    return null;
  }
};

/**
 * Signs in a user with email and password.
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<Object|null>} A promise that resolves with user data on success, or null on failure.
 */
export const signInUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error during sign in:", error.message);
    return null;
  }
};

/**
 * Signs out the current user.
 */
export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    console.log("User signed out.");
  } catch (error) {
    console.error("Error during sign out:", error.message);
  }
};
