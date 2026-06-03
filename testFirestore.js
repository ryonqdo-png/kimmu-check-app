// testFirestore.js
import { db } from "./firebaseConfig.js";
import { collection, addDoc } from "firebase/firestore";

async function testFirestore() {
  try {
    const docRef = await addDoc(collection(db, "tests"), {
      message: "Hello Firestore!",
      createdAt: new Date()
    });
    console.log("✅ Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("❌ Error adding document: ", e);
  }
}

testFirestore();
