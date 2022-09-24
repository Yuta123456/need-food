"use strict";
import { getApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";
// const { initializeApp } = require("firebase-admin/app");

var serviceAccount = require("./need-food-9f4ff-firebase-adminsdk-7nmb9-16675d8456.json");

console.log("=================\n", getApps().length, "\n=================\n");
export const firebase = !getApps().length
  ? initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: "https://need-food-9f4ff-default-rtdb.firebaseio.com",
    })
  : getApp();

// var serviceAccount = require("path/to/serviceAccountKey.json");

// // Initialize Realtime Database and get a reference to the service
export const database = getDatabase(firebase);
