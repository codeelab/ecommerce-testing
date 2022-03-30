import React, { useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../firebase/configFirebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
  getDoc,
  increment,
  FieldValue,
  setDoc,
  orderBy,
  writeBatch,
  arrayUnion,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { User } from "../models/user.model";

function useFirebaseFunctions() {
  const router = useRouter();

  //Create user
  const createUser = async (email: string, password: string) => {
    const userData: any = {
      email,
      fullName: "",
      favoriteProducts: [],
    };

    try {
      const resultado1 = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const resultado2 = await addDoc(
        collection(db, "usersEcommerce"),
        userData
      );

      //start local changes
      // redux
    } catch (error) {
      console.log(error);
    }
  };

  //Log Out
  const logOut = async () => {
    await signOut(auth);
  };

  return {
    createUser,
    logOut,
  };
}

export default useFirebaseFunctions;
