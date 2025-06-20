// context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  deleteUser,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import Swal from "sweetalert2";
import { auth, db } from "../firebase/firebaseConfig"; // add db import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Firebase user
  const [userData, setUserData] = useState(null); // Firestore user doc
  const [loading, setLoading] = useState(true);

  const signupWithEmail = async (name, email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;

      // Create Firestore document
      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        uid: user.uid,
        name,
        email,
        photoURL: user.photoURL || "",
        role: "user",
        savedStories: [],
        createdAt: new Date(),
      });

      await sendEmailVerification(user);

      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "A verification email has been sent. Please check your inbox.",
        timer: 2500,
        showConfirmButton: false,
      });

      return true;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message,
      });
      return false;
    }
  };

  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        await signOut(auth);
        Swal.fire({
          icon: "warning",
          title: "Email Not Verified",
          text: "Please verify your email before logging in.",
        });
        return { success: false };
      }

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome back, ${user.email}!`,
      });

      return { success: true, user };
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
      return { success: false };
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create user document if it doesn't exist
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          name: user.displayName || "",
          email: user.email || "",
          photoURL: user.photoURL || "",
          role: "user",
          uid: user.uid,
          savedStories: [],
          createdAt: new Date(),
        });

        Swal.fire({
          icon: "success",
          title: "Logged in!",
          text: "Your account has been created.",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Welcome back!",
          text: "You have successfully signed in.",
          timer: 1500,
          showConfirmButton: false,
        });
      }

      return true; // ✅ Login successful
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: error.message,
      });
      return false; // ❌ Login failed
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      Swal.fire({
        icon: "success",
        title: "Logged out",
        text: "You have been signed out successfully.",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Logout Failed",
        text: error.message,
      });
    }
  };

  // Delete account

  const deleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      return Swal.fire({
        icon: "error",
        title: "No user found",
        text: "You must be logged in to delete your account.",
      });
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete your account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        // Delete Firestore document
        await deleteDoc(doc(db, "users", user.uid));

        // Delete Firebase auth user
        await deleteUser(user);

        Swal.fire({
          icon: "success",
          title: "Account Deleted",
          text: "Your account has been deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Failed to delete account",
          text: error.message,
        });
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Fetch Firestore user data
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser, // Firebase user object
        userData, // Firestore user document
        signupWithEmail,
        loginWithEmail,
        loginWithGoogle,
        logout,
        deleteAccount,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
