import firebase from 'firebase';
const firebaseConfig = {
  apiKey: "AIzaSyCgFUfBCJo5BlJCPi8OnEVOxpBzvlJIgtQ",
  authDomain: "woody-shop-rw.firebaseapp.com",
  projectId: "woody-shop-rw",
  storageBucket: "woody-shop-rw.appspot.com",
  messagingSenderId: "288308342990",
  appId: "1:288308342990:web:36958ef29637b6f6f2e09f"

};

firebase.initializeApp(firebaseConfig);
export default firebase;