import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCEsY39orLQQ8CmEijrprNMX4jgicgTsOA",
    authDomain: "cartpool-6d234.firebaseapp.com",
    databaseURL: "https://cartpool-6d234.firebaseio.com",
    projectId: "cartpool-6d234",
    storageBucket: "cartpool-6d234.appspot.com",
    messagingSenderId: "952196524389",
    appId: "1:952196524389:web:4e5af2a27785e0533fd98c",
    measurementId: "G-ZC5NLRDYTK"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;