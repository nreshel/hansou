import firebase from 'firebase'
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAqgSbph_yGF42DRrV0BKI8cRqTqbIrl4M",
  authDomain: "flashcard-app-60cb7.firebaseapp.com",
  databaseURL: "https://flashcard-app-60cb7.firebaseio.com",
  projectId: "flashcard-app-60cb7",
  storageBucket: "flashcard-app-60cb7.appspot.com",
  messagingSenderId: "1083101443655",
  appId: "1:1083101443655:web:abab0f9ba19221e7"
};
// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);