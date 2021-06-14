import Firebase from "firebase";

const app = Firebase.initializeApp({
  apiKey: "AIzaSyBcWZAcCY9e2wteFcdQQ2lyX1swvhiDc38",
  authDomain: "imperial-drp-sit-me.firebaseapp.com",
  databaseURL:
    "https://imperial-drp-sit-me-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "imperial-drp-sit-me",
  storageBucket: "imperial-drp-sit-me.appspot.com",
  messagingSenderId: "133146893735",
  appId: "1:133146893735:web:c3db005509679f556d2a82",
});

const database = app.database();

const areasRef = database.ref("/areas");

const createListener = async (f) => {
  areasRef.on("child_changed", async () => {
    await f(true);
  });
};

export { createListener };
