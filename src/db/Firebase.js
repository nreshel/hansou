import firebase from 'firebase'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCfadgMRTLYxV-JbvRBsg_26u9i0JCjWhE",
  authDomain: "react-flashcards-21788.firebaseapp.com",
  databaseURL: "https://react-flashcards-21788.firebaseio.com",
  projectId: "react-flashcards-21788",
  storageBucket: "",
  messagingSenderId: "637998614295",
  appId: "1:637998614295:web:cc602a04a08098ec"
}
// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);