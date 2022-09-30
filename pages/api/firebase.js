"use strict";
import { getApp, getApps } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { initializeApp } from "firebase-admin/app";
import admin from "firebase-admin";

const secret = {
  type: process.env.TYPE,
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, "\n"),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: process.env.AUTH_URI,
  token_uri: process.env.TOKEN_URI,
  auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
};

console.log("=================\n", getApps().length, "\n=================\n");
export const firebase = !getApps().length
  ? initializeApp(
      {
        credential: admin.credential.cert(secret),
        databaseURL: "https://need-food-9f4ff-default-rtdb.firebaseio.com",
      },
      "need-food"
    )
  : getApp("need-food");

// var serviceAccount = require("path/to/serviceAccountKey.json");

// // Initialize Realtime Database and get a reference to the service
export const database = getDatabase(firebase);
