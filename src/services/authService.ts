import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";
import { useAuthStore, AuthUser } from "@/store/authStore";
import { User } from "@/types";

const googleProvider = new GoogleAuthProvider();


// 🔥 Safe Firestore sync (never blocks UI)
const syncUserToFirestore = async (
  firebaseUser: FirebaseUser,
  additionalData: Partial<User> = {},
) => {
  try {
    const userRef = doc(db, "users", firebaseUser.uid);
    const docSnap = await getDoc(userRef);

    const userData = {
      uid: firebaseUser.uid,
      name: additionalData.name || firebaseUser.displayName || "Traveler",
      email: firebaseUser.email || "",
      avatar: additionalData.avatar || firebaseUser.photoURL || "",
      role: docSnap.exists() ? docSnap.data()?.role || "user" : "user",
      lastLogin: new Date().toISOString(),
    };

    if (!docSnap.exists()) {
      await setDoc(userRef, {
        ...userData,
        createdAt: new Date().toISOString(),
      });
    } else {
      await updateDoc(userRef, {
        lastLogin: userData.lastLogin,
        ...(additionalData.name && { name: additionalData.name }),
        ...(additionalData.avatar && { avatar: additionalData.avatar }),
      });
    }

    return userData;
  } catch (error) {
    return null;
  }
};


// 🔥 Main auth listener (single source of truth)
export const setupAuthListener = () => {
  return onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
    const { setUser, setInitialized } = useAuthStore.getState();

    if (!firebaseUser) {
      setUser(null);
      setInitialized(true);
      return;
    }

    // ✅ Immediately unblock UI
    const basicUser: AuthUser = {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || "Traveler",
      photoURL: firebaseUser.photoURL,
      role: "user",
    };

    setUser(basicUser);
    setInitialized(true);

    // 🔥 Background Firestore sync (Strictly NON-BLOCKING)
    syncUserToFirestore(firebaseUser).then((enrichedData) => {
      if (enrichedData) {
        setUser({
          ...basicUser,
          displayName: enrichedData.name || basicUser.displayName,
          photoURL: enrichedData.avatar || basicUser.photoURL,
          role: (enrichedData.role as 'user' | 'admin') || "user",
        });
      }
    }).catch(err => console.warn("Background sync failed:", err));
  });
};


// Logout
export const logoutUser = async () => {
  await signOut(auth);
};


// Register
export const registerUser = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
) => {

  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );

  const firebaseUser = userCredential.user;

  const fullName = `${firstName} ${lastName}`;

  await updateProfile(firebaseUser, {
    displayName: fullName,
  });

  return firebaseUser;
};


// Email login
export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password,
  );

  return userCredential.user;
};


// Google login
export const loginWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  return result.user;
};