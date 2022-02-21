import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAH9Lf2bPqsrdGRQAWsqiq6spv0o_0_9Ro",
  authDomain: "test-react-task.firebaseapp.com",
  projectId: "test-react-task",
  storageBucket: "test-react-task.appspot.com",
  messagingSenderId: "451367003632",
  appId: "1:451367003632:web:f0870a714da52fc1c62935",
};

export const fireBaseApi = initializeApp(firebaseConfig);
